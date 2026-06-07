import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/lib/onboarding-context";
import { Rocket, Sparkles } from "lucide-react";

export function WelcomeModal() {
  const { state, update } = useOnboarding();
  const open = !!state && !state.welcome_seen;

  const dismiss = () => update({ welcome_seen: true });

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) dismiss(); }}>
      <DialogContent className="max-w-lg border-border bg-card p-0 overflow-hidden">
        <div className="bg-gradient-hero p-8 text-center">
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-glow animate-pop">
            <Rocket className="h-8 w-8" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">Welcome to Goal Sprinta!</h1>
          <p className="mt-3 text-base text-muted-foreground">
            Achieve your personal goals, one sprint at a time.
          </p>
        </div>
        <div className="p-6 text-center">
          <ul className="mb-6 space-y-2 text-left text-sm text-muted-foreground">
            <li className="flex gap-2"><Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> Break big goals into focused sprints</li>
            <li className="flex gap-2"><Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> Track milestones and celebrate every win</li>
            <li className="flex gap-2"><Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> Reward yourself when you finish strong</li>
          </ul>
          <Button size="lg" onClick={dismiss} className="w-full bg-gradient-primary text-primary-foreground shadow-glow">
            Let's Get Started!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
