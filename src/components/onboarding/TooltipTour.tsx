import { useEffect, useState } from "react";
import { useOnboarding } from "@/lib/onboarding-context";
import { Button } from "@/components/ui/button";
import { createPortal } from "react-dom";

type Step = { key: string; selector: string; title: string; message: string; cta: string };

const STEPS: Step[] = [
  { key: "create-sprint", selector: '[data-tour="create-sprint"]', title: "Start your journey", message: "Start your journey here! Break big goals into manageable sprints.", cta: "Next" },
  { key: "sprint-overview", selector: '[data-tour="sprint-overview"]', title: "Sprint overview", message: "See all your active sprints and their progress at a glance.", cta: "Next" },
  { key: "milestone-tracker", selector: '[data-tour="milestone-tracker"]', title: "Track milestones", message: "Add key steps within your sprints to track your progress.", cta: "Next" },
  { key: "rewards", selector: '[data-tour="rewards"]', title: "Reward your wins", message: "Set exciting rewards for yourself and claim them when you succeed!", cta: "Got it!" },
];

export function TooltipTour() {
  const { state, update } = useOnboarding();
  const [idx, setIdx] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);

  const active = !!state && state.welcome_seen && !state.tooltips_seen;

  useEffect(() => {
    if (!active) return;
    const step = STEPS[idx];
    if (!step) return;
    let raf = 0;
    const update = () => {
      const el = document.querySelector(step.selector);
      if (el) setRect(el.getBoundingClientRect());
      else setRect(null);
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [active, idx]);

  if (!active) return null;
  const step = STEPS[idx];
  if (!step) return null;

  const next = () => {
    if (idx >= STEPS.length - 1) {
      update({ tooltips_seen: true });
    } else {
      setIdx(idx + 1);
    }
  };
  const skip = () => update({ tooltips_seen: true });

  // Position tooltip below or above target depending on viewport
  const place = (() => {
    if (!rect) return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" } as const;
    const tooltipH = 160;
    const below = rect.bottom + tooltipH + 16 < window.innerHeight;
    return below
      ? { top: rect.bottom + 12, left: Math.min(Math.max(rect.left, 16), window.innerWidth - 336) }
      : { top: rect.top - tooltipH - 12, left: Math.min(Math.max(rect.left, 16), window.innerWidth - 336) };
  })();

  const content = (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* dim overlay with cutout */}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-[1px] pointer-events-auto" onClick={skip} />
      {rect && (
        <div
          className="absolute rounded-xl ring-2 ring-primary shadow-glow pointer-events-none animate-pop"
          style={{
            top: rect.top - 6, left: rect.left - 6,
            width: rect.width + 12, height: rect.height + 12,
          }}
        />
      )}
      <div
        className="absolute w-80 rounded-xl border border-border bg-card p-4 shadow-card pointer-events-auto animate-pop"
        style={place}
      >
        <div className="text-xs font-medium text-primary">Step {idx + 1} of {STEPS.length}</div>
        <h3 className="mt-1 font-display text-base font-semibold">{step.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{step.message}</p>
        <div className="mt-4 flex items-center justify-between">
          <button onClick={skip} className="text-xs text-muted-foreground hover:text-foreground">Skip tour</button>
          <Button size="sm" onClick={next} className="bg-gradient-primary text-primary-foreground">{step.cta}</Button>
        </div>
      </div>
    </div>
  );

  return typeof document === "undefined" ? null : createPortal(content, document.body);
}
