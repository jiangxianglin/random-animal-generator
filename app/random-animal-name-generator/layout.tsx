import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

// Title ≤60 (absolute); Description ≤160 — exact keyword "random animal name generator"
export const metadata: Metadata = buildPageMetadata({
  title: 'Random Animal Name Generator: Free List',
  description:
    'Random animal name generator for free copy-ready lists—common or scientific names. Writer, class, and party presets—no signup.',
  path: '/random-animal-name-generator',
  image: '/og-random-animal-name-generator.png',
  imageAlt: 'Naturalist desk mood for a free random animal name generator',
  imageWidth: 1200,
  imageHeight: 630,
  imageType: 'image/png',
  datePublished: '2026-07-02T00:00:00.000Z',
  dateModified: '2026-07-26T12:00:00.000Z',
  ogType: 'article',
  absoluteTitle: true,
});

export default function RandomAnimalNameGeneratorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
