import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeft, Plus, Target, Trash2, CalendarIcon, X, Pause, Play, CheckCircle2, RotateCcw, Trophy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useOnboarding } from "@/lib/onboarding-context";

type Sprint = { id: string; title: string; description: string | null; start_date: string; end_date: string | null; status: string; hold_reason: string | null; resume_date: string | null };
type Milestone = { id: string; title: string; completed: boolean; position: number; due_date: string | null };
type Reward = { id: string; title: string; description: string | null; claimed: boolean };


const todayInputValue = () => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${today.getFullYear()}-${month}-${day}`;
};

export const Route = createFileRoute("/_authenticated/sprints/$id")({
  ssr: false,
  head: () => ({ meta: [{ title: "Sprint — Goal Sprinta" }] }),
  component: SprintDetail,
});

function SprintDetail() {
  const { id } = useParams({ from: "/_authenticated/sprints/$id" });
  const { state, refresh, update } = useOnboarding();
  const [sprint, setSprint] = useState<Sprint | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [holdOpen, setHoldOpen] = useState(false);
  const [holdReason, setHoldReason] = useState("");
  const [holdResume, setHoldResume] = useState("");


  const load = async () => {
    setLoading(true);
    const [{ data: s }, { data: ms }] = await Promise.all([
      supabase.from("sprints").select("*").eq("id", id).maybeSingle(),
      supabase.from("milestones").select("*").eq("sprint_id", id).order("position", { ascending: true }).order("created_at", { ascending: true }),
    ]);
    setSprint(s as Sprint | null);
    setMilestones((ms ?? []) as Milestone[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, [id]);

  const addMilestone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const { data: userData } = await supabase.auth.getUser();
    const { data, error } = await supabase.from("milestones").insert({
      sprint_id: id, user_id: userData.user!.id, title: newTitle.trim(),
      position: milestones.length,
    }).select().single();
    if (error) return toast.error(error.message);
    setMilestones((m) => [...m, data as Milestone]);
    setNewTitle("");
    await refresh();
  };

  const toggle = async (m: Milestone) => {
    const next = !m.completed;
    setMilestones((arr) => arr.map((x) => x.id === m.id ? { ...x, completed: next } : x));
    const { error } = await supabase.from("milestones").update({
      completed: next, completed_at: next ? new Date().toISOString() : null,
    }).eq("id", m.id);
    if (error) { toast.error(error.message); return; }
    if (next && state && !state.first_milestone_celebrated) {
      window.sessionStorage.setItem("gs-first-win", "1");
      window.dispatchEvent(new Event("goal-sprinta:first-milestone-complete"));
      // force re-render
      window.dispatchEvent(new Event("storage"));
      await update({ first_milestone_celebrated: true });
    }
  };

  const remove = async (mid: string) => {
    setMilestones((arr) => arr.filter((x) => x.id !== mid));
    await supabase.from("milestones").delete().eq("id", mid);
    await refresh();
  };

  const setDueDate = async (mid: string, iso: string | null) => {
    setMilestones((arr) => arr.map((x) => x.id === mid ? { ...x, due_date: iso } : x));
    const { error } = await supabase.from("milestones").update({ due_date: iso }).eq("id", mid);
    if (error) toast.error(error.message);
  };

  const updateSprintDate = async (field: "start_date" | "end_date", iso: string | null) => {
    setSprint((s) => s ? { ...s, [field]: iso ?? (field === "start_date" ? todayInputValue() : null) } : s);
    const update = field === "start_date" ? { start_date: iso ?? todayInputValue() } : { end_date: iso };
    const { error } = await supabase.from("sprints").update(update as unknown as { start_date?: string; end_date?: string | null }).eq("id", id);
    if (error) toast.error(error.message);
  };

  const putOnHold = async () => {
    if (!holdReason.trim()) return toast.error("Please add a reason for the hold.");
    if (!holdResume) return toast.error("Please pick a resume date.");
    const { error } = await supabase.from("sprints").update({
      status: "on_hold", hold_reason: holdReason.trim(), resume_date: holdResume,
    }).eq("id", id);
    if (error) return toast.error(error.message);
    setSprint((s) => s ? { ...s, status: "on_hold", hold_reason: holdReason.trim(), resume_date: holdResume } : s);
    setHoldOpen(false);
    toast.success("Sprint placed on hold.");
  };

  const resumeSprint = async () => {
    const { error } = await supabase.from("sprints").update({
      status: "active", hold_reason: null, resume_date: null,
    }).eq("id", id);
    if (error) return toast.error(error.message);
    setSprint((s) => s ? { ...s, status: "active", hold_reason: null, resume_date: null } : s);
    toast.success("Sprint resumed.");
  };

  const completeSprint = async () => {
    const { error } = await supabase.from("sprints").update({
      status: "completed", completed_at: new Date().toISOString(), hold_reason: null, resume_date: null,
    }).eq("id", id);
    if (error) return toast.error(error.message);
    setSprint((s) => s ? { ...s, status: "completed", hold_reason: null, resume_date: null } : s);
    toast.success("Sprint moved to Wins. 🎉");
  };

  const reopenSprint = async () => {
    const { error } = await supabase.from("sprints").update({
      status: "active", completed_at: null,
    }).eq("id", id);
    if (error) return toast.error(error.message);
    setSprint((s) => s ? { ...s, status: "active" } : s);
    toast.success("Sprint reopened.");
  };

  if (loading) return <div className="p-8 text-muted-foreground">Loading…</div>;

  if (!sprint) return <div className="p-8">Sprint not found. <Link to="/dashboard" className="text-primary underline">Back</Link></div>;

  const done = milestones.filter((m) => m.completed).length;
  const pct = milestones.length ? (done / milestones.length) * 100 : 0;
  const today = todayInputValue();

  return (
    <div className="container mx-auto max-w-3xl px-6 py-8">
      <Link to="/dashboard" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All sprints
      </Link>

      <div className="mt-6 rounded-3xl border border-border bg-card p-8 shadow-card">
        <div className="flex items-start justify-between gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
            <Target className="h-6 w-6" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {sprint.status === "completed" ? (
              <Button variant="outline" size="sm" onClick={reopenSprint}>
                <RotateCcw className="mr-1 h-4 w-4" /> Reopen
              </Button>
            ) : (
              <>
                {sprint.status === "on_hold" ? (
                  <Button variant="outline" size="sm" onClick={resumeSprint}>
                    <Play className="mr-1 h-4 w-4" /> Resume
                  </Button>
                ) : (
                  <Dialog open={holdOpen} onOpenChange={(o) => {
                    setHoldOpen(o);
                    if (o) { setHoldReason(sprint.hold_reason ?? ""); setHoldResume(sprint.resume_date ?? ""); }
                  }}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Pause className="mr-1 h-4 w-4" /> Put on hold
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Put sprint on hold</DialogTitle>
                        <DialogDescription>Tell us why you're pausing and when you plan to resume.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Reason for hold</label>
                          <Textarea
                            value={holdReason}
                            onChange={(e) => setHoldReason(e.target.value)}
                            placeholder="What's blocking you right now?"
                            maxLength={500}
                            rows={4}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Planned resume date</label>
                          <Input
                            type="date"
                            value={holdResume}
                            min={today}
                            onChange={(e) => setHoldResume(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="ghost" onClick={() => setHoldOpen(false)}>Cancel</Button>
                        <Button onClick={putOnHold} className="bg-gradient-primary text-primary-foreground">Put on hold</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
                <Button size="sm" onClick={completeSprint} className="bg-gradient-primary text-primary-foreground">
                  <CheckCircle2 className="mr-1 h-4 w-4" /> Mark complete
                </Button>
              </>
            )}
          </div>

        </div>
        <h1 className="mt-4 font-display text-3xl font-bold">{sprint.title}</h1>
        {sprint.description && <p className="mt-2 text-muted-foreground">{sprint.description}</p>}
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Start</span>
            <Input
              type="date"
              value={sprint.start_date}
              onChange={(e) => updateSprintDate("start_date", e.target.value || todayInputValue())}
              className="h-8 w-40 text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Target</span>
            <Input
              type="date"
              value={sprint.end_date ?? ""}
              onChange={(e) => updateSprintDate("end_date", e.target.value || null)}
              className="h-8 w-40 text-sm"
            />
          </div>
        </div>
        {sprint.status === "on_hold" && (
          <div className="mt-4 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-amber-500/60 text-amber-600 dark:text-amber-400">
                <Pause className="mr-1 h-3 w-3" /> On hold
              </Badge>
              {sprint.resume_date && (
                <span className="text-sm text-muted-foreground">
                  Resumes {new Date(sprint.resume_date + "T00:00:00").toLocaleDateString()}
                </span>
              )}
            </div>
            {sprint.hold_reason && (
              <p className="mt-2 text-sm text-foreground/90"><span className="font-medium">Reason: </span>{sprint.hold_reason}</p>
            )}
          </div>
        )}

        <div className="mt-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{done}/{milestones.length} milestones complete</span>
            <span>{Math.round(pct)}%</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-muted">
            <div className="h-full rounded-full bg-gradient-primary transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      <div data-tour="milestone-tracker" className="mt-8">
        <h2 className="font-display text-xl font-semibold">Milestones</h2>
        <form onSubmit={addMilestone} className="mt-4 flex gap-2">
          <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Add a milestone…" />
          <Button type="submit" className="bg-gradient-primary text-primary-foreground"><Plus className="h-4 w-4" /></Button>
        </form>
        <ul className="mt-4 space-y-2">
          {milestones.length === 0 && (
            <li className="rounded-xl border border-dashed border-border bg-card/40 p-6 text-center text-sm text-muted-foreground">
              No milestones yet — add one to start tracking progress.
            </li>
          )}
          {milestones.map((m) => {
            const overdue = m.due_date && !m.completed && m.due_date < today;
            const dueToday = m.due_date && !m.completed && m.due_date === today;
            return (
              <li key={m.id} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
                <Checkbox checked={m.completed} onCheckedChange={() => toggle(m)} />
                <span className={m.completed ? "flex-1 text-muted-foreground line-through" : "flex-1"}>{m.title}</span>
                <div
                  className={cn(
                    "flex items-center gap-1 rounded-md border border-input bg-background px-2 py-1",
                    overdue && "border-destructive text-destructive",
                    dueToday && "border-primary text-primary",
                  )}
                >
                  <CalendarIcon className="h-3.5 w-3.5 shrink-0" />
                  <Input
                    type="date"
                    aria-label={`Due date for ${m.title}`}
                    value={m.due_date ?? ""}
                    onChange={(e) => setDueDate(m.id, e.target.value || null)}
                    className="h-7 w-32 border-0 bg-transparent p-0 text-xs shadow-none focus-visible:ring-0"
                  />
                  {m.due_date && (
                    <button
                      type="button"
                      onClick={() => setDueDate(m.id, null)}
                      className="rounded p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                      aria-label={`Clear due date for ${m.title}`}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
                <button onClick={() => remove(m.id)} className="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
