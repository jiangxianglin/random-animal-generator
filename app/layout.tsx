import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://randomanimalgenerator.online';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Random Animal Generator for Drawing - Free Practice Tool",
  description: "Free random animal generator for artists. Get animals with difficulty ratings, drawing tips, and challenges. Perfect for daily art practice.",
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%234F46E5"/><text x="50" y="68" font-size="50" text-anchor="middle" fill="white">🐾</text></svg>',
        type: 'image/svg+xml',
      },
    ],
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Random Animal Generator for Drawing - Free Practice Tool",
    description: "Free random animal generator for artists. Get animals with difficulty ratings, drawing tips, and challenges. Perfect for daily art practice.",
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
    description: "Free random animal generator for artists. Get animals with difficulty ratings, drawing tips, and challenges.",
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
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-MMH4GLMQTR"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-MMH4GLMQTR');
            `,
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
