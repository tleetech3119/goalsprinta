import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Trophy, Plus, Check, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useOnboarding } from "@/lib/onboarding-context";

type Reward = { id: string; title: string; description: string | null; claimed: boolean };

export const Route = createFileRoute("/_authenticated/rewards")({
  head: () => ({ meta: [{ title: "Rewards — Goal Sprinta" }] }),
  component: Rewards,
});

function Rewards() {
  const { refresh } = useOnboarding();
  const [items, setItems] = useState<Reward[]>([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const load = async () => {
    const { data: u } = await supabase.auth.getUser();
    const { data } = await supabase.from("rewards").select("*").eq("user_id", u.user!.id).order("created_at", { ascending: false });
    setItems((data ?? []) as Reward[]);
  };
  useEffect(() => { load(); }, []);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: u } = await supabase.auth.getUser();
    const { error } = await supabase.from("rewards").insert({ user_id: u.user!.id, title, description: desc || null });
    if (error) return toast.error(error.message);
    toast.success("Reward set — go earn it!");
    setTitle(""); setDesc("");
    load(); refresh();
  };

  const toggleClaim = async (r: Reward) => {
    await supabase.from("rewards").update({ claimed: !r.claimed, claimed_at: !r.claimed ? new Date().toISOString() : null }).eq("id", r.id);
    load();
  };
  const remove = async (id: string) => {
    await supabase.from("rewards").delete().eq("id", id);
    load(); refresh();
  };

  return (
    <div className="container mx-auto max-w-4xl px-6 py-8">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-primary text-primary-foreground"><Trophy className="h-5 w-5" /></div>
        <div>
          <h1 className="font-display text-3xl font-bold">Rewards</h1>
          <p className="text-sm text-muted-foreground">Motivate yourself. Celebrate every win.</p>
        </div>
      </div>

      <Card className="mt-6 border-border bg-card p-6">
        <form onSubmit={add} className="grid gap-3 md:grid-cols-[1fr_2fr_auto]">
          <div>
            <Label>Reward</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="A weekend trip" required />
          </div>
          <div>
            <Label>Why this one?</Label>
            <Textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="What makes it worth it?" rows={1} />
          </div>
          <div className="flex items-end"><Button type="submit" className="bg-gradient-primary text-primary-foreground"><Plus className="mr-2 h-4 w-4" />Add</Button></div>
        </form>
      </Card>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {items.length === 0 && (
          <div className="md:col-span-2 rounded-2xl border border-dashed border-border bg-card/40 p-12 text-center text-muted-foreground">
            No rewards yet. Set one above to keep yourself motivated.
          </div>
        )}
        {items.map((r) => (
          <Card key={r.id} className={`border-border bg-card p-5 ${r.claimed ? "opacity-70" : ""}`}>
            <div className="flex items-start justify-between gap-2">
              <h3 className={`font-display text-lg font-semibold ${r.claimed ? "line-through" : ""}`}>{r.title}</h3>
              <button onClick={() => remove(r.id)} className="rounded p-1 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>
            {r.description && <p className="mt-1 text-sm text-muted-foreground">{r.description}</p>}
            <Button variant={r.claimed ? "secondary" : "default"} size="sm" onClick={() => toggleClaim(r)} className={`mt-4 ${!r.claimed ? "bg-gradient-primary text-primary-foreground" : ""}`}>
              <Check className="mr-2 h-3 w-3" />{r.claimed ? "Claimed" : "Claim reward"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
