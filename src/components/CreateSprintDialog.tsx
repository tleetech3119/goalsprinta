import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { SPRINT_TEMPLATES, type SprintTemplate } from "@/lib/sprint-templates";
import { ArrowLeft, Sparkles } from "lucide-react";

export function CreateSprintDialog({
  open, onOpenChange, onCreated,
}: { open: boolean; onOpenChange: (o: boolean) => void; onCreated: (id: string) => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"blank" | "templates">("blank");
  const [selectedTemplate, setSelectedTemplate] = useState<SprintTemplate | null>(null);
  const [budget, setBudget] = useState<Record<string, number>>({});

  const reset = () => {
    setTitle(""); setDescription(""); setEndDate("");
    setSelectedTemplate(null); setTab("blank"); setBudget({});
  };

  const pickTemplate = (t: SprintTemplate) => {
    setSelectedTemplate(t);
    setTitle(t.title);
    setDescription(t.description);
    const d = new Date();
    d.setDate(d.getDate() + t.durationDays);
    setEndDate(d.toISOString().slice(0, 10));
    if (t.budgetCategories) {
      const init: Record<string, number> = {};
      t.budgetCategories.forEach((c) => { init[c.label] = c.suggested; });
      setBudget(init);
    } else {
      setBudget({});
    }
  };

  const budgetTotal = Object.values(budget).reduce((s, n) => s + (Number.isFinite(n) ? n : 0), 0);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) { setLoading(false); return; }
    const userId = userData.user.id;
    const { data, error } = await supabase.from("sprints").insert({
      user_id: userId, title, description: description || null,
      end_date: endDate || null,
    }).select().single();
    if (error) { setLoading(false); return toast.error(error.message); }

    if (selectedTemplate) {
      const rows = selectedTemplate.milestones.map((m, i) => ({
        sprint_id: data!.id, user_id: userId, title: m, position: i,
      }));
      const { error: mErr } = await supabase.from("milestones").insert(rows);
      if (mErr) toast.error(`Sprint created, but milestones failed: ${mErr.message}`);
    }

    setLoading(false);
    toast.success(selectedTemplate ? "Sprint created with template milestones!" : "Sprint created! Let's go.");
    const newId = data!.id;
    reset();
    onOpenChange(false);
    onCreated(newId);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { onOpenChange(o); if (!o) reset(); }}>
      <DialogContent className="max-w-2xl border-border bg-card">
        <DialogHeader>
          <DialogTitle>Create new sprint</DialogTitle>
          <DialogDescription>Start from a template or build your own.</DialogDescription>
        </DialogHeader>

        <Tabs value={tab} onValueChange={(v) => setTab(v as "blank" | "templates")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="blank">Blank sprint</TabsTrigger>
            <TabsTrigger value="templates"><Sparkles className="mr-1.5 h-3.5 w-3.5" /> Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="blank" className="mt-4">
            <SprintForm
              title={title} setTitle={setTitle}
              description={description} setDescription={setDescription}
              endDate={endDate} setEndDate={setEndDate}
              loading={loading} onSubmit={submit}
              templateName={null}
            />
          </TabsContent>

          <TabsContent value="templates" className="mt-4">
            {!selectedTemplate ? (
              <div className="grid max-h-[60vh] gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
                {SPRINT_TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => pickTemplate(t)}
                    className="group rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary/40 hover:shadow-glow"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{t.emoji}</span>
                      <span className="text-xs uppercase tracking-wide text-muted-foreground">{t.category}</span>
                    </div>
                    <h3 className="mt-2 font-display text-base font-semibold">{t.name}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{t.description}</p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {t.milestones.length} milestones · {t.durationDays} days
                    </p>
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <button
                  type="button"
                  onClick={() => { setSelectedTemplate(null); setTitle(""); setDescription(""); setEndDate(""); }}
                  className="mb-3 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Back to templates
                </button>
                <div className="mb-3 rounded-lg border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{selectedTemplate.emoji} {selectedTemplate.name}</span> — {selectedTemplate.milestones.length} milestones will be added automatically.
                </div>
                <SprintForm
                  title={title} setTitle={setTitle}
                  description={description} setDescription={setDescription}
                  endDate={endDate} setEndDate={setEndDate}
                  loading={loading} onSubmit={submit}
                  templateName={selectedTemplate.name}
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function SprintForm({
  title, setTitle, description, setDescription, endDate, setEndDate,
  loading, onSubmit, templateName,
}: {
  title: string; setTitle: (s: string) => void;
  description: string; setDescription: (s: string) => void;
  endDate: string; setEndDate: (s: string) => void;
  loading: boolean; onSubmit: (e: React.FormEvent) => void;
  templateName: string | null;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label>Sprint title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Run a 10k by June" autoFocus />
      </div>
      <div>
        <Label>Description (optional)</Label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Why this matters to you…" rows={3} />
      </div>
      <div>
        <Label>Target date (optional)</Label>
        <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>
      <Button type="submit" disabled={loading || !title.trim()} className="w-full bg-gradient-primary text-primary-foreground">
        {loading ? "Creating…" : templateName ? `Create from ${templateName}` : "Create sprint"}
      </Button>
    </form>
  );
}
