import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Random Animal Generator Wheel (Free Animal Wheel Spinner)",
  description:
    "Spin a free random animal generator wheel online. No signup needed - ideal for classroom games, prompts, and quick one-at-a-time animal picks.",
  path: "/random-animal-generator-wheel",
  image: "/og-random-animal-generator-wheel.png",
  imageAlt: "Random Animal Generator Wheel interface preview",
});

export default function WheelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
