import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

// Title ≤60 (absolute); Description ≤160 — cluster: random animal wheel + generator wheel
export const metadata: Metadata = buildPageMetadata({
  title: 'Random Animal Wheel – Free Animal Generator Spinner',
  description:
    'Spin the random animal generator wheel for free party, classroom, drawing, and RPG reveals. Category filters and timers—no signup.',
  path: '/random-animal-generator-wheel',
  image: '/og-random-animal-generator-wheel.png',
  imageAlt: 'Random animal generator wheel spinner for party, classroom, and live wildlife picks',
  imageWidth: 1200,
  imageHeight: 630,
  imageType: 'image/png',
  datePublished: '2026-07-02T00:00:00.000Z',
  dateModified: '2026-08-20T00:00:00.000Z',
  ogType: 'article',
  absoluteTitle: true,
});

export default function WheelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
