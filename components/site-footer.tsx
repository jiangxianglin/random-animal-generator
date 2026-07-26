import Link from 'next/link';
import { SITE_NAME, SITE_TWITTER, TRUST_NAV_ITEMS } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--ink)] text-[var(--paper)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-md">
          <p className="font-display text-lg font-semibold">{SITE_NAME}</p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--paper)]/75">
            Free animal prompts for drawing, classrooms, and games. No signup. Generation runs in your
            browser.
          </p>
        </div>
        <nav aria-label="Site trust links" className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
          {TRUST_NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[var(--paper)]/85 underline-offset-4 transition-opacity hover:opacity-100 hover:underline"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={`https://twitter.com/${SITE_TWITTER.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--paper)]/85 underline-offset-4 transition-opacity hover:opacity-100 hover:underline"
          >
            Twitter / X
          </a>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-4 text-xs text-[var(--paper)]/60">
          &copy; {new Date().getFullYear()} {SITE_NAME}. Production site served over HTTPS at
          randomanimalgenerator.online.
        </p>
      </div>
    </footer>
  );
}
