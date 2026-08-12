import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

// Title ≤60 (absolute); Description ≤160 — both include exact keyword "random animal picker"
export const metadata: Metadata = buildPageMetadata({
  title: 'Random Animal Picker: Free Instant Pick',
  description:
    'Random animal picker for free one-click wildlife picks—games, classrooms, and writing. Filter by category—no signup.',
  path: '/random-animal-picker',
  image: '/og-random-animal-picker.png',
  imageAlt: 'Random animal picker — wildlife field guide picks for games and classrooms',
  imageWidth: 1200,
  imageHeight: 630,
  imageType: 'image/png',
  datePublished: '2026-07-26T00:00:00.000Z',
  dateModified: '2026-08-12T00:00:00.000Z',
  ogType: 'article',
  absoluteTitle: true,
});

export default function RandomAnimalPickerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
