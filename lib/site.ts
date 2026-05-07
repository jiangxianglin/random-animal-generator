export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.randomanimalgenerator.online";

export const SITE_NAME = "Random Animal Generator";
export const SITE_DESCRIPTION =
  "Free random animal generator with category filters, wheel mode, and drawing prompts.";
export const SITE_TWITTER = "@randomanimals";

export const PRIMARY_NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/random-animal-generator-wheel", label: "Wheel Tool" },
  { href: "/random-animal-name-generator", label: "Name Tool" },
] as const;

export const CORE_SITE_ROUTES = [
  { path: "/", priority: 1.0 },
  { path: "/random-animal-generator-wheel/", priority: 0.9 },
  { path: "/random-animal-name-generator/", priority: 0.9 },
] as const;

export const LAST_MAJOR_UPDATE = new Date("2026-05-07T00:00:00.000Z");
