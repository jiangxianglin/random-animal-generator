export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.randomanimalgenerator.online";

export const SITE_NAME = "Random Animal Generator";
export const SITE_DESCRIPTION =
  "Free random animal generator with category filters, wheel mode, and drawing prompts.";
export const SITE_TWITTER = "@randomanimals";
export const SITE_EMAIL = "hello@randomanimalgenerator.online";

export const SITE_SAME_AS = [
  `https://twitter.com/${SITE_TWITTER.replace("@", "")}`,
  `https://x.com/${SITE_TWITTER.replace("@", "")}`,
] as const;

/** Visible publisher / author entity for E-E-A-T + GEO provenance */
export const SITE_AUTHOR = {
  name: SITE_NAME,
  url: `${SITE_URL}/about`,
} as const;

/** Full tool matrix — footer + related-tool anchors use keyword labels. */
export const TOOL_NAV_ITEMS = [
  {
    href: "/cute-animal-generator",
    label: "Cute Animal Generator",
    shortLabel: "Cute",
    keyword: "cute animal generator",
  },
  {
    href: "/random-animal-picker",
    label: "Random Animal Picker",
    shortLabel: "Picker",
    keyword: "random animal picker",
  },
  {
    href: "/random-animal-name-generator",
    label: "Random Animal Name Generator",
    shortLabel: "Names",
    keyword: "random animal name generator",
  },
  {
    href: "/drawing-prompt-generator",
    label: "Drawing Prompt Generator",
    shortLabel: "Drawing",
    keyword: "drawing prompt generator",
  },
  {
    href: "/random-animal-generator-wheel",
    label: "Random Animal Generator Wheel",
    shortLabel: "Wheel",
    keyword: "random animal generator wheel",
  },
] as const;

export const PRIMARY_NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/cute-animal-generator", label: "Cute" },
  { href: "/random-animal-picker", label: "Picker" },
  { href: "/drawing-prompt-generator", label: "Drawing" },
  { href: "/random-animal-generator-wheel", label: "Wheel" },
  { href: "/random-animal-name-generator", label: "Names" },
] as const;

export const TRUST_NAV_ITEMS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;

export const CORE_SITE_ROUTES = [
  { path: "/", priority: 1.0 },
  { path: "/cute-animal-generator", priority: 0.95 },
  { path: "/random-animal-picker", priority: 0.9 },
  { path: "/random-animal-name-generator", priority: 0.9 },
  { path: "/drawing-prompt-generator", priority: 0.9 },
  { path: "/random-animal-generator-wheel", priority: 0.9 },
  { path: "/random-animal-generator-for-drawing", priority: 0.85 },
  { path: "/about", priority: 0.4 },
  { path: "/contact", priority: 0.4 },
  { path: "/privacy", priority: 0.3 },
  { path: "/terms", priority: 0.3 },
] as const;

export const SITE_DATE_PUBLISHED = "2026-07-19T00:00:00.000Z";
export const LAST_MAJOR_UPDATE = new Date("2026-08-08T00:00:00.000Z");
