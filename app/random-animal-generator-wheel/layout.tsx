import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Random Animal Generator Wheel for Games, Classrooms & Prompts",
  description:
    "Spin a random animal generator wheel online for games, classroom activities, creative prompts, and quick one-at-a-time picks.",
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
