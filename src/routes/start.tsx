import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Zap } from "lucide-react";

export const Route = createFileRoute("/start")({
  head: () => ({
    meta: [
      { title: "Start Your Free Sprint — Goal Sprinta" },
      { name: "description", content: "Stop waiting for motivation. Start building momentum with Goal Sprinta. 14-day free trial, no credit card required." },
      { property: "og:title", content: "Start Your Free Sprint — Goal Sprinta" },
      { property: "og:description", content: "Stop waiting for motivation. Start building momentum with Goal Sprinta. 14-day free trial, no credit card required." },
    ],
  }),
  component: StartPage,
});

function StartPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto flex items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
            <Zap className="h-4 w-4" />
          </span>
          Goal Sprinta
        </Link>
        <Link to="/guarantee">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to guarantee
          </Button>
        </Link>
      </header>

      <section className="container mx-auto flex flex-col items-center px-6 pb-24 pt-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">The Moment of Decision</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight md:text-6xl">
          How many more <span className="bg-gradient-primary bg-clip-text text-transparent">"somedays"</span> can you afford?
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          The life you want is on the other side of a finished goal. The book won't write itself. The business won't launch itself. The change won't happen by itself. Stop waiting for motivation and start building momentum.
        </p>

        <div className="mt-12 flex flex-col items-center gap-4">
          <Link to="/auth">
            <Button size="lg" className="bg-gradient-primary px-10 text-lg text-primary-foreground shadow-glow hover:opacity-90">
              Start Your Free Sprint
            </Button>
          </Link>

          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <Play className="h-4 w-4" /> Or, watch the 2-minute demo
          </Button>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <span>14-day free trial.</span>
          <span>No credit card required.</span>
          <span>A new outcome is just one sprint away.</span>
        </div>
      </section>
    </div>
  );
}
