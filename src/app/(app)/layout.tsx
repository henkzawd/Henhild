import { BottomNav } from "@/components/bottom-nav";
import { requireProfile } from "@/lib/session";

export default async function AppLayout({ children }: LayoutProps<"/">) {
  await requireProfile();
  return (
    <>
      <main className="mx-auto min-h-dvh max-w-xl pb-[calc(env(safe-area-inset-bottom)+5rem)]">
        {children}
      </main>
      <BottomNav />
    </>
  );
}
