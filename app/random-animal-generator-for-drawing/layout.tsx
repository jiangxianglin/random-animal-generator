import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

// Title ≤60 (absolute); Description ≤160 — exact keyword "random animal generator for drawing"
export const metadata: Metadata = buildPageMetadata({
  title: 'Random Animal Generator for Drawing: Free',
  description:
    'Random animal generator for drawing with free animal subjects, difficulty filters, and reference tips for sketch practice—no signup.',
  path: '/random-animal-generator-for-drawing',
  image: '/og-random-animal-generator-for-drawing.png',
  imageAlt: 'Random animal generator for drawing — wildlife sketch subjects with difficulty filters',
  imageWidth: 1200,
  imageHeight: 630,
  imageType: 'image/png',
  datePublished: '2026-07-02T00:00:00.000Z',
  dateModified: '2026-08-12T00:00:00.000Z',
  ogType: 'article',
  absoluteTitle: true,
});

export default function RandomAnimalGeneratorForDrawingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
