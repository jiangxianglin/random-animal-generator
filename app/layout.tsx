import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://randomanimalgenerator.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Random Animal Generator - Educational Wildlife Discovery Tool",
  description: "Generate random animals with fascinating facts and high-quality images. Perfect for educators, students, artists, and wildlife enthusiasts. Explore mammals, birds, reptiles, marine life, and insects instantly.",
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
    title: "Random Animal Generator - Educational Wildlife Discovery Tool",
    description: "Discover fascinating wildlife with our educational animal generator. Perfect for teachers, students, and animal lovers. Generate random animals from 5 categories with facts and images.",
    type: "website",
    url: siteUrl,
    siteName: "Random Animal Generator",
    images: [
      {
        url: '/RandomAnimalGenerator-UseCasesSection.png',
        width: 2560,
        height: 1080,
        alt: 'Educational classroom scene with students learning about animals',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Random Animal Generator - Educational Wildlife Discovery Tool",
    description: "Generate random animals with facts and images. Perfect for educators, students, and wildlife enthusiasts.",
    images: ['/RandomAnimalGenerator-UseCasesSection.png'],
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
