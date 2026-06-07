import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

export type OnboardingState = {
  welcome_seen: boolean;
  tooltips_seen: boolean;
  affirmation_viewed: boolean;
  first_milestone_celebrated: boolean;
  checklist_dismissed: boolean;
};

type Ctx = {
  state: OnboardingState | null;
  userId: string | null;
  hasSprints: boolean;
  hasMilestones: boolean;
  hasRewards: boolean;
  refresh: () => Promise<void>;
  update: (patch: Partial<OnboardingState>) => Promise<void>;
};

const OnboardingCtx = createContext<Ctx | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OnboardingState | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [counts, setCounts] = useState({ sprints: 0, milestones: 0, rewards: 0 });

  const refresh = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const uid = userData.user?.id ?? null;
    setUserId(uid);
    if (!uid) return;
    const [{ data: ob }, sprints, milestones, rewards] = await Promise.all([
      supabase.from("onboarding_state").select("*").eq("user_id", uid).maybeSingle(),
      supabase.from("sprints").select("id", { count: "exact", head: true }).eq("user_id", uid),
      supabase.from("milestones").select("id", { count: "exact", head: true }).eq("user_id", uid),
      supabase.from("rewards").select("id", { count: "exact", head: true }).eq("user_id", uid),
    ]);
    if (ob) setState(ob as OnboardingState);
    else {
      // Ensure row exists for users created before trigger
      await supabase.from("onboarding_state").insert({ user_id: uid });
      setState({ welcome_seen: false, tooltips_seen: false, affirmation_viewed: false, first_milestone_celebrated: false, checklist_dismissed: false });
    }
    setCounts({ sprints: sprints.count ?? 0, milestones: milestones.count ?? 0, rewards: rewards.count ?? 0 });
  };

  const update = async (patch: Partial<OnboardingState>) => {
    if (!userId) return;
    setState((s) => (s ? { ...s, ...patch } : s));
    await supabase.from("onboarding_state").update(patch).eq("user_id", userId);
  };

  useEffect(() => { refresh(); }, []);

  return (
    <OnboardingCtx.Provider value={{
      state, userId,
      hasSprints: counts.sprints > 0,
      hasMilestones: counts.milestones > 0,
      hasRewards: counts.rewards > 0,
      refresh, update,
    }}>
      {children}
    </OnboardingCtx.Provider>
  );
}

export const useOnboarding = () => {
  const ctx = useContext(OnboardingCtx);
  if (!ctx) throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
};
