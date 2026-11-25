import { WifiOff } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata = { title: "Uten nett" };

export default function OfflinePage() {
  return (
    <main className="flex min-h-dvh items-center justify-center">
      <EmptyState icon={<WifiOff />} title="Du er uten nett">
        Denne siden trenger nett. Handlelisten virker likevel, og endringer synkes når du er på
        nett igjen.
      </EmptyState>
    </main>
  );
}
