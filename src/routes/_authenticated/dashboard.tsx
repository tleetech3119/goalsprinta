import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, RefreshCw, ArrowRight, Target } from "lucide-react";
import { useOnboarding } from "@/lib/onboarding-context";

const AFFIRMATIONS = [
  "Every small step is progress. Keep sprinting.",
  "You're not behind — you're exactly where you need to start.",
  "Done is better than perfect. Move the next inch.",
  "Your future self is cheering for the work you do today.",
  "Discipline is choosing what you want most over what you want now.",
  "The compound effect of tiny wins is unstoppable.",
  "You don't have to be great to start — but you have to start to be great.",
  "Momentum loves consistency more than intensity.",
  "Every sprint finished is proof of who you're becoming.",
  "You are capable of more than today's doubts suggest.",
];

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Welcome — Goal Sprinta" }] }),
  component: Welcome,
});

function Welcome() {
  const { state, update } = useOnboarding();

  const todayIdx = useMemo(() => {
    const d = new Date();
    const seed = d.getFullYear() * 1000 + d.getMonth() * 31 + d.getDate();
    return seed % AFFIRMATIONS.length;
  }, []);
  const [affIdx, setAffIdx] = useState(todayIdx);

  useEffect(() => {
    if (state && !state.affirmation_viewed) update({ affirmation_viewed: true });
  }, [state, update]);

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-2rem)] max-w-3xl flex-col items-center justify-center px-6 py-12">
      {/* Daily Affirmation */}
      <Card className="w-full border-border bg-gradient-hero p-8 text-center shadow-card">
        <div className="flex items-center justify-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow">
            <Sparkles className="h-4 w-4" />
          </div>
          <h2 className="font-display text-lg font-semibold">Daily Affirmation</h2>
        </div>
        <p className="mt-4 font-display text-2xl font-semibold leading-snug text-foreground sm:text-3xl">
          “{AFFIRMATIONS[affIdx]}”
        </p>
        <div className="mt-5">
          <Button variant="outline" size="sm" onClick={() => setAffIdx((i) => (i + 1) % AFFIRMATIONS.length)}>
            <RefreshCw className="mr-2 h-3.5 w-3.5" /> Another one
          </Button>
        </div>
      </Card>

      {/* Go to Sprint Dashboard */}
      <Card className="mt-6 w-full border-border bg-card p-8 text-center shadow-card">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
          <Target className="h-6 w-6" />
        </div>
        <h3 className="mt-4 font-display text-xl font-bold">Ready to make progress?</h3>
        <p className="mt-1 text-sm text-muted-foreground">Jump into your sprints and wins.</p>
        <Button asChild size="lg" className="mt-5 bg-gradient-primary text-primary-foreground shadow-glow">
          <Link to="/sprints">
            Go to Sprint Dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </Card>
    </div>
  );
}
