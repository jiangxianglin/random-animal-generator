import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Random Animal Generator for Drawing (Free Art Prompts)',
  description:
    'Generate random animals for drawing prompts with difficulty and category filters. Free, fast, and built for sketch practice, art challenges, and classroom activities.',
  path: '/random-animal-generator-for-drawing',
  image: '/home-hero-field-atelier.png',
  imageAlt: 'Random animal generator for drawing prompts preview',
});

export default function RandomAnimalGeneratorForDrawingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
