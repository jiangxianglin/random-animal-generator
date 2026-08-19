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
  SITE_NAME,
} from '@/lib/site';

const PAGE_PUBLISHED = '2026-08-15T00:00:00.000Z';
const PAGE_MODIFIED = LAST_MAJOR_UPDATE.toISOString();

const FAQS = [
  {
    question: 'What is an animal randomizer?',
    answer:
      'An animal randomizer is a free tool that selects wildlife at random so you can make a fair choice for games, classrooms, writing, or quick decisions—with optional category filters and a shared daily pick.',
  },
  {
    question: 'Who should use this animal randomizer?',
    answer:
      'It is built for teachers, party hosts, writers, RPG players, and anyone who searches for an “animal randomizer” instead of a longer generator name.',
  },
  {
    question: 'How is an animal randomizer different from a random animal generator?',
    answer:
      'Same wildlife database. This page owns the shorter synonym “animal randomizer.” The homepage targets “random animal generator” as the primary brand query.',
  },
  {
    question: 'Can the animal randomizer lock a category?',
    answer:
      'Yes. Use Category pick to lock mammals, birds, reptiles, marine animals, or insects before you randomize.',
  },
  {
    question: 'Is the animal randomizer free?',
    answer:
      'Yes. It runs in your browser, requires no account, and does not gate the core randomizer behind a signup.',
  },
  {
    question: 'Does everyone get the same animal?',
    answer:
      "Use Today’s pick for one shared animal each calendar day—useful for classrooms, family game night, or a Discord challenge.",
  },
] as const;

const HOW_TO_STEPS = [
  {
    name: 'Choose a randomizer mode',
    text: 'Start with Pick one, or switch to a list, category lock, or today’s shared animal.',
  },
  {
    name: 'Set optional filters',
    text: 'Narrow by category when you want controlled randomness instead of a fully open roll.',
  },
  {
    name: 'Randomize and use the result',
    text: 'Reveal the animal card, copy the result for chat or worksheets, then randomize again anytime.',
  },
] as const;

const PERSONAS = [
  {
    title: 'Teachers & homeschoolers',
    text: 'Give every student the same daily animal, or category-lock a mammal unit without prep time.',
  },
  {
    title: 'Party & game hosts',
    text: 'Settle animal roles or “who goes first” with a fair one-click randomizer.',
  },
  {
    title: 'Writers & RPG players',
    text: 'Roll a creature for a character, encounter, or story seed with name, facts, and a photo.',
  },
  {
    title: 'Quick decision makers',
    text: 'Skip long menus when you only typed “animal randomizer” and need a clean result now.',
  },
] as const;

const USE_IDEAS = [
  {
    title: 'Icebreaker rounds',
    text: 'Randomize one animal and ask each person to share a fact, sound, or memory tied to it.',
  },
  {
    title: 'Team assignments',
    text: 'Randomize a short list and assign each animal to a team for scavenger hunts or trivia.',
  },
  {
    title: 'Writing seeds',
    text: 'Copy a randomized animal into your notes and build a character or plot beat around it.',
  },
  {
    title: 'Classroom fairness',
    text: 'Reveal Today’s pick so every student researches or draws the same animal.',
  },
] as const;

const STATS = [
  { value: '121', label: 'Curated animals' },
  { value: '5', label: 'Wildlife categories' },
  { value: '4', label: 'Randomizer modes' },
  { value: '0', label: 'Signup required' },
] as const;

const FEATURE_LIST = [
  'Free animal randomizer with reference images and educational facts',
  'Modes: pick one, pick a list, category pick, today’s shared pick',
  'Category filters: mammals, birds, reptiles, marine animals, insects',
  'Copyable results for chat, slides, worksheets, or game night',
  'Local animal pool first—fast loads without signup walls',
] as const;

function formatDisplayDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default function AnimalRandomizerPage() {
  const structuredData = [
    buildWebPageSchema({
      name: 'Animal Randomizer',
      description:
        'A free animal randomizer for instant wildlife picks—games, classrooms, writing, and fair decisions.',
      path: '/animal-randomizer',
      datePublished: PAGE_PUBLISHED,
      dateModified: PAGE_MODIFIED,
    }),
    buildWebAppSchema({
      name: 'Animal Randomizer',
      description:
        'A free animal randomizer for instant wildlife picks—games, classrooms, writing, and fair decisions.',
      path: '/animal-randomizer',
      datePublished: PAGE_PUBLISHED,
      dateModified: PAGE_MODIFIED,
      featureList: [...FEATURE_LIST],
    }),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Animal Randomizer', path: '/animal-randomizer' },
    ]),
    buildHowToSchema(
      'How to use the animal randomizer',
      'Randomize a wildlife subject in three steps for games, classrooms, or writing.',
      '/animal-randomizer',
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
          src="/home-hero-field-atelier.png"
          alt="Field atelier scene for an animal randomizer wildlife pick"
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
            Free · No signup · Instant randomize
          </p>
          <h1 className="font-display animate-home-rise-delay mt-3 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
            Animal Randomizer
          </h1>
          <p className="animate-home-rise-delay-2 mt-5 max-w-xl text-lg leading-relaxed text-[var(--paper)]/90 md:text-xl">
            An animal randomizer is a free tool that rolls a wildlife subject for you—so games,
            classrooms, and writing sessions start without debate.
          </p>
          <div className="animate-home-rise-delay-2 mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="#generator" className="home-cta-light">
              Open randomizer
            </a>
            <a href="#what-is" className="home-cta-ghost">
              What it is
            </a>
            <Link href="/give-me-a-random-animal" className="home-cta-ghost">
              Give me a random animal
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

        <AnimalPickerTool heading="Randomizer modes" productLabel="Animal randomizer" />

        <article>
          <section id="what-is" className="home-section scroll-mt-24">
            <h2 className="home-section-title">What Is an Animal Randomizer?</h2>
            <p className="home-prose mt-4">
              An <strong className="font-semibold text-[var(--ink)]">animal randomizer</strong> is a tool
              that selects an animal at random so people do not argue over the choice. This page focuses
              on the randomizer synonym: one-click rolls, multi-animal lists, category locks, and a
              shared daily animal.
            </p>
            <ul className="mx-auto mt-8 max-w-2xl list-disc space-y-2 pl-5 text-[var(--ink-muted)]">
              {FEATURE_LIST.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">Animal Randomizer Stats</h2>
            <p className="home-prose mt-4">
              Concrete numbers help you judge whether the randomizer fits a 30-second icebreaker or a
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
                Keyword note: this page owns the exact phrase{' '}
                <strong className="font-semibold text-[var(--ink)]">animal randomizer</strong> so synonym
                searches land on a focused tool—not a thin listicle.
              </li>
            </ul>
          </section>

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">Who Should Use This Animal Randomizer?</h2>
            <p className="home-prose mt-4">
              This animal randomizer is for people who need a fair wildlife roll—not a long quiz and not
              a decorative spinner alone.
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
            <h2 className="home-section-title">How to Use This Animal Randomizer</h2>
            <p className="home-prose mt-4">
              To use this animal randomizer, choose a mode, optionally filter by category, then
              randomize—copy the result if you need it on a slide or worksheet.
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
            <h2 className="home-section-title">Animal Randomizer vs Generator vs Wheel</h2>
            <p className="home-prose mt-4">
              Use the randomizer for speed, the homepage generator for the brand query, and the wheel
              for a live reveal.
            </p>
            <div className="mx-auto mt-8 max-w-4xl overflow-x-auto">
              <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Comparison of animal randomizer versus generator and wheel tools
                </caption>
                <thead>
                  <tr className="border-b border-[var(--line-strong)]">
                    <th scope="col" className="py-3 pr-4 font-semibold text-[var(--ink)]">
                      Need
                    </th>
                    <th scope="col" className="py-3 pr-4 font-semibold text-[var(--ink)]">
                      This randomizer
                    </th>
                    <th scope="col" className="py-3 font-semibold text-[var(--ink)]">
                      Generator / wheel
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[var(--ink-muted)]">
                  <tr className="border-b border-[var(--line)]">
                    <th scope="row" className="py-3 pr-4 font-medium text-[var(--ink)]">
                      Synonym intent
                    </th>
                    <td className="py-3 pr-4">Owns “animal randomizer”</td>
                    <td className="py-3">Home owns “random animal generator”</td>
                  </tr>
                  <tr className="border-b border-[var(--line)]">
                    <th scope="row" className="py-3 pr-4 font-medium text-[var(--ink)]">
                      Speed
                    </th>
                    <td className="py-3 pr-4">Instant one-click roll</td>
                    <td className="py-3">Wheel adds spin time</td>
                  </tr>
                  <tr className="border-b border-[var(--line)]">
                    <th scope="row" className="py-3 pr-4 font-medium text-[var(--ink)]">
                      Fair shared result
                    </th>
                    <td className="py-3 pr-4">Today&apos;s pick (same animal all day)</td>
                    <td className="py-3">Wheel is per-spin</td>
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
            <h2 className="home-section-title">Ways to Use an Animal Randomizer</h2>
            <p className="home-prose mt-4">
              The fastest way to use an animal randomizer is a clear constraint: one roll for the group,
              a short list for teams, or a category lock for a themed lesson.
            </p>
            <div className="relative mx-auto my-8 w-full max-w-3xl overflow-hidden">
              <Image
                src="/home-usecases-atelier.png"
                alt="Atelier and classroom scenes using an animal randomizer for fair wildlife picks"
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
                src="/home-biodiversity-field-guide.png"
                alt="Biodiversity field guide spread supporting animal randomizer classroom use"
                width={1400}
                height={1050}
                className="h-auto w-full object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="home-prose home-prose-start mx-auto max-w-3xl space-y-4">
              <p>
                Searching the conversational phrase instead? Open{' '}
                <Link href="/give-me-a-random-animal">give me a random animal</Link>. Prefer the shorter
                “picker” keyword? Use the{' '}
                <Link href="/random-animal-picker">random animal picker</Link>. Want a spin? Try the{' '}
                <Link href="/random-animal-generator-wheel">random animal wheel</Link>.
              </p>
            </div>
          </section>

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">Why a Fair Animal Randomizer Matters</h2>
            <p className="home-prose mt-4">
              A fair animal randomizer matters because groups trust outcomes they did not negotiate—
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
              That is why this animal randomizer ships Pick one and Today&apos;s pick: the outcome should
              feel impartial, fast, and easy to reuse.
            </p>
          </section>

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">Sources & Citations</h2>
            <p className="home-prose mt-4">
              The fairness and facilitation framing on this page is grounded in public references. Key
              sources:
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
                — why impartial random selection supports fairness.
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
                <Link href="/random-animal-picker" className="home-link">
                  random animal picker
                </Link>{' '}
                — short-keyword instant picks.
              </li>
              <li>
                <Link href="/" className="home-link">
                  random animal generator
                </Link>{' '}
                — primary brand generator page.
              </li>
              <li>
                <Link href="/random-animal-generator-wheel" className="home-link">
                  random animal generator wheel
                </Link>{' '}
                — spin reveal for live games.
              </li>
              <li>
                <Link href="/cute-animal-generator" className="home-link">
                  cute animal generator
                </Link>{' '}
                — adorable animals with story options.
              </li>
            </ul>
          </section>
        </article>

        <footer className="home-section text-center">
          <p className="font-display text-lg font-semibold text-[var(--ink)]">
            Free animal randomizer—no signup
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[var(--ink-muted)]">
            Explore more:{' '}
            <Link href="/" className="home-link">
              random animal generator
            </Link>
            ,{' '}
            <Link href="/give-me-a-random-animal" className="home-link">
              give me a random animal
            </Link>
            ,{' '}
            <Link href="/random-animal-picker" className="home-link">
              random animal picker
            </Link>
            .
          </p>
        </footer>
      </div>
    </div>
  );
}
