import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, XCircle, Zap } from "lucide-react";

export const Route = createFileRoute("/how")({
  head: () => ({
    meta: [
      { title: "How Goal Sprinta Works — From Overwhelmed to Done" },
      { name: "description", content: "Goal Sprinta adapts the sprint methodology to your life. Focused two-week goals, clear milestones, and built-in rewards." },
      { property: "og:title", content: "How Goal Sprinta Works — From Overwhelmed to Done" },
      { property: "og:description", content: "Trade vague hopes for a concrete plan with two-week sprints." },
    ],
  }),
  component: HowPage,
});

const comparison = [
  {
    before: "Vague, year-long resolutions that feel impossible",
    after: "Clear, actionable two-week sprints",
  },
  {
    before: "Motivation dies after a few weeks",
    after: "Daily wins and visible progress build momentum",
  },
  {
    before: "No clear way to see if you're on track",
    after: "Concrete milestones show your exact progress",
  },
  {
    before: "Progress feels like a grind with no reward",
    after: "Built-in rewards you set for yourself",
  },
  {
    before: "A cycle of procrastination, guilt, and failure",
    after: "A system of focus, action, and accomplishment",
  },
];

function HowPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto flex items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground"><Zap className="h-4 w-4" /></span>
          Goal Sprinta
        </Link>
        <Link to="/why"><Button variant="ghost"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Why</Button></Link>
      </header>

      <article className="container mx-auto max-w-3xl px-6 pb-24 pt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Solution Reveal</p>
        <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
          From Overwhelmed to <span className="bg-gradient-primary bg-clip-text text-transparent">&apos;Done&apos;</span> in Two-Week Sprints
        </h1>

        <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            Imagine a system that doesn&apos;t rely on finite willpower. A system that embraces the messiness
            of real life and is designed to build momentum, not break when you have an off day. That system
            is Goal Sprinta. We&apos;ve adapted the hyper-effective &quot;sprint&quot; methodology used by the
            world&apos;s best tech companies and applied it to the most important project of all: your life.
          </p>
          <p>
            Instead of staring at a massive, year-long goal, you focus on a single, achievable objective
            for the next two weeks. You define clear milestones, track your progress visually, and build
            a chain of small, satisfying wins. This momentum is the rocket fuel for achievement. Goal Sprinta
            provides the structure to get you started, the motivation to keep you going, and the rewards
            to make the process feel as good as the outcome. It&apos;s time to trade vague hopes for a concrete plan.
          </p>
        </div>

        <div className="mt-14 rounded-2xl border border-border bg-card/60 p-6 shadow-card md:p-8">
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
