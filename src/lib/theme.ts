export const THEMES = [
  {
    id: "lin",
    name: "Lin",
    description: "Lys sand og linstoff, kull og en dempet leirtone.",
    swatch: ["#f4efe7", "#3a3531", "#a8714f"],
  },
  {
    id: "mose",
    name: "Mose",
    description: "Stein og mose. Kjølig, rolig og grønnaktig.",
    swatch: ["#eeeee8", "#56644e", "#262a25"],
  },
  {
    id: "valnott",
    name: "Valnøtt",
    description: "Rispapir og mørk valnøtt, med klassisk skrift i titler.",
    swatch: ["#f6f3ee", "#6b4a35", "#2a211b"],
  },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];
export type ThemeMode = "auto" | "light" | "dark";

export const DEFAULT_THEME: ThemeId = "lin";
export const THEME_STORAGE_KEY = "familie-theme";
export const MODE_STORAGE_KEY = "familie-mode";

/** Background colours used for the browser chrome (theme-color meta). */
export const THEME_BACKGROUND: Record<ThemeId, { light: string; dark: string }> = {
  lin: { light: "#f4efe7", dark: "#1e1c1a" },
  mose: { light: "#eeeee8", dark: "#1a1d1a" },
  valnott: { light: "#f6f3ee", dark: "#1c1714" },
};

/**
 * Runs synchronously in <head> before first paint, so the page never
 * flashes the wrong theme. Kept dependency-free and tiny.
 */
export const themeInitScript = `(function(){try{
var d=document.documentElement;
var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)})||${JSON.stringify(DEFAULT_THEME)};
var m=localStorage.getItem(${JSON.stringify(MODE_STORAGE_KEY)})||"auto";
if(m==="auto"){m=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}
d.setAttribute("data-theme",t);d.setAttribute("data-mode",m);
}catch(e){}})();`;
