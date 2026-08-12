import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

// Title ≤60 (absolute, bypasses root "| Random Animal Generator" template)
// Description ≤160 — both include exact keyword "Drawing Prompt Generator"
export const metadata: Metadata = buildPageMetadata({
  title: 'Drawing Prompt Generator: Free Animal Ideas',
  description:
    'Drawing Prompt Generator for free random animal art ideas, timed warmups, and daily challenges. Filter by difficulty—no signup.',
  path: '/drawing-prompt-generator',
  image: '/og-drawing-prompt-generator.png',
  imageAlt: 'Drawing Prompt Generator — artist studio with animal sketch studies',
  imageWidth: 1200,
  imageHeight: 630,
  imageType: 'image/png',
  datePublished: '2026-07-25T00:00:00.000Z',
  dateModified: '2026-08-12T00:00:00.000Z',
  ogType: 'article',
  absoluteTitle: true,
});

export default function DrawingPromptGeneratorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
