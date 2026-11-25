import { CalendarDays } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { requireProfile } from "@/lib/session";
import { formatLongDate, greeting } from "@/lib/dates";

export default async function TodayPage() {
  const profile = await requireProfile();
  const firstName = profile.display_name.split(" ")[0];
  return (
    <>
      <PageHeader subtitle={formatLongDate(new Date())} title={`${greeting(new Date())}, ${firstName}`} />
      <EmptyState icon={<CalendarDays />} title="Dagens oversikt kommer her">
        Kalender, oppgaver, handlelisten og varsler samles på denne siden etter hvert.
      </EmptyState>
    </>
  );
}
