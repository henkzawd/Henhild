import type { Metadata } from "next";
import { CheckSquare } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = { title: "Oppgaver" };

export default function Page() {
  return (
    <>
      <PageHeader title="Oppgaver" />
      <EmptyState icon={<CheckSquare />} title="Ingen oppgaver">
        Felles og personlige oppgaver, med påminnelser når de skal gjøres.
      </EmptyState>
    </>
  );
}
