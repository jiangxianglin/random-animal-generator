import Image from 'next/image';
import Link from 'next/link';
import { AnimalNameGeneratorClient } from '@/components/animal-name-generator-client';
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildHowToSchema,
  buildWebAppSchema,
  buildWebPageSchema,
} from '@/lib/seo';
import {
  LAST_MAJOR_UPDATE,
  SITE_AUTHOR,
  SITE_NAME,
} from '@/lib/site';

const PAGE_PUBLISHED = '2026-07-02T00:00:00.000Z';
const PAGE_MODIFIED = LAST_MAJOR_UPDATE.toISOString();

const FAQS = [
  {
    question: 'What is a random animal name generator?',
    answer:
      'A random animal name generator is a free tool that creates a copy-ready list of animal names—common, scientific, or both—so you can paste them into writing prompts, worksheets, or game rounds without browsing a directory.',
  },
  {
    question: 'Who should use this random animal name generator?',
    answer:
      'Writers needing story seeds, teachers running science drills, quiz hosts starting a round, and anyone who wants a pasteable name list faster than a card picker or wheel.',
  },
  {
    question: 'Does it include scientific animal names?',
    answer:
      'Yes. Choose common only, scientific only, or a combined format that shows both on every line.',
  },
  {
    question: 'Can I filter names by animal category?',
    answer:
      'Yes. Generate from all animals or lock mammals, birds, reptiles, marine animals, or insects.',
  },
  {
    question: 'How is this different from the random animal picker or wheel?',
    answer:
      'This page optimizes for pasteable name lists and output modes (list, writing, study, game). The picker is for instant animal cards; the wheel is for a live spin reveal.',
  },
  {
    question: 'Is the random animal name generator free?',
    answer:
      'Yes. It runs in your browser with no signup and no paywall—copy lists or download a .txt anytime.',
  },
  {
    question: 'What are the use-case presets?',
    answer:
      'Fast list, Writer pack, Science drill, and Party round. Each preset sets quantity, format, and output mode so you start closer to the job you came to do.',
  },
] as const;

const HOW_TO_STEPS = [
  {
    name: 'Pick a use case',
    text: 'Start with Fast list, Writer pack, Science drill, or Party round—each sets format, mode, and quantity.',
  },
  {
    name: 'Refine filters if needed',
    text: 'Adjust quantity, category, format, or output mode; numbered lines help worksheets.',
  },
  {
    name: 'Copy or download',
    text: 'Copy the list, download a .txt, or regenerate for a fresh pack without clearing your setup.',
  },
] as const;

const PERSONAS = [
  {
    title: 'Writers & worldbuilders',
    text: 'Open Writer pack for five mammal names with story-seed notes—then copy or download a .txt into your draft.',
  },
  {
    title: 'Teachers & students',
    text: 'Use Science drill for Latin-first lists, numbered lines for worksheets, and download for shared class packs.',
  },
  {
    title: 'Quiz & party hosts',
    text: 'Party round gives a short common-name list with guessing cues—regenerate between rounds without redoing filters.',
  },
  {
    title: 'Fast list builders',
    text: 'Fast list is the default: plain common names, copy-ready, no photos or spin theatrics in the way.',
  },
] as const;

const USE_IDEAS = [
  {
    title: 'Story prompt packs',
    text: 'Generate five mammal names in writing mode and assign each to a scene or character beat.',
  },
  {
    title: 'Science vocabulary',
    text: 'Use scientific-only lists for matching exercises: common name on one side, Latin on the other.',
  },
  {
    title: 'Classroom icebreakers',
    text: 'Copy a game-mode list and have students act out or describe each animal in thirty seconds.',
  },
  {
    title: 'Worksheet prep',
    text: 'Generate twelve names, paste into a doc, and turn them into fill-in or category-sort tasks.',
  },
] as const;

const STATS = [
  { value: '121', label: 'Curated animals' },
  { value: '4', label: 'Use-case presets' },
  { value: '3', label: 'Name formats' },
  { value: '0', label: 'Signup required' },
] as const;

