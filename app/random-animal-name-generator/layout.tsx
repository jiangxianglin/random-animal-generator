import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Random Animal Name Generator (Copy-Ready List)',
  description:
    'Generate random animal names with a copy-ready list in seconds. Filter by category and choose common, scientific, or combined formats for writing, games, and classroom use.',
  path: '/random-animal-name-generator',
  image: '/random-animal-name-generator-HERO.png',
  imageAlt: 'Random Animal Name Generator hero illustration',
});

export default function RandomAnimalNameGeneratorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
