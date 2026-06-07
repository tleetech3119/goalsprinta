import { useEffect } from "react";
import { useOnboarding } from "@/lib/onboarding-context";
import { Trophy, X } from "lucide-react";

export function FirstWinCelebration() {
  const { state, hasMilestones, update } = useOnboarding();
  // Trigger logic is handled where milestones are completed; this is just the renderer.
  // We treat "ready to show" as: a flag set by milestone toggle in localStorage.

  useEffect(() => {
    if (!state) return;
    // Listen for a custom event dispatched when a milestone is just completed
    const handler = async () => {
      if (state.first_milestone_celebrated) return;
      await update({ first_milestone_celebrated: true });
    };
    window.addEventListener("goal-sprinta:first-milestone-complete", handler);
    return () => window.removeEventListener("goal-sprinta:first-milestone-complete", handler);
  }, [state, update]);

  // We render based on a session flag that the trigger sets right before updating
  const visible = typeof window !== "undefined" && window.sessionStorage.getItem("gs-first-win") === "1";

  if (!visible) return null;

  const dismiss = () => {
    window.sessionStorage.removeItem("gs-first-win");
    window.dispatchEvent(new Event("gs-celebration-dismiss"));
  };

  return (
    <CelebrationBanner onDismiss={dismiss} />
  );
}

function CelebrationBanner({ onDismiss }: { onDismiss: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 5000);
    const sub = () => onDismiss();
    window.addEventListener("gs-celebration-dismiss", sub);
    return () => { clearTimeout(t); window.removeEventListener("gs-celebration-dismiss", sub); };
  }, [onDismiss]);

  return (
    <div className="fixed left-1/2 top-6 z-[60] -translate-x-1/2 animate-pop">
      <div className="flex items-start gap-3 rounded-2xl border border-primary/40 bg-gradient-hero p-4 pr-3 shadow-glow">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
          <Trophy className="h-5 w-5" />
        </div>
        <div className="max-w-xs">
          <div className="font-display text-sm font-semibold text-foreground">Amazing!</div>
          <div className="text-xs text-muted-foreground">You've completed your first milestone. Keep that momentum going!</div>
        </div>
        <button onClick={onDismiss} className="rounded p-1 text-muted-foreground hover:text-foreground" aria-label="Dismiss">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
