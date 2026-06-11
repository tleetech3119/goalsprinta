import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, XCircle, Zap } from "lucide-react";

export const Route = createFileRoute("/why")({
  head: () => ({
    meta: [
      { title: "Why Goal Sprinta — The Problem and the Fix" },
      { name: "description", content: "Why goals fade — and the sprint-based system that finally closes the gap between ambition and follow-through." },
      { property: "og:title", content: "Why Goal Sprinta — The Problem and the Fix" },
      { property: "og:description", content: "Your ambition isn't the problem. Your system is. Here's the fix." },
    ],
  }),
  component: WhyPage,
});

const comparison = [
  { before: "Vague, year-long resolutions that feel impossible", after: "Clear, actionable two-week sprints" },
  { before: "Motivation dies after a few weeks", after: "Daily wins and visible progress build momentum" },
  { before: "No clear way to see if you're on track", after: "Concrete milestones show your exact progress" },
  { before: "Progress feels like a grind with no reward", after: "Built-in rewards you set for yourself" },
  { before: "A cycle of procrastination, guilt, and failure", after: "A system of focus, action, and accomplishment" },
];

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

      <article className="container mx-auto max-w-3xl px-6 pb-24 pt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Problem &amp; Solution</p>
        <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">The &quot;Someday&quot; Trap</h1>

        <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            Another new notebook. Another burst of January 1st motivation. You write down the big ones:
            &quot;Launch the side business,&quot; &quot;Lose 20 pounds,&quot; &quot;Finally write that book.&quot; The ambition feels
            electric. You map out a few steps, tell a friend, and feel like this time—this time—will be
            different. You have the desire. You have the goal. What could possibly go wrong?
          </p>
          <p>
            A few weeks pass. Life happens. A deadline at work, a sick kid, a week of bad sleep. The
            perfect plan gets disrupted. The daily check-ins stop. The notebook gathers dust on your
            nightstand. That electric ambition is replaced by a low hum of guilt. The goal, once a source
            of excitement, now feels like a monumental burden. It&apos;s not that you stopped wanting it.
            It&apos;s that the path from here to there became a fog, and you lost your way.
          </p>
          <p>
            This isn&apos;t just about one failed goal. It&apos;s a pattern that erodes the most important thing
            you have: trust in yourself. You start to second-guess your own ability to follow through.
            You set smaller, safer goals to avoid the familiar sting of disappointment. Or worse, you
            stop setting meaningful goals altogether.
          </p>
          <p className="font-display text-2xl font-semibold text-foreground">
            Your ambition isn&apos;t the problem. Your system is.
          </p>
        </div>

        <div className="mt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">The Fix</p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-4xl">
            From overwhelmed to <span className="bg-gradient-primary bg-clip-text text-transparent">&apos;done&apos;</span> in two-week sprints
          </h2>

          <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              Imagine a system that doesn&apos;t rely on finite willpower. A system that embraces the
              messiness of real life and is designed to build momentum, not break when you have an off
              day. That system is Goal Sprinta. We&apos;ve adapted the hyper-effective &quot;sprint&quot;
              methodology used by the world&apos;s best tech companies and applied it to the most important
              project of all: your life.
            </p>
            <p>
              Instead of staring at a massive, year-long goal, you focus on a single, achievable
              objective for the next two weeks. You define clear milestones, track your progress
              visually, and build a chain of small, satisfying wins. Goal Sprinta provides the
              structure to get you started, the motivation to keep you going, and the rewards to make
              the process feel as good as the outcome.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-card/60 p-6 shadow-card md:p-8">
          <div className="hidden grid-cols-[1fr_auto_1fr] gap-4 md:grid">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Before: Winging It</div>
            <div />
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">After: With Goal Sprinta</div>
          </div>
          <div className="mt-4 space-y-4">
            {comparison.map((row, i) => (
              <div
                key={i}
                className="grid gap-3 rounded-xl border border-border bg-background/60 p-4 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-4 md:border-0 md:bg-transparent md:p-0"
              >
                <div className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground/60" />
                  <span className="text-sm text-muted-foreground md:text-base">{row.before}</span>
                </div>
                <div className="hidden md:block" />
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm font-medium text-foreground md:text-base">{row.after}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link to="/steps">
            <Button size="lg" className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
              See the 3 steps
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
