import type { Metadata } from 'next';
import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo';
import { SITE_EMAIL, SITE_NAME, SITE_TWITTER } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact Random Animal Generator',
  description:
    'Contact Random Animal Generator for feedback, corrections, classroom questions, or partnership notes.',
  path: '/contact',
  noindex: true,
});

export default function ContactPage() {
  const twitterHandle = SITE_TWITTER.replace('@', '');

  return (
    <main className="paper-atmosphere min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-[var(--ink)] md:text-5xl">
          Contact
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[var(--ink-muted)]">
          {SITE_NAME} is a small independent project. Reach us through any channel below—we read
          feedback about bugs, animal data corrections, and classroom use cases.
        </p>

        <section className="home-section">
          <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">Email</h2>
          <p className="mt-4 leading-relaxed text-[var(--ink-muted)]">
            <a className="home-link" href={`mailto:${SITE_EMAIL}`}>
              {SITE_EMAIL}
            </a>
          </p>
        </section>

        <section className="home-section">
          <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">Social</h2>
          <p className="mt-4 leading-relaxed text-[var(--ink-muted)]">
            Message{' '}
            <a
              className="home-link"
              href={`https://twitter.com/${twitterHandle}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {SITE_TWITTER}
            </a>{' '}
            on X / Twitter.
          </p>
        </section>

        <section className="home-section">
          <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">Related</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--ink-muted)]">
            <li>
              <Link href="/about" className="home-link">
                About the project
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="home-link">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="home-link">
                Terms of use
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
