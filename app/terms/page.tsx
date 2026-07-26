import type { Metadata } from 'next';
import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo';
import { SITE_EMAIL, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'Terms of Use',
  description:
    'Terms of use for Random Animal Generator free drawing prompt and animal picker tools.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <main className="paper-atmosphere min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-[var(--ink)] md:text-5xl">
          Terms of Use
        </h1>
        <p className="mt-3 text-sm text-[var(--ink-faint)]">Last updated: July 26, 2026</p>
        <p className="mt-5 text-lg leading-relaxed text-[var(--ink-muted)]">
          By using {SITE_NAME}, you agree to these terms. The tools are provided free for personal,
          educational, and classroom use.
        </p>

        <section className="home-section">
          <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">Acceptable use</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--ink-muted)]">
            <li>Use prompts and animal picks for sketching, teaching, writing, and games.</li>
            <li>Do not abuse the site with automated scraping that harms availability.</li>
            <li>Do not misrepresent the brand or claim official endorsement without permission.</li>
          </ul>
        </section>

        <section className="home-section">
          <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
            Content and accuracy
          </h2>
          <p className="mt-4 leading-relaxed text-[var(--ink-muted)]">
            Animal facts, names, and images are curated for creative practice. They are not a
            substitute for scientific field guides. Reference images may come from third-party hosts;
            rights remain with their respective owners.
          </p>
        </section>

        <section className="home-section">
          <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">Disclaimer</h2>
          <p className="mt-4 leading-relaxed text-[var(--ink-muted)]">
            The service is provided &quot;as is&quot; without warranties of uninterrupted availability.
            We may update features, animal data, or these terms as the product evolves.
          </p>
        </section>

        <section className="home-section">
          <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">Contact</h2>
          <p className="mt-4 leading-relaxed text-[var(--ink-muted)]">
            Questions:{' '}
            <a className="home-link" href={`mailto:${SITE_EMAIL}`}>
              {SITE_EMAIL}
            </a>{' '}
            ·{' '}
            <Link href="/privacy" className="home-link">
              Privacy
            </Link>{' '}
            ·{' '}
            <Link href="/about" className="home-link">
              About
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
