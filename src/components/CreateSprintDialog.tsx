import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function CreateSprintDialog({
  open, onOpenChange, onCreated,
}: { open: boolean; onOpenChange: (o: boolean) => void; onCreated: (id: string) => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) { setLoading(false); return; }
    const { data, error } = await supabase.from("sprints").insert({
      user_id: userData.user.id, title, description: description || null,
      end_date: endDate || null,
    }).select().single();
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Sprint created! Let's go.");
    setTitle(""); setDescription(""); setEndDate("");
    onOpenChange(false);
    onCreated(data!.id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-border bg-card">
        <DialogHeader>
          <DialogTitle>Create new sprint</DialogTitle>
          <DialogDescription>What goal are you sprinting toward?</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
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
            {loading ? "Creating…" : "Create sprint"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
