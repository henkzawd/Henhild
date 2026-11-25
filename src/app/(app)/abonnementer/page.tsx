import type { Metadata } from "next";
import { Repeat } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = { title: "Abonnementer" };

export default function Page() {
  return (
    <>
      <PageHeader title="Abonnementer" />
      <EmptyState icon={<Repeat />} title="Ingen abonnementer ennå">
        Faste kostnader samlet på ett sted, med påminnelse før fornyelse.
      </EmptyState>
    </>
  );
}
