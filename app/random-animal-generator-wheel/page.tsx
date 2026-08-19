import Image from 'next/image';
import Link from 'next/link';
import { AnimalWheelTool } from '@/components/animal-wheel-tool';
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
    question: 'What is a random animal wheel?',
    answer:
      'A random animal wheel—also called a random animal generator wheel—is a free spinning tool that lands on one animal at a time. It is built for games, classrooms, icebreakers, and live reveals where the spin is part of the fun.',
  },
  {
    question: 'Who should use this animal wheel spinner?',
    answer:
      'Party hosts, teachers, artists, and RPG groups who want a theatrical one-at-a-time pick—with modes and timers matched to icebreakers, classroom rounds, sketch reveals, and encounter rolls.',
  },
  {
    question: 'What are the spin modes on this random animal wheel?',
    answer:
      'Free spin for open play; Party icebreaker for shared reveals; Classroom round with a 60-second response timer; Drawing reveal with a 3-minute sketch timer; and RPG encounter for story seeds.',
  },
  {
    question: 'How is the wheel different from the random animal picker?',
    answer:
      'The wheel emphasizes the spin animation and live reveal. The random animal picker is faster for instant picks, multi-animal lists, and a shared daily animal when you do not need the show.',
  },
  {
    question: 'Can I filter the random animal wheel by category?',
    answer:
      'Yes. Spin across all animals or focus on mammals, birds, reptiles, marine animals, or insects. The wheel shows up to 12 animals from the active pool.',
  },
  {
    question: 'Is this random animal wheel spinner free?',
    answer:
      'Yes. It runs in your browser with no signup, downloads, or premium unlock for the core spinner.',
  },
  {
    question: 'Can artists use the wheel for drawing challenges?',
    answer:
      'Yes. Spin for a subject, then open the drawing prompt generator if you want timed silhouette, gesture, or texture practice modes.',
  },
] as const;

const HOW_TO_STEPS = [
  {
    name: 'Pick a spin mode',
    text: 'Start with Free spin, or choose Party, Classroom, Drawing reveal, or RPG encounter.',
  },
  {
    name: 'Spin the wheel',
    text: 'Confirm the category if needed, then click spin and wait for the pointer to stop.',
  },
  {
    name: 'Use the result',
    text: 'Copy the animal, run the optional timer, or open drawing prompts for a timed sketch.',
  },
] as const;

const PERSONAS = [
  {
    title: 'Party & game hosts',
    text: 'Use Party icebreaker mode so the room watches one fair reveal, then share a fact, sound, or memory.',
  },
  {
    title: 'Teachers & classrooms',
    text: 'Classroom round locks mammals and starts a 60-second response timer after the pointer stops.',
  },
  {
    title: 'Artists & art clubs',
    text: 'Drawing reveal mode spins a subject, starts a 3-minute sketch timer, and links to timed drawing prompts.',
  },
  {
    title: 'Writers & RPG tables',
    text: 'RPG encounter mode treats the landed animal as a creature, familiar, omen, or wilderness seed.',
  },
] as const;

const USE_IDEAS = [
  {
    title: 'Icebreaker spins',
    text: 'Spin once, then ask each person to share a fact, sound, or memory tied to the animal.',
  },
  {
    title: 'Live classroom rounds',
    text: 'Category-lock mammals or birds, spin, and give students sixty seconds to respond.',
  },
  {
    title: 'Drawing challenge reveal',
    text: 'Spin for the subject, then start a short sketch timer for the whole group.',
  },
  {
    title: 'RPG encounter rolls',
    text: 'Spin when the party needs a creature, familiar, or wilderness encounter without looking it up.',
  },
] as const;

const STATS = [
  { value: '121', label: 'Curated animals' },
  { value: '5', label: 'Spin modes' },
  { value: '12', label: 'Shuffled wheel slices' },
  { value: '0', label: 'Signup required' },
] as const;

const FEATURE_LIST = [
  'Spinning random animal wheel with a clear pointer reveal',
  'Persona spin modes: party, classroom, drawing, RPG, and free spin',
  'Category filters with a freshly shuffled 12-animal wheel each time',
  'Optional response / sketch timers after the reveal',
  'Copyable result card with name, image, and quick facts—no signup',
] as const;

function formatDisplayDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default function RandomAnimalGeneratorWheelPage() {
  const structuredData = [
    buildWebPageSchema({
      name: 'Random Animal Wheel & Animal Generator',
      description:
        'Spin the random animal generator wheel for free party, classroom, drawing, and RPG reveals with category filters and timers.',
      path: '/random-animal-generator-wheel',
      datePublished: PAGE_PUBLISHED,
      dateModified: PAGE_MODIFIED,
    }),
    buildWebAppSchema({
      name: 'Random Animal Wheel & Animal Generator',
      description:
        'Spin the random animal generator wheel for free party, classroom, drawing, and RPG reveals with category filters and timers.',
      path: '/random-animal-generator-wheel',
      datePublished: PAGE_PUBLISHED,
      dateModified: PAGE_MODIFIED,
      featureList: [...FEATURE_LIST],
    }),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Random Animal Wheel', path: '/random-animal-generator-wheel' },
    ]),
    buildHowToSchema(
      'How to use the random animal wheel',
      'Spin the animal wheel spinner and use the result for games or lessons.',
      '/random-animal-generator-wheel',
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
          src="/random-animal-wheel-hero-v2.webp"
          alt="Friends gathered around a wooden random animal wheel at a cozy game night"
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
            Free animal wheel spinner
          </p>
          <h1 className="font-display animate-home-rise-delay mt-3 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
            Random Animal Wheel &amp; Animal Generator
          </h1>
          <p className="animate-home-rise-delay-2 mt-5 max-w-xl text-lg leading-relaxed text-[var(--paper)]/90 md:text-xl">
            Spin the random animal generator wheel for free party, classroom, drawing, and RPG
            reveals—one animal at a time, with modes matched to how your group actually plays.
          </p>
          <div className="animate-home-rise-delay-2 mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="#generator" className="home-cta-light">
              Spin the wheel
            </a>
            <a href="#what-is" className="home-cta-ghost">
              What it is
            </a>
            <Link href="/random-animal-picker" className="home-cta-ghost">
              Prefer instant pick?
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

        <AnimalWheelTool />

        <article>
          <section id="what-is" className="home-section scroll-mt-24">
            <h2 className="home-section-title">What Is a Random Animal Wheel?</h2>
            <p className="home-prose mt-4">
              A <strong className="font-semibold text-[var(--ink)]">random animal wheel</strong> (also
              called a <strong className="font-semibold text-[var(--ink)]">random animal generator wheel</strong>{' '}
              or animal wheel spinner) is a spinning selector that reveals one animal with a pointer
              stop. This page is built for moments when the process matters as much as the
              result—classroom rounds, party games, and live challenges.
            </p>
            <ul className="mx-auto mt-8 max-w-2xl list-disc space-y-2 pl-5 text-[var(--ink-muted)]">
              {FEATURE_LIST.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">Random Animal Wheel Stats</h2>
            <p className="home-prose mt-4">
              Concrete numbers help you judge whether the spinner fits a 30-second icebreaker or a
              projected classroom activity.
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
              <li>
                Wheel slices: 12 animals reshuffled from the active pool (Reshuffle wheel anytime)
              </li>
              <li>
                Modes with timers: Classroom round (60s) · Drawing reveal (3 min sketch)
              </li>
              <li>
                Search focus: this page owns{' '}
                <strong className="font-semibold text-[var(--ink)]">random animal wheel</strong>,{' '}
                <strong className="font-semibold text-[var(--ink)]">random animal generator wheel</strong>,
                and spinner intent; instant picks go to the{' '}
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
              This random animal wheel is for people who want a shared, visible spin—not a silent
              backend random number. Use it when the room should watch the result land.
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
            <h2 className="home-section-title">How to Use This Random Animal Wheel</h2>
            <p className="home-prose mt-4">
              To use this random animal wheel, pick a spin mode, confirm the category, spin, then use
              the result card—copy it, run the timer, or jump into a drawing prompt.
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
            <h2 className="home-section-title">Wheel vs Picker vs Name List</h2>
            <p className="home-prose mt-4">
              Use the wheel for live reveals, the picker for speed, and the name generator when you
              only need pasteable text.
            </p>
            <div className="mx-auto mt-8 max-w-4xl overflow-x-auto">
              <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Comparison of random animal wheel versus picker and name list tools
                </caption>
                <thead>
                  <tr className="border-b border-[var(--line-strong)]">
                    <th scope="col" className="py-3 pr-4 font-semibold text-[var(--ink)]">
                      Need
                    </th>
                    <th scope="col" className="py-3 pr-4 font-semibold text-[var(--ink)]">
                      This wheel
                    </th>
                    <th scope="col" className="py-3 font-semibold text-[var(--ink)]">
                      Picker / names
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[var(--ink-muted)]">
                  <tr className="border-b border-[var(--line)]">
                    <th scope="row" className="py-3 pr-4 font-medium text-[var(--ink)]">
                      Live showmanship
                    </th>
                    <td className="py-3 pr-4">Spin animation + pointer stop</td>
                    <td className="py-3">Picker is instant; names are text-only</td>
                  </tr>
                  <tr className="border-b border-[var(--line)]">
                    <th scope="row" className="py-3 pr-4 font-medium text-[var(--ink)]">
                      Speed
                    </th>
                    <td className="py-3 pr-4">Seconds for the spin</td>
                    <td className="py-3">Picker wins for one-click picks</td>
                  </tr>
                  <tr className="border-b border-[var(--line)]">
                    <th scope="row" className="py-3 pr-4 font-medium text-[var(--ink)]">
                      Multi-result lists
                    </th>
                    <td className="py-3 pr-4">One animal per spin</td>
                    <td className="py-3">Picker lists / name generator excel</td>
                  </tr>
                  <tr className="border-b border-[var(--line)]">
                    <th scope="row" className="py-3 pr-4 font-medium text-[var(--ink)]">
                      Classroom projection
                    </th>
                    <td className="py-3 pr-4">Strong—everyone watches the wheel</td>
                    <td className="py-3">Picker works; less theatrical</td>
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
            <h2 className="home-section-title">Ways to Use a Random Animal Wheel</h2>
            <p className="home-prose mt-4">
              The fastest way to use an animal wheel spinner is one clear rule before you spin: one
              animal for the room, one category for the unit, or one sketch challenge for the club.
            </p>
            <div className="relative mx-auto my-8 w-full max-w-3xl overflow-hidden">
              <Image
                src="/random-animal-wheel-interface-v2.webp"
                alt="Wooden animal spinning wheel on an atelier desk with sketchbook and category cards"
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
            <h2 className="home-section-title">Classroom & Live Challenge Tips</h2>
            <p className="home-prose mt-4">
              For classrooms and livestreams, announce the category first, spin once, and keep that
              animal as the shared prompt for the round.
            </p>
            <div className="relative mx-auto my-8 w-full max-w-3xl overflow-hidden">
              <Image
                src="/random-animal-wheel-classroom-v2.webp"
                alt="Teacher and students watching a projected random animal wheel reveal in class"
                width={1400}
                height={1050}
                className="h-auto w-full object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="home-prose home-prose-start mx-auto max-w-3xl space-y-4">
              <p>
                Need speed without the spin? Open the{' '}
                <Link href="/random-animal-picker">random animal picker</Link>. Want timed art
                practice after the reveal? Use the{' '}
                <Link href="/drawing-prompt-generator">drawing prompt generator</Link>. Need only
                names to paste? Try the{' '}
                <Link href="/random-animal-name-generator">random animal name generator</Link>.
              </p>
            </div>
          </section>

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">Why a Visible Spin Works</h2>
            <p className="home-prose mt-4">
              A visible spin works because groups trust outcomes they can watch—especially in
              classrooms and games where fairness and shared attention matter.
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
              That is why this tool ships a wheel spinner instead of only a silent pick: the reveal
              itself becomes the icebreaker moment.
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
                — impartial random selection for fairness and unpredictability.
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
                counts and a 12-slice wheel display on this page.
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
                — soft animal prompts with action, emotion, and location.
              </li>
              <li>
                <Link href="/" className="home-link">
                  random animal generator
                </Link>{' '}
                — full generator with category filters.
              </li>
              <li>
                <Link href="/random-animal-picker" className="home-link">
                  random animal picker
                </Link>{' '}
                — instant picks when you want speed over a spin.
              </li>
              <li>
                <Link href="/drawing-prompt-generator" className="home-link">
                  drawing prompt generator
                </Link>{' '}
                — timed animal art prompts after the reveal.
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
            Free random animal wheel—no signup
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
