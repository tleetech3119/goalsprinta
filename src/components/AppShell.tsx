import { Link, useNavigate } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { LogOut, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { OnboardingProvider } from "@/lib/onboarding-context";
import { WelcomeModal } from "@/components/onboarding/WelcomeModal";
import { TooltipTour } from "@/components/onboarding/TooltipTour";
import { OnboardingChecklist } from "@/components/onboarding/OnboardingChecklist";
import { FirstWinCelebration } from "@/components/onboarding/FirstWinCelebration";

export function AppShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  return (
    <OnboardingProvider>
      <div className="flex min-h-screen w-full flex-col bg-background">
        <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4 sm:px-6">
          <Link to="/dashboard" className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
              <Zap className="h-4 w-4" />
            </span>
            Goal Sprinta
          </Link>
          <Button variant="ghost" size="sm" onClick={signOut}>
            <LogOut className="mr-2 h-4 w-4" />Sign out
          </Button>
        </header>

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
