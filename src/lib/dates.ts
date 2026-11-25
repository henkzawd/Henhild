export const TIME_ZONE = "Europe/Oslo";

export function formatLongDate(date: Date) {
  const s = new Intl.DateTimeFormat("nb-NO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: TIME_ZONE,
  }).format(date);
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function greeting(date: Date) {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", { hour: "numeric", hourCycle: "h23", timeZone: TIME_ZONE }).format(date),
  );
  if (hour < 5) return "God natt";
  if (hour < 10) return "God morgen";
  if (hour < 17) return "Hei";
  return "God kveld";
}
