import Image from 'next/image';
import Link from 'next/link';
import { AnimalPickerTool } from '@/components/animal-picker-tool';
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
  SITE_DATE_PUBLISHED,
  SITE_NAME,
} from '@/lib/site';

const PAGE_PUBLISHED = '2026-07-26T00:00:00.000Z';
const PAGE_MODIFIED = LAST_MAJOR_UPDATE.toISOString();

const FAQS = [
  {
    question: 'What is a random animal picker?',
    answer:
      'A random animal picker is a free tool that selects one or more animals at random so you can make a fair choice for games, classrooms, writing, or quick decisions—without spinning a wheel or signing up.',
  },
  {
    question: 'Who should use this random animal picker?',
    answer:
      'It is built for party hosts, teachers, writers, RPG players, and anyone who needs a fast, unbiased animal pick with optional category filters.',
  },
  {
    question: 'How is this different from the random animal wheel?',
    answer:
      'The wheel is a theatrical one-at-a-time spin. This random animal picker is for instant picks, multi-animal lists, category locks, and a shared daily pick when speed matters more than animation.',
  },
  {
    question: 'Can everyone get the same animal?',
    answer:
      "Yes. Use Today's pick for one shared animal each calendar day—useful for classrooms, family game night, or a Discord writing challenge.",
  },
  {
    question: 'Is the random animal picker free?',
    answer:
      'Yes. It runs in your browser, requires no account, and does not gate the core picker behind a signup.',
  },
  {
    question: 'Can I filter picks by animal type?',
    answer:
      'Yes. Use Category pick to lock mammals, birds, reptiles, marine animals, or insects before you pick.',
  },
] as const;

const HOW_TO_STEPS = [
  {
    name: 'Choose a picker mode',
    text: 'Start with Pick one, or switch to a list, category lock, or today’s shared animal.',
  },
  {
    name: 'Set optional filters',
    text: 'Narrow by category or difficulty when you want controlled randomness instead of a fully open pick.',
  },
  {
    name: 'Pick and use the result',
    text: 'Reveal the animal card, copy the pick for chat or worksheets, then regenerate anytime.',
  },
] as const;

const PERSONAS = [
  {
    title: 'Party & game hosts',
    text: 'Settle “who goes first” or assign animal roles in seconds with a fair one-click pick.',
  },
  {
    title: 'Teachers & homeschoolers',
    text: 'Give every student the same daily animal, or category-lock a mammal unit without preparation time.',
  },
  {
    title: 'Writers & RPG players',
    text: 'Grab a creature for a character, encounter, or story seed with name, facts, and a reference image.',
  },
  {
    title: 'Quick decision makers',
    text: 'Skip long lists and spin animations when you only need a clean random animal right now.',
  },
] as const;

const USE_IDEAS = [
  {
    title: 'Icebreaker rounds',
    text: 'Pick one animal and ask each person to share a fact, sound, or memory tied to it.',
  },
  {
    title: 'Team assignments',
    text: 'Pick a short list and assign each animal to a team for scavenger hunts or trivia.',
  },
  {
    title: 'Writing seeds',
    text: 'Copy a pick into your notes and build a character, setting, or plot beat around it.',
  },
  {
    title: 'Classroom fairness',
    text: 'Reveal Today’s pick so every student researches or draws the same animal.',
  },
] as const;

const STATS = [
  { value: '121', label: 'Curated animals' },
  { value: '5', label: 'Wildlife categories' },
  { value: '4', label: 'Picker modes' },
  { value: '0', label: 'Signup required' },
] as const;

const FEATURE_LIST = [
  'Instant random animal picks with reference images and facts',
  'Picker modes: pick one, pick a list, category pick, today’s shared pick',
  'Category filters: mammals, birds, reptiles, marine animals, insects',
  'Optional difficulty filters when you also want drawing-ready subjects',
  'Copyable pick lists for chat, slides, worksheets, or game night',
] as const;

function formatDisplayDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default function RandomAnimalPickerPage() {
  const structuredData = [
    buildWebPageSchema({
      name: 'Random Animal Picker',
      description:
        'A free random animal picker for instant wildlife picks—games, classrooms, writing, and fair decisions.',
      path: '/random-animal-picker',
      datePublished: PAGE_PUBLISHED,
      dateModified: PAGE_MODIFIED,
    }),
    buildWebAppSchema({
      name: 'Random Animal Picker',
      description:
        'A free random animal picker for instant wildlife picks—games, classrooms, writing, and fair decisions.',
      path: '/random-animal-picker',
      datePublished: PAGE_PUBLISHED,
      dateModified: PAGE_MODIFIED,
      featureList: [...FEATURE_LIST],
    }),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Random Animal Picker', path: '/random-animal-picker' },
    ]),
    buildHowToSchema(
      'How to use the random animal picker',
      'Pick a random animal in three steps for games, classrooms, or writing.',
      '/random-animal-picker',
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
          src="/random-animal-picker-hero.webp"
          alt="Wildlife field guide spread with mammal, bird, and insect studies for a random animal picker"
          fill
          priority
          className="object-cover animate-home-fade"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[rgba(28,26,23,0.78)] via-[rgba(28,26,23,0.38)] to-[rgba(28,26,23,0.14)]"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col justify-end px-4 pb-14 pt-20 md:pb-20 md:pt-24">
          <p className="animate-home-rise text-sm font-semibold uppercase tracking-[0.22em] text-[var(--paper)]/80">
            Free · No signup · Instant pick
          </p>
          <h1 className="font-display animate-home-rise-delay mt-3 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
            Random Animal Picker
          </h1>
          <p className="animate-home-rise-delay-2 mt-5 max-w-xl text-lg leading-relaxed text-[var(--paper)]/90 md:text-xl">
            A random animal picker is a free tool that chooses a wildlife subject for you—so games,
            classrooms, and writing sessions start without debate.
          </p>
          <div className="animate-home-rise-delay-2 mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="#generator" className="home-cta-light">
              Open picker
            </a>
            <a href="#what-is" className="home-cta-ghost">
              What it is
            </a>
            <Link href="/random-animal-generator-wheel" className="home-cta-ghost">
              Prefer the wheel?
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

        <AnimalPickerTool />

        <article>
          <section id="what-is" className="home-section scroll-mt-24">
            <h2 className="home-section-title">What Is a Random Animal Picker?</h2>
            <p className="home-prose mt-4">
              A <strong className="font-semibold text-[var(--ink)]">random animal picker</strong> is a
              tool that selects an animal at random so people do not argue over the choice. This page
              focuses on speed and fairness: one-click picks, multi-animal lists, category locks, and a
              shared daily animal.
            </p>
            <ul className="mx-auto mt-8 max-w-2xl list-disc space-y-2 pl-5 text-[var(--ink-muted)]">
              {FEATURE_LIST.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">Random Animal Picker Stats</h2>
            <p className="home-prose mt-4">
              Concrete numbers help you judge whether the picker fits a 30-second icebreaker or a
              full classroom rotation.
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
              <li>Difficulty labels available when needed: 35 easy · 57 medium · 29 hard</li>
              <li>
                Search opportunity: keyword research flags{' '}
                <strong className="font-semibold text-[var(--ink)]">random animal picker</strong> at a
                low difficulty (~KD 9.4), which is why this page owns that exact phrase.
              </li>
            </ul>
          </section>

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">Who Should Use This Tool?</h2>
            <p className="home-prose mt-4">
              This random animal picker is for people who need a fair animal choice—not a long quiz
              and not a decorative spinner. Use it when the group wants a result now.
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
            <h2 className="home-section-title">How to Use This Random Animal Picker</h2>
            <p className="home-prose mt-4">
              To use this random animal picker, choose a mode, optionally filter by category, then
              pick—copy the result if you need it on a slide or worksheet.
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
            <h2 className="home-section-title">Random Animal Picker vs Wheel vs Name List</h2>
            <p className="home-prose mt-4">
              Use the picker for speed, the wheel for a live reveal, and the name generator when you
              only need text to paste.
            </p>
            <div className="mx-auto mt-8 max-w-4xl overflow-x-auto">
              <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Comparison of random animal picker versus wheel and name list tools
                </caption>
                <thead>
                  <tr className="border-b border-[var(--line-strong)]">
                    <th scope="col" className="py-3 pr-4 font-semibold text-[var(--ink)]">
                      Need
                    </th>
                    <th scope="col" className="py-3 pr-4 font-semibold text-[var(--ink)]">
                      This picker
                    </th>
                    <th scope="col" className="py-3 font-semibold text-[var(--ink)]">
                      Wheel / names
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[var(--ink-muted)]">
                  <tr className="border-b border-[var(--line)]">
                    <th scope="row" className="py-3 pr-4 font-medium text-[var(--ink)]">
                      Speed
                    </th>
                    <td className="py-3 pr-4">Instant one-click pick</td>
                    <td className="py-3">Wheel adds spin time; names skip images</td>
                  </tr>
                  <tr className="border-b border-[var(--line)]">
                    <th scope="row" className="py-3 pr-4 font-medium text-[var(--ink)]">
                      Fair shared result
                    </th>
                    <td className="py-3 pr-4">Today&apos;s pick (same animal all day)</td>
                    <td className="py-3">Wheel is per-spin; names regenerate freely</td>
                  </tr>
                  <tr className="border-b border-[var(--line)]">
                    <th scope="row" className="py-3 pr-4 font-medium text-[var(--ink)]">
                      Multi-result lists
                    </th>
                    <td className="py-3 pr-4">Pick a list mode</td>
                    <td className="py-3">Name generator is strongest for long lists</td>
                  </tr>
                  <tr className="border-b border-[var(--line)]">
                    <th scope="row" className="py-3 pr-4 font-medium text-[var(--ink)]">
                      Live showmanship
                    </th>
                    <td className="py-3 pr-4">Minimal—result first</td>
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
            <h2 className="home-section-title">Ways to Use a Random Animal Picker</h2>
            <p className="home-prose mt-4">
              The fastest way to use a random animal picker is a clear constraint: one pick for the
              group, a short list for teams, or a category lock for a themed lesson.
            </p>
            <div className="relative mx-auto my-8 w-full max-w-3xl overflow-hidden">
              <Image
                src="/random-animal-picker-usecases.webp"
                alt="Classroom and game-night scene using a random animal picker for fair wildlife picks"
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
            <h2 className="home-section-title">Classroom & Game Night Tips</h2>
            <p className="home-prose mt-4">
              For classrooms and game nights, reveal Today&apos;s pick once, then keep that animal as
              the shared subject for the whole session.
            </p>
            <div className="relative mx-auto my-8 w-full max-w-3xl overflow-hidden">
              <Image
                src="/random-animal-picker-copy.webp"
                alt="Copy-ready random animal picker results ready for worksheets and chat"
                width={1400}
                height={1050}
                className="h-auto w-full object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="home-prose home-prose-start mx-auto max-w-3xl space-y-4">
              <p>
                Prefer a spinning reveal for livestreams or parties? Open the{' '}
                <Link href="/random-animal-generator-wheel">random animal wheel</Link>. Need animal art
                ideas instead of a picker? Use the{' '}
                <Link href="/drawing-prompt-generator">drawing prompt generator</Link>. Want only names
                to paste? Try the{' '}
                <Link href="/random-animal-name-generator">random animal name generator</Link>.
              </p>
            </div>
          </section>

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">Why a Fair Random Pick Matters</h2>
            <p className="home-prose mt-4">
              A fair random animal picker matters because groups trust outcomes they did not negotiate—
              especially in classrooms and games where perceived bias kills engagement.
            </p>
            <blockquote className="mx-auto mt-8 max-w-3xl border-l-2 border-[var(--olive)] pl-5 text-left">
              <p className="text-lg leading-relaxed text-[var(--ink)]">
                &quot;Randomization is the process of making something random… Randomization is used
                when a sample is needed that is representative of a larger population, or when fairness
                or unpredictability is desired.&quot;
              </p>
              <footer className="mt-3 text-sm text-[var(--ink-faint)]">
                —{' '}
                <cite>
                  <a
                    href="https://en.wikipedia.org/wiki/Randomization"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-link"
                  >
                    Randomization, Wikipedia
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
              That is why this tool ships Pick one and Today&apos;s pick instead of only long menus:
              the outcome should feel impartial, fast, and easy to reuse in an icebreaker or lesson.
            </p>
          </section>

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">Sources & Citations</h2>
            <p className="home-prose mt-4">
              The fairness and facilitation framing on this page is grounded in public references.
              Key sources:
            </p>
            <ol className="mx-auto mt-6 max-w-3xl list-decimal space-y-3 pl-5 text-[var(--ink-muted)]">
              <li>
                <a
                  href="https://en.wikipedia.org/wiki/Randomization"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-link"
                >
                  Wikipedia: Randomization
                </a>{' '}
                — why impartial random selection supports fairness and representativeness.
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
                — group warmups that benefit from a shared, unexpected prompt.
              </li>
              <li>
                Internal product data ({SITE_NAME}, 2026): 121-animal database with published category
                and difficulty counts on this page.
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
                <Link href="/give-me-a-random-animal" className="home-link">
                  give me a random animal
                </Link>{' '}
                — conversational / Reddit-style intent landing.
              </li>
              <li>
                <Link href="/animal-randomizer" className="home-link">
                  animal randomizer
                </Link>{' '}
                — synonym landing for randomizer searches.
              </li>
              <li>
                <Link href="/cute-animal-generator" className="home-link">
                  cute animal generator
                </Link>{' '}
                — adorable animals with action, emotion, and location prompts.
              </li>
              <li>
                <Link href="/" className="home-link">
                  random animal generator
                </Link>{' '}
                — full generator with category and difficulty filters.
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
              <li>
                <Link href="/random-animal-name-generator" className="home-link">
                  random animal name generator
                </Link>{' '}
                — copy-ready name lists.
              </li>
            </ul>
          </section>
        </article>

        <footer className="home-section text-center">
          <p className="font-display text-lg font-semibold text-[var(--ink)]">
            Free random animal picker—no signup
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[var(--ink-muted)]">
            Explore more:{' '}
            <Link href="/" className="home-link">
              random animal generator
            </Link>
            ,{' '}
            <Link href="/random-animal-generator-wheel" className="home-link">
              random animal wheel
            </Link>
            ,{' '}
            <Link href="/drawing-prompt-generator" className="home-link">
              drawing prompt generator
            </Link>
            .
          </p>
        </footer>
      </div>
    </div>
  );
}
