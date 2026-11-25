import type { Metadata } from "next";
import { ShoppingBasket } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = { title: "Handleliste" };

export default function Page() {
  return (
    <>
      <PageHeader title="Handleliste" />
      <EmptyState icon={<ShoppingBasket />} title="Handlelisten er tom">
        Her legger dere til varer sammen. Listen oppdateres på begge telefonene med en gang.
      </EmptyState>
    </>
  );
}
