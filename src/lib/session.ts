import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type Profile = {
  id: string;
  household_id: string;
  display_name: string;
  email: string;
  avatar_color: string | null;
};

/** Returns the signed-in user's profile, or redirects. Cached per request. */
export const requireProfile = cache(async (): Promise<Profile> => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;
  if (!userId) redirect("/logg-inn");

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, household_id, display_name, email, avatar_color")
    .eq("id", userId)
    .maybeSingle();

  if (!profile) redirect("/ikke-tilgang");
  return profile as Profile;
});
