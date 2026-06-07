import { useState } from "react";
import { useOnboarding } from "@/lib/onboarding-context";
import { Check, ChevronDown, ChevronUp, X, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function OnboardingChecklist() {
  const { state, hasSprints, hasMilestones, hasRewards, update } = useOnboarding();
  const [open, setOpen] = useState(true);

  if (!state || !state.welcome_seen || state.checklist_dismissed) return null;

  const items = [
    { done: hasSprints, title: "Create your first sprint", desc: "Define a goal and break it down into your first 'sprint'.", to: "/dashboard" },
    { done: hasMilestones, title: "Add a milestone", desc: "Set a small, achievable step within your sprint.", to: "/dashboard" },
    { done: hasRewards, title: "Set a reward", desc: "Motivate yourself with a personal reward.", to: "/rewards" },
    { done: state.affirmation_viewed, title: "Check your daily affirmation", desc: "Boost your mindset with a positive message.", to: "/affirmations" },
  ] as const;

  const completed = items.filter((i) => i.done).length;
  const allDone = completed === items.length;

  return (
    <div className="fixed bottom-4 right-4 z-40 w-80 max-w-[calc(100vw-2rem)] rounded-2xl border border-border bg-card shadow-card animate-pop">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-2 p-4 text-left"
      >
        <div>
          <div className="flex items-center gap-2 font-display text-sm font-semibold">
            <Sparkles className="h-4 w-4 text-primary" /> Get Started with Goal Sprinta
          </div>
          <div className="mt-1 text-xs text-muted-foreground">{completed}/{items.length} complete</div>
        </div>
        <div className="flex items-center gap-1">
          {allDone && (
            <button
              onClick={(e) => { e.stopPropagation(); update({ checklist_dismissed: true }); }}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          {open ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronUp className="h-4 w-4 text-muted-foreground" />}
        </div>
      </button>
      {open && (
        <>
          <div className="h-1 bg-muted">
            <div className="h-full bg-gradient-primary transition-all" style={{ width: `${(completed / items.length) * 100}%` }} />
          </div>
          <ul className="p-2">
            {items.map((it) => (
              <li key={it.title}>
                <Link
                  to={it.to}
                  className={cn(
                    "flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/60",
                    it.done && "opacity-60",
                  )}
                >
                  <span className={cn(
                    "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border",
                    it.done ? "border-primary bg-primary text-primary-foreground" : "border-border",
                  )}>
                    {it.done && <Check className="h-3 w-3" />}
                  </span>
                  <div className="min-w-0">
                    <div className={cn("text-sm font-medium", it.done && "line-through")}>{it.title}</div>
                    <div className="text-xs text-muted-foreground">{it.desc}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
