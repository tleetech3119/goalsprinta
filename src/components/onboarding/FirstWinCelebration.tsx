import { useEffect, useState } from "react";
import { Trophy, X } from "lucide-react";

export function FirstWinCelebration() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onShow = () => setShow(true);
    window.addEventListener("goal-sprinta:first-milestone-complete", onShow);
    return () => window.removeEventListener("goal-sprinta:first-milestone-complete", onShow);
  }, []);

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setShow(false), 5000);
    return () => clearTimeout(t);
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed left-1/2 top-6 z-[200] -translate-x-1/2 animate-pop">
      <div className="flex items-start gap-3 rounded-2xl border border-primary/40 bg-gradient-hero p-4 pr-3 shadow-glow">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
          <Trophy className="h-5 w-5" />
        </div>
        <div className="max-w-xs">
          <div className="font-display text-sm font-semibold text-foreground">Amazing!</div>
          <div className="text-xs text-muted-foreground">You've successfully completed your first milestone. Keep that momentum going!</div>
        </div>
        <button onClick={() => setShow(false)} className="rounded p-1 text-muted-foreground hover:text-foreground" aria-label="Dismiss">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
