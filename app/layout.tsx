import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://randomanimalgenerator.online';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Random Animal Generator for Drawing - Free Practice Tool with Tips & Difficulty Levels",
  description: "Random animal generator designed for artists and drawing practice. Get animals with difficulty ratings (Easy/Medium/Hard), drawing tips, and challenge modes. Perfect for daily art practice, skill building, and creative inspiration.",
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🦁</text></svg>',
        type: 'image/svg+xml',
      },
    ],
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Random Animal Generator for Drawing - Free Practice Tool",
    description: "Random animal generator for artists with difficulty ratings, drawing tips, and challenge modes. Perfect for daily drawing practice and skill building.",
    type: "website",
    url: siteUrl,
    siteName: "Random Animal Generator for Drawing",
    images: [
      {
        url: '/RandomAnimalGenerator-hero.png',
        width: 1920,
        height: 1080,
        alt: 'Random animal generator for drawing practice with diverse wildlife',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Random Animal Generator for Drawing",
    description: "Get random animals with difficulty ratings and drawing tips. Perfect for daily art practice and skill building.",
    images: ['/RandomAnimalGenerator-hero.png'],
    creator: '@randomanimals',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
