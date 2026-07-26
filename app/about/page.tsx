import type { Metadata } from 'next';
import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo';
import { SITE_EMAIL, SITE_NAME, SITE_TWITTER } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'About Random Animal Generator',
  description:
    'Learn who builds Random Animal Generator, who the tools are for, and how we keep drawing prompts and classroom pickers free to use.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <main className="paper-atmosphere min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-[var(--ink)] md:text-5xl">
          About {SITE_NAME}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[var(--ink-muted)]">
          {SITE_NAME} is a free web toolkit that helps artists, teachers, students, and families pick
          useful animals in seconds—for drawing prompts, classroom warmups, and light games.
        </p>

        <section className="home-section">
          <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">Who we serve</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--ink-muted)]">
            <li>Illustrators and concept artists who need a clear animal brief</li>
            <li>Art students running timed gesture or silhouette warmups</li>
            <li>Teachers who want fair, category-controlled classroom prompts</li>
            <li>Writers and families looking for a quick animal picker</li>
          </ul>
        </section>

        <section className="home-section">
          <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">How the product works</h2>
          <p className="mt-4 leading-relaxed text-[var(--ink-muted)]">
            Generation happens in your browser from a curated wildlife database of 121 animals across
            five categories. We do not require accounts for core features. Optional local history stays
            on your device.
          </p>
          <p className="mt-4 leading-relaxed text-[var(--ink-muted)]">
            Start with the{' '}
            <Link href="/drawing-prompt-generator" className="home-link">
              drawing prompt generator
            </Link>{' '}
            for timed art practice, or return to the{' '}
            <Link href="/" className="home-link">
              random animal generator
            </Link>{' '}
            for filters and challenge modes.
          </p>
        </section>

        <section className="home-section">
          <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">Contact</h2>
          <p className="mt-4 leading-relaxed text-[var(--ink-muted)]">
            Questions, corrections, or partnership notes:{' '}
            <Link href="/contact" className="home-link">
              Contact page
            </Link>
            , email{' '}
            <a className="home-link" href={`mailto:${SITE_EMAIL}`}>
              {SITE_EMAIL}
            </a>
            , or {SITE_TWITTER} on X.
          </p>
        </section>
      </div>
    </main>
  );
}
