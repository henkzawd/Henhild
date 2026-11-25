import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { InstallGuide } from "./install-guide";

export const metadata: Metadata = { title: "Kom i gang" };

export default function GetStartedPage() {
  return (
    <>
      <PageHeader title="Kom i gang" />
      <InstallGuide />
    </>
  );
}
