import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { LayoutDashboard, Trophy, Sparkles, LogOut, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { OnboardingProvider } from "@/lib/onboarding-context";
import { WelcomeModal } from "@/components/onboarding/WelcomeModal";
import { TooltipTour } from "@/components/onboarding/TooltipTour";
import { OnboardingChecklist } from "@/components/onboarding/OnboardingChecklist";
import { FirstWinCelebration } from "@/components/onboarding/FirstWinCelebration";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, tour: "create-sprint" as const },
  { to: "/rewards", label: "Rewards", icon: Trophy, tour: "rewards" as const },
  { to: "/affirmations", label: "Affirmations", icon: Sparkles },
];

export function AppShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  return (
    <OnboardingProvider>
      <div className="flex min-h-screen w-full bg-background">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar p-4 md:flex">
          <Link to="/dashboard" className="mb-8 flex items-center gap-2 px-2 font-display text-lg font-bold text-sidebar-foreground">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground"><Zap className="h-4 w-4" /></span>
            Goal Sprinta
          </Link>
          <nav className="flex flex-col gap-1">
            {nav.map((n) => {
              const active = pathname === n.to || pathname.startsWith(n.to + "/");
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  data-tour={n.tour}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                  )}
                >
                  <n.icon className="h-4 w-4" />{n.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto">
            <Button variant="ghost" size="sm" className="w-full justify-start text-sidebar-foreground/80" onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" />Sign out
            </Button>
          </div>
        </aside>

        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>

        <WelcomeModal />
        <TooltipTour />
        <OnboardingChecklist />
        <FirstWinCelebration />
      </div>
    </OnboardingProvider>
  );
}
