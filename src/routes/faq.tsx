import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ArrowLeft, Zap, MessageCircleQuestion } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Common Questions | Goal Sprinta" },
      { name: "description", content: "Get answers to the most common questions about Goal Sprinta. Learn how goals, sprints, rewards, and integrations work." },
      { property: "og:title", content: "FAQ — Common Questions | Goal Sprinta" },
      { property: "og:description", content: "Everything you need to know about Goal Sprinta before you start your first sprint." },
    ],
  }),
  component: FaqPage,
});

const faqs = [
  {
    question: "What's the difference between a goal and a sprint?",
    answer:
      "A goal is your big, long-term objective—the \"what.\" A sprint is the short, two-week block of focused work you do to get there—the \"how.\" You might have a goal to \"Write a novel,\" and your first sprint might be to \"Outline the first three chapters.\" Sprints are the building blocks that make your big goals achievable.",
  },
  {
    question: "Can I use Goal Sprinta for professional goals, or just personal ones?",
    answer:
      "Both! Goal Sprinta is designed for any objective that requires focus and consistency. Many of our users manage their career goals, sales targets, and team projects right alongside their personal goals for fitness, learning, and side hustles. The Pro plan is perfect for managing both areas of your life in one place.",
  },
  {
    question: "How does the reward system work?",
    answer:
      "It's simple and powerful. When you create a goal or a sprint, you define your own reward for completing it. It can be anything you want—a new book, a takeout meal from your favorite restaurant, an afternoon off. Once you mark the sprint or goal as complete, the app prompts you to claim your reward, creating a positive feedback loop that makes achievement feel great.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We treat your data with the utmost seriousness. All data is encrypted in transit and at rest using AES-256, the same standard used by banks and governments. Our infrastructure is hosted on Amazon Web Services (AWS), a leader in secure cloud computing, and we are fully GDPR and CCPA compliant.",
  },
  {
    question: "What if I don't complete a sprint in time?",
    answer:
      "That's okay—life happens. Goal Sprinta is designed for flexibility, not rigidity. If you need more time, you can easily extend your sprint by a few days. The goal is progress, not perfection. The system helps you get back on track quickly without the guilt or feeling of failure associated with traditional planning.",
  },
  {
    question: "Can I collaborate with others on goals?",
    answer:
      "Yes! Our Business plan is built for collaboration. You can create shared goals and sprints for your team, assign milestones to different people, and track collective progress from a central dashboard. It's perfect for startups, marketing teams, and any group working toward a common objective.",
  },
  {
    question: "Do you have a mobile app?",
    answer:
      "Yes, Goal Sprinta is available on iOS and Android, and your progress is seamlessly synced across all your devices. You can check off milestones, review your goals, and manage your sprints from your phone, tablet, or desktop computer, so you're never far from your plan.",
  },
  {
    question: "What integrations do you support?",
    answer:
      "We offer native integrations with Google Calendar, Outlook, and Slack to fit into your daily routine. We also have a powerful Zapier integration, which allows you to connect Goal Sprinta to thousands of other applications like Notion, Asana, Google Drive, and more, automating your workflow.",
  },
  {
    question: "How is Goal Sprinta different from a simple to-do list app?",
    answer:
      "To-do list apps are great for managing simple tasks, but they fail at managing complex, long-term goals. They lack the structure, motivation, and big-picture view needed for real achievement. Goal Sprinta is a purpose-built system that connects your daily actions (milestones) to your weekly objectives (sprints) and your ultimate life goals (missions).",
  },
  {
    question: "What's your refund policy?",
    answer:
      "We offer a no-questions-asked, 14-day money-back guarantee on all paid plans. If you try Goal Sprinta and decide it's not for you within the first two weeks, just send us a message, and we'll issue a full refund immediately. We want you to be completely happy with your investment.",
  },
];

function FaqPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto flex items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
            <Zap className="h-4 w-4" />
          </span>
          Goal Sprinta
        </Link>
        <Link to="/pricing">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Pricing
          </Button>
        </Link>
      </header>

      <article className="container mx-auto max-w-3xl px-6 pb-24 pt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">FAQ</p>
        <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
          Got <span className="bg-gradient-primary bg-clip-text text-transparent">Questions?</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Everything you need to know before you start your first sprint.
        </p>

        <div className="mt-12 rounded-2xl border border-border bg-card/60 p-6 shadow-card md:p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-border last:border-b-0">
                <AccordionTrigger className="py-5 text-base font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <MessageCircleQuestion className="mx-auto h-10 w-10 text-primary" />
          <h2 className="mt-4 font-display text-2xl font-bold">Still have questions?</h2>
          <p className="mt-2 text-muted-foreground">
            Start your free account and explore Goal Sprinta for yourself.
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
