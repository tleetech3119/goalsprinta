import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Calendar,
  CheckCircle,
  KanbanSquare,
  Sparkles,
  Target,
  Trophy,
  XCircle,
  Zap,
  FileText,
  CheckSquare,
  Cloud,
  Mail,
  Clock,
  Puzzle,
  Rocket,
  ListChecks,
  CalendarClock,
  Brain,
  Gift,
  LineChart,
  Check,
  X,
  Shield,
  ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Goal Sprinta | Achieve your goals, one sprint at a time." },
      {
        name: "description",
        content:
          "Tired of setting goals and giving up? Goal Sprinta uses a structured sprint system to break down big ambitions, build momentum, and finally get things done.",
      },
      { property: "og:title", content: "Stop Procrastinating. Start Finishing." },
      {
        property: "og:description",
        content:
          "Goal Sprinta helps you turn your biggest ambitions into manageable sprints so you can finally achieve your goals.",
      },
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

const features = [
  {
    icon: Rocket,
    tag: "Sprint-Based Goal Setting",
    title: "Break Down Big Ambitions",
    body: "Stop letting the size of your goal intimidate you. Our framework helps you deconstruct your biggest ambitions into focused, two-week sprints — transforming overwhelming dreams into a concrete plan you can start today.",
  },
  {
    icon: ListChecks,
    tag: "Milestone Tracking",
    title: "See Your Progress Daily",
    body: "Vague progress is a motivation killer. Add specific, measurable milestones to every sprint and drag them from “To-Do” to “Done” for visible, psychological wins that prove you're making real headway.",
  },
  {
    icon: CalendarClock,
    tag: "Dynamic Sprint Management",
    title: "Stay Flexible, Stay Focused",
    body: "Life is unpredictable. Finish early and start the next sprint. Hit a roadblock and easily extend. Our system is designed for the real world, so you adapt without ever feeling like a failure.",
  },
  {
    icon: Brain,
    tag: "Daily Affirmations",
    title: "Build an Unbeatable Mindset",
    body: "The battle for your goals is won in your mind. Get a personalized affirmation each morning tied to your current goal — a small ritual that cultivates the self-belief needed to stay focused.",
  },
  {
    icon: Gift,
    tag: "Personal Reward System",
    title: "The 'Done' Is Just The Beginning",
    body: "Hard work deserves a real reward. Set custom rewards for completing sprints and hitting major goals. Tying tangible rewards to progress hardwires your brain to associate achievement with positive reinforcement.",
  },
  {
    icon: LineChart,
    tag: "Progress Analytics",
    title: "Know Exactly How You're Doing",
    body: "Go beyond feeling productive. See your sprint completion rate, average time-to-milestone, and progress over time. Spot patterns, double down on what works, and master your own productivity.",
  },
];

const comparisonMatrix = [
  { criteria: "Sprint-Based Structure", manual: false, todo: false, sprinta: "Focused, 14-day cycles for maximum momentum." },
  { criteria: "Long-Term Goal Linking", manual: false, todo: false, sprinta: "Every sprint is tied to a larger mission." },
  { criteria: "Visual Progress Tracking", manual: false, todo: true, sprinta: "Milestone boards and completion graphs that motivate." },
  { criteria: "Built-In Reward System", manual: false, todo: false, sprinta: "Custom rewards hardwire good habits." },
  { criteria: "Daily Motivation Support", manual: false, todo: false, sprinta: "Personalized affirmations and reminders." },
  { criteria: "Dynamic Adjustments", manual: false, todo: false, sprinta: "Extend or end sprints early to fit real life." },
  { criteria: "Analytics & Insights", manual: false, todo: false, sprinta: "Data on completion rates and velocity." },
  { criteria: "Designed for Goal-Setting", manual: false, todo: false, sprinta: "Every feature is purpose-built for achievement." },
];

