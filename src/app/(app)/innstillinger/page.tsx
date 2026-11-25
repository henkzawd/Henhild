import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { ThemePicker } from "@/components/theme/theme-picker";

export const metadata: Metadata = { title: "Innstillinger" };

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Innstillinger" />
      <section className="px-5">
        <h2 className="mb-1 text-lg font-medium">Tema</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Valget gjelder bare denne telefonen.{" "}
          <Link href="/temaer" className="underline">
            Sammenlign alle tre
          </Link>
          .
        </p>
        <ThemePicker />
      </section>
    </>
  );
}
