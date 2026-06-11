import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Zap, FileText, CheckSquare, Cloud, Mail, Clock, Puzzle } from "lucide-react";

export const Route = createFileRoute("/integrations")({
  head: () => ({
    meta: [
      { title: "Integrations — Goal Sprinta Works With Your Tools" },
      { name: "description", content: "Goal Sprinta connects with Google Calendar, Slack, Notion, Todoist, Zapier, Google Drive, Outlook Calendar, and iCal." },
      { property: "og:title", content: "Integrations — Goal Sprinta Works With Your Tools" },
      { property: "og:description", content: "Connects with the tools you already use to run your life." },
    ],
  }),
  component: IntegrationsPage,
});

const integrations = [
  { name: "Google Calendar", icon: Calendar },
  { name: "Slack", icon: Zap },
  { name: "Notion", icon: FileText },
  { name: "Todoist", icon: CheckSquare },
  { name: "Zapier", icon: Puzzle },
  { name: "Google Drive", icon: Cloud },
  { name: "Outlook Calendar", icon: Mail },
  { name: "iCal", icon: Clock },
];

function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto flex items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground"><Zap className="h-4 w-4" /></span>
          Goal Sprinta
        </Link>
        <Link to="/steps"><Button variant="ghost"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Steps</Button></Link>
      </header>

      <article className="container mx-auto max-w-3xl px-6 pb-24 pt-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Integrations</p>
        <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
          Works With <span className="bg-gradient-primary bg-clip-text text-transparent">Your Life</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Connects with the tools you already use to run your life. No need to change your workflow — just make it more powerful.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {integrations.map((item) => (
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

        <div className="mt-14 rounded-2xl bg-gradient-hero p-8 text-center shadow-glow">
          <h3 className="font-display text-2xl font-bold">Ready to connect?</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Start sprinting with the tools you already love. Your first sprint is free.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/pricing">
              <Button size="lg" className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
                See pricing
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
