import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap, Check, Shield, RotateCcw, CreditCard } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — A Plan for Every Ambition | Goal Sprinta" },
      { name: "description", content: "Choose the Goal Sprinta plan that fits your ambition. Start free, or unlock unlimited goals with Pro. Teams love Business." },
      { property: "og:title", content: "Pricing — A Plan for Every Ambition | Goal Sprinta" },
      { property: "og:description", content: "Whether you're tackling your first big project or leading a team toward ambitious targets, there's a Goal Sprinta plan for you." },
    ],
  }),
  component: PricingPage,
});

const plans = [
  {
    name: "Starter",
    monthlyPrice: 0,
    annualPrice: 0,
    oneLiner: "The perfect way to get started and finish your first goal.",
    features: [
      "1 Active Goal",
      "Unlimited Sprints",
      "Milestone Tracking",
      "Daily Affirmations",
      "Standard Support",
    ],
    cta: "Start for Free",
    ctaLink: "/auth",
    bestFor: "Individuals new to structured goal-setting.",
    tag: null,
  },
  {
    name: "Pro",
    monthlyPrice: 9,
    annualPrice: 7,
    oneLiner: "For individuals serious about achieving multiple life and work goals.",
    features: [
      "Unlimited Goals",
      "Unlimited Sprints",
      "Dynamic Sprint Management",
      "Personal Reward System",
      "Advanced Analytics",
      "Priority Support",
    ],
    cta: "Start Your Pro Trial",
    ctaLink: "/auth",
    bestFor: "Professionals, freelancers, and lifelong learners.",
    tag: "MOST POPULAR",
  },
  {
    name: "Business",
    monthlyPrice: 15,
    annualPrice: 12,
    oneLiner: "For teams who need to align, track, and achieve shared objectives.",
    features: [
      "Everything in Pro, plus:",
      "Team Dashboards",
      "Shared Goals & Sprints",
      "User Roles & Permissions",
      "Centralized Billing",
      "Dedicated Account Manager",
    ],
    cta: "Talk to Sales",
    ctaLink: "/auth",
    bestFor: "Teams, startups, and managers tracking OKRs.",
    tag: null,
  },
];

const reassurance = [
  { icon: RotateCcw, title: "Cancel Anytime", body: "No long-term contracts, no hassles." },
  { icon: Shield, title: "14-Day Money-Back Guarantee", body: "If you don't love it, get a full refund." },
  { icon: CreditCard, title: "Secure Payments", body: "All transactions are protected by Stripe's world-class security." },
];

function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto flex items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground"><Zap className="h-4 w-4" /></span>
          Goal Sprinta
        </Link>
        <Link to="/integrations"><Button variant="ghost"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Integrations</Button></Link>
      </header>

      <article className="container mx-auto max-w-5xl px-6 pb-24 pt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Pricing</p>
        <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
          A Plan for <span className="bg-gradient-primary bg-clip-text text-transparent">Every Ambition</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Whether you're tackling your first big project or leading a team toward ambitious targets, there's a Goal Sprinta plan for you.
        </p>

        {/* Toggle */}
        <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-border bg-card/60 p-1.5">
          <button
            onClick={() => setAnnual(false)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${!annual ? "bg-gradient-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Billed monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${annual ? "bg-gradient-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Billed annually
          </button>
          <span className="mr-2 text-xs font-medium text-primary">Save 20%</span>
        </div>

        {/* Pricing Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => {
            const price = annual ? plan.annualPrice : plan.monthlyPrice;
            const isPopular = plan.tag === "MOST POPULAR";
            return (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border p-6 shadow-card ${isPopular ? "border-primary/50 bg-card/80 shadow-glow" : "border-border bg-card/60"}`}
              >
                {isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="font-display text-xl font-bold">{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold">${price}</span>
                  {price > 0 && (
                    <span className="text-sm text-muted-foreground">
                      / {plan.name === "Business" ? "user / month" : "month"}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{plan.oneLiner}</p>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className={f.startsWith("Everything") ? "font-medium text-foreground" : "text-muted-foreground"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <Link to={plan.ctaLink}>
                    <Button
                      size="lg"
                      className={`w-full ${isPopular ? "bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90" : ""}`}
                      variant={isPopular ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                  <p className="mt-3 text-center text-xs text-muted-foreground">{plan.bestFor}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {reassurance.map((item) => (
            <div key={item.title} className="flex items-start gap-3 rounded-xl border border-border bg-card/40 p-5">
              <item.icon className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
