import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Rocket,
  ListChecks,
  CalendarRange,
  Sparkles,
  Gift,
  LineChart,
  Check,
  X,
  Star,
  ShieldCheck,
  Zap,
  PlayCircle,
  ArrowRight,
  Lock,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Goal Sprinta | The Goal Setting App That Actually Works" },
      {
        name: "description",
        content:
          "Tired of setting goals and giving up? Goal Sprinta uses a structured sprint system to break down big ambitions, build momentum, and finally get things done.",
      },
      { property: "og:title", content: "Stop Procrastinating. Start Finishing." },
      {
        property: "og:description",
        content:
          "Goal Sprinta helps you turn your biggest ambitions into manageable two-week sprints so you can finally achieve your goals.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Goal Sprinta",
          applicationCategory: "ProductivityApplication",
          operatingSystem: "Web, iOS, Android",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            ratingCount: "50000",
          },
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }),
      },
    ],
  }),
  component: Landing,
});

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`container mx-auto px-6 py-20 sm:py-28 ${className}`}>
      {children}
    </section>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="container mx-auto flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2 font-display text-xl font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
            <Zap className="h-4 w-4" />
          </span>
          Goal Sprinta
        </div>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground">How it works</a>
          <a href="#features" className="hover:text-foreground">Features</a>
          <a href="#pricing" className="hover:text-foreground">Pricing</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/auth"><Button variant="ghost">Sign in</Button></Link>
          <Link to="/auth" className="hidden sm:inline-flex">
            <Button className="bg-gradient-primary text-primary-foreground shadow-glow">Start free</Button>
          </Link>
        </div>
      </header>

      {/* HERO */}
      <Section className="pt-10 text-center sm:pt-16">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> Trusted by 50,000+ achievers
        </div>
        <h1 className="mx-auto mt-8 max-w-4xl text-5xl font-bold leading-[1.05] md:text-6xl lg:text-7xl">
          Stop trying.{" "}
          <span className="bg-gradient-primary bg-clip-text text-transparent">Start finishing.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Goal Sprinta is the structured goal-setting app for ambitious individuals who want to finally
          stop procrastinating and start achieving their biggest life goals.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/auth">
            <Button size="lg" className="bg-gradient-primary text-primary-foreground shadow-glow">
              Start Your Free Sprint <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Button size="lg" variant="outline">
            <PlayCircle className="mr-2 h-4 w-4" /> Watch a 2-minute demo
          </Button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">14-day free trial. No credit card required.</p>

        <div className="mx-auto mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><Star className="h-3.5 w-3.5 text-primary" /> 4.9/5 on App Store & Google Play</span>
          <span>Featured in Fast Company, Forbes, Lifehacker</span>
          <span className="inline-flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-primary" /> AES-256 bank-level encryption</span>
        </div>

        {/* 3 Steps */}
        <div className="mx-auto mt-16 max-w-5xl text-left">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">Achieve Any Goal in 3 Simple Steps</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            Stop staring at the mountain. Start taking the first step. Goal Sprinta turns overwhelming ambitions into a simple, repeatable process.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                n: "01",
                t: "Define Your Mission",
                d: "Set your big-picture goal. This is your North Star—the “what” and “why” behind your ambition.",
              },
              {
                n: "02",
                t: "Launch Your First Sprint",
                d: "Break off a small piece and plan your first two-week sprint with specific, measurable milestones.",
              },
              {
                n: "03",
                t: "Track, Reward, Repeat",
                d: "Check in daily, finish strong, claim your reward, and plan the next sprint. Momentum compounds.",
              },
            ].map((s) => (
              <Card key={s.n} className="border-border bg-card p-6 shadow-card">
                <span className="font-display text-3xl font-bold text-primary">{s.n}</span>
                <h3 className="mt-4 text-xl font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* PROBLEM */}
      <Section className="max-w-3xl">
        <h2 className="text-3xl font-bold sm:text-4xl">The 'Someday' Trap</h2>
        <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground">
          <p>Another new notebook. Another burst of January 1st motivation. You write down the big ones: “Launch the side business,” “Lose 20 pounds,” “Finally write that book.” The ambition feels electric. You map out a few steps, tell a friend, and feel like this time—this time—will be different.</p>
          <p>A few weeks pass. Life happens. A deadline at work, a sick kid, a week of bad sleep. The perfect plan gets disrupted. The daily check-ins stop. The notebook gathers dust on your nightstand. That electric ambition is replaced by a low hum of guilt.</p>
          <p>This isn't just about one failed goal. It's a pattern that erodes the most important thing you have: trust in yourself. You start setting smaller, safer goals to avoid the familiar sting of disappointment. The gap between the person you are and the person you could be widens every year.</p>
          <p className="text-xl font-semibold text-foreground">Your ambition isn't the problem. Your system is.</p>
        </div>
      </Section>

      {/* SOLUTION */}
      <Section className="max-w-5xl">
        <h2 className="text-3xl font-bold sm:text-4xl">From Overwhelmed to ‘Done’ in Two-Week Sprints</h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">
          We've adapted the hyper-effective “sprint” methodology used by the world's best tech companies and applied it
          to the most important project of all: your life.
        </p>
        <div className="mt-10 overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr>
                <th className="p-4 text-left font-semibold">Before: Winging It</th>
                <th className="p-4 text-left font-semibold text-primary">After: With Goal Sprinta</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Vague, year-long resolutions that feel impossible", "Clear, actionable two-week sprints"],
                ["Motivation dies after a few weeks", "Daily wins and visible progress build momentum"],
                ["No clear way to see if you're on track", "Concrete milestones show your exact progress"],
                ["Progress feels like a grind with no reward", "Built-in rewards you set for yourself"],
                ["A cycle of procrastination, guilt, and failure", "A system of focus, action, and accomplishment"],
              ].map(([b, a]) => (
                <tr key={b} className="border-t border-border">
                  <td className="p-4 text-muted-foreground">{b}</td>
                  <td className="p-4">{a}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* FEATURES */}
      <Section id="features">
        <h2 className="max-w-2xl text-3xl font-bold sm:text-4xl">Every feature, purpose-built for finishing.</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Rocket, t: "Sprint-Based Goal Setting", h: "Break Down Big Ambitions", d: "Deconstruct your biggest ambitions into focused, two-week sprints — concrete actions you can start today." },
            { icon: ListChecks, t: "Milestone Tracking", h: "See Your Progress Daily", d: "Drag milestones from To-Do to Done for a visual win that keeps you engaged and proves real headway." },
            { icon: CalendarRange, t: "Dynamic Sprint Management", h: "Stay Flexible, Stay Focused", d: "Finish early, or extend a few days when life hits. Adapt without feeling like you failed." },
            { icon: Sparkles, t: "Daily Affirmations", h: "Build an Unbeatable Mindset", d: "Personalized affirmations tied to your current goal cultivate the self-belief to overcome obstacles." },
            { icon: Gift, t: "Personal Reward System", h: "Done Is Just the Beginning", d: "Tie tangible rewards to your progress and hardwire your brain to crave achievement." },
            { icon: LineChart, t: "Progress Analytics", h: "Know Exactly How You're Doing", d: "Sprint completion rate, time-to-milestone, velocity. Spot patterns and double down on what works." },
          ].map((f) => (
            <Card key={f.t} className="border-border bg-card p-6 shadow-card">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
                <f.icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">{f.t}</p>
              <h3 className="mt-1 text-lg font-semibold">{f.h}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* INTEGRATIONS */}
      <Section className="max-w-5xl text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">Connects with the tools you already use.</h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Sync sprint deadlines to your calendar, get milestone reminders in Slack, or connect to thousands of apps
          via Zapier.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
          {["Google Calendar", "Slack", "Notion", "Todoist", "Zapier", "Google Drive", "Outlook", "iCal"].map((n) => (
            <span key={n} className="rounded-lg border border-border bg-card px-4 py-2">{n}</span>
          ))}
        </div>
      </Section>

      {/* SOCIAL PROOF */}
      <Section>
        <div className="grid gap-4 rounded-2xl border border-border bg-card p-8 text-center shadow-card sm:grid-cols-3">
          {[
            ["87%", "Average goal completion rate"],
            ["1.25M+", "Sprints completed by users"],
            ["3×", "More likely to hit goals vs. no system"],
          ].map(([n, l]) => (
            <div key={l}>
              <p className="font-display text-4xl font-bold text-primary">{n}</p>
              <p className="mt-2 text-sm text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            { q: "I've tried every planner and to-do list app out there. Goal Sprinta is the first thing that's actually worked for my freelance business. I hit my Q2 goal 3 weeks early.", a: "Sarah K.", r: "Freelance Designer" },
            { q: "My main goal—‘finish dissertation’—is so massive it's paralyzing. Goal Sprinta helped me break it into ‘draft one chapter section’ sprints. It’s the only reason I’m still sane and on track.", a: "Ben T.", r: "PhD Candidate" },
            { q: "We use Goal Sprinta to track our marketing team's OKRs. We're shipping campaigns faster and morale is way up. Better than our clunky project management software.", a: "Maria G.", r: "Head of Marketing" },
            { q: "For years my goal was ‘get in shape.’ It never happened. My first sprint was ‘gym 3× this week.’ I did it. Rewarding myself with new running shoes after 4 sprints felt amazing.", a: "David L.", r: "Sales Executive" },
          ].map((t) => (
            <Card key={t.a} className="border-border bg-card p-6 shadow-card">
              <div className="flex gap-1 text-primary">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-4 text-base leading-relaxed">“{t.q}”</p>
              <p className="mt-4 text-sm font-semibold">{t.a}</p>
              <p className="text-xs text-muted-foreground">{t.r}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* COMPARISON */}
      <Section className="max-w-5xl">
        <h2 className="text-3xl font-bold sm:text-4xl">There's a better way than ‘winging it.’</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          See how Goal Sprinta's dedicated system stacks up against makeshift solutions and generic task managers.
        </p>
        <div className="mt-10 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr>
                <th className="p-4 text-left font-semibold">Criteria</th>
                <th className="p-4 text-center font-semibold">Manual</th>
                <th className="p-4 text-center font-semibold">Generic To-Do Apps</th>
                <th className="p-4 text-center font-semibold text-primary">Goal Sprinta</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Sprint-based structure", false, false, true],
                ["Long-term goal linking", false, false, true],
                ["Visual progress tracking", false, true, true],
                ["Built-in reward system", false, false, true],
                ["Daily motivation support", false, false, true],
                ["Dynamic sprint adjustments", false, false, true],
                ["Analytics & insights", false, false, true],
                ["Designed for goal-setting", false, false, true],
              ].map((row) => (
                <tr key={row[0] as string} className="border-t border-border">
                  <td className="p-4">{row[0]}</td>
                  {row.slice(1).map((v, i) => (
                    <td key={i} className="p-4 text-center">
                      {v ? <Check className="mx-auto h-4 w-4 text-primary" /> : <X className="mx-auto h-4 w-4 text-muted-foreground" />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* PRICING */}
      <Section id="pricing">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">A plan for every ambition.</h2>
          <p className="mt-3 text-muted-foreground">Billed monthly · Save 20% annually</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              name: "Starter", price: "$0", per: "free forever",
              line: "The perfect way to get started and finish your first goal.",
              feats: ["1 Active Goal", "Unlimited Sprints", "Milestone Tracking", "Daily Affirmations", "Standard Support"],
              cta: "Start for Free", featured: false,
            },
            {
              name: "Pro", price: "$9", per: "/month",
              line: "For individuals serious about achieving multiple life and work goals.",
              feats: ["Unlimited Goals", "Unlimited Sprints", "Dynamic Sprint Management", "Personal Reward System", "Advanced Analytics", "Priority Support"],
              cta: "Start Your Pro Trial", featured: true,
            },
            {
              name: "Business", price: "$15", per: "/user / month",
              line: "For teams who need to align, track, and achieve shared objectives.",
              feats: ["Everything in Pro", "Team Dashboards", "Shared Goals & Sprints", "User Roles & Permissions", "Centralized Billing", "Dedicated Account Manager"],
              cta: "Talk to Sales", featured: false,
            },
          ].map((p) => (
            <Card
              key={p.name}
              className={`relative border-border bg-card p-8 shadow-card ${p.featured ? "border-primary ring-1 ring-primary" : ""}`}
            >
              {p.featured && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-primary text-primary-foreground">MOST POPULAR</Badge>
              )}
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <p className="mt-2 min-h-[2.5rem] text-sm text-muted-foreground">{p.line}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold">{p.price}</span>
                <span className="text-sm text-muted-foreground">{p.per}</span>
              </div>
              <ul className="mt-6 space-y-2 text-sm">
                {p.feats.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/auth" className="mt-8 block">
                <Button
                  className={`w-full ${p.featured ? "bg-gradient-primary text-primary-foreground shadow-glow" : ""}`}
                  variant={p.featured ? "default" : "outline"}
                >
                  {p.cta}
                </Button>
              </Link>
            </Card>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs text-muted-foreground">
          <span>Cancel anytime</span>
          <span>14-day money-back guarantee</span>
          <span>Secure payments by Stripe</span>
        </div>
      </Section>

      {/* GUARANTEE */}
      <Section className="max-w-3xl">
        <Card className="border-border bg-gradient-hero p-10 text-center shadow-card">
          <ShieldCheck className="mx-auto h-12 w-12 text-primary" />
          <h2 className="mt-4 text-2xl font-bold sm:text-3xl">Our ‘Finish Your First Goal’ Guarantee</h2>
          <p className="mt-4 text-base leading-relaxed">
            Sign up for Goal Sprinta Pro. Pick one meaningful goal. Complete three two-week sprints. If after six weeks
            you don't feel more focused, more in control, and more accomplished — I'll refund every penny. Just email
            me personally.
          </p>
          <p className="mt-4 text-sm font-semibold">— Alex Chen, Founder of Goal Sprinta</p>
        </Card>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="max-w-3xl">
        <h2 className="text-3xl font-bold sm:text-4xl">Frequently asked questions</h2>
        <Accordion type="single" collapsible className="mt-8">
          {[
            ["What's the difference between a goal and a sprint?", "A goal is your big, long-term objective—the ‘what.’ A sprint is the short, two-week block of focused work you do to get there—the ‘how.’ You might have a goal to ‘Write a novel,’ and your first sprint might be ‘Outline the first three chapters.’"],
            ["Can I use Goal Sprinta for professional goals, or just personal ones?", "Both. Many users manage career goals, sales targets, and team projects alongside personal goals for fitness, learning, and side hustles."],
            ["How does the reward system work?", "When you create a goal or sprint, you define your own reward. Once you mark it complete, the app prompts you to claim it — a positive feedback loop that makes achievement feel great."],
            ["Is my data secure?", "Yes. Data is encrypted in transit and at rest using AES-256. Infrastructure is hosted on AWS and we're fully GDPR and CCPA compliant."],
            ["What if I don't complete a sprint in time?", "Extend it by a few days. The goal is progress, not perfection — no guilt-tripping."],
            ["Can I collaborate with others on goals?", "Yes. The Business plan supports shared goals, assigned milestones, and team dashboards."],
            ["Do you have a mobile app?", "Yes — iOS and Android, with sync across all devices."],
            ["What integrations do you support?", "Native: Google Calendar, Outlook, Slack. Zapier connects you to thousands more."],
            ["How is this different from a to-do list app?", "To-do apps manage tasks. Goal Sprinta connects daily milestones to two-week sprints to long-term missions — a purpose-built system for big goals."],
            ["What's your refund policy?", "No-questions-asked 14-day money-back guarantee on all paid plans."],
          ].map(([q, a], i) => (
            <AccordionItem key={i} value={`q-${i}`}>
              <AccordionTrigger>{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      {/* FINAL CTA */}
      <Section className="text-center">
        <h2 className="mx-auto max-w-3xl text-4xl font-bold sm:text-5xl">
          How many more ‘somedays’ can you afford?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
          The life you want is on the other side of a finished goal. Stop waiting for motivation and start building momentum.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/auth">
            <Button size="lg" className="bg-gradient-primary text-primary-foreground shadow-glow">
              Start Your Free Sprint <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Button size="lg" variant="outline">
            <PlayCircle className="mr-2 h-4 w-4" /> Watch the 2-minute demo
          </Button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          14-day free trial. No credit card required. A new outcome is just one sprint away.
        </p>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-card/40">
        <div className="container mx-auto grid gap-10 px-6 py-14 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 font-display text-lg font-bold">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
                <Zap className="h-4 w-4" />
              </span>
              Goal Sprinta
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Goal Sprinta: From Ambition to Achievement.</p>
          </div>
          <div>
            <p className="font-semibold">The Weekly Sprint</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Actionable goal-setting advice and productivity tips from our founder, every Tuesday.
            </p>
            <form className="mt-4 flex gap-2">
              <input
                type="email"
                placeholder="you@email.com"
                className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-ring"
              />
              <Button type="submit" className="bg-gradient-primary text-primary-foreground">Subscribe</Button>
            </form>
            <p className="mt-2 text-xs text-muted-foreground">We respect your privacy. Unsubscribe at any time.</p>
          </div>
          <div className="text-sm text-muted-foreground md:text-right">
            <p className="font-semibold text-foreground">Trust & Security</p>
            <p className="mt-3">SOC 2 Type II Certified</p>
            <p>GDPR Compliant · CCPA Ready</p>
            <p>AES-256 Encryption · Hosted on AWS</p>
          </div>
        </div>
        <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Goal Sprinta. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
