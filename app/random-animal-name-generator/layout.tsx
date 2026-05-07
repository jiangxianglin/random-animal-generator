import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Random Animal Name Generator for Games & Writing',
  description:
    'Random animal name generator with copy-ready lists, category filters, and common or scientific formats for writing, games, and class use.',
  path: '/random-animal-name-generator/',
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
