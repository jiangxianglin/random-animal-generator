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

const PAGE_PUBLISHED = '2026-07-02T00:00:00.000Z';
const PAGE_MODIFIED = LAST_MAJOR_UPDATE.toISOString();

const FAQS = [
  {
    question: 'What is a random animal generator for drawing?',
    answer:
      'A random animal generator for drawing is a free tool that picks wildlife subjects at random so you can sketch with a clear animal brief—difficulty filters, reference images, and drawing tips included.',
  },
  {
    question: 'Who should use this page?',
    answer:
      'Artists, students, and teachers who want an animal-first drawing workflow: choose an animal subject, then draw—rather than browsing mixed art prompt vibes.',
  },
  {
    question: 'How is this different from the drawing prompt generator?',
    answer:
      'This page targets animal-first searches like “random animal generator for drawing.” The drawing prompt generator owns the exact phrase “drawing prompt generator” and leads with timed practice modes and challenges.',
  },
  {
    question: 'Can I filter animals by drawing difficulty?',
    answer:
      'Yes. Use Easy, Medium, or Hard filters so warmups stay simple and advanced studies stay challenging.',
  },
  {
    question: 'Can I practice one animal category at a time?',
    answer:
      'Yes. Lock mammals, birds, reptiles, marine animals, or insects when you want a themed sketch session.',
  },
  {
    question: 'Is this random animal generator for drawing free?',
    answer:
      'Yes. It runs in your browser with no signup and no paywall on the core generator.',
  },
] as const;

const HOW_TO_STEPS = [
  {
    name: 'Set quantity and filters',
    text: 'Choose how many animals you want, then optionally narrow by category and drawing difficulty.',
  },
  {
    name: 'Generate animal subjects',
    text: 'Generate a fresh set of random animals built for sketch practice and art warmups.',
  },
  {
    name: 'Draw from the cards',
    text: 'Open each card for a reference image, facts, and drawing tips, then start your sketch.',
  },
] as const;

const PERSONAS = [
  {
    title: 'Sketchers who want an animal first',
    text: 'Start from a wildlife subject—not a mood board—so every generate is something you can actually draw.',
  },
  {
    title: 'Art students',
    text: 'Filter by difficulty to warm up with easy shapes, then climb into harder anatomy studies.',
  },
  {
    title: 'Hobby illustrators',
    text: 'Open the page, generate two or three animals, and finish a short practice set without decision fatigue.',
  },
  {
    title: 'Art teachers',
    text: 'Category-lock a mammal or bird unit so the whole class draws from the same wildlife group.',
  },
] as const;

const PRACTICE_IDEAS = [
  {
    title: 'Easy-to-hard ladders',
    text: 'Generate one easy animal, then one medium, then one hard—three sketches that climb in complexity.',
  },
  {
    title: 'Category lock series',
    text: 'Filter to birds or marine animals and complete a mini series from three generated subjects.',
  },
  {
    title: 'Reference-first studies',
    text: 'Open the animal card, spend two minutes observing, then draw without looking for thirty seconds.',
  },
  {
    title: 'Classroom shared subjects',
    text: 'Generate three animals for the board and let students choose one—or assign one per table.',
  },
] as const;

const STATS = [
  { value: '121', label: 'Curated animals' },
  { value: '5', label: 'Wildlife categories' },
  { value: '3', label: 'Difficulty levels' },
  { value: '0', label: 'Signup required' },
] as const;

const FEATURE_LIST = [
  'Random animals built as drawing subjects with reference images',
  'Difficulty filters: Easy (35), Medium (57), Hard (29)',
  'Category filters: mammals, birds, reptiles, marine animals, insects',
  'Drawing tips and facts on each animal card',
  'Optional timed practice modes when you want a studio warmup',
] as const;

function formatDisplayDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default function RandomAnimalGeneratorForDrawingPage() {
  const structuredData = [
    buildWebPageSchema({
      name: 'Random Animal Generator for Drawing',
      description:
        'A free random animal generator for drawing with difficulty filters, category locks, and reference tips for sketch practice.',
      path: '/random-animal-generator-for-drawing',
      datePublished: PAGE_PUBLISHED,
      dateModified: PAGE_MODIFIED,
    }),
    buildWebAppSchema({
      name: 'Random Animal Generator for Drawing',
      description:
        'A free random animal generator for drawing with difficulty filters, category locks, and reference tips for sketch practice.',
      path: '/random-animal-generator-for-drawing',
      datePublished: PAGE_PUBLISHED,
      dateModified: PAGE_MODIFIED,
      featureList: [...FEATURE_LIST],
    }),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      {
        name: 'Random Animal Generator for Drawing',
        path: '/random-animal-generator-for-drawing',
      },
    ]),
    buildHowToSchema(
      'How to use the random animal generator for drawing',
      'Generate random animals as drawing subjects and sketch from the reference cards.',
      '/random-animal-generator-for-drawing',
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
          src="/random-animal-for-drawing-hero.webp"
          alt="Misty woodland wildlife scene for a random animal generator for drawing practice"
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
            Animal-first sketch subjects
          </p>
          <h1 className="font-display animate-home-rise-delay mt-3 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
            Random Animal Generator for Drawing
          </h1>
          <p className="animate-home-rise-delay-2 mt-5 max-w-xl text-lg leading-relaxed text-[var(--paper)]/90 md:text-xl">
            A random animal generator for drawing picks wildlife subjects with difficulty filters and
            reference tips—so you can start sketching without deciding what to draw.
          </p>
          <div className="animate-home-rise-delay-2 mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="#generator" className="home-cta-light">
              Open drawing tool
            </a>
            <a href="#what-is" className="home-cta-ghost">
              What it is
            </a>
            <Link href="/drawing-prompt-generator" className="home-cta-ghost">
              Drawing prompt generator
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

        <DrawingGeneratorTool generateLabel="Generate Animals for Drawing" />

        <article>
          <section id="what-is" className="home-section scroll-mt-24">
            <h2 className="home-section-title">What Is a Random Animal Generator for Drawing?</h2>
            <p className="home-prose mt-4">
              A{' '}
              <strong className="font-semibold text-[var(--ink)]">
                random animal generator for drawing
              </strong>{' '}
              is an animal-first sketch tool: every result is a wildlife subject with a reference
              image, difficulty label, and tips—not a mixed prompt about landscapes or objects.
            </p>
            <ul className="mx-auto mt-8 max-w-2xl list-disc space-y-2 pl-5 text-[var(--ink-muted)]">
              {FEATURE_LIST.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">Drawing Generator Stats</h2>
            <p className="home-prose mt-4">
              Concrete numbers help you judge whether the tool fits a five-minute warmup or a longer
              study block.
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
              <li>Difficulty split: 35 easy · 57 medium · 29 hard</li>
              <li>Category counts: 33 mammals · 22 birds · 20 reptiles · 22 marine · 24 insects</li>
              <li>
                Keyword role: this page owns{' '}
                <strong className="font-semibold text-[var(--ink)]">
                  random animal generator for drawing
                </strong>
                ; the exact phrase{' '}
                <Link href="/drawing-prompt-generator" className="home-link">
                  drawing prompt generator
                </Link>{' '}
                lives on its own lander.
              </li>
            </ul>
          </section>

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">Who Should Use This Tool?</h2>
            <p className="home-prose mt-4">
              Use this random animal generator for drawing when your search starts with animals and
              ends with a sketch—not when you want a generic art-prompt roulette.
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
            <h2 className="home-section-title">How to Use This Random Animal Generator for Drawing</h2>
            <p className="home-prose mt-4">
              To use this random animal generator for drawing, set filters, generate animal subjects,
              then sketch from the reference cards and tips.
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
            <h2 className="home-section-title">
              Animal Drawing Generator vs Drawing Prompt Generator
            </h2>
            <p className="home-prose mt-4">
              Both pages share the same animal library. They split search intent so they do not
              compete for the same head term.
            </p>
            <div className="mx-auto mt-8 max-w-4xl overflow-x-auto">
              <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Comparison of random animal generator for drawing versus drawing prompt generator
                </caption>
                <thead>
                  <tr className="border-b border-[var(--line-strong)]">
                    <th scope="col" className="py-3 pr-4 font-semibold text-[var(--ink)]">
                      Focus
                    </th>
                    <th scope="col" className="py-3 pr-4 font-semibold text-[var(--ink)]">
                      This page
                    </th>
                    <th scope="col" className="py-3 font-semibold text-[var(--ink)]">
                      Drawing prompt generator
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[var(--ink-muted)]">
                  <tr className="border-b border-[var(--line)]">
                    <th scope="row" className="py-3 pr-4 font-medium text-[var(--ink)]">
                      Primary keyword
                    </th>
                    <td className="py-3 pr-4">random animal generator for drawing</td>
                    <td className="py-3">drawing prompt generator</td>
                  </tr>
                  <tr className="border-b border-[var(--line)]">
                    <th scope="row" className="py-3 pr-4 font-medium text-[var(--ink)]">
                      Framing
                    </th>
                    <td className="py-3 pr-4">Animal-first subjects for sketching</td>
                    <td className="py-3">Prompt/challenge-first art ideas</td>
                  </tr>
                  <tr className="border-b border-[var(--line)]">
                    <th scope="row" className="py-3 pr-4 font-medium text-[var(--ink)]">
                      Timed modes
                    </th>
                    <td className="py-3 pr-4">Available in the shared tool</td>
                    <td className="py-3">Lead feature on that lander</td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-3 pr-4 font-medium text-[var(--ink)]">
                      Cost / signup
                    </th>
                    <td className="py-3 pr-4">Free, no account</td>
                    <td className="py-3">Free, no account</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="practice-ideas" className="home-section scroll-mt-24">
            <h2 className="home-section-title">Animal Drawing Practice Ideas</h2>
            <p className="home-prose mt-4">
              The fastest way to use a random animal generator for drawing is a constraint: one
              difficulty, one category, or a short three-animal series.
            </p>
            <div className="relative mx-auto my-8 w-full max-w-3xl overflow-hidden">
              <Image
                src="/random-animal-for-drawing-practice.webp"
                alt="Desk setup for animal drawing practice with timer and wildlife reference cards"
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
            <h2 className="home-section-title">Classroom Sketch Tips</h2>
            <p className="home-prose mt-4">
              For classrooms, generate a small set of animals once, project the cards, and keep that
              set as the shared subjects for the period.
            </p>
            <div className="relative mx-auto my-8 w-full max-w-3xl overflow-hidden">
              <Image
                src="/random-animal-for-drawing-class.webp"
                alt="Art class sketching animals from a shared random animal generator for drawing"
                width={1400}
                height={1050}
                className="h-auto w-full object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <div className="home-prose home-prose-start mx-auto max-w-3xl space-y-4">
              <p>
                Prefer prompt/challenge framing with timers as the lead story? Open the{' '}
                <Link href="/drawing-prompt-generator">drawing prompt generator</Link>. Want a live
                spin reveal? Use the{' '}
                <Link href="/random-animal-generator-wheel">random animal wheel</Link>. Need names
                only? Try the{' '}
                <Link href="/random-animal-name-generator">random animal name generator</Link>.
              </p>
            </div>
          </section>

          <section className="home-section scroll-mt-24">
            <h2 className="home-section-title">Why Animal Subjects Help Drawing Practice</h2>
            <p className="home-prose mt-4">
              Animal subjects help drawing practice because they force proportion, gesture, and
              texture decisions quickly—especially when difficulty is controlled.
            </p>
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
              That pedagogy is why this generator pairs animal subjects with difficulty labels and
              optional timed modes instead of only open-ended &quot;draw something.&quot;
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
                — timed observational sketch practice.
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
                — soft animal prompts with action, emotion, and location.
              </li>
              <li>
                <Link href="/drawing-prompt-generator" className="home-link">
                  drawing prompt generator
                </Link>{' '}
                — exact-match page for drawing prompt generator searches.
              </li>
              <li>
                <Link href="/" className="home-link">
                  random animal generator
                </Link>{' '}
                — full generator with filters.
              </li>
              <li>
                <Link href="/random-animal-generator-wheel" className="home-link">
                  random animal generator wheel
                </Link>{' '}
                — spin reveal for live challenges.
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
            Free animal subjects for drawing—no signup
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[var(--ink-muted)]">
            Explore more:{' '}
            <Link href="/" className="home-link">
              random animal generator
            </Link>
            ,{' '}
            <Link href="/drawing-prompt-generator" className="home-link">
              drawing prompt generator
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
