import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

// Title ≤60 (absolute); Description ≤160 — exact keyword "give me a random animal"
export const metadata: Metadata = buildPageMetadata({
  title: 'Give Me a Random Animal: Free Instant Pick',
  description:
    'Give me a random animal—free one-click wildlife picks with facts and photos. For games, classrooms, and writing. No signup.',
  path: '/give-me-a-random-animal',
  image: '/og-give-me-a-random-animal.png',
  imageAlt: 'Give me a random animal — instant wildlife pick with facts and a reference photo',
  imageWidth: 1200,
  imageHeight: 630,
  imageType: 'image/png',
  datePublished: '2026-08-15T00:00:00.000Z',
  dateModified: '2026-08-15T00:00:00.000Z',
  ogType: 'article',
  absoluteTitle: true,
});

export default function GiveMeARandomAnimalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