const FEATURE_LIST = [
  'Copy-ready random animal name lists (1–12 names)',
  'Use cases: Fast list, Writer pack, Science drill, Party round',
  'Formats: common, scientific, or combined',
  'Output modes: plain list, writing, study, and game',
  'Numbered lines + download .txt for worksheets and docs',
] as const;

function formatDisplayDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default function RandomAnimalNameGeneratorPage() {
  const structuredData = [
    buildWebPageSchema({
      name: 'Random Animal Name Generator',
      description:
        'A free random animal name generator for copy-ready common and scientific name lists—writing, classroom, and games.',
      path: '/random-animal-name-generator',
      datePublished: PAGE_PUBLISHED,
      dateModified: PAGE_MODIFIED,
    }),
    buildWebAppSchema({
      name: 'Random Animal Name Generator',
      description:
        'A free random animal name generator for copy-ready common and scientific name lists—writing, classroom, and games.',
      path: '/random-animal-name-generator',
      datePublished: PAGE_PUBLISHED,
      dateModified: PAGE_MODIFIED,
      featureList: [...FEATURE_LIST],
    }),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Random Animal Name Generator', path: '/random-animal-name-generator' },
    ]),
    buildHowToSchema(
      'How to use the random animal name generator',
      'Generate and copy a random animal name list in three steps.',
      '/random-animal-name-generator',
      HOW_TO_STEPS,
    ),
    buildFaqSchema(FAQS),
  ];

  return (
    <div className="paper-atmosphere relative min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden text-[var(--paper)]">
        <Image
          src="/random-animal-name-hero-v2.webp"
          alt="Naturalist desk with fox study and notebook of animal names — random animal name generator mood"
          fill
          priority
          className="object-cover object-[center_40%] animate-home-fade"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[rgba(28,26,23,0.82)] via-[rgba(28,26,23,0.42)] to-[rgba(28,26,23,0.16)]"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col justify-end px-4 pb-14 pt-20 md:pb-20 md:pt-24">
          <p className="animate-home-rise text-sm font-semibold uppercase tracking-[0.22em] text-[var(--paper)]/80">
            Free · Copy-ready · No signup
          </p>
          <h1 className="font-display animate-home-rise-delay mt-3 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
            Random Animal Name Generator
          </h1>
          <p className="animate-home-rise-delay-2 mt-5 max-w-xl text-lg leading-relaxed text-[var(--paper)]/90 md:text-xl">
            A random animal name generator is a free tool that builds pasteable animal name
            lists—common, scientific, or both—for writers, classrooms, and party rounds.
          </p>
          <div className="animate-home-rise-delay-2 mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="#generator" className="home-cta-light">
              Open name tool
            </a>
            <a href="#use-ideas" className="home-cta-ghost">
              Ways to use it
            </a>
            <Link href="/random-animal-picker" className="home-cta-ghost">
              Prefer animal cards?
            </Link>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 md:py-14">
        <p className="mb-8 text-center text-sm text-[var(--ink-faint)]">
          By{' '}
          <Link href={SITE_AUTHOR.url} className="home-link">
            {SITE_AUTHOR.name}
          </Link>
          {' · '}
          <time dateTime={PAGE_PUBLISHED}>Published {formatDisplayDate(PAGE_PUBLISHED)}</time>
          {' · '}
          <time dateTime={PAGE_MODIFIED}>Updated {formatDisplayDate(PAGE_MODIFIED)}</time>
        </p>

        <AnimalNameGeneratorClient />

        <article>
          <section id="what-is" className="home-section scroll-mt-24">
            <h2 className="home-section-title">What Is a Random Animal Name Generator?</h2>
            <p className="home-prose mt-4">
              A{' '}
              <strong className="font-semibold text-[var(--ink)]">
                random animal name generator
              </strong>{' '}
              creates usable name lists instead of full animal encyclopedia cards. This page focuses
              on copy-ready output, format control, and modes for writing, study, and games.
            </p>
            <ul className="mx-auto mt-8 max-w-2xl list-disc space-y-2 pl-5 text-[var(--ink-muted)]">
              {FEATURE_LIST.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">Random Animal Name Generator Stats</h2>
            <p className="home-prose mt-4">
              Concrete numbers help you judge whether the tool fits a five-name prompt pack or a
              twelve-name worksheet set.
            </p>
            <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="border-t border-[var(--line)] pt-4 text-center">
                  <div className="font-display text-3xl font-semibold text-[var(--ink)]">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-[var(--ink-faint)]">{stat.label}</div>
                </div>
              ))}
            </div>
            <ul className="mx-auto mt-8 max-w-2xl list-disc space-y-2 pl-5 text-sm text-[var(--ink-muted)]">
              <li>Category counts: 33 mammals · 22 birds · 20 reptiles · 22 marine · 24 insects</li>
              <li>Quantity range: 1 to 12 names per generate</li>
              <li>
                Search focus: this page owns{' '}
                <strong className="font-semibold text-[var(--ink)]">
                  random animal name generator
                </strong>
                ; card picks go to the{' '}
                <Link href="/random-animal-picker" className="home-link">
                  random animal picker
                </Link>
                .
              </li>
            </ul>
          </section>

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">Who Should Use This Tool?</h2>
            <p className="home-prose mt-4">
              This random animal name generator is for people who already know they want names—not
              a browsing session through photos and facts.
            </p>
            <div className="mx-auto mt-10 grid max-w-5xl gap-8 md:grid-cols-2">
              {PERSONAS.map((persona) => (
                <div key={persona.title} className="border-t border-[var(--line)] pt-5">
                  <h3 className="font-display text-xl font-semibold text-[var(--ink)]">
                    {persona.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-[var(--ink-muted)]">{persona.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="how-to-use" className="home-section scroll-mt-24">
            <h2 className="home-section-title">How to Use This Random Animal Name Generator</h2>
            <p className="home-prose mt-4">
              To use this random animal name generator, pick a use case, refine filters if you need
              to, then copy or download the list.
            </p>
            <ol className="mx-auto mt-10 grid max-w-5xl list-none gap-8 text-center md:grid-cols-3 md:gap-10 md:text-left">
              {HOW_TO_STEPS.map((step, index) => (
                <li key={step.name} className="border-t border-[var(--line)] pt-5">
                  <div className="font-display text-sm font-medium text-[var(--olive)]">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="mt-2 font-display text-xl font-semibold text-[var(--ink)]">
                    {step.name}
                  </h3>
                  <p className="mt-2 leading-relaxed text-[var(--ink-muted)]">{step.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">Name List vs Picker vs Wheel</h2>
            <p className="home-prose mt-4">
              Use names when you need pasteable text, the picker for instant cards, and the wheel
              when the room should watch a spin.
            </p>
            <div className="mx-auto mt-8 max-w-4xl overflow-x-auto">
              <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Comparison of random animal name generator versus picker and wheel
                </caption>
                <thead>
                  <tr className="border-b border-[var(--line-strong)]">
                    <th scope="col" className="py-3 pr-4 font-semibold text-[var(--ink)]">
                      Need
                    </th>
                    <th scope="col" className="py-3 pr-4 font-semibold text-[var(--ink)]">
                      This name tool
                    </th>
                    <th scope="col" className="py-3 font-semibold text-[var(--ink)]">
                      Picker / wheel
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[var(--ink-muted)]">
                  <tr className="border-b border-[var(--line)]">
                    <th scope="row" className="py-3 pr-4 font-medium text-[var(--ink)]">
                      Output type
                    </th>
                    <td className="py-3 pr-4">Copy-ready name lists</td>
                    <td className="py-3">Cards with images / spin reveal</td>
                  </tr>
                  <tr className="border-b border-[var(--line)]">
                    <th scope="row" className="py-3 pr-4 font-medium text-[var(--ink)]">
                      Scientific names
                    </th>
                    <td className="py-3 pr-4">First-class format option</td>
                    <td className="py-3">Available on cards, not list-first</td>
                  </tr>
                  <tr className="border-b border-[var(--line)]">
                    <th scope="row" className="py-3 pr-4 font-medium text-[var(--ink)]">
                      Multi-result packs
                    </th>
                    <td className="py-3 pr-4">Up to 12 names per generate</td>
                    <td className="py-3">Picker lists; wheel is one-at-a-time</td>
                  </tr>
                  <tr className="border-b border-[var(--line)]">
                    <th scope="row" className="py-3 pr-4 font-medium text-[var(--ink)]">
                      Live showmanship
                    </th>
                    <td className="py-3 pr-4">Minimal—text first</td>
                    <td className="py-3">Wheel wins for theatrical reveals</td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-3 pr-4 font-medium text-[var(--ink)]">
                      Cost / signup
                    </th>
                    <td className="py-3 pr-4">Free, no account</td>
                    <td className="py-3">Same on related tools</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="use-ideas" className="home-section scroll-mt-24">
            <h2 className="home-section-title">Ways to Use Random Animal Names</h2>
            <p className="home-prose mt-4">
              The fastest way to use a random animal name generator is a clear output mode before
              you click generate—plain list for paste, study for class, game for rounds.
            </p>
            <div className="relative mx-auto my-8 w-full max-w-3xl overflow-hidden rounded-[var(--radius-sm)]">
              <Image
                src="/random-animal-name-writing-v2.webp"
                alt="Writer desk with creature name notebook and barn owl sketch for story prompts"
                width={1400}
                height={1050}
                className="h-auto w-full object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="mx-auto mt-10 grid max-w-5xl gap-8 text-left md:grid-cols-2">
              {USE_IDEAS.map((idea) => (
                <div key={idea.title} className="border-t border-[var(--line)] pt-5">
                  <h3 className="font-display text-xl font-semibold text-[var(--ink)]">{idea.title}</h3>
                  <p className="mt-3 leading-relaxed text-[var(--ink-muted)]">{idea.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">Classroom & Writing Tips</h2>
            <p className="home-prose mt-4">
              For classrooms and writing groups, generate once, copy the list, and keep that pack as
              the shared prompt set for the session.
            </p>
            <div className="relative mx-auto my-8 w-full max-w-3xl overflow-hidden rounded-[var(--radius-sm)]">
              <Image
                src="/random-animal-name-classroom-v2.webp"
                alt="Classroom worksheet pairing common and scientific animal names for study drills"
                width={1400}
                height={1050}
                className="h-auto w-full object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="home-prose home-prose-start mx-auto max-w-3xl space-y-4">
              <p>
                Tip: turn on numbered lines, generate once, download the .txt, and keep that file as
                the shared pack for the period—same names for every student.
              </p>
              <p>
                Need animal cards with images? Open the{' '}
                <Link href="/random-animal-picker">random animal picker</Link>. Want a live spin?
                Use the{' '}
                <Link href="/random-animal-generator-wheel">random animal wheel</Link>. Looking for
                timed art prompts? Try the{' '}
                <Link href="/drawing-prompt-generator">drawing prompt generator</Link>.
              </p>
            </div>
          </section>

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">Why Copy-Ready Name Lists Work</h2>
            <p className="home-prose mt-4">
              Copy-ready name lists work because naming tasks fail when the tool forces browsing—
              writers and teachers need text they can move into another document immediately.
            </p>
            <blockquote className="mx-auto mt-8 max-w-3xl border-l-2 border-[var(--olive)] pl-5 text-left">
              <p className="text-lg leading-relaxed text-[var(--ink)]">
                &quot;Binomial nomenclature is a formal system of naming species of living things by
                giving each a name composed of two parts…&quot;
              </p>
              <footer className="mt-3 text-sm text-[var(--ink-faint)]">
                —{' '}
                <cite>
                  <a
                    href="https://en.wikipedia.org/wiki/Binomial_nomenclature"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-link"
                  >
                    Binomial nomenclature, Wikipedia
                  </a>
                </cite>
              </footer>
            </blockquote>
            <blockquote className="mx-auto mt-8 max-w-3xl border-l-2 border-[var(--olive)] pl-5 text-left">
              <p className="text-lg leading-relaxed text-[var(--ink)]">
                &quot;An icebreaker is a facilitation exercise intended to help members of a group begin
                the process of forming themselves into a team.&quot;
              </p>
              <footer className="mt-3 text-sm text-[var(--ink-faint)]">
                —{' '}
                <cite>
                  <a
                    href="https://en.wikipedia.org/wiki/Icebreaker_(facilitation)"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-link"
                  >
                    Icebreaker (facilitation), Wikipedia
                  </a>
                </cite>
              </footer>
            </blockquote>
            <p className="home-prose mt-8">
              That is why this tool ships scientific formats beside common names, and game mode
              beside plain lists: one page can serve biology vocabulary and icebreaker rounds.
            </p>
          </section>

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">Sources & Citations</h2>
            <p className="home-prose mt-4">
              The naming and facilitation framing on this page is grounded in public references. Key
              sources:
            </p>
            <ol className="mx-auto mt-6 max-w-3xl list-decimal space-y-3 pl-5 text-[var(--ink-muted)]">
              <li>
                <a
                  href="https://en.wikipedia.org/wiki/Binomial_nomenclature"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-link"
                >
                  Wikipedia: Binomial nomenclature
                </a>{' '}
                — scientific (Latin) naming used in study mode.
              </li>
              <li>
                <a
                  href="https://en.wikipedia.org/wiki/Icebreaker_(facilitation)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-link"
                >
                  Wikipedia: Icebreaker (facilitation)
                </a>{' '}
                — group warmups that benefit from a shared shortlist of prompts.
              </li>
              <li>
                Internal product data ({SITE_NAME}, 2026): 121-animal database with published category
                counts on this page.
              </li>
            </ol>
          </section>

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">Frequently Asked Questions</h2>
            <div className="mx-auto mt-10 max-w-3xl space-y-6">
              {FAQS.map((faq) => (
                <article key={faq.question} className="border-t border-[var(--line)] pt-5">
                  <h3 className="font-display text-xl font-semibold text-[var(--ink)]">
                    {faq.question}
                  </h3>
                  <p className="mt-3 leading-relaxed text-[var(--ink-muted)]">{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">Related Tools</h2>
            <p className="home-prose mt-4">
              Related tools on {SITE_NAME} share the same wildlife database so you can switch formats
              without restarting your brief.
            </p>
            <ul className="mx-auto mt-8 max-w-3xl list-disc space-y-3 pl-5 text-[var(--ink-muted)]">
              <li>
                <Link href="/cute-animal-generator" className="home-link">
                  cute animal generator
                </Link>{' '}
                — adorable animals with story-style prompt options.
              </li>
              <li>
                <Link href="/" className="home-link">
                  random animal generator
                </Link>{' '}
                — full generator with images and facts.
              </li>
              <li>
                <Link href="/random-animal-picker" className="home-link">
                  random animal picker
                </Link>{' '}
                — instant animal card picks.
              </li>
              <li>
                <Link href="/random-animal-generator-wheel" className="home-link">
                  random animal generator wheel
                </Link>{' '}
                — spin reveal for live games.
              </li>
              <li>
                <Link href="/drawing-prompt-generator" className="home-link">
                  drawing prompt generator
                </Link>{' '}
                — timed animal art prompts.
              </li>
            </ul>
          </section>
        </article>

        <footer className="home-section text-center">
          <p className="font-display text-lg font-semibold text-[var(--ink)]">
            Free random animal name lists—no signup
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[var(--ink-muted)]">
            Explore more:{' '}
            <Link href="/" className="home-link">
              random animal generator
            </Link>
            ,{' '}
            <Link href="/random-animal-picker" className="home-link">
              random animal picker
            </Link>
            ,{' '}
            <Link href="/random-animal-generator-wheel" className="home-link">
              random animal wheel
            </Link>
            .
          </p>
        </footer>
      </div>
    </div>
  );
}
