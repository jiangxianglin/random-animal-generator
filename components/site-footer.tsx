import Link from 'next/link';
import { SITE_NAME, SITE_TWITTER, TOOL_NAV_ITEMS, TRUST_NAV_ITEMS } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--ink)] text-[var(--paper)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="max-w-md">
          <p className="font-display text-lg font-semibold">{SITE_NAME}</p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--paper)]/75">
            Free animal prompts for drawing, classrooms, and games. No signup. Generation runs in your
            browser.
          </p>
        </div>

        <nav aria-label="Tool navigation">
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--paper)]/55">Tools</p>
          <ul className="mt-3 space-y-2 text-sm font-medium">
            <li>
              <Link
                href="/"
                className="text-[var(--paper)]/85 underline-offset-4 transition-opacity hover:opacity-100 hover:underline"
              >
                random animal generator
              </Link>
            </li>
            {TOOL_NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[var(--paper)]/85 underline-offset-4 transition-opacity hover:opacity-100 hover:underline"
                >
                  {item.keyword}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Site trust links">
          <p className="text-sm font-semibold uppercase tracking-wide text-[var(--paper)]/55">Site</p>
          <ul className="mt-3 space-y-2 text-sm font-medium">
            {TRUST_NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[var(--paper)]/85 underline-offset-4 transition-opacity hover:opacity-100 hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={`https://twitter.com/${SITE_TWITTER.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--paper)]/85 underline-offset-4 transition-opacity hover:opacity-100 hover:underline"
              >
                Twitter / X
              </a>
            </li>
          </ul>
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
