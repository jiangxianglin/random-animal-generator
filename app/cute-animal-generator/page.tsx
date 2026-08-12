import Image from 'next/image';
import Link from 'next/link';
import { CuteAnimalGeneratorTool } from '@/components/cute-animal-generator-tool';
import {
  buildCutePrompt,
  getCuteAnimals,
  getDailyCuteAnimal,
} from '@/lib/cute-prompts';
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

const PAGE_PATH = '/cute-animal-generator';
const PAGE_PUBLISHED = '2026-08-08T00:00:00.000Z';
const PAGE_MODIFIED = LAST_MAJOR_UPDATE.toISOString();

const FAQS = [
  {
    question: 'What is a cute animal generator?',
    answer:
      'A cute animal generator is a free tool that picks an adorable animal and optionally adds action, emotion, and location so you get a ready-to-use prompt for kids activities, drawing, stories, or games.',
  },
  {
    question: 'Who should use this cute animal generator?',
    answer:
      'It is built for parents, teachers, kids, illustrators, and anyone who wants soft, friendly animal prompts instead of a fully open wildlife list.',
  },
  {
    question: 'How do the Action, Emotion, and Location options work?',
    answer:
      'They are optional. Leave them off for a simple cute animal. Turn them on when you want Action (what it is doing), Emotion (mood), and Location (scene) for drawing or classroom prompts.',
  },
  {
    question: 'Is the cute animal generator free?',
    answer:
      'Yes. It runs in your browser, needs no account, and does not gate core generation behind a signup.',
  },
  {
    question: 'How is this different from the random animal picker?',
    answer:
      'The picker is for fair, fast choices of any animal. This cute animal generator focuses on adorable subjects and story-style prompt building with optional scene details.',
  },
  {
    question: 'Can I use cute results as an animal prompt generator for drawing?',
    answer:
      'Yes. Turn on Action, Emotion, and Location for a scene-ready brief. For timed drills and difficulty filters, open the drawing prompt generator—both tools share the same wildlife database.',
  },
] as const;

const HOW_TO_STEPS = [
  {
    name: 'Generate a cute animal',
    text: 'Click generate to pull a friendly animal from the curated cute pool—no setup required.',
  },
  {
    name: 'Enjoy or share',
    text: 'See a big animal result, copy the name, or share it for a quick smile.',
  },
  {
    name: 'Optional: add a tiny story',
    text: 'Open Action, Emotion, and Location when you want a richer drawing or classroom prompt.',
  },
] as const;

const PERSONAS = [
  {
    title: 'Parents & kids',
    text: 'Get a gentle animal for bedtime stories, sticker games, or rainy-day drawing without scary subjects.',
  },
  {
    title: 'Teachers',
    text: 'Hand every student the same cute prompt vibe, or regenerate for stations and writing warmups.',
  },
  {
    title: 'Illustrators',
    text: 'Skip blank-page anxiety with Action + Emotion + Location combos that already feel like a scene.',
  },
  {
    title: 'Content creators',
    text: 'Spin cute animals for Reels, Shorts, or challenge posts and pair them with wildlife art hashtags.',
  },
] as const;

const SCENE_IDEAS = [
  {
    title: 'Storytime spark',
    text: 'Generate one cute animal, then invent a three-sentence bedtime story using the optional emotion and location.',
  },
  {
    title: 'Soft sketch warmup',
    text: 'Draw only the silhouette of today’s featured cute animal in five minutes—no detail, just shape.',
  },
  {
    title: 'Classroom stations',
    text: 'Give each table a regenerated cute animal and ask for one fact, one drawing, and one caption.',
  },
  {
    title: 'Hashtag challenge',
    text: 'Post a daily cute animal with Action + Emotion + Location and invite friends to redraw the same brief.',
  },
] as const;

const HASHTAGS = [
  '#CuteAnimals',
  '#WildlifeArt',
  '#AnimalDrawing',
  '#KidsArt',
  '#DrawingChallenge',
  '#CuteAnimalGenerator',
] as const;

const CHALLENGE_CALENDAR = [
  {
    title: 'Mabstract March',
    text: 'Generate one cute animal a day and redraw it as a soft abstract shape study.',
  },
  {
    title: 'Zooptember',
    text: 'Use location + emotion options for a month of storybook animal scenes.',
  },
  {
    title: 'Catober / Crittertober',
    text: 'Lock your vibe to mammals from this cute animal generator and post daily sketches.',
  },
] as const;

const FEATURE_LIST = [
  'One-click cute animal results with a large image and name',
  'Curated cute animal pool from the local wildlife database',
  'Optional Action, Emotion, and Location story builders',
  'Copy and share support with real share links',
  'SSR-visible intro, examples, FAQ, and daily featured cute animal',
] as const;

function formatDisplayDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default function CuteAnimalGeneratorPage() {
  const pool = getCuteAnimals();
  const dailyAnimal = getDailyCuteAnimal();
  const initialResult = buildCutePrompt(dailyAnimal, {
    includeAction: false,
    includeEmotion: false,
    includeLocation: false,
  });

  const stats = [
    { value: String(pool.length), label: 'Curated cute animals' },
    { value: '3', label: 'Story toggles' },
    { value: '1', label: 'Daily featured cutie' },
    { value: '0', label: 'Signup required' },
  ] as const;

  const structuredData = [
    buildWebPageSchema({
      name: 'Cute Animal Generator',
      description:
        'Free cute animal generator—instant adorable animals, with optional story prompts for kids, drawing, and games.',
      path: PAGE_PATH,
      datePublished: PAGE_PUBLISHED,
      dateModified: PAGE_MODIFIED,
    }),
    buildWebAppSchema({
      name: 'Cute Animal Generator',
      description:
        'Generate a cute animal in one click. Optionally enrich with Action, Emotion, and Location.',
      path: PAGE_PATH,
      featureList: [...FEATURE_LIST],
      datePublished: PAGE_PUBLISHED,
      dateModified: PAGE_MODIFIED,
    }),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Cute Animal Generator', path: PAGE_PATH },
    ]),
    buildHowToSchema(
      'How to use the cute animal generator',
      'Generate a cute animal in one click, then optionally add action, emotion, and location.',
      PAGE_PATH,
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
          alt="Soft misty woodland with friendly wildlife for the cute animal generator"
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
            Soft wildlife prompts
          </p>
          <h1 className="font-display animate-home-rise-delay mt-3 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
            Cute Animal Generator
          </h1>
          <p className="animate-home-rise-delay-2 mt-5 max-w-xl text-lg leading-relaxed text-[var(--paper)]/90 md:text-xl">
            A free <strong className="font-semibold text-[var(--paper)]">cute animal generator</strong>{' '}
            that returns an adorable animal in one tap—optional Action, Emotion, and Location for
            kids, drawing, and classroom prompts.
          </p>
          <div className="animate-home-rise-delay-2 mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="#generator" className="home-cta-light">
              Generate a cute animal
            </a>
            <a href="#what-is" className="home-cta-ghost">
              What it is
            </a>
            <Link href="/random-animal-picker" className="home-cta-ghost">
              Random animal picker
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

        <CuteAnimalGeneratorTool initialResult={initialResult} />

        <article>
          <section id="what-is" className="home-section scroll-mt-24">
            <h2 className="home-section-title">What Is a Cute Animal Generator?</h2>
            <p className="home-prose mt-4">
              A <strong className="font-semibold text-[var(--ink)]">cute animal generator</strong>{' '}
              helps you meet an adorable animal without scrolling endless lists. This page keeps the
              pool focused on friendly subjects—pandas, otters, puffins, hedgehogs, and more—so one
              tap is enough for a quick cute result.
            </p>
            <ul className="mx-auto mt-8 max-w-2xl list-disc space-y-2 pl-5 text-[var(--ink-muted)]">
              {FEATURE_LIST.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="home-prose mt-8">
              Today&apos;s featured cute animal is the{' '}
              <strong className="font-semibold text-[var(--ink)]">{dailyAnimal.commonName}</strong>{' '}
              ({dailyAnimal.scientificName}). The curated cute pool currently includes {pool.length}{' '}
              animals you can regenerate anytime. Generation uses the same local wildlife database as
              the rest of {SITE_NAME}, so the first paint does not depend on an external API.
            </p>
          </section>

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">Cute Animal Generator Stats</h2>
            <p className="home-prose mt-4">
              Concrete numbers help you judge whether this tool fits a quick kids activity, a soft
              drawing warmup, or a classroom station.
            </p>
            <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="border-t border-[var(--line)] pt-4 text-center">
                  <div className="font-display text-3xl font-semibold text-[var(--ink)]">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-[var(--ink-faint)]">{stat.label}</div>
                </div>
              ))}
            </div>
            <ul className="mx-auto mt-8 max-w-2xl list-disc space-y-2 pl-5 text-sm text-[var(--ink-muted)]">
              <li>Story options: Action · Emotion · Location (all optional)</li>
              <li>Pool focus: soft mammals, birds, and a few gentle marine / insect picks</li>
              <li>
                Search demand context: keyword research tools estimate roughly{' '}
                <strong className="font-semibold text-[var(--ink)]">KD ~15</strong> for &quot;cute
                animal generator&quot;, which is why this page targets that exact phrase.
              </li>
            </ul>
          </section>

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">Who Should Use This Tool?</h2>
            <p className="home-prose mt-4">
              This cute animal generator is for people who want friendly subjects—not a fully open
              wildlife list. Use it when soft prompts matter more than maximum variety.
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
            <h2 className="home-section-title">How to Use This Cute Animal Generator</h2>
            <p className="home-prose mt-4">
              To use this cute animal generator, tap generate for a friendly animal, share or copy the
              result, then optionally turn on Action, Emotion, and Location when you want a fuller
              story or drawing brief.
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
            <h2 className="home-section-title">Cute Animal Generator vs Picker vs Wheel</h2>
            <p className="home-prose mt-4">
              Use this page when adorable subjects and optional story beats matter. Switch tools when
              you need a fair open pick or a theatrical spin.
            </p>
            <div className="mx-auto mt-8 max-w-4xl overflow-x-auto">
              <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Comparison of cute animal generator versus picker and wheel
                </caption>
                <thead>
                  <tr className="border-b border-[var(--line-strong)]">
                    <th scope="col" className="py-3 pr-4 font-semibold text-[var(--ink)]">
                      Feature
                    </th>
                    <th scope="col" className="py-3 pr-4 font-semibold text-[var(--ink)]">
                      Cute generator
                    </th>
                    <th scope="col" className="py-3 pr-4 font-semibold text-[var(--ink)]">
                      Picker
                    </th>
                    <th scope="col" className="py-3 font-semibold text-[var(--ink)]">
                      Wheel
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[var(--ink-muted)]">
                  <tr className="border-b border-[var(--line)]">
                    <th scope="row" className="py-3 pr-4 font-medium text-[var(--ink)]">
                      Subject pool
                    </th>
                    <td className="py-3 pr-4">Curated cute subset</td>
                    <td className="py-3 pr-4">Full wildlife database</td>
                    <td className="py-3">Full wildlife database</td>
                  </tr>
                  <tr className="border-b border-[var(--line)]">
                    <th scope="row" className="py-3 pr-4 font-medium text-[var(--ink)]">
                      Reveal style
                    </th>
                    <td className="py-3 pr-4">Instant card</td>
                    <td className="py-3 pr-4">Instant pick</td>
                    <td className="py-3">Spin reveal</td>
                  </tr>
                  <tr className="border-b border-[var(--line)]">
                    <th scope="row" className="py-3 pr-4 font-medium text-[var(--ink)]">
                      Story options
                    </th>
                    <td className="py-3 pr-4">Action / Emotion / Location</td>
                    <td className="py-3 pr-4">List &amp; daily modes</td>
                    <td className="py-3">Party / classroom modes</td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-3 pr-4 font-medium text-[var(--ink)]">
                      Best for
                    </th>
                    <td className="py-3 pr-4">Kids, soft art, stories</td>
                    <td className="py-3 pr-4">Fair games &amp; writing</td>
                    <td className="py-3">Live group rounds</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="home-prose mt-8">
              Searching for a broader animal prompt generator experience with timers? Use the{' '}
              <Link href="/drawing-prompt-generator" className="home-link">
                drawing prompt generator
              </Link>
              —this cute page stays focused on adorable subjects and story beats.
            </p>
          </section>

          <section id="scene-ideas" className="home-section scroll-mt-24">
            <h2 className="home-section-title">Cute Animal Scene Ideas</h2>
            <p className="home-prose mt-4">
              The fastest way to use a cute animal generator is a tiny constraint: one animal, one
              mood, one place—then draw, write, or share.
            </p>
            <div className="relative mx-auto my-8 w-full max-w-3xl overflow-hidden">
              <Image
                src="/random-animal-picker-usecases.webp"
                alt="Soft wildlife prompt cards used for kids activities and sketch warmups"
                width={1400}
                height={1050}
                className="h-auto w-full object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="mx-auto mt-10 grid max-w-5xl gap-8 text-left md:grid-cols-2">
              {SCENE_IDEAS.map((idea) => (
                <div key={idea.title} className="border-t border-[var(--line)] pt-5">
                  <h3 className="font-display text-xl font-semibold text-[var(--ink)]">{idea.title}</h3>
                  <p className="mt-3 leading-relaxed text-[var(--ink-muted)]">{idea.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">Classroom & Kids Activities</h2>
            <p className="home-prose mt-4">
              For classrooms and rainy-day stations, generate one shared cute animal so every student
              starts from the same friendly subject, then compare captions or drawings after a fixed
              timer.
            </p>
            <div className="relative mx-auto my-8 w-full max-w-3xl overflow-hidden">
              <Image
                src="/random-animal-name-classroom-v2.webp"
                alt="Classroom using a shared cute animal prompt for drawing and writing warmups"
                width={1400}
                height={1050}
                className="h-auto w-full object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="home-prose home-prose-start mx-auto max-w-3xl space-y-4">
              <p>
                Prefer a fair open pick across all wildlife? Open the{' '}
                <Link href="/random-animal-picker" className="home-link">
                  random animal picker
                </Link>
                . Want a theatrical one-at-a-time reveal? Spin the{' '}
                <Link href="/random-animal-generator-wheel" className="home-link">
                  random animal generator wheel
                </Link>
                .
              </p>
            </div>
          </section>

          <section id="hashtags-challenges" className="home-section scroll-mt-24">
            <h2 className="home-section-title">Hashtags & Challenge Calendar</h2>
            <p className="home-prose mt-4">
              Pair your cute animal generator result with art hashtags when you post. Specific tags help
              people find drawing challenges on Instagram Reels, TikTok, ArtStation, and Pinterest.
            </p>
            <p className="home-prose mx-auto mt-6 max-w-3xl text-center">
              {HASHTAGS.join(' · ')}
            </p>
            <div className="mx-auto mt-10 grid max-w-5xl gap-8 text-left md:grid-cols-3">
              {CHALLENGE_CALENDAR.map((item) => (
                <div key={item.title} className="border-t border-[var(--line)] pt-5">
                  <h3 className="font-display text-xl font-semibold text-[var(--ink)]">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-[var(--ink-muted)]">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">Why Soft Animal Prompts Work</h2>
            <p className="home-prose mt-4">
              Soft, friendly subjects lower the barrier to start—especially for kids and beginners who
              freeze when a tool returns intimidating wildlife. A curated cute pool keeps momentum high
              while optional story toggles still support richer drawing briefs.
            </p>
            <blockquote className="mx-auto mt-8 max-w-3xl border-l-2 border-[var(--olive)] pl-5 text-left">
              <p className="text-lg leading-relaxed text-[var(--ink)]">
                &quot;Choice overload refers to a cognitive process in which people have a difficult
                time making a decision when faced with many options.&quot;
              </p>
              <footer className="mt-3 text-sm text-[var(--ink-faint)]">
                —{' '}
                <cite>
                  <a
                    href="https://en.wikipedia.org/wiki/Overchoice"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-link"
                  >
                    Overchoice, Wikipedia
                  </a>
                </cite>
              </footer>
            </blockquote>
            <p className="home-prose mt-8">
              That is why this cute animal generator starts with a smaller, friendlier pool instead of
              the full 121-animal database—then lets you expand into scene details only when you want
              them.
            </p>
          </section>

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">Sources & Citations</h2>
            <p className="home-prose mt-4">
              The product framing on this page is grounded in decision-making research and public
              creative-challenge formats. Key sources:
            </p>
            <ol className="mx-auto mt-6 max-w-3xl list-decimal space-y-3 pl-5 text-[var(--ink-muted)]">
              <li>
                <a
                  href="https://en.wikipedia.org/wiki/Overchoice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-link"
                >
                  Wikipedia: Overchoice
                </a>{' '}
                — why a curated cute pool beats an endless open list for beginners.
              </li>
              <li>
                <a
                  href="https://inktober.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-link"
                >
                  Inktober
                </a>{' '}
                — widely known public drawing-challenge format artists adapt with random prompts.
              </li>
              <li>
                Internal product data ({SITE_NAME}, 2026): curated cute subset from the 121-animal
                database with optional Action / Emotion / Location story builders on this page.
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
              Related tools share the same wildlife database so you can switch formats without restarting
              your brief.
            </p>
            <ul className="mx-auto mt-8 max-w-3xl list-disc space-y-3 pl-5 text-[var(--ink-muted)]">
              <li>
                <Link href="/random-animal-picker" className="home-link">
                  random animal picker
                </Link>{' '}
                — fair one-click picks for games and classrooms.
              </li>
              <li>
                <Link href="/random-animal-name-generator" className="home-link">
                  random animal name generator
                </Link>{' '}
                — copy-ready name lists.
              </li>
              <li>
                <Link href="/drawing-prompt-generator" className="home-link">
                  drawing prompt generator
                </Link>{' '}
                — timed animal art prompts.
              </li>
              <li>
                <Link href="/random-animal-generator-for-drawing" className="home-link">
                  random animal generator for drawing
                </Link>{' '}
                — animal-first drawing long-tail page.
              </li>
              <li>
                <Link href="/random-animal-generator-wheel" className="home-link">
                  random animal generator wheel
                </Link>{' '}
                — spin reveal for live rounds.
              </li>
              <li>
                <Link href="/" className="home-link">
                  random animal generator
                </Link>{' '}
                — full homepage generator with filters.
              </li>
            </ul>
          </section>
        </article>

        <footer className="home-section text-center">
          <p className="font-display text-lg font-semibold text-[var(--ink)]">
            Free cute animal generator—no signup
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
