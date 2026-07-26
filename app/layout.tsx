import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { buildOrganizationSchema, buildPageMetadata, buildWebSiteSchema } from "@/lib/seo";
import {
  PRIMARY_NAV_ITEMS,
  SITE_NAME,
  SITE_TWITTER,
} from "@/lib/site";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const rootStructuredData = [buildOrganizationSchema(), buildWebSiteSchema()];

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: `Random Animal Generator for Drawing, Games & Classrooms`,
    description:
      "Generate random animals online with category filters, drawing difficulty, challenge modes, and classroom-friendly prompts.",
    path: "/",
    image: "/home-hero-field-atelier.png",
    imageAlt: "Misty woodland wildlife scene for random animal drawing prompts",
  }),
  title: {
    default: `Random Animal Generator for Drawing, Games & Classrooms`,
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
    <html lang="en" className={`${sourceSans.variable} ${fraunces.variable}`}>
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootStructuredData) }}
        />
      </head>
      <body className={`${sourceSans.className} antialiased`}>
        <nav className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--ink)] text-[var(--paper)]">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-8">
                <Link href="/" className="group flex items-baseline gap-2 transition-opacity hover:opacity-90">
                  <span className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                    {SITE_NAME}
                  </span>
                </Link>
                <div className="hidden items-center gap-1 md:flex">
                  {PRIMARY_NAV_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium text-[var(--paper)]/85 transition-colors hover:bg-white/10 hover:text-[var(--paper)]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <a
                  href={`https://twitter.com/${SITE_TWITTER.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-[var(--radius-sm)] px-3 py-2 text-[var(--paper)]/85 transition-colors hover:bg-white/10 hover:text-[var(--paper)]"
                  aria-label="Follow us on Twitter"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 md:hidden">
            <div className="flex flex-wrap gap-1 px-4 py-2">
              {PRIMARY_NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium text-[var(--paper)]/85 transition-colors hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
