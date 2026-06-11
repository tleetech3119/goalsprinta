import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShieldCheck, Zap } from "lucide-react";

export const Route = createFileRoute("/guarantee")({
  head: () => ({
    meta: [
      { title: "Our Guarantee — Goal Sprinta" },
      { name: "description", content: "Our 'Finish Your First Goal' guarantee. Try Goal Sprinta Pro risk-free for six weeks. If you don't see tangible progress, we'll refund every penny." },
      { property: "og:title", content: "Our Guarantee — Goal Sprinta" },
      { property: "og:description", content: "Try Goal Sprinta Pro risk-free for six weeks. If you don't see tangible progress, we'll refund every penny." },
    ],
  }),
  component: GuaranteePage,
});

function GuaranteePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto flex items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
            <Zap className="h-4 w-4" />
          </span>
          Goal Sprinta
        </Link>
        <Link to="/faq">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to FAQ
          </Button>
        </Link>
      </header>

      <article className="container mx-auto max-w-3xl px-6 pb-24 pt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Risk Reversal</p>
        <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
          Our <span className="bg-gradient-primary bg-clip-text text-transparent">'Finish Your First Goal'</span> Guarantee
        </h1>

        <div className="mt-10 rounded-2xl border border-border bg-card/60 p-8 shadow-card md:p-10">
          <ShieldCheck className="h-10 w-10 text-primary" />
          <blockquote className="mt-6 text-lg leading-relaxed text-foreground">
            I created Goal Sprinta because I was tired of the cycle of excitement and disappointment. I had a graveyard of half-finished projects and abandoned goals, and I knew the problem wasn't a lack of desire—it was a lack of a system. This app is the system that changed everything for me.
          </blockquote>

          <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              That's why I'm confident making this promise: <strong className="text-foreground">Sign up for Goal Sprinta Pro today.</strong> Pick one meaningful goal you've struggled with. Follow the system and complete three two-week sprints.
            </p>
            <p>
              If, after those six weeks, you don't feel more focused, more in control, and more accomplished than ever before—if you don't see tangible progress on your goal—<strong className="text-foreground">I'll refund every penny.</strong> Just email me personally. Your progress is our only metric for success.
            </p>
          </div>

          <div className="mt-10 border-t border-border pt-8">
            <p className="font-semibold text-foreground">— Tanisha Goins, Founder of Goal Sprinta</p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="font-display text-2xl font-bold">Ready to finish what you start?</h2>
          <p className="mt-2 text-muted-foreground">
            Start your first sprint today—completely risk-free.
          </p>
          <Link to="/auth" className="mt-6 inline-block">
            <Button size="lg" className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
              Start your first sprint — free
            </Button>
          </Link>
          <div className="mt-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                Back to home
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
