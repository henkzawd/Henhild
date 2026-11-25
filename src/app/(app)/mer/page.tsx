import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Download, Repeat, Settings } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { requireProfile } from "@/lib/session";

export const metadata: Metadata = { title: "Mer" };

const LINKS = [
  { href: "/abonnementer", label: "Abonnementer", icon: Repeat },
  { href: "/innstillinger", label: "Innstillinger og tema", icon: Settings },
  { href: "/kom-i-gang", label: "Installer appen", icon: Download },
];

export default async function MorePage() {
  const profile = await requireProfile();
  return (
    <>
      <PageHeader title="Mer" />
      <ul className="mx-5 divide-y divide-border overflow-hidden rounded-lg border border-border bg-surface">
        {LINKS.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link href={href} className="flex h-14 items-center gap-4 px-4 active:bg-muted">
              <Icon className="size-5 text-muted-foreground" strokeWidth={1.5} />
              <span className="flex-1">{label}</span>
              <ChevronRight className="size-5 text-muted-foreground" strokeWidth={1.5} />
            </Link>
          </li>
        ))}
      </ul>
      <form action="/auth/logg-ut" method="post" className="mx-5 mt-8">
        <p className="mb-3 text-sm text-muted-foreground">Logget inn som {profile.email}</p>
        <button className="h-12 w-full rounded-md border border-border text-danger active:bg-muted">
          Logg ut
        </button>
      </form>
    </>
  );
}
