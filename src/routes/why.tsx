import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap } from "lucide-react";

export const Route = createFileRoute("/why")({
  head: () => ({
    meta: [
      { title: "Why Goal Sprinta — Escape the 'Someday' Trap" },
      { name: "description", content: "Your ambition isn't the problem — your system is. Here's why goals fade and how Goal Sprinta closes the gap." },
      { property: "og:title", content: "Why Goal Sprinta — Escape the 'Someday' Trap" },
      { property: "og:description", content: "Your ambition isn't the problem — your system is." },
    ],
  }),
  component: WhyPage,
});

function WhyPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto flex items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground"><Zap className="h-4 w-4" /></span>
          Goal Sprinta
        </Link>
        <Link to="/"><Button variant="ghost"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button></Link>
      </header>

      <article className="container mx-auto max-w-2xl px-6 pb-24 pt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Problem Agitation</p>
        <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">The "Someday" Trap</h1>

        <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            Another new notebook. Another burst of January 1st motivation. You write down the big ones:
            "Launch the side business," "Lose 20 pounds," "Finally write that book." The ambition feels
            electric. You map out a few steps, tell a friend, and feel like this time—this time—will be
            different. You have the desire. You have the goal. What could possibly go wrong?
          </p>
          <p>
            A few weeks pass. Life happens. A deadline at work, a sick kid, a week of bad sleep. The
            perfect plan gets disrupted. The daily check-ins stop. The notebook gathers dust on your
            nightstand. That electric ambition is replaced by a low hum of guilt. The goal, once a source
            of excitement, now feels like a monumental burden. It's not that you stopped wanting it.
            It's that the path from here to there became a fog, and you lost your way.
          </p>
          <p>
            This isn't just about one failed goal. It's a pattern that erodes the most important thing
            you have: trust in yourself. You start to second-guess your own ability to follow through.
            You set smaller, safer goals to avoid the familiar sting of disappointment. Or worse, you
            stop setting meaningful goals altogether. The gap between the person you are and the person
            you know you could be gets wider every year, all because you're missing a system to bridge it.
          </p>
          <p className="font-display text-2xl font-semibold text-foreground">
            Your ambition isn't the problem. Your system is.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link to="/how">
            <Button size="lg" className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
              See the solution
            </Button>
          </Link>
          <Link to="/">
            <Button size="lg" variant="outline">Back to home</Button>
          </Link>
        </div>
      </article>
    </div>
  );
}
