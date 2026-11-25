"use client";

import { useSyncExternalStore } from "react";
import { CheckCircle2, MoreVertical, Share, SquarePlus } from "lucide-react";

type Platform = "ios" | "android" | "other";

function detect(): string {
  const ua = navigator.userAgent;
  const standalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true;
  const platform: Platform = /iPhone|iPad|iPod/.test(ua)
    ? "ios"
    : /Android/.test(ua)
      ? "android"
      : "other";
  return `${platform}|${standalone ? "1" : "0"}`;
}

const noop = () => () => {};

export function InstallGuide() {
  const snap = useSyncExternalStore(noop, detect, () => "other|0");
  const [platform, standalone] = snap.split("|") as [Platform, string];

  if (standalone === "1") {
    return (
      <div className="mx-5 flex items-start gap-3 rounded-lg border border-border bg-surface p-4">
        <CheckCircle2 className="mt-0.5 size-5 text-success" />
        <div>
          <p className="font-medium">Appen er installert</p>
          <p className="text-sm text-muted-foreground">
            Du åpner den fra Hjem-skjermen. Varsler kan slås på når oppgaver er på plass.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-5">
      <p className="text-muted-foreground">
        Legg appen på Hjem-skjermen. Da åpnes den i fullskjerm, handlelisten virker uten nett, og
        på iPhone er det eneste måten å få varsler på.
      </p>

      {platform !== "android" && (
        <Steps
          title="iPhone (Safari)"
          steps={[
            { icon: <Share />, text: "Trykk på Del-knappen nederst i Safari." },
            { icon: <SquarePlus />, text: "Bla ned og velg «Legg til på Hjem-skjerm»." },
            { icon: <CheckCircle2 />, text: "Trykk «Legg til», og åpne appen fra Hjem-skjermen." },
          ]}
        />
      )}
      {platform !== "ios" && (
        <Steps
          title="Android (Chrome)"
          steps={[
            { icon: <MoreVertical />, text: "Trykk på menyen (tre prikker) øverst til høyre." },
            { icon: <SquarePlus />, text: "Velg «Installer app» eller «Legg til på startsiden»." },
            { icon: <CheckCircle2 />, text: "Åpne appen fra startsiden." },
          ]}
        />
      )}
    </div>
  );
}

function Steps({
  title,
  steps,
}: {
  title: string;
  steps: { icon: React.ReactNode; text: string }[];
}) {
  return (
    <section>
      <h2 className="mb-3 text-lg font-medium">{title}</h2>
      <ol className="space-y-3">
        {steps.map((s, i) => (
          <li key={i} className="flex items-center gap-4 rounded-lg border border-border bg-surface p-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground [&_svg]:size-5">
              {s.icon}
            </span>
            <span>{s.text}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
