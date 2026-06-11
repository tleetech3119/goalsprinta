import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Sparkles, Target, Trophy, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Goal Sprinta — Achieve your goals, one sprint at a time" },
      { name: "description", content: "Break big goals into bite-sized sprints, track milestones, reward yourself, and build unstoppable momentum." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2 font-display text-xl font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground"><Zap className="h-4 w-4" /></span>
          Goal Sprinta
        </div>
        <Link to="/auth"><Button variant="ghost">Sign in</Button></Link>
      </header>

      <section className="container mx-auto px-6 pt-16 pb-24 text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> Built for goal-getters
        </div>
        <h1 className="mx-auto mt-8 max-w-3xl text-5xl font-bold leading-[1.05] md:text-6xl">
          Achieve your goals,<br /><span className="bg-gradient-primary bg-clip-text text-transparent">one sprint at a time.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          Break big dreams into focused sprints, track milestones that matter, and reward every win. Momentum, on purpose.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/auth"><Button size="lg" className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">Start sprinting — free</Button></Link>
          <Link to="/why"><Button size="lg" variant="outline">Why this works</Button></Link>
        </div>

        <div className="mt-24 grid gap-6 md:grid-cols-3">
          {[
            { icon: Target, title: "Define sprints", body: "Bite-sized goal cycles you can actually finish." },
            { icon: Sparkles, title: "Track milestones", body: "Small wins compound into big breakthroughs." },
            { icon: Trophy, title: "Earn rewards", body: "Celebrate every finish line you cross." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card/60 p-6 text-left shadow-card">
              <f.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
