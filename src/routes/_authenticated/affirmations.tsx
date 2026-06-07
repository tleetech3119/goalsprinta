import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, RefreshCw } from "lucide-react";
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

export const Route = createFileRoute("/_authenticated/affirmations")({
  head: () => ({ meta: [{ title: "Daily Affirmation — Goal Sprinta" }] }),
  component: Affirmations,
});

function Affirmations() {
  const { state, update } = useOnboarding();
  const todayIdx = useMemo(() => {
    const d = new Date();
    const seed = d.getFullYear() * 1000 + d.getMonth() * 31 + d.getDate();
    return seed % AFFIRMATIONS.length;
  }, []);
  const [idx, setIdx] = useState(todayIdx);

  useEffect(() => {
    if (state && !state.affirmation_viewed) update({ affirmation_viewed: true });
  }, [state, update]);

  return (
    <div className="container mx-auto max-w-2xl px-6 py-16">
      <div className="text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow"><Sparkles className="h-6 w-6" /></div>
        <h1 className="mt-4 font-display text-3xl font-bold">Your daily affirmation</h1>
        <p className="mt-1 text-sm text-muted-foreground">A small mindset boost to fuel your sprint.</p>
      </div>
      <Card className="mt-10 border-border bg-gradient-hero p-12 text-center shadow-card animate-pop">
        <p className="font-display text-2xl font-semibold leading-snug text-foreground">“{AFFIRMATIONS[idx]}”</p>
      </Card>
      <div className="mt-6 text-center">
        <Button variant="outline" onClick={() => setIdx((i) => (i + 1) % AFFIRMATIONS.length)}>
          <RefreshCw className="mr-2 h-4 w-4" /> Another one
        </Button>
      </div>
    </div>
  );
}
