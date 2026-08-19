import type { Metadata } from 'next';
import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo';
import { SITE_EMAIL, SITE_NAME } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'Privacy Policy',
  description:
    'Privacy policy for Random Animal Generator: what we collect, how local browser storage works, and how to contact us.',
  path: '/privacy',
  noindex: true,
});

export default function PrivacyPage() {
  return (
    <main className="paper-atmosphere min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-[var(--ink)] md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-[var(--ink-faint)]">Last updated: July 26, 2026</p>
        <p className="mt-5 text-lg leading-relaxed text-[var(--ink-muted)]">
          This privacy policy explains how {SITE_NAME} handles information when you use our free
          browser tools.
        </p>

        <section className="home-section">
          <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
            What we do not require
          </h2>
          <p className="mt-4 leading-relaxed text-[var(--ink-muted)]">
            You can use the core generators without creating an account. We do not sell personal
            profiles or require payment for drawing prompts.
          </p>
        </section>

        <section className="home-section">
          <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">
            Local browser storage
          </h2>
          <p className="mt-4 leading-relaxed text-[var(--ink-muted)]">
            Optional features such as generation history may store data in your browser&apos;s local
            storage on your device. That data stays local unless you clear it in the product or in
            your browser settings.
          </p>
        </section>

        <section className="home-section">
          <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">Analytics</h2>
          <p className="mt-4 leading-relaxed text-[var(--ink-muted)]">
            We may use privacy-conscious analytics (such as Google Analytics) to understand aggregate
            traffic and improve the product. Analytics providers may process technical data like page
            views and device/browser information according to their own policies.
          </p>
        </section>

        <section className="home-section">
          <h2 className="font-display text-2xl font-semibold text-[var(--ink)]">Contact</h2>
          <p className="mt-4 leading-relaxed text-[var(--ink-muted)]">
            Privacy questions:{' '}
            <a className="home-link" href={`mailto:${SITE_EMAIL}`}>
              {SITE_EMAIL}
            </a>{' '}
            or the{' '}
            <Link href="/contact" className="home-link">
              contact page
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
