import type { Metadata } from "next";
import { Check, CheckSquare, Gift, Menu, Plus, ShoppingBasket, Sun } from "lucide-react";
import { THEMES, type ThemeId } from "@/lib/theme";

export const metadata: Metadata = { title: "Temaer" };

/** Public, data-free preview so the three themes can be compared side by side. */
export default function ThemesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-[calc(env(safe-area-inset-top)+2rem)]">
      <h1 className="text-3xl font-medium">Tre temaer</h1>
      <p className="mt-2 max-w-prose text-muted-foreground">
        Japandi: enkle former, jordfarger og mye luft. Hvert tema har en lys og en mørk variant.
        Velg tema under Mer → Innstillinger.
      </p>

      <div className="mt-10 space-y-14">
        {THEMES.map((t) => (
          <section key={t.id}>
            <h2 className="text-xl font-medium">{t.name}</h2>
            <p className="mb-4 text-sm text-muted-foreground">{t.description}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Sample theme={t.id} mode="light" />
              <Sample theme={t.id} mode="dark" />
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

function Sample({ theme, mode }: { theme: ThemeId; mode: "light" | "dark" }) {
  return (
    <div
      data-theme={theme}
      data-mode={mode}
      className="overflow-hidden rounded-[1.75rem] border border-border bg-background font-sans text-foreground shadow-sm"
    >
      <div className="px-5 pb-3 pt-6">
        <p className="text-sm text-muted-foreground">Onsdag 25. november</p>
        <h3 className="text-3xl font-medium">Handleliste</h3>
      </div>

      <div className="flex gap-2 px-5">
        <div className="flex h-12 flex-1 items-center rounded-md border border-border bg-surface px-4 text-muted-foreground">
          melk, egg, 2 avokado …
        </div>
        <div className="flex size-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Plus className="size-5" />
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-hidden px-5">
        <span className="text-xs uppercase tracking-wider text-muted-foreground self-center">
          Legg til igjen
        </span>
        {["Brød", "Kaffe", "Bleier"].map((c) => (
          <span key={c} className="rounded-full bg-accent-soft px-3 py-1.5 text-sm">
            {c}
          </span>
        ))}
      </div>

      <div className="mt-5 space-y-4 px-5">
        <Group title="Frukt og grønt">
          <Item name="Avokado" qty="2 stk" who="H" />
          <Item name="Bananer" note="Ikke for modne" who="K" />
        </Group>
        <Group title="Meieri">
          <Item name="Melk" who="H" />
          <Item name="Egg" qty="12 stk" who="K" done />
        </Group>
      </div>

      <div className="mx-5 mt-5 rounded-lg border border-border bg-surface p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">I dag</p>
        <div className="mt-2 flex items-baseline gap-3">
          <span className="w-12 text-sm tabular-nums text-muted-foreground">08:15</span>
          <span>Levere i barnehagen</span>
        </div>
        <div className="mt-1.5 flex items-baseline gap-3">
          <span className="w-12 text-sm text-accent">Forfalt</span>
          <span>Bytte sengetøy</span>
        </div>
      </div>

      <nav className="mt-5 flex border-t border-border">
        {[
          { label: "I dag", icon: Sun },
          { label: "Handle", icon: ShoppingBasket, active: true },
          { label: "Oppgaver", icon: CheckSquare },
          { label: "Ønsker", icon: Gift },
          { label: "Mer", icon: Menu },
        ].map(({ label, icon: Icon, active }) => (
          <span
            key={label}
            className={`flex h-16 flex-1 flex-col items-center justify-center gap-1 text-xs ${
              active ? "font-medium text-foreground" : "text-muted-foreground"
            }`}
          >
            <Icon className="size-6" strokeWidth={active ? 2 : 1.5} />
            {label}
          </span>
        ))}
      </nav>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</p>
      <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-surface">
        {children}
      </ul>
    </div>
  );
}

function Item({
  name,
  qty,
  note,
  who,
  done,
}: {
  name: string;
  qty?: string;
  note?: string;
  who: string;
  done?: boolean;
}) {
  return (
    <li className="flex min-h-14 items-center gap-3 px-4 py-2">
      <span
        className={`flex size-6 items-center justify-center rounded-full border ${
          done ? "border-success bg-success text-background" : "border-muted-foreground/50"
        }`}
      >
        {done && <Check className="size-4" strokeWidth={2.5} />}
      </span>
      <span className="flex-1">
        <span className={done ? "text-muted-foreground line-through" : ""}>{name}</span>
        {qty && <span className="ml-2 text-sm text-muted-foreground">{qty}</span>}
        {note && <span className="block text-sm text-muted-foreground">{note}</span>}
      </span>
      <span className="flex size-7 items-center justify-center rounded-full bg-muted text-xs text-muted-foreground">
        {who}
      </span>
    </li>
  );
}
