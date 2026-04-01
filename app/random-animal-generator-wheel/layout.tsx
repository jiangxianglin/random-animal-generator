import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://randomanimalgenerator.online';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Random Animal Generator Wheel - Free Spinner for Games",
  description: "Use our free Random Animal Generator Wheel to pick animals randomly for games and education. 90+ animals, instant results!",
  authors: [{ name: "Random Animal Generator" }],
  creator: "Random Animal Generator",
  publisher: "Random Animal Generator",
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="%234F46E5"/><text x="50" y="68" font-size="50" text-anchor="middle" fill="white">🐾</text></svg>',
        type: 'image/svg+xml',
      },
    ],
  },
  alternates: {
    canonical: '/random-animal-generator-wheel',
  },
  openGraph: {
    title: "Random Animal Generator Wheel - Free Spinner for Games",
    description: "Use our free Random Animal Generator Wheel to pick animals randomly for games and education. 90+ animals, instant results!",
    url: `${siteUrl}/random-animal-generator-wheel`,
    siteName: "Random Animal Generator",
    images: [
      {
        url: '/og-random-animal-generator-wheel.png',
        width: 1200,
        height: 630,
        alt: 'Random Animal Generator Wheel - Free Online Spinning Tool with 90+ Animals',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Random Animal Generator Wheel - Free Spinner",
    description: "Use our free Random Animal Generator Wheel to pick animals randomly for games and education. 90+ animals!",
    images: ['/og-random-animal-generator-wheel.png'],
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
};

export default function WheelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Random Animal Generator Wheel",
              "description": "A free online spinning wheel tool that randomly selects animals from a database of 90+ species. Perfect for games, education, and creative writing.",
              "url": `${siteUrl}/random-animal-generator-wheel`,
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "Any",
              "browserRequirements": "Requires modern web browser",
              "softwareVersion": "1.0",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "256"
              },
              "screenshot": `${siteUrl}/RandomAnimalGenerator-wheel-preview.png`,
              "featureList": [
                "Random animal selection via spinning wheel",
                "Category filtering (mammals, birds, reptiles, marine, insects)",
                "Instant results with animal images",
                "Works on desktop and mobile devices",
                "No registration required",
                "Completely free to use"
              ]
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How does the random animal wheel work?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our random animal generator wheel uses a mathematical algorithm to ensure truly random selection. When you click the spin button, the wheel rotates for a random duration (4-6 seconds) and stops at a random position, selecting that animal."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How many animals are in the database?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Currently, our database contains 90+ different animals spanning 5 major categories: mammals, birds, reptiles, marine animals, and insects."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is the selection truly random?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! We use a cryptographically secure random number generator to ensure that every spin is completely unpredictable and fair."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I use this tool for commercial purposes?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! Our random animal wheel is free to use for any purpose, including educational, entertainment, and commercial applications."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do I need to register to use the tool?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No! Our random animal wheel is completely free to use without any registration or download required."
                  }
                }
              ]
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
