import type { Metadata } from "next";
import { Gift } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = { title: "Ønskeliste" };

export default function Page() {
  return (
    <>
      <PageHeader title="Ønskeliste" />
      <EmptyState icon={<Gift />} title="Ingen ønsker ennå">
        Større ting dere vurderer å kjøpe, med prishistorikk og varsel om gode tilbud.
      </EmptyState>
    </>
  );
}
