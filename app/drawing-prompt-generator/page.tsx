import Image from 'next/image';
import Link from 'next/link';
import { DrawingGeneratorTool } from '@/components/drawing-generator-tool';
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

const PAGE_PUBLISHED = '2026-07-25T00:00:00.000Z';
const PAGE_MODIFIED = LAST_MAJOR_UPDATE.toISOString();

const EXAMPLE_SIMPLE = [
  'Red Fox (easy)',
  'Snow Leopard (hard)',
  'Atlantic Puffin (medium)',
  'Green Sea Turtle (medium)',
  'Barn Owl (easy)',
] as const;

const EXAMPLE_COMPLEX = [
  'red fox | mid-stride with weight shifting forward | alert | in tall dry grass at golden hour',
  'snow leopard | crouching low before a leap | focused | on sunlit rocky outcrops',
  'atlantic puffin | landing after a short hop | curious | beside a reflective tide pool',
  'green sea turtle | stretching after rest | serene | under a stormy sky',
  'barn owl | turning to look over its shoulder | wary | against a simple charcoal backdrop',
] as const;

const HASHTAGS = [
  '#DrawingPrompt',
  '#AnimalDrawing',
  '#DrawingChallenge',
  '#WildlifeArt',
  '#GestureDrawing',
  '#ArtWarmup',
] as const;

const CHALLENGE_CALENDAR = [
  {
    title: 'Daily animal sketch',
    text: 'Use Today’s prompt once a day for a shared animal drawing challenge—same subject, different interpretations.',
  },
  {
    title: 'Timed warmup week',
    text: 'Run 5-minute silhouette or 3-minute gesture modes for seven days and keep every page dated.',
  },
  {
    title: 'Scene study month',
    text: 'Turn on Action, Emotion, and Location to build complex combinations for Inktober-style animal drawing challenges.',
  },
] as const;

const FAQS = [
  {
    question: 'What is a drawing prompt generator?',
    answer:
      'A drawing prompt generator is a tool that gives you a ready-to-draw subject so you can start sketching without deciding what to draw. This one focuses on random animals with difficulty filters, practice timers, and a shared daily prompt.',
  },
  {
    question: 'Who is this drawing prompt generator for?',
    answer:
      'It is built for illustrators, concept artists, art students, hobby sketchers, and art teachers who want animal subjects for warmups, portfolio studies, and classroom challenges.',
  },
  {
    question: 'How is this different from a random animal generator for drawing?',
    answer:
      'This page targets drawing prompts and timed practice first. If you want an animal-first workflow with the same database, use the random animal generator for drawing page—both tools share the animal library.',
  },
  {
    question: 'Can I use these prompts for a daily drawing challenge?',
    answer:
      "Yes. Use Today's prompt for one shared animal each day, or run 5-minute silhouette and 3-minute gesture modes when you want a quick studio warmup. Pair results with the hashtag ideas below for public animal drawing challenges.",
  },
  {
    question: 'How do Action, Emotion, and Location options work?',
    answer:
      'They are optional scene builders. Leave them off for a clean animal subject with difficulty. Turn them on when you want a fuller drawing prompt—pose, mood, and setting—then copy the simple or complex line into your sketch plan.',
  },
  {
    question: 'Do I need to sign up to use the drawing prompt generator?',
    answer:
      'No. The tool is free, runs in your browser, and does not require an account.',
  },
  {
    question: 'Can I generate prompts for a specific animal group?',
    answer:
      'Yes. Narrow prompts to mammals, birds, reptiles, marine animals, or insects when you want a themed practice session or classroom art warm-up.',
  },
] as const;

const HOW_TO_STEPS = [
  {
    name: 'Choose a practice mode',
    text: 'Start free, or pick silhouette, gesture, texture, or today’s shared animal prompt.',
  },
  {
    name: 'Generate drawing prompts',
    text: 'Set quantity, category, and difficulty, then generate. Optionally add Action, Emotion, and Location. Timed modes start a countdown automatically.',
  },
  {
    name: 'Sketch from the results',
    text: 'Open a card for reference images and tips, copy the prompt list (including scene briefs), and draw until the timer ends.',
  },
] as const;

