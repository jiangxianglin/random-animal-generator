import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

// Title ≤60 (absolute); Description ≤160 — exact keyword "animal randomizer"
export const metadata: Metadata = buildPageMetadata({
  title: 'Animal Randomizer: Free Wildlife Randomizer',
  description:
    'Animal randomizer for free random wildlife picks—filter by category, get facts and photos. Games, classrooms, writing. No signup.',
  path: '/animal-randomizer',
  image: '/og-animal-randomizer.png',
  imageAlt: 'Animal randomizer — wildlife field guide randomizer for games and classrooms',
  imageWidth: 1200,
  imageHeight: 630,
  imageType: 'image/png',
  datePublished: '2026-08-15T00:00:00.000Z',
  dateModified: '2026-08-15T00:00:00.000Z',
  ogType: 'article',
  absoluteTitle: true,
});

export default function AnimalRandomizerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
