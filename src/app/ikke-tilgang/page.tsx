import type { Metadata } from "next";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = { title: "Ingen tilgang" };

export default function NoAccessPage() {
  return (
    <main className="flex min-h-dvh flex-col justify-center px-6">
      <h1 className="text-3xl font-medium">Ingen tilgang</h1>
      <p className="mt-3 max-w-sm text-muted-foreground">
        Denne Google-kontoen står ikke på listen over hvem som får bruke appen. Prøv å logge inn
        med en annen konto.
      </p>
      <form action="/auth/logg-ut" method="post" className="mt-8">
        <button className={buttonVariants({ variant: "outline", className: "w-full" })}>
          Logg inn med en annen konto
        </button>
      </form>
    </main>
  );
}
