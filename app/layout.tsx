import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
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
        <meta name="pinterest" content="nopin" />
        <meta name="pinterest-rich-pin" content="true" />
        <meta property="og:description" content="Free random animal generator for artists with drawing tips, difficulty ratings, and challenge modes." />
        <meta property="og:type" content="website" />
      </head>
      <body className={inter.className}>
        {/* Global Navigation Bar */}
        <nav className="bg-indigo-600 text-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-8">
                <Link href="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
                  <span className="text-2xl">🐾</span>
                  <span className="font-bold text-lg">Random Animal Generator</span>
                </Link>
                <div className="hidden md:flex items-center space-x-6">
                  <Link href="/" className="hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors">
                    Home
                  </Link>
                  <Link href="/random-animal-generator-wheel" className="hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors">
                    🎡 Wheel Tool
                  </Link>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <a 
                  href="https://twitter.com/randomanimals" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:bg-indigo-700 px-3 py-2 rounded-lg transition-colors"
                  aria-label="Follow us on Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          {/* Mobile Menu */}
          <div className="md:hidden border-t border-indigo-500">
            <div className="px-4 py-3 space-y-2">
              <Link href="/" className="block hover:bg-indigo-700 px-3 py-2 rounded-lg transition-colors">
                🏠 Home
              </Link>
              <Link href="/random-animal-generator-wheel" className="block hover:bg-indigo-700 px-3 py-2 rounded-lg transition-colors">
                🎡 Wheel Tool
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
