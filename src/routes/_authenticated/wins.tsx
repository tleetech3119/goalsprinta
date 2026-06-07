import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Award, ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type Sprint = {
  id: string; title: string; description: string | null; status: string;
  start_date: string; end_date: string | null; completed_at: string | null; created_at: string;
};

export const Route = createFileRoute("/_authenticated/wins")({
  head: () => ({ meta: [{ title: "Wins — Goal Sprinta" }] }),
  component: Wins,
});

function Wins() {
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [progress, setProgress] = useState<Record<string, { total: number; done: number }>>({});
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;
    const { data: ss, error } = await supabase
      .from("sprints")
      .select("*")
      .eq("user_id", userData.user.id)
      .eq("status", "completed")
      .order("completed_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });
    if (error) { toast.error(error.message); setLoading(false); return; }
    setSprints((ss ?? []) as Sprint[]);
    if (ss?.length) {
      const { data: ms } = await supabase.from("milestones").select("sprint_id, completed").in("sprint_id", ss.map((s) => s.id));
      const p: Record<string, { total: number; done: number }> = {};
      (ms ?? []).forEach((m) => {
        p[m.sprint_id] = p[m.sprint_id] ?? { total: 0, done: 0 };
        p[m.sprint_id].total++;
        if (m.completed) p[m.sprint_id].done++;
      });
      setProgress(p);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const reopen = async (id: string) => {
    const { error } = await supabase.from("sprints").update({ status: "active", completed_at: null }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Sprint reopened.");
    await load();
  };

  return (
    <div className="container mx-auto max-w-6xl px-6 py-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Wins</h1>
          <p className="mt-1 text-sm text-muted-foreground">Every sprint you've completed. Celebrate the progress.</p>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-border bg-card px-4 py-2 sm:flex">
          <Award className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">{sprints.length} {sprints.length === 1 ? "win" : "wins"}</span>
        </div>
      </div>

      <div className="mt-8">
        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1,2,3].map((i) => <div key={i} className="h-44 animate-pulse rounded-2xl border border-border bg-card/40" />)}
          </div>
        ) : sprints.length === 0 ? (
          <div className="mx-auto max-w-lg rounded-3xl border border-dashed border-border bg-card/40 p-12 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
              <Award className="h-8 w-8" />
            </div>
            <h2 className="mt-6 font-display text-2xl font-bold">No wins yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Finish a sprint and it'll land here as a permanent reminder of what you accomplished.
            </p>
            <Link to="/dashboard" className="mt-6 inline-flex items-center gap-1 text-sm text-primary hover:underline">
              Back to your sprints <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sprints.map((s) => {
              const p = progress[s.id] ?? { total: 0, done: 0 };
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
                    <Link to="/sprints/$id" params={{ id: s.id }} className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                      View <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <Button variant="ghost" size="sm" onClick={() => reopen(s.id)}>
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
  );
}
