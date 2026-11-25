"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Check } from "lucide-react";
import {
  DEFAULT_THEME,
  MODE_STORAGE_KEY,
  THEME_STORAGE_KEY,
  THEMES,
  type ThemeId,
  type ThemeMode,
} from "@/lib/theme";
import { cn } from "@/lib/utils";

const MODES: { id: ThemeMode; label: string }[] = [
  { id: "auto", label: "Automatisk" },
  { id: "light", label: "Lys" },
  { id: "dark", label: "Mørk" },
];

function applyTheme(theme: ThemeId, mode: ThemeMode) {
  const resolved =
    mode === "auto"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : mode;
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.setAttribute("data-mode", resolved);
}

const CHANGE_EVENT = "familie-theme-change";

function readSnapshot(): string {
  try {
    const t = localStorage.getItem(THEME_STORAGE_KEY) || DEFAULT_THEME;
    const m = localStorage.getItem(MODE_STORAGE_KEY) || "auto";
    return `${t}|${m}`;
  } catch {
    return `${DEFAULT_THEME}|auto`;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function ThemePicker() {
  const snapshot = useSyncExternalStore(subscribe, readSnapshot, () => `${DEFAULT_THEME}|auto`);
  const [theme, mode] = snapshot.split("|") as [ThemeId, ThemeMode];

  // Follow system changes while in automatic mode.
  useEffect(() => {
    if (mode !== "auto") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme(theme, mode);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme, mode]);

  function update(next: { theme?: ThemeId; mode?: ThemeMode }) {
    const t = next.theme ?? theme;
    const m = next.mode ?? mode;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, t);
      localStorage.setItem(MODE_STORAGE_KEY, m);
    } catch {
      /* private mode: applies for this visit only */
    }
    applyTheme(t, m);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-3">
        {THEMES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => update({ theme: t.id })}
            aria-pressed={theme === t.id}
            className={cn(
              "flex items-center gap-4 rounded-lg border bg-surface p-4 text-left transition-colors",
              theme === t.id ? "border-foreground" : "border-border",
            )}
          >
            <span className="flex -space-x-2" aria-hidden>
              {t.swatch.map((c) => (
                <span
                  key={c}
                  className="size-8 rounded-full border border-black/10"
                  style={{ background: c }}
                />
              ))}
            </span>
            <span className="flex-1">
              <span className="block font-medium">{t.name}</span>
              <span className="block text-sm text-muted-foreground">{t.description}</span>
            </span>
            {theme === t.id && <Check className="size-5" />}
          </button>
        ))}
      </div>

      <div className="flex rounded-md bg-muted p-1" role="radiogroup" aria-label="Lys eller mørk">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            role="radio"
            aria-checked={mode === m.id}
            onClick={() => update({ mode: m.id })}
            className={cn(
              "h-10 flex-1 rounded-sm text-sm transition-colors",
              mode === m.id ? "bg-surface font-medium shadow-sm" : "text-muted-foreground",
            )}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>
  );
}
