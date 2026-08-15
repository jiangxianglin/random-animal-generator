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
    question: 'What does “give me a random animal” mean as a search?',
    answer:
      'People type “give me a random animal” when they want an instant wildlife pick—often after seeing a Reddit thread, Discord prompt, or classroom icebreaker—without downloading an app or signing up.',
  },
  {
    question: 'How do I get a random animal right now?',
    answer:
      'Open the tool below, tap Pick one (or Today’s pick for a shared daily animal), and you get a name, category, facts, and a reference image you can copy or share.',
  },
  {
    question: 'Is this better than a Reddit “give me a random animal” post?',
    answer:
      'Reddit threads go stale and depend on strangers commenting. This page is a permanent, fair randomizer with filters, a shared daily pick, and copy-ready results—no waiting on replies.',
  },
  {
    question: 'Can I filter the random animal I get?',
    answer:
      'Yes. Use Category pick to lock mammals, birds, reptiles, marine animals, or insects before you generate.',
  },
  {
    question: 'Is “give me a random animal” free?',
    answer:
      'Yes. The tool runs in your browser, requires no account, and does not gate the core pick behind a signup.',
  },
  {
    question: 'How is this different from the random animal picker?',
    answer:
      'Same instant-pick engine. This page owns the conversational phrase “give me a random animal” (Reddit-style intent). The picker page targets the shorter keyword “random animal picker.”',
  },
] as const;

const HOW_TO_STEPS = [
  {
    name: 'Ask for a pick',
    text: 'Stay on this page and choose Pick one, a short list, a category lock, or today’s shared animal.',
  },
  {
    name: 'Generate the animal',
    text: 'Tap generate. You get a wildlife subject with facts and a reference image—no Reddit wait.',
  },
  {
    name: 'Use or share the result',
    text: 'Copy the pick into chat, a worksheet, or a drawing brief, then regenerate anytime.',
  },
] as const;

const PERSONAS = [
  {
    title: 'Reddit & Discord users',
    text: 'Skip “comment and I’ll reply” threads. Get a fair animal in one click when someone says give me a random animal.',
  },
  {
    title: 'Teachers & facilitators',
    text: 'Use Today’s pick so every student researches or draws the same animal without arguing.',
  },
  {
    title: 'Writers & RPG players',
    text: 'Grab a creature seed with a name, facts, and a photo for characters or encounters.',
  },
  {
    title: 'Party & game hosts',
    text: 'Settle animal roles or icebreakers instantly when someone asks for a random animal out loud.',
  },
] as const;

const USE_IDEAS = [
  {
    title: 'Replace stale threads',
    text: 'Bookmark this URL when a community keeps asking “give me a random animal”—share one link instead of a dead post.',
  },
  {
    title: 'Icebreaker rounds',
    text: 'Pick one animal and ask each person to share a fact, sound, or memory tied to it.',
  },
  {
    title: 'Shared daily challenge',
    text: 'Reveal Today’s pick once so the whole class or Discord channel works from the same animal.',
  },
  {
    title: 'Writing seeds',
    text: 'Copy the result into your notes and build a character, setting, or plot beat around it.',
  },
] as const;

const STATS = [
  { value: '121', label: 'Curated animals' },
  { value: '5', label: 'Wildlife categories' },
  { value: '4', label: 'Pick modes' },
  { value: '0', label: 'Signup required' },
] as const;

const FEATURE_LIST = [
  'One-click answer to “give me a random animal” with facts and a photo',
  'Modes: pick one, pick a list, category pick, today’s shared pick',
  'Category filters: mammals, birds, reptiles, marine animals, insects',
  'Copyable results for chat, worksheets, or game night',
  'Works offline from a local animal pool—no waiting on Reddit replies',
] as const;

function formatDisplayDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default function GiveMeARandomAnimalPage() {
  const structuredData = [
    buildWebPageSchema({
      name: 'Give Me a Random Animal',
      description:
        'A free tool that answers “give me a random animal” with instant wildlife picks, facts, and photos—no signup.',
      path: '/give-me-a-random-animal',
      datePublished: PAGE_PUBLISHED,
      dateModified: PAGE_MODIFIED,
    }),
    buildWebAppSchema({
      name: 'Give Me a Random Animal',
      description:
        'A free tool that answers “give me a random animal” with instant wildlife picks, facts, and photos—no signup.',
      path: '/give-me-a-random-animal',
      datePublished: PAGE_PUBLISHED,
      dateModified: PAGE_MODIFIED,
      featureList: [...FEATURE_LIST],
    }),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Give Me a Random Animal', path: '/give-me-a-random-animal' },
    ]),
    buildHowToSchema(
      'How to get a random animal instantly',
      'Answer “give me a random animal” in three steps—no Reddit wait.',
      '/give-me-a-random-animal',
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
          alt="Wildlife field guide ready for a give me a random animal instant pick"
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
            Free · No signup · Instant answer
          </p>
          <h1 className="font-display animate-home-rise-delay mt-3 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
            Give Me a Random Animal
          </h1>
          <p className="animate-home-rise-delay-2 mt-5 max-w-xl text-lg leading-relaxed text-[var(--paper)]/90 md:text-xl">
            Give me a random animal is the conversational ask behind countless Reddit and Discord
            threads—this page answers it in one click with facts and a photo.
          </p>
          <div className="animate-home-rise-delay-2 mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="#generator" className="home-cta-light">
              Get a random animal
            </a>
            <a href="#what-is" className="home-cta-ghost">
              Why this page
            </a>
            <Link href="/random-animal-picker" className="home-cta-ghost">
              Prefer the picker?
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

        <AnimalPickerTool
          heading="Give me a random animal"
          productLabel="Give me a random animal"
        />

        <article>
          <section id="what-is" className="home-section scroll-mt-24">
            <h2 className="home-section-title">What “Give Me a Random Animal” Really Asks For</h2>
            <p className="home-prose mt-4">
              When someone says{' '}
              <strong className="font-semibold text-[var(--ink)]">give me a random animal</strong>, they
              usually want a fair, unexpected wildlife subject right now—not a long quiz and not a
              comment thread that dies overnight. This page fills that content vacuum with a permanent
              tool: instant picks, category locks, and a shared daily animal.
            </p>
            <ul className="mx-auto mt-8 max-w-2xl list-disc space-y-2 pl-5 text-[var(--ink-muted)]">
              {FEATURE_LIST.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">Give Me a Random Animal — Stats</h2>
            <p className="home-prose mt-4">
              Concrete numbers help you decide if one click beats waiting on a Reddit reply.
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
                Intent note: conversational queries like{' '}
                <strong className="font-semibold text-[var(--ink)]">give me a random animal</strong>{' '}
                often rank thin Reddit threads—this page is the durable tool alternative.
              </li>
            </ul>
          </section>

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">Who Asks “Give Me a Random Animal”?</h2>
            <p className="home-prose mt-4">
              This page is for people who want an immediate animal answer—especially when a social
              thread would otherwise be the only option.
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
            <h2 className="home-section-title">How to Use This Page</h2>
            <p className="home-prose mt-4">
              To answer{' '}
              <strong className="font-semibold text-[var(--ink)]">give me a random animal</strong>, choose
              a mode, optionally filter by category, then generate and copy the result.
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
            <h2 className="home-section-title">This Page vs Reddit Threads vs Wheel</h2>
            <p className="home-prose mt-4">
              Use this page when you need a permanent answer to “give me a random animal.” Use Reddit
              only for discussion; use the wheel when you want a theatrical spin.
            </p>
            <div className="mx-auto mt-8 max-w-4xl overflow-x-auto">
              <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Comparison of give me a random animal tool versus Reddit threads and wheel
                </caption>
                <thead>
                  <tr className="border-b border-[var(--line-strong)]">
                    <th scope="col" className="py-3 pr-4 font-semibold text-[var(--ink)]">
                      Need
                    </th>
                    <th scope="col" className="py-3 pr-4 font-semibold text-[var(--ink)]">
                      This page
                    </th>
                    <th scope="col" className="py-3 font-semibold text-[var(--ink)]">
                      Reddit / wheel
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[var(--ink-muted)]">
                  <tr className="border-b border-[var(--line)]">
                    <th scope="row" className="py-3 pr-4 font-medium text-[var(--ink)]">
                      Speed
                    </th>
                    <td className="py-3 pr-4">Instant one-click pick</td>
                    <td className="py-3">Threads wait on replies; wheel adds spin time</td>
                  </tr>
                  <tr className="border-b border-[var(--line)]">
                    <th scope="row" className="py-3 pr-4 font-medium text-[var(--ink)]">
                      Durability
                    </th>
                    <td className="py-3 pr-4">Always-on tool URL</td>
                    <td className="py-3">Posts go stale and unmoderated</td>
                  </tr>
                  <tr className="border-b border-[var(--line)]">
                    <th scope="row" className="py-3 pr-4 font-medium text-[var(--ink)]">
                      Fair shared result
                    </th>
                    <td className="py-3 pr-4">Today&apos;s pick (same animal all day)</td>
                    <td className="py-3">Comments vary; wheel is per-spin</td>
                  </tr>
                  <tr className="border-b border-[var(--line)]">
                    <th scope="row" className="py-3 pr-4 font-medium text-[var(--ink)]">
                      Filters & facts
                    </th>
                    <td className="py-3 pr-4">Category locks + educational facts</td>
                    <td className="py-3">Usually name-only replies</td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-3 pr-4 font-medium text-[var(--ink)]">
                      Cost / signup
                    </th>
                    <td className="py-3 pr-4">Free, no account</td>
                    <td className="py-3">Reddit needs an account; wheel is free here too</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="use-ideas" className="home-section scroll-mt-24">
            <h2 className="home-section-title">Ways to Use “Give Me a Random Animal”</h2>
            <p className="home-prose mt-4">
              The fastest pattern is a clear constraint: one pick for the group, a short list for teams,
              or a category lock for a themed lesson.
            </p>
            <div className="relative mx-auto my-8 w-full max-w-3xl overflow-hidden">
              <Image
                src="/random-animal-picker-usecases.webp"
                alt="Classroom and game-night scene answering give me a random animal with a fair pick"
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
            <h2 className="home-section-title">Classroom & Community Tips</h2>
            <p className="home-prose mt-4">
              For classrooms and community chats, reveal Today&apos;s pick once, then keep that animal as
              the shared subject for the whole session.
            </p>
            <div className="relative mx-auto my-8 w-full max-w-3xl overflow-hidden">
              <Image
                src="/random-animal-picker-copy.webp"
                alt="Copy-ready give me a random animal results for worksheets and chat"
                width={1400}
                height={1050}
                className="h-auto w-full object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="home-prose home-prose-start mx-auto max-w-3xl space-y-4">
              <p>
                Prefer a shorter keyword landing? Open the{' '}
                <Link href="/random-animal-picker">random animal picker</Link>. Want a spin reveal? Use
                the <Link href="/random-animal-generator-wheel">random animal wheel</Link>. Need a
                synonym landing for “randomizer”? Try the{' '}
                <Link href="/animal-randomizer">animal randomizer</Link>.
              </p>
            </div>
          </section>

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">Why Instant Random Picks Beat Dead Threads</h2>
            <p className="home-prose mt-4">
              Impartial randomness builds trust in groups—especially when the alternative is waiting on
              strangers or arguing over favorites.
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
              That is why this page ships Pick one and Today&apos;s pick: when someone says give me a
              random animal, the outcome should feel fair, fast, and reusable.
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
                <Link href="/animal-randomizer" className="home-link">
                  animal randomizer
                </Link>{' '}
                — synonym landing for randomizer-style searches.
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
                — full generator with category and difficulty filters.
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
            Give me a random animal—free, no signup
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[var(--ink-muted)]">
            <Link href="/about" className="home-link">
              About
            </Link>
            {' · '}
            <Link href="/contact" className="home-link">
              Contact
            </Link>
            {' · '}
            <Link href="/privacy" className="home-link">
              Privacy
            </Link>
            {' · '}
            <Link href="/terms" className="home-link">
              Terms
            </Link>
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[var(--ink-muted)]">
            Explore more:{' '}
            <Link href="/" className="home-link">
              random animal generator
            </Link>
            ,{' '}
            <Link href="/animal-randomizer" className="home-link">
              animal randomizer
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
