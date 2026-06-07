import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, Target, ArrowRight, Calendar, Award, CheckCircle2, RotateCcw, ArrowLeft } from "lucide-react";
import { CreateSprintDialog } from "@/components/CreateSprintDialog";
import { useOnboarding } from "@/lib/onboarding-context";
import { toast } from "sonner";

type Sprint = {
  id: string; title: string; description: string | null; status: string;
  start_date: string; end_date: string | null; completed_at: string | null; created_at: string;
};

export const Route = createFileRoute("/_authenticated/sprints/")({
  head: () => ({ meta: [{ title: "Sprint Dashboard — Goal Sprinta" }] }),
  component: SprintDashboard,
});

function SprintDashboard() {
  const { refresh } = useOnboarding();
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [wins, setWins] = useState<Sprint[]>([]);
  const [winProgress, setWinProgress] = useState<Record<string, { total: number; done: number }>>({});
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<Record<string, { total: number; done: number }>>({});

  const load = async () => {
    setLoading(true);
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) { setLoading(false); return; }

    const [{ data: ss, error }, { data: ws }] = await Promise.all([
      supabase.from("sprints").select("*").eq("user_id", userData.user.id).neq("status", "completed").order("created_at", { ascending: false }),
      supabase.from("sprints").select("*").eq("user_id", userData.user.id).eq("status", "completed").order("completed_at", { ascending: false, nullsFirst: false }).order("created_at", { ascending: false }),
    ]);

    if (error) { toast.error(error.message); setLoading(false); return; }
    setSprints((ss ?? []) as Sprint[]);
    setWins((ws ?? []) as Sprint[]);

    const allSprintIds = [...(ss ?? []), ...(ws ?? [])].map((s) => s.id);
    if (allSprintIds.length) {
      const { data: ms } = await supabase.from("milestones").select("sprint_id, completed").in("sprint_id", allSprintIds);
      const p: Record<string, { total: number; done: number }> = {};
      const wp: Record<string, { total: number; done: number }> = {};
      (ms ?? []).forEach((m) => {
        const target = (ss ?? []).some((s) => s.id === m.sprint_id) ? p : wp;
        target[m.sprint_id] = target[m.sprint_id] ?? { total: 0, done: 0 };
        target[m.sprint_id].total++;
        if (m.completed) target[m.sprint_id].done++;
      });
      setProgress(p);
      setWinProgress(wp);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const onCreated = async () => { await load(); await refresh(); };

  const reopenWin = async (id: string) => {
    const { error } = await supabase.from("sprints").update({ status: "active", completed_at: null }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Sprint reopened.");
    await load();
  };

  return (
    <div className="container mx-auto max-w-6xl px-6 py-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Sprint Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Your active sprints and completed wins.</p>
        </div>
        <Button
          data-tour="create-sprint"
          onClick={() => setOpen(true)}
          className="bg-gradient-primary text-primary-foreground shadow-glow"
        >
          <Plus className="mr-2 h-4 w-4" /> Create New Sprint
        </Button>
      </div>

      {/* Sprints */}
      <div data-tour="sprint-overview" className="mt-8">
        <h2 className="font-display text-xl font-semibold">Your sprints</h2>
        <div className="mt-4">
          {loading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1,2,3].map((i) => <div key={i} className="h-44 animate-pulse rounded-2xl border border-border bg-card/40" />)}
            </div>
          ) : sprints.length === 0 ? (
            <EmptyState onCreate={() => setOpen(true)} />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sprints.map((s) => {
                const p = progress[s.id] ?? { total: 0, done: 0 };
                const pct = p.total ? (p.done / p.total) * 100 : 0;
                return (
                  <Link
                    key={s.id}
                    to="/sprints/$id"
                    params={{ id: s.id }}
                    className="group rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:border-primary/40 hover:shadow-glow"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/40 text-primary">
                        <Target className="h-5 w-5" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                    </div>
                    <h3 className="mt-4 line-clamp-1 font-display text-lg font-semibold">{s.title}</h3>
                    {s.description && <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{s.description}</p>}
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{p.done}/{p.total} milestones</span>
                        <span>{Math.round(pct)}%</span>
                      </div>
                      <div className="mt-1.5 h-1.5 rounded-full bg-muted">
                        <div className="h-full rounded-full bg-gradient-primary transition-all" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    {s.end_date && (
                      <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />by {new Date(s.end_date).toLocaleDateString()}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Wins */}
      <div className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-xl font-semibold">Wins</h2>
          <div className="hidden items-center gap-2 rounded-full border border-border bg-card px-4 py-2 sm:flex">
            <Award className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{wins.length} {wins.length === 1 ? "win" : "wins"}</span>
          </div>
        </div>
        <div className="mt-4">
          {wins.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card/40 p-10 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">No wins yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">Finish a sprint and it'll land here as a permanent reminder of what you accomplished.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {wins.map((s) => {
                const p = winProgress[s.id] ?? { total: 0, done: 0 };
                return (
                  <div
                    key={s.id}
                    className="group relative rounded-2xl border border-border bg-card p-5 shadow-card transition-all hover:border-primary/40 hover:shadow-glow"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <span className="rounded-full bg-accent/40 px-2 py-0.5 text-xs font-medium text-primary">Completed</span>
                    </div>
                    <Link to="/sprints/$id" params={{ id: s.id }} className="mt-4 block">
                      <h3 className="line-clamp-1 font-display text-lg font-semibold group-hover:text-primary">{s.title}</h3>
                      {s.description && <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{s.description}</p>}
                    </Link>
                    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{p.done}/{p.total} milestones</span>
                      {s.completed_at && <span>Finished {new Date(s.completed_at).toLocaleDateString()}</span>}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <Link to="/sprints/$id" params={{ id: s.id }} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
                        View <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                      <Button variant="ghost" size="sm" onClick={() => reopenWin(s.id)}>
                        <RotateCcw className="mr-1 h-3.5 w-3.5" /> Reopen
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <CreateSprintDialog open={open} onOpenChange={setOpen} onCreated={onCreated} />
    </div>
  );
}

function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="mx-auto max-w-lg rounded-3xl border border-dashed border-border bg-card/40 p-12 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow animate-pop">
        <Target className="h-8 w-8" />
      </div>
      <h2 className="mt-6 font-display text-2xl font-bold">Your path to success starts now!</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        You haven't created any sprints yet. Ready to turn your dreams into reality?
      </p>
      <Button size="lg" onClick={onCreate} className="mt-6 bg-gradient-primary text-primary-foreground shadow-glow">
        <Plus className="mr-2 h-4 w-4" /> Create Your First Sprint
      </Button>
    </div>
  );
}
