import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, KanbanSquare, Sparkles, Target, Trophy, XCircle, Zap, FileText, CheckSquare, Cloud, Mail, Clock, Puzzle } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Goal Sprinta — Achieve your goals, one sprint at a time" },
      { name: "description", content: "Break big goals into bite-sized sprints, track milestones, reward yourself, and build unstoppable momentum." },
    ],
  }),
  component: Landing,
});

const comparison = [
  { before: "Vague, year-long resolutions that feel impossible", after: "Clear, actionable two-week sprints" },
  { before: "Motivation dies after a few weeks", after: "Daily wins and visible progress build momentum" },
  { before: "No clear way to see if you're on track", after: "Concrete milestones show your exact progress" },
  { before: "Progress feels like a grind with no reward", after: "Built-in rewards you set for yourself" },
  { before: "A cycle of procrastination, guilt, and failure", after: "A system of focus, action, and accomplishment" },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2.5 font-display text-2xl font-bold">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-primary text-primary-foreground"><Zap className="h-5 w-5" /></span>
          Goal Sprinta
        </div>
        <Link to="/auth"><Button variant="ghost">Sign in</Button></Link>
      </header>

      <section className="container mx-auto px-6 pt-16 pb-24 text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> Built for goal-getters
        </div>
        <h1 className="mx-auto mt-8 max-w-3xl text-4xl font-bold leading-[1.05] md:text-5xl">
          Achieve your goals,<br /><span className="bg-gradient-primary bg-clip-text text-transparent">one sprint at a time.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          Break big dreams into focused sprints, track milestones that matter, and reward every win. Momentum, on purpose.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/auth"><Button size="lg" className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">Start sprinting — free</Button></Link>
          <a href="#how"><Button size="lg" className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">How this works</Button></a>
        </div>
        <div className="mt-3 flex justify-center">
          <Link to="/pricing"><Button size="lg" className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">Pricing</Button></Link>
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

      <section id="problem-solution" className="scroll-mt-16 border-t border-border bg-card/20">
        <article className="container mx-auto max-w-3xl px-6 py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Problem &amp; Solution</p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">The &quot;Someday&quot; Trap</h2>

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
            <h3 className="mt-4 font-display text-3xl font-bold leading-tight md:text-4xl">
              From overwhelmed to <span className="bg-gradient-primary bg-clip-text text-transparent">&apos;done&apos;</span> in two-week sprints
            </h3>

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
            <Link to="/auth">
              <Button size="lg" variant="outline">Start sprinting — free</Button>
            </Link>
          </div>
        </article>
      </section>

      <section id="integrations" className="scroll-mt-16 border-t border-border bg-card/20">
        <article className="container mx-auto max-w-3xl px-6 py-24">
          
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            Works With <span className="bg-gradient-primary bg-clip-text text-transparent">Your Life</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Connects with the tools you already use to run your life. No need to change your workflow — just make it more powerful.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { name: "Google Calendar", icon: Calendar },
              { name: "Slack", icon: Zap },
              { name: "Notion", icon: FileText },
              { name: "Todoist", icon: CheckSquare },
              { name: "Zapier", icon: Puzzle },
              { name: "Google Drive", icon: Cloud },
              { name: "Outlook Calendar", icon: Mail },
              { name: "iCal", icon: Clock },
            ].map((item) => (
              <div
                key={item.name}
                className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card/60 p-6 text-center shadow-card"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-hero text-primary-foreground">
                  <item.icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium">{item.name}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              Goal Sprinta fits seamlessly into your existing digital life. Automatically sync sprint deadlines to your calendar, get milestone reminders in Slack, or connect to thousands of other apps with Zapier.
            </p>
            <p>
              Whether you plan in Notion, manage tasks in Todoist, or live by your Outlook Calendar, your sprints stay in sync. Everything stays connected so you can focus on moving forward, not managing another tool.
            </p>
          </div>
        </article>
      </section>

      <section id="how" className="scroll-mt-16 border-t border-border bg-card/20">
        <article className="container mx-auto max-w-3xl px-6 py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">How It Works</p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            Achieve Any Goal in <span className="bg-gradient-primary bg-clip-text text-transparent">3 Simple Steps</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Stop staring at the mountain. Start taking the first step. Goal Sprinta turns overwhelming ambitions into a simple, repeatable process.
          </p>

          <div className="mt-14 space-y-10">
            <div className="relative rounded-2xl border border-border bg-card/60 p-6 shadow-card md:p-8">
              <div className="flex items-center gap-3">
                <span className="font-display text-sm font-bold text-primary">01</span>
                <Target className="h-5 w-5 text-primary" />
                <h3 className="font-display text-xl font-semibold md:text-2xl">Define Your Mission</h3>
              </div>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                First, set your big-picture goal. This is your North Star — the &#39;what&#39; and &#39;why&#39; behind your ambition. Whether it&#39;s running a marathon or launching a new product, Goal Sprinta helps you clarify the final destination so you never lose sight of what you&#39;re working toward.
              </p>
            </div>

            <div className="relative rounded-2xl border border-border bg-card/60 p-6 shadow-card md:p-8">
              <div className="flex items-center gap-3">
                <span className="font-display text-sm font-bold text-primary">02</span>
                <KanbanSquare className="h-5 w-5 text-primary" />
                <h3 className="font-display text-xl font-semibold md:text-2xl">Launch Your First Sprint</h3>
              </div>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Break off a small piece of your big goal and plan your first two-week sprint. What can you realistically accomplish in the next 14 days? Add specific, measurable milestones that will move you forward. This isn&#39;t about doing everything at once; it&#39;s about making meaningful, focused progress.
              </p>
            </div>

            <div className="relative rounded-2xl border border-border bg-card/60 p-6 shadow-card md:p-8">
              <div className="flex items-center gap-3">
                <span className="font-display text-sm font-bold text-primary">03</span>
                <Trophy className="h-5 w-5 text-primary" />
                <h3 className="font-display text-xl font-semibold md:text-2xl">Track, Reward, Repeat</h3>
              </div>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Check in daily, move your milestones from &#39;To Do&#39; to &#39;Done,&#39; and watch your progress bar fill up. When your sprint is complete, claim the personal reward you set for yourself — a guilt-free night off, a new gadget, whatever fuels you. Then, plan your next sprint. Each cycle builds on the last, creating unstoppable momentum.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
                Start sprinting — free
              </Button>
            </Link>
            <Link to="/steps">
              <Button size="lg" variant="outline">Read more about the steps</Button>
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
}
