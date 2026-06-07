CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Only store the user's email. Ignore any provider profile metadata
  -- (name, avatar, etc.) returned by Google or other OAuth providers.
  -- For email/password signups, fall back to the explicit display_name
  -- the user typed into the form (never a provider-supplied field).
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    NULLIF(NEW.raw_user_meta_data->>'display_name', '')
  );
  INSERT INTO public.onboarding_state (user_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$;