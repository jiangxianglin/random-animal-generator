import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";
import {
  PRIMARY_NAV_ITEMS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TWITTER,
} from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: `${SITE_NAME} - Free Online Random Animal Tool`,
    description: SITE_DESCRIPTION,
    path: "/",
    image: "/RandomAnimalGenerator-hero.png",
    imageAlt: "Random animal generator interface with wildlife examples",
  }),
  title: {
    default: `${SITE_NAME} - Free Online Random Animal Tool`,
    template: `%s | ${SITE_NAME}`,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
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
        <meta name="msvalidate.01" content="43187DC780902969FDD60090285A833A" />
        <meta name="pinterest" content="nopin" />
        <meta name="pinterest-rich-pin" content="true" />
      </head>
      <body className={inter.className}>
        <nav className="sticky top-0 z-50 bg-indigo-600 text-white shadow-lg">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center space-x-8">
                <Link href="/" className="flex items-center space-x-2 transition-opacity hover:opacity-90">
                  <span aria-hidden="true" className="text-xs font-semibold uppercase tracking-[0.3em]">
                    RA
                  </span>
                  <span className="text-lg font-bold">{SITE_NAME}</span>
                </Link>
                <div className="hidden items-center space-x-6 md:flex">
                  {PRIMARY_NAV_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-lg px-4 py-2 transition-colors hover:bg-indigo-700"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <a
                  href={`https://twitter.com/${SITE_TWITTER.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg px-3 py-2 transition-colors hover:bg-indigo-700"
                  aria-label="Follow us on Twitter"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-indigo-500 md:hidden">
            <div className="space-y-2 px-4 py-3">
              {PRIMARY_NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg px-3 py-2 transition-colors hover:bg-indigo-700"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
