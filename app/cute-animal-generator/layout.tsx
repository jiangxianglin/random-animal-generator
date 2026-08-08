import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

// Title ≤60 (absolute); Description ≤160 — exact keyword "cute animal generator"
export const metadata: Metadata = buildPageMetadata({
  title: 'Cute Animal Generator — Free Online Tool',
  description:
    'Free cute animal generator—tap once for an adorable animal. Optional action, emotion, and location for kids, drawing, and games. No signup.',
  path: '/cute-animal-generator',
  image: '/home-hero-field-atelier.png',
  imageAlt: 'Cute animal generator — soft wildlife prompts for kids, drawing, and games',
  imageWidth: 1200,
  imageHeight: 630,
  imageType: 'image/png',
  datePublished: '2026-08-08T00:00:00.000Z',
  dateModified: '2026-08-08T00:00:00.000Z',
  ogType: 'article',
  absoluteTitle: true,
});

export default function CuteAnimalGeneratorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
