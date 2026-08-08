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
import { SITE_NAME } from '@/lib/site';

const PAGE_PATH = '/cute-animal-generator';
const PAGE_PUBLISHED = '2026-08-08T00:00:00.000Z';
const PAGE_MODIFIED = '2026-08-08T00:00:00.000Z';

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

export default function CuteAnimalGeneratorPage() {
  const pool = getCuteAnimals();
  const dailyAnimal = getDailyCuteAnimal();
  const initialResult = buildCutePrompt(dailyAnimal, {
    includeAction: false,
    includeEmotion: false,
    includeLocation: false,
  });

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

      <header className="border-b border-[var(--line)] bg-[var(--ink)] text-[var(--paper)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-[1.2fr_0.8fr] md:items-end md:py-16">
          <div>
            <p className="text-sm font-medium text-[var(--paper)]/70">
              By {SITE_NAME} · Updated August 8, 2026
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-6xl">
              Cute Animal Generator
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--paper)]/88">
              Free <strong className="font-semibold text-[var(--paper)]">cute animal generator</strong>{' '}
              — tap once for an adorable animal. Optional story toggles add action, emotion, and
              location when you want drawing or classroom prompts.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#cute-generator" className="home-cta-light">
                Generate a cute animal
              </a>
              <Link href="/random-animal-picker" className="home-cta-ghost">
                Random animal picker
              </Link>
            </div>
          </div>
          <div className="relative min-h-56 overflow-hidden rounded-[var(--radius-md)] border border-white/15">
            <Image
              src="/home-hero-field-atelier.png"
              alt="Soft woodland wildlife scene for the cute animal generator"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 md:py-14">
        <CuteAnimalGeneratorTool initialResult={initialResult} />

        <article>
          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">What Is a Cute Animal Generator?</h2>
            <div className="home-prose mt-6 space-y-4">
              <p>
                A <strong className="font-semibold text-[var(--ink)]">cute animal generator</strong>{' '}
                helps you meet an adorable animal without scrolling endless lists. This page keeps the
                pool focused on friendly subjects—pandas, otters, puffins, hedgehogs, and more—so one
                tap is enough for a quick cute result.
              </p>
              <p>
                When you want more than a name and picture, optional story toggles add scene details for
                kids activities, drawing practice, or classroom warmups. The tool uses the same local
                wildlife database as the rest of {SITE_NAME}, so generation stays fast and does not
                depend on a first-paint API call.
              </p>
              <p>
                Today&apos;s featured cute animal is the{' '}
                <strong className="font-semibold text-[var(--ink)]">{dailyAnimal.commonName}</strong>{' '}
                ({dailyAnimal.scientificName}). The curated cute pool currently includes {pool.length}{' '}
                animals you can regenerate anytime.
              </p>
            </div>
          </section>

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">Who Should Use This Tool?</h2>
            <div className="mx-auto mt-10 grid max-w-5xl gap-8 text-left md:grid-cols-2">
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

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">How to Use This Cute Animal Generator</h2>
            <ol className="mx-auto mt-10 grid max-w-5xl list-none gap-8 text-center md:grid-cols-3 md:gap-10 md:text-left">
              {HOW_TO_STEPS.map((step, index) => (
                <li key={step.name} className="border-t border-[var(--line)] pt-5">
                  <div className="font-display text-sm font-medium text-[var(--olive)]">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="mt-2 font-display text-xl font-semibold text-[var(--ink)]">
                    {step.name}
                  </h3>
                  <p className="mt-2 text-[var(--ink-muted)] leading-relaxed">{step.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="home-section scroll-mt-24">
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
            <h2 className="home-section-title">Cute Animal Generator vs Picker vs Wheel</h2>
            <div className="home-prose mt-6 space-y-4">
              <p>
                Use this <strong className="font-semibold text-[var(--ink)]">cute animal generator</strong>{' '}
                when you want adorable subjects and optional story beats. Switch to the{' '}
                <Link href="/random-animal-picker" className="home-link">
                  random animal picker
                </Link>{' '}
                for a fair open pick, or the{' '}
                <Link href="/random-animal-generator-wheel" className="home-link">
                  random animal generator wheel
                </Link>{' '}
                when the group wants a theatrical spin.
              </p>
              <p>
                Need animal names only? Open the{' '}
                <Link href="/random-animal-name-generator" className="home-link">
                  random animal name generator
                </Link>
                . Want timed sketch drills? Use the{' '}
                <Link href="/drawing-prompt-generator" className="home-link">
                  drawing prompt generator
                </Link>
                .
              </p>
            </div>
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
                  animal prompt generator
                </Link>{' '}
                — timed animal art prompts.
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
      </div>
    </div>
  );
}
