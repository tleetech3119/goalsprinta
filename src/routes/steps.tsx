import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap, Target, KanbanSquare, Trophy } from "lucide-react";

export const Route = createFileRoute("/steps")({
  head: () => ({
    meta: [
      { title: "How It Works — 3 Steps to Any Goal | Goal Sprinta" },
      { name: "description", content: "Goal Sprinta turns overwhelming ambitions into a simple, repeatable 3-step process: define, sprint, and repeat." },
      { property: "og:title", content: "How It Works — 3 Steps to Any Goal | Goal Sprinta" },
      { property: "og:description", content: "Stop staring at the mountain. Start taking the first step." },
    ],
  }),
  component: StepsPage,
});

const steps = [
  {
    num: "01",
    icon: Target,
    title: "Define Your Mission",
    body: "First, set your big-picture goal. This is your North Star — the 'what' and 'why' behind your ambition. Whether it's running a marathon or launching a new product, Goal Sprinta helps you clarify the final destination so you never lose sight of what you're working toward.",
    hint: "A clean input screen with prompts for 'Goal Name,' 'Target Completion Date,' and 'Why does this goal matter to you?'",
  },
  {
    num: "02",
    icon: KanbanSquare,
    title: "Launch Your First Sprint",
    body: "Break off a small piece of your big goal and plan your first two-week sprint. What can you realistically accomplish in the next 14 days? Add specific, measurable milestones that will move you forward. This isn't about doing everything at once; it's about making meaningful, focused progress.",
    hint: "A Kanban-style board showing a 'Sprint Backlog' column where the user is dragging 'Milestone' cards into the 'Current Sprint' column.",
  },
  {
    num: "03",
    icon: Trophy,
    title: "Track, Reward, Repeat",
    body: "Check in daily, move your milestones from 'To Do' to 'Done,' and watch your progress bar fill up. When your sprint is complete, claim the personal reward you set for yourself — a guilt-free night off, a new gadget, whatever fuels you. Then, plan your next sprint. Each cycle builds on the last, creating unstoppable momentum.",
    hint: "A dashboard view showing a completed sprint with a '100% Complete!' message and a prominent 'Claim Your Reward' button glowing.",
  },
];

function StepsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto flex items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground"><Zap className="h-4 w-4" /></span>
          Goal Sprinta
        </Link>
        <Link to="/how"><Button variant="ghost"><ArrowLeft className="mr-2 h-4 w-4" /> Back to How</Button></Link>
      </header>

      <article className="container mx-auto max-w-3xl px-6 pb-24 pt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">How It Works</p>
        <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
          Achieve Any Goal in <span className="bg-gradient-primary bg-clip-text text-transparent">3 Simple Steps</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Stop staring at the mountain. Start taking the first step. Goal Sprinta turns overwhelming ambitions into a simple, repeatable process.
        </p>

        <div className="mt-14 space-y-10">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="relative rounded-2xl border border-border bg-card/60 p-6 shadow-card md:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="font-display text-sm font-bold text-primary">{step.num}</span>
                <step.icon className="h-5 w-5 text-primary" />
                <h2 className="font-display text-xl font-semibold md:text-2xl">{step.title}</h2>
              </div>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {step.body}
              </p>
              <div className="mt-5 rounded-xl border border-dashed border-border bg-background/50 px-4 py-3 text-xs italic text-muted-foreground/70">
                UI preview: {step.hint}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-gradient-hero p-8 text-center shadow-glow">
          <h3 className="font-display text-2xl font-bold">Ready to sprint?</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Join thousands turning big dreams into daily wins. Your first sprint is free.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
                Start your first sprint — free
              </Button>
            </Link>
            <Link to="/">
              <Button size="lg" variant="outline">Back to home</Button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
