import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");

  // Supabase sends ?error=... when the allow-list trigger refuses the sign-up.
  if (searchParams.get("error") || !code) {
    return NextResponse.redirect(new URL("/ikke-tilgang", origin));
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return NextResponse.redirect(new URL("/ikke-tilgang", origin));

  return NextResponse.redirect(new URL("/", origin));
}
