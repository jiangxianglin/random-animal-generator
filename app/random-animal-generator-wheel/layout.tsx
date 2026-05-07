import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Random Animal Generator Wheel - Free Spinner for Games",
  description:
    "Use our free random animal generator wheel to pick animals for games, classroom activities, and creative prompts.",
  path: "/random-animal-generator-wheel/",
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