const faqs = [
  {
    q: "What's the difference between a goal and a sprint?",
    a: "A goal is your big, long-term objective — the “what.” A sprint is the short, two-week block of focused work you do to get there — the “how.” You might have a goal to “Write a novel,” and your first sprint might be to “Outline the first three chapters.” Sprints are the building blocks that make your big goals achievable.",
  },
  {
    q: "Can I use Goal Sprinta for professional goals, or just personal ones?",
    a: "Both! Goal Sprinta is designed for any objective that requires focus and consistency. Many users manage career goals, sales targets, and team projects alongside personal goals for fitness, learning, and side hustles. The Pro plan is perfect for managing both areas of your life in one place.",
  },
  {
    q: "How does the reward system work?",
    a: "When you create a goal or sprint, you define your own reward for completing it — a new book, a takeout meal, an afternoon off. Once you mark it complete, the app prompts you to claim your reward, creating a positive feedback loop that makes achievement feel great.",
  },
  {
    q: "Is my data secure?",
    a: "Absolutely. All data is encrypted in transit and at rest using AES-256, the same standard used by banks and governments. Our infrastructure is hosted on AWS, and we are fully GDPR and CCPA compliant.",
  },
  {
    q: "What if I don't complete a sprint in time?",
    a: "That's okay — life happens. You can easily extend your sprint by a few days. The goal is progress, not perfection. The system helps you get back on track quickly without guilt.",
  },
  {
    q: "Can I collaborate with others on goals?",
    a: "Yes. Our Business plan is built for collaboration. Create shared goals and sprints, assign milestones, and track collective progress from a central dashboard.",
  },
  {
    q: "Do you have a mobile app?",
    a: "Yes — Goal Sprinta is available on iOS and Android, and your progress is seamlessly synced across all devices.",
  },
  {
    q: "What integrations do you support?",
    a: "Native integrations with Google Calendar, Outlook, and Slack, plus a Zapier integration that connects Goal Sprinta to thousands of other apps like Notion, Asana, and Google Drive.",
  },
  {
    q: "How is Goal Sprinta different from a simple to-do list app?",
    a: "To-do lists are great for simple tasks but fail at long-term goals. Goal Sprinta connects your daily actions (milestones) to your weekly objectives (sprints) and your ultimate life goals (missions).",
  },
  {
    q: "What's your refund policy?",
    a: "We offer a no-questions-asked, 14-day money-back guarantee on all paid plans. Just send us a message and we'll issue a full refund immediately.",
  },
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

      {/* HERO */}
      <section className="container mx-auto px-6 pt-16 pb-24 text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> Built for goal-getters
        </div>
        <h1 className="mx-auto mt-8 max-w-3xl text-4xl font-bold leading-[1.05] md:text-6xl">
          Achieve your goals,<br /><span className="bg-gradient-primary bg-clip-text text-transparent">one sprint at a time.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Goal Sprinta is the structured goal-setting app for ambitious individuals who want to finally stop procrastinating and start achieving their biggest life goals.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/auth"><Button size="lg" className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">Start Your Free Sprint</Button></Link>
          <a href="#how"><Button size="lg" variant="outline">Watch a 2-minute demo</Button></a>
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

      {/* PROBLEM + SOLUTION */}
      <section id="problem-solution" className="scroll-mt-16 border-t border-border bg-card/20">
        <article className="container mx-auto max-w-3xl px-6 py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Problem</p>
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
              stop setting meaningful goals altogether. The gap between the person you are and the person
              you know you could be gets wider every year, all because you&apos;re missing a system to bridge it.
            </p>
            <p className="font-display text-2xl font-semibold text-foreground">
              Your ambition isn&apos;t the problem. Your system is.
            </p>
          </div>

          <div className="mt-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Solution</p>
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
                visually, and build a chain of small, satisfying wins. This momentum is the rocket fuel
                for achievement. Goal Sprinta provides the structure to get you started, the motivation
                to keep you going, and the rewards to make the process feel as good as the outcome.
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
        </article>
      </section>

      {/* HOW IT WORKS */}
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
        </article>
      </section>

      {/* FEATURES */}
      <section id="features" className="scroll-mt-16 border-t border-border">
        <article className="container mx-auto max-w-6xl px-6 py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Features</p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            Everything you need to <span className="bg-gradient-primary bg-clip-text text-transparent">finish what you start</span>
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-border bg-card/60 p-6 shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-hero text-primary-foreground">
                  <f.icon className="h-5 w-5" />
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-primary">{f.tag}</p>
                <h3 className="mt-2 font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      {/* INTEGRATIONS */}
      <section id="integrations" className="scroll-mt-16 border-t border-border bg-card/20">
        <article className="container mx-auto max-w-3xl px-6 py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Integration</p>
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

      {/* COMPARISON */}
      <section id="comparison" className="scroll-mt-16 border-t border-border">
        <article className="container mx-auto max-w-5xl px-6 py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Comparison</p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            There&apos;s a better way than <span className="bg-gradient-primary bg-clip-text text-transparent">&apos;winging it.&apos;</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Stop fighting a broken process. See how Goal Sprinta&apos;s dedicated system stacks up against makeshift solutions and generic task managers.
          </p>

          <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-card/60 shadow-card">
            <div className="grid grid-cols-[1.4fr_0.8fr_0.8fr_1.6fr] gap-2 border-b border-border bg-background/60 px-4 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground md:px-6">
              <div>Criteria</div>
              <div className="text-center">Manual</div>
              <div className="text-center">To-Do Apps</div>
              <div className="text-primary">Goal Sprinta</div>
            </div>
            {comparisonMatrix.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-[1.4fr_0.8fr_0.8fr_1.6fr] items-center gap-2 border-b border-border/60 px-4 py-4 last:border-0 md:px-6"
              >
                <div className="text-sm font-medium">{row.criteria}</div>
                <div className="flex justify-center">
                  {row.manual ? <Check className="h-5 w-5 text-primary" /> : <X className="h-5 w-5 text-muted-foreground/50" />}
                </div>
                <div className="flex justify-center">
                  {row.todo ? <Check className="h-5 w-5 text-primary" /> : <X className="h-5 w-5 text-muted-foreground/50" />}
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{row.sprinta}</span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      {/* PRICING TEASER */}
      <section id="pricing" className="scroll-mt-16 border-t border-border bg-card/20">
        <article className="container mx-auto max-w-3xl px-6 py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Pricing</p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            A plan for <span className="bg-gradient-primary bg-clip-text text-transparent">every ambition.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Whether you&apos;re tackling your first big project or leading a team toward ambitious targets, there&apos;s a Goal Sprinta plan for you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/pricing">
              <Button size="lg" className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
                See all plans
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline">
                Start for free
              </Button>
            </Link>
          </div>
        </article>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-16 border-t border-border">
        <article className="container mx-auto max-w-3xl px-6 py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">FAQ</p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            Frequently asked <span className="bg-gradient-primary bg-clip-text text-transparent">questions</span>
          </h2>

          <Accordion type="single" collapsible className="mt-10">
            {faqs.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-medium">{item.q}</AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </article>
      </section>

      {/* GUARANTEE */}
      <section id="guarantee" className="scroll-mt-16 border-t border-border bg-card/20">
        <article className="container mx-auto max-w-3xl px-6 py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our Guarantee</p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            Our &apos;Finish Your First Goal&apos; <span className="bg-gradient-primary bg-clip-text text-transparent">Guarantee</span>
          </h2>

          <div className="mt-8 rounded-2xl border border-border bg-card/60 p-6 shadow-card md:p-10">
            <div className="flex items-start gap-4">
              <ShieldCheck className="mt-1 h-8 w-8 shrink-0 text-primary" />
              <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
                <p>
                  I created Goal Sprinta because I was tired of the cycle of excitement and disappointment. I had a graveyard of half-finished projects and abandoned goals, and I knew the problem wasn&apos;t a lack of desire — it was a lack of a system. This app is the system that changed everything for me.
                </p>
                <p>
                  That&apos;s why I&apos;m confident making this promise: Sign up for Goal Sprinta Pro today. Pick one meaningful goal you&apos;ve struggled with. Follow the system and complete three two-week sprints. If, after those six weeks, you don&apos;t feel more focused, more in control, and more accomplished than ever before — if you don&apos;t see tangible progress on your goal — I&apos;ll refund every penny. Just email me personally. Your progress is our only metric for success.
                </p>
                <p className="font-display text-base font-semibold text-foreground">
                  — Tanisha Goins, Founder of Goal Sprinta
                </p>
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* FINAL CTA */}
      <section className="scroll-mt-16 border-t border-border">
        <article className="container mx-auto max-w-3xl px-6 py-24 text-center">
          <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">
            How many more <span className="bg-gradient-primary bg-clip-text text-transparent">&apos;somedays&apos;</span> can you afford?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            The life you want is on the other side of a finished goal. The book won&apos;t write itself. The business won&apos;t launch itself. Stop waiting for motivation and start building momentum.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
                Start Your Free Sprint
              </Button>
            </Link>
            <a href="#how"><Button size="lg" variant="outline">Watch the 2-minute demo</Button></a>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            A new outcome is just one sprint away.
          </p>
        </article>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-card/30">
        <div className="container mx-auto flex flex-col items-center gap-10 px-6 py-16">
          <div className="w-full max-w-xl rounded-2xl border border-border bg-card/60 p-6 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">The Weekly Sprint</p>
            <h3 className="mt-2 font-display text-xl font-semibold">Actionable goal-setting in your inbox</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Productivity tips from our founder, delivered every Tuesday.
            </p>
            <form className="mt-4 flex flex-col gap-2 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
              <Button type="submit" className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
                Subscribe
              </Button>
            </form>
            <p className="mt-3 text-xs text-muted-foreground">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>

          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-xs text-muted-foreground">
            <Shield className="h-3.5 w-3.5 text-primary" />
            <span>SOC 2 Type II Certified</span><span>·</span>
            <span>GDPR Compliant</span><span>·</span>
            <span>CCPA Ready</span><span>·</span>
            <span>AES-256 Encryption</span><span>·</span>
            <span>Hosted on AWS</span>
          </p>
        </div>
      </footer>

    </div>
  );
}