const PERSONAS = [
  {
    title: 'Illustrators & concept artists',
    text: 'Break decision fatigue with animal subjects that push anatomy, silhouette read, and creature design instincts.',
  },
  {
    title: 'Art students',
    text: 'Run short gesture rounds before class critiques, or climb from easy to hard animals across a study week.',
  },
  {
    title: 'Hobby sketchers',
    text: 'Open the tool, get one clear prompt, and finish a five-minute warmup without scrolling for inspiration.',
  },
  {
    title: 'Art teachers',
    text: 'Give every student the same daily animal, or spin category-locked prompts for a shared classroom challenge.',
  },
] as const;

const PRACTICE_IDEAS = [
  {
    title: 'Timed warmups',
    text: 'Generate an easy animal and sketch only the silhouette in five minutes. Repeat when the timer ends.',
  },
  {
    title: 'Difficulty climbs',
    text: 'Start easy, then switch to medium or hard animals to practice anatomy, foreshortening, and texture.',
  },
  {
    title: 'Category series',
    text: 'Lock birds or marine animals and generate three prompts for a mini series in one sitting.',
  },
  {
    title: 'Group challenges',
    text: 'Share today’s prompt with a class or Discord art club and compare interpretations after a set time.',
  },
] as const;

const STATS = [
  { value: '121', label: 'Curated animals' },
  { value: '5', label: 'Wildlife categories' },
  { value: '3', label: 'Timed practice modes' },
  { value: '0', label: 'Signup required' },
] as const;

const FEATURE_LIST = [
  'Random animal drawing prompts with reference images',
  'Practice modes: free, 5-min silhouette, 3-min gesture, 15-min texture, daily',
  'Optional Action, Emotion, and Location scene builders for complex prompts',
  'Difficulty filters: Easy (35), Medium (57), Hard (29)',
  'Category filters: mammals, birds, reptiles, marine animals, insects',
  'Copyable prompt lists for sketchbooks, Discord, or classroom handouts',
] as const;

function formatDisplayDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default function DrawingPromptGeneratorPage() {
  const structuredData = [
    buildWebPageSchema({
      name: 'Drawing Prompt Generator',
      description:
        'A free drawing prompt generator that creates random animal art ideas with difficulty filters, practice timers, and a daily challenge.',
      path: '/drawing-prompt-generator',
      datePublished: PAGE_PUBLISHED,
      dateModified: PAGE_MODIFIED,
    }),
    buildWebAppSchema({
      name: 'Drawing Prompt Generator',
      description:
        'A free drawing prompt generator that creates random animal art ideas with difficulty filters, practice timers, and a daily challenge.',
      path: '/drawing-prompt-generator',
      datePublished: PAGE_PUBLISHED,
      dateModified: PAGE_MODIFIED,
      featureList: [...FEATURE_LIST],
    }),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Drawing Prompt Generator', path: '/drawing-prompt-generator' },
    ]),
    buildHowToSchema(
      'How to use the drawing prompt generator',
      'Generate random animal drawing prompts and turn them into sketch practice.',
      '/drawing-prompt-generator',
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
          src="/drawing-prompt-hero-atelier.webp"
          alt="Sunlit artist studio with charcoal animal studies and a fox reference for drawing prompts"
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
            Free animal art ideas
          </p>
          <h1 className="font-display animate-home-rise-delay mt-3 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
            Drawing Prompt Generator
          </h1>
          <p className="animate-home-rise-delay-2 mt-5 max-w-xl text-lg leading-relaxed text-[var(--paper)]/90 md:text-xl">
            A drawing prompt generator is a free tool that picks a subject so you can start sketching
            immediately—here, every prompt is an animal with difficulty, timers, and reference tips.
          </p>
          <div className="animate-home-rise-delay-2 mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="#generator" className="home-cta-light">
              Open prompt tool
            </a>
            <a href="#what-is" className="home-cta-ghost">
              What it is
            </a>
            <Link href="/random-animal-generator-for-drawing" className="home-cta-ghost">
              Animal-first drawing
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

        <DrawingGeneratorTool />

        <article>
          <section id="what-is" className="home-section scroll-mt-24">
            <h2 className="home-section-title">What Is a Drawing Prompt Generator?</h2>
            <p className="home-prose mt-4">
              A <strong className="font-semibold text-[var(--ink)]">drawing prompt generator</strong> is
              a tool that removes the &quot;what should I draw?&quot; decision by giving you a subject,
              constraint, or challenge. This page is an animal-vertical version: it returns random
              wildlife prompts with difficulty labels, category filters, and timed practice modes.
            </p>
            <ul className="mx-auto mt-8 max-w-2xl list-disc space-y-2 pl-5 text-[var(--ink-muted)]">
              {FEATURE_LIST.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">Drawing Prompt Generator Stats</h2>
            <p className="home-prose mt-4">
              Concrete numbers help you judge whether the tool matches a studio warmup, a homework
              set, or a multi-week practice streak.
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
              <li>Difficulty split today: 35 easy · 57 medium · 29 hard animals</li>
              <li>Category counts: 33 mammals · 22 birds · 20 reptiles · 22 marine · 24 insects</li>
              <li>
                Search demand context: keyword research tools estimate roughly{' '}
                <strong className="font-semibold text-[var(--ink)]">1,010 monthly searches</strong> for
                &quot;drawing prompt generator&quot; (KD ~21), which is why this page targets that
                exact phrase.
              </li>
            </ul>
          </section>

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">Who Should Use This Tool?</h2>
            <p className="home-prose mt-4">
              This drawing prompt generator is for people who want animal subjects—not mixed mood
              boards. Use it when you need a fair brief for solo practice or a shared classroom
              challenge.
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
            <h2 className="home-section-title">How to Use This Drawing Prompt Generator</h2>
            <p className="home-prose mt-4">
              To use this drawing prompt generator, choose a practice mode, generate one or more
              animals, then sketch from the reference card until the timer ends—or copy the prompt
              list into your sketchbook plan.
            </p>
            <div className="relative mx-auto my-8 w-full max-w-3xl overflow-hidden">
              <Image
                src="/drawing-prompt-howto-flow.webp"
                alt="Barn owl prompt card, sketchbook study, and five-minute timer on a drawing desk"
                width={1536}
                height={1024}
                className="h-auto w-full object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
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

          <section id="prompt-examples" className="home-section scroll-mt-24">
            <h2 className="home-section-title">Simple Prompts & Complex Combinations</h2>
            <p className="home-prose mt-4">
              Start with a simple animal subject, or turn on Action, Emotion, and Location for a
              scene-ready drawing prompt. These examples mirror what the tool can return.
            </p>
            <div className="relative mx-auto my-8 w-full max-w-3xl overflow-hidden">
              <Image
                src="/drawing-prompt-simple-complex.webp"
                alt="Sketchbook comparing a simple red fox subject study with a complex fox-in-grass scene prompt"
                width={1536}
                height={1024}
                className="h-auto w-full object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="mx-auto mt-10 grid max-w-5xl gap-10 md:grid-cols-2">
              <div className="border-t border-[var(--line)] pt-5">
                <h3 className="font-display text-xl font-semibold text-[var(--ink)]">
                  Simple prompts
                </h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--ink-muted)]">
                  {EXAMPLE_SIMPLE.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-[var(--line)] pt-5">
                <h3 className="font-display text-xl font-semibold text-[var(--ink)]">
                  Complex combinations
                </h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--ink-muted)]">
                  {EXAMPLE_COMPLEX.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">
              Drawing Prompt Generator vs Generic Prompt Tools
            </h2>
            <p className="home-prose mt-4">
              Generic prompt tools mix landscapes, objects, and vibes. An animal drawing prompt
              generator keeps every result drawable as wildlife study practice.
            </p>
            <div className="mx-auto mt-8 max-w-4xl overflow-x-auto">
              <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Comparison of this animal drawing prompt generator versus generic prompt tools
                </caption>
                <thead>
                  <tr className="border-b border-[var(--line-strong)]">
                    <th scope="col" className="py-3 pr-4 font-semibold text-[var(--ink)]">
                      Feature
                    </th>
                    <th scope="col" className="py-3 pr-4 font-semibold text-[var(--ink)]">
                      This page
                    </th>
                    <th scope="col" className="py-3 font-semibold text-[var(--ink)]">
                      Typical generic tool
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[var(--ink-muted)]">
                  <tr className="border-b border-[var(--line)]">
                    <th scope="row" className="py-3 pr-4 font-medium text-[var(--ink)]">
                      Prompt type
                    </th>
                    <td className="py-3 pr-4">Animals only (121 species)</td>
                    <td className="py-3">Mixed subjects / vibes</td>
                  </tr>
                  <tr className="border-b border-[var(--line)]">
                    <th scope="row" className="py-3 pr-4 font-medium text-[var(--ink)]">
                      Difficulty control
                    </th>
                    <td className="py-3 pr-4">Easy / Medium / Hard filters</td>
                    <td className="py-3">Rarely skill-based</td>
                  </tr>
                  <tr className="border-b border-[var(--line)]">
                    <th scope="row" className="py-3 pr-4 font-medium text-[var(--ink)]">
                      Timed practice
                    </th>
                    <td className="py-3 pr-4">3 / 5 / 15 minute modes</td>
                    <td className="py-3">Usually none</td>
                  </tr>
                  <tr className="border-b border-[var(--line)]">
                    <th scope="row" className="py-3 pr-4 font-medium text-[var(--ink)]">
                      Classroom fairness
                    </th>
                    <td className="py-3 pr-4">Shared daily prompt</td>
                    <td className="py-3">Often one-off random text</td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-3 pr-4 font-medium text-[var(--ink)]">
                      Cost / signup
                    </th>
                    <td className="py-3 pr-4">Free, no account</td>
                    <td className="py-3">Varies; many gate features</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="practice-ideas" className="home-section scroll-mt-24">
            <h2 className="home-section-title">Animal Drawing Prompt Ideas</h2>
            <p className="home-prose mt-4">
              The fastest way to use animal drawing prompts is a timed constraint: silhouette in 5
              minutes, gesture in 3 minutes, or texture study in 15 minutes.
            </p>
            <div className="relative mx-auto my-8 w-full max-w-3xl overflow-hidden">
              <Image
                src="/drawing-prompt-warmup-desk.webp"
                alt="Desk setup with timer, silhouette animal sketches, and wildlife reference cards"
                width={1400}
                height={1050}
                className="h-auto w-full object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="mx-auto mt-10 grid max-w-5xl gap-8 text-left md:grid-cols-2">
              {PRACTICE_IDEAS.map((idea) => (
                <div key={idea.title} className="border-t border-[var(--line)] pt-5">
                  <h3 className="font-display text-xl font-semibold text-[var(--ink)]">{idea.title}</h3>
                  <p className="mt-3 leading-relaxed text-[var(--ink-muted)]">{idea.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">Classroom & Art Club Challenges</h2>
            <p className="home-prose mt-4">
              For classrooms and art clubs, reveal Today&apos;s prompt so every student draws the same
              animal, then compare silhouettes after a fixed timer.
            </p>
            <div className="relative mx-auto my-8 w-full max-w-3xl overflow-hidden">
              <Image
                src="/drawing-prompt-art-class.webp"
                alt="Art class sketching the same snow leopard drawing prompt from a shared reference"
                width={1400}
                height={1050}
                className="h-auto w-full object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="home-prose home-prose-start mx-auto max-w-3xl space-y-4">
              <p>
                Category filters keep a mammal unit or bird study from drifting off-topic. Prefer a
                theatrical one-at-a-time reveal? Spin the{' '}
                <Link href="/random-animal-generator-wheel">random animal wheel</Link>. Need an
                animal-first long-tail page? Open the{' '}
                <Link href="/random-animal-generator-for-drawing">
                  random animal generator for drawing
                </Link>
                .
              </p>
            </div>
          </section>

          <section id="hashtags-challenges" className="home-section scroll-mt-24">
            <h2 className="home-section-title">Hashtags & Challenge Calendar</h2>
            <p className="home-prose mt-4">
              Pair this drawing prompt generator with art hashtags when you post an animal drawing
              challenge. Specific tags help classmates and other artists find timed warmups on
              Instagram, TikTok, ArtStation, and Pinterest.
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
            <h2 className="home-section-title">Why Timed Animal Prompts Work</h2>
            <p className="home-prose mt-4">
              Timed prompts work because short sketch intervals train observation and decision-making
              before detail addiction sets in—especially for gesture and silhouette practice.
            </p>
            <div className="relative mx-auto my-8 w-full max-w-3xl overflow-hidden">
              <Image
                src="/drawing-prompt-timed-gesture.webp"
                alt="Charcoal gesture sketches of deer, foxes, and birds with a practice timer and drawing tools"
                width={1536}
                height={1024}
                className="h-auto w-full object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <blockquote className="mx-auto mt-8 max-w-3xl border-l-2 border-[var(--olive)] pl-5 text-left">
              <p className="text-lg leading-relaxed text-[var(--ink)]">
                &quot;Gesture drawing is a method of training hands to quickly sketch what the eye
                sees… Drawings are usually very quickly executed—often finished in 30 seconds to 2
                minutes.&quot;
              </p>
              <footer className="mt-3 text-sm text-[var(--ink-faint)]">
                —{' '}
                <cite>
                  <a
                    href="https://en.wikipedia.org/wiki/Gesture_drawing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-link"
                  >
                    Gesture drawing, Wikipedia
                  </a>
                </cite>
              </footer>
            </blockquote>
            <blockquote className="mx-auto mt-8 max-w-3xl border-l-2 border-[var(--olive)] pl-5 text-left">
              <p className="text-lg leading-relaxed text-[var(--ink)]">
                &quot;Contour drawing is an artistic technique used in which the artist sketches the
                style of a subject by drawing lines that result in a drawing that is essentially an
                outline.&quot;
              </p>
              <footer className="mt-3 text-sm text-[var(--ink-faint)]">
                —{' '}
                <cite>
                  <a
                    href="https://en.wikipedia.org/wiki/Contour_drawing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-link"
                  >
                    Contour drawing, Wikipedia
                  </a>
                </cite>
              </footer>
            </blockquote>
            <p className="home-prose mt-8">
              That pedagogy is why this tool ships 3-minute gesture and 5-minute silhouette modes
              instead of only open-ended &quot;draw something.&quot; For seasonal public challenges,
              many artists also pair random prompts with community events such as{' '}
              <a
                href="https://inktober.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="home-link"
              >
                Inktober
              </a>
              .
            </p>
          </section>

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">Sources & Citations</h2>
            <p className="home-prose mt-4">
              The practice advice on this page is grounded in established drawing pedagogy and public
              references. Key sources:
            </p>
            <ol className="mx-auto mt-6 max-w-3xl list-decimal space-y-3 pl-5 text-[var(--ink-muted)]">
              <li>
                <a
                  href="https://en.wikipedia.org/wiki/Gesture_drawing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-link"
                >
                  Wikipedia: Gesture drawing
                </a>{' '}
                — timed observational sketch practice (seconds to a few minutes).
              </li>
              <li>
                <a
                  href="https://en.wikipedia.org/wiki/Contour_drawing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-link"
                >
                  Wikipedia: Contour drawing
                </a>{' '}
                — outline-focused observation used in silhouette warmups.
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
                Internal product data ({SITE_NAME}, 2026): 121-animal database with published
                difficulty and category counts on this page.
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
                — adorable animals with story-style scene options.
              </li>
              <li>
                <Link href="/" className="home-link">
                  random animal generator
                </Link>{' '}
                — filters and classroom-friendly picks.
              </li>
              <li>
                <Link href="/random-animal-picker" className="home-link">
                  random animal picker
                </Link>{' '}
                — instant picks for games and fair classroom choices.
              </li>
              <li>
                <Link href="/random-animal-generator-for-drawing" className="home-link">
                  random animal generator for drawing
                </Link>{' '}
                — animal-first long-tail drawing page.
              </li>
              <li>
                <Link href="/random-animal-generator-wheel" className="home-link">
                  random animal generator wheel
                </Link>{' '}
                — one-at-a-time spin reveal.
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
            Free animal drawing prompts—no signup
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
            <Link href="/random-animal-generator-for-drawing" className="home-link">
              random animal generator for drawing
            </Link>
            .
          </p>
        </footer>
      </div>
    </div>
  );
}
