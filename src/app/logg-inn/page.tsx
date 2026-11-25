import type { Metadata } from "next";
import { isSupabaseConfigured } from "@/lib/env";
import { Logo } from "@/components/logo";
import { GoogleSignInButton } from "./google-sign-in-button";

export const metadata: Metadata = { title: "Logg inn" };

export default function LoginPage() {
  const configured = isSupabaseConfigured();
  return (
    <main className="flex min-h-dvh flex-col justify-between px-6 pb-[calc(env(safe-area-inset-bottom)+2rem)] pt-[calc(env(safe-area-inset-top)+4rem)]">
      <div>
        <Logo className="mb-10 size-16" />
        <h1 className="text-4xl font-medium leading-tight">
          Familie
        </h1>
        <p className="mt-3 max-w-xs text-lg text-muted-foreground">
          Handleliste, oppgaver og dagens oversikt. Bare for oss.
        </p>
      </div>

      <div className="space-y-4">
        {configured ? (
          <GoogleSignInButton />
        ) : (
          <p className="rounded-md bg-muted p-4 text-sm text-muted-foreground">
            Appen er ikke koblet til databasen ennå. Følg oppsettet i README.
          </p>
        )}
        <p className="text-center text-sm text-muted-foreground">
          Kun inviterte e-postadresser får logge inn.
        </p>
      </div>
    </main>
  );
}
