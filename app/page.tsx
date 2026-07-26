import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { HomeGenerator, HomeGeneratorFallback } from '@/components/home-generator';
import { buildBreadcrumbSchema, buildFaqSchema, buildHowToSchema, buildWebAppSchema } from '@/lib/seo';
import { SITE_NAME } from '@/lib/site';

const HOME_FAQS = [
  {
    question: 'How does the random animal generator work?',
    answer:
      'The generator selects animals at random from a curated database of 100+ species. You can control quantity, category, and drawing difficulty, then use the results for prompts, learning, or games. Nothing is stored on a server—generation happens in your browser.',
  },
  {
    question: 'Can I filter by category or difficulty?',
    answer:
      'Yes. Filter by mammals, birds, reptiles, marine animals, or insects, and by easy, medium, or hard drawing difficulty so beginners and advanced artists can both find useful prompts.',
  },
  {
    question: 'What information comes with each result?',
    answer:
      'Each result includes the animal name, image, category, facts, and difficulty context. Many entries also include drawing tips so you can start sketching without leaving the page.',
  },
  {
    question: 'Is the random animal generator free to use?',
    answer:
      'Yes. The generator is free to use with no registration, no signup wall, and no premium unlock for core features.',
  },
  {
    question: 'Does the site offer more than simple random picks?',
    answer:
      'Yes. Daily, timed, hard mode, and hybrid generation give structured challenges. You can also open the animal wheel spinner for one-at-a-time picks or the name generator for copy-ready lists.',
  },
  {
    question: 'Can teachers use this in a classroom?',
    answer:
      'Yes. Teachers often use it for biology warmups, vocabulary drills, discussion starters, and timed drawing rounds. Category filters help keep lessons focused on mammals, birds, marine life, and more.',
  },
] as const;

const HOME_USE_CASES = [
  {
    label: 'Draw',
    title: 'Drawing Prompts',
    description:
      'Use the generator to find new animals for sketching, illustration warmups, and difficulty-based drawing practice.',
  },
  {
    label: 'Play',
    title: 'Games and Icebreakers',
    description:
      'Let the generator pick an animal for guessing games, classroom rounds, or quick decision-making activities.',
  },
  {
    label: 'Class',
    title: 'Classroom Activities',
    description:
      'Teachers can generate animals by category to support biology lessons, vocabulary exercises, and discussion prompts.',
  },
  {
    label: 'Write',
    title: 'Creative Writing',
    description:
      'Writers can use random animal results to inspire characters, story ideas, worldbuilding, and scene prompts.',
  },
  {
    label: 'Mode',
    title: 'Challenge Modes',
    description:
      'Daily, timed, hard mode, and hybrid generation give you more structured ways to use the same animal database.',
  },
  {
    label: 'Browse',
    title: 'Category Exploration',
    description:
      'Browse mammals, birds, reptiles, marine animals, and insects when you want controlled randomness instead of a fully open pick.',
  },
] as const;

const CORE_TOOLS = [
  {
    href: '/random-animal-picker',
    label: 'Picker',
    title: 'Random Animal Picker',
    description:
      'Instant one-click animal picks for games, classrooms, and writing—with list and daily modes.',
  },
  {
    href: '/random-animal-name-generator',
    label: 'Names',
    title: 'Random Animal Name Generator',
    description:
      'Generate clean animal name lists with common names, scientific names, and category filters.',
  },
  {
    href: '/random-animal-generator-wheel',
    label: 'Wheel',
    title: 'Random Animal Generator Wheel',
    description:
      'Spin a playful wheel to pick a random animal for classroom rounds, games, and icebreakers.',
  },
  {
    href: '/drawing-prompt-generator',
    label: 'Drawing',
    title: 'Drawing Prompt Generator',
    description:
      'Get animal drawing prompts with difficulty filters and timed practice modes.',
  },
] as const;

const HOME_HOW_TO_STEPS = [
  {
    name: 'Choose your filters',
    text: 'Select how many animals you want, then narrow the results by category or drawing difficulty.',
  },
  {
    name: 'Generate random animals',
    text: 'Click the generator button to get random animal results instantly from the site database.',
  },
  {
    name: 'Use the results',
    text: 'Open the generated animal cards for facts, images, and prompts you can use for drawing, games, lessons, or writing.',
  },
] as const;

const DRAWING_CHALLENGE_IDEAS = [
  {
    title: 'Five-minute silhouette warmups',
    text: 'Generate an easy animal and draw only the outline in five minutes. Focus on proportions and gesture instead of detail.',
  },
  {
    title: 'Texture study rounds',
    text: 'Pick a medium or hard animal and spend one session on fur, scales, feathers, or shell patterns from the reference image.',
  },
  {
    title: 'Category lock challenges',
    text: 'Filter to birds or marine animals only, then generate three subjects and complete a mini series in one sitting.',
  },
  {
    title: 'Hybrid imagination drills',
    text: 'Use hybrid mode to invent a creature from two animals, then sketch a believable anatomy pass before adding style.',
  },
] as const;

const CLASSROOM_ACTIVITIES = [
  {
    title: 'Biology vocabulary starters',
    text: 'Generate one animal per student group. Ask each group to name the habitat, diet type, and one adaptation before sharing with the class.',
  },
  {
    title: 'Compare-and-contrast cards',
    text: 'Generate two animals from different categories and have students list shared traits versus unique traits on a simple chart.',
  },
  {
    title: 'Timed observation sketches',
    text: 'Run a ten-minute timed challenge. Students sketch from the generated image, then write two factual notes underneath.',
  },
  {
    title: 'Name and classify practice',
    text: 'Pair this page with the name generator so students practice common names, scientific names, and category labels together.',
  },
] as const;

export default function Home() {
  const structuredData = [
    {
      ...buildWebAppSchema({
        name: SITE_NAME,
        description:
          'Free random animal generator with category filters, wheel-style exploration, challenge modes, and drawing prompts.',
        path: '/',
        featureList: [
          'Generate 1-10 random animals instantly',
          'Difficulty ratings: Easy, Medium, Hard',
          'Drawing prompts and tips for each animal',
          'Challenge modes: Daily, Timed, Hard Mode, Hybrid',
          'Filter by 5 categories: Mammals, Birds, Reptiles, Marine, Insects',
          'High-quality reference images',
          'History tracking for generated animals',
          'Mobile responsive design',
          'Free to use',
        ],
      }),
      audience: {
        '@type': 'Audience',
        audienceType: ['artists', 'teachers', 'students', 'families', 'game players'],
      },
    },
    buildBreadcrumbSchema([{ name: 'Home', path: '/' }]),
    buildHowToSchema(
      'How to use the random animal generator',
      'A short guide for generating random animals with category and difficulty filters.',
      '/',
      HOME_HOW_TO_STEPS,
    ),
    buildFaqSchema(HOME_FAQS),
  ];

  return (
    <div className="paper-atmosphere relative min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Full-bleed hero: brand + one line + CTA + wildlife image */}
      <header className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden text-[var(--paper)]">
        <Image
          src="/home-hero-field-atelier.png"
          alt="Misty woodland wildlife scene with deer, fox, and heron for random animal drawing prompts"
          fill
          priority
          className="object-cover animate-home-fade"
          title="Explore random animals for games, learning, and creative prompts"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[rgba(28,26,23,0.72)] via-[rgba(28,26,23,0.32)] to-[rgba(28,26,23,0.12)]"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col justify-end px-4 pb-14 pt-20 md:pb-20 md:pt-24">
          <h1 className="font-display animate-home-rise max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl lg:text-8xl">
            Random Animal Generator
          </h1>
          <p className="animate-home-rise-delay mt-5 max-w-xl text-lg leading-relaxed text-[var(--paper)]/90 md:text-xl">
            Free animal prompts for drawing, classrooms, and games—filters, difficulty, no signup.
          </p>
          <div className="animate-home-rise-delay-2 mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="#generator" className="home-cta-light">
              Open generator
            </a>
            <Link href="/random-animal-generator-for-drawing" className="home-cta-ghost">
              Drawing
            </Link>
            <Link href="/random-animal-generator-wheel" className="home-cta-ghost">
              Wheel
            </Link>
            <Link href="/random-animal-name-generator" className="home-cta-ghost">
              Names
            </Link>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 md:py-14">
        <Suspense fallback={<HomeGeneratorFallback />}>
          <HomeGenerator />
        </Suspense>

        <article>
          <section id="how-it-works" className="home-section scroll-mt-24">
            <h2 className="home-section-title">How the Random Animal Generator Works</h2>
            <div className="home-prose mt-6 space-y-4">
              <p>
                A <strong className="font-semibold text-[var(--ink)]">random animal generator</strong> should
                do one job well: give you a useful animal prompt in seconds. This page does that with a
                curated wildlife database, clear filters, and result cards that include images and facts.
                You choose how many animals you want, optionally narrow by category or drawing difficulty,
                then generate a fresh set for drawing, games, lessons, or writing.
              </p>
              <p>
                Unlike a blank random list, each result is built for reuse. Artists get difficulty context
                and reference images. Teachers get category control for lesson planning. Families and game
                hosts get a fast, fair way to pick animals without arguing over the next subject. The same
                database powers the{' '}
                <Link href="/random-animal-generator-wheel">animal wheel spinner</Link> and the{' '}
                <Link href="/random-animal-name-generator">random animal name generator</Link>, so you can
                switch tools without starting from zero.
              </p>
              <p>
                Generation happens instantly in the browser. There is no account wall and no download step.
                If you want a more structured session, open a challenge mode: daily for a single featured
                animal, timed for a countdown sketch or quiz round, hard mode for tougher subjects, or
                hybrid mode when you want a creative mashup of two animals.
              </p>
            </div>

            <ol className="mx-auto mt-10 grid max-w-5xl list-none gap-8 text-center md:grid-cols-3 md:gap-10 md:text-left">
              {HOME_HOW_TO_STEPS.map((step, index) => (
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

          <section id="about-tool" className="home-section scroll-mt-24">
            <h2 className="home-section-title">
              What Makes This Tool Useful for Drawing, Games & Classrooms
            </h2>
            <div className="relative mx-auto my-8 w-full max-w-2xl overflow-hidden">
              <Image
                src="/home-biodiversity-field-guide.png"
                alt="Field guide style showcase of mammal, bird, reptile, marine animal, and insect"
                width={1200}
                height={1200}
                className="h-auto max-h-96 w-full object-contain"
                title="Five categories of wildlife"
                loading="lazy"
              />
            </div>
            <div className="home-prose space-y-4">
              <p>
                Many random animal tools stop at a name. This site is built around real use cases: drawing
                practice, classroom activities, and light game play. That is why filters, difficulty
                ratings, challenge modes, and related tools sit next to the generator instead of being
                buried in a separate blog post.
              </p>
              <p>
                The database covers more than 100 curated species across mammals, birds, reptiles, marine
                animals, and insects. Each entry combines a common name, scientific name, category label,
                facts, and a reference image. When you are practicing art, difficulty labels help you
                decide whether to warm up with a simple shape or push into complex anatomy. When you are
                teaching, category filters keep a mammal unit from drifting into unrelated animals.
              </p>
              <p>
                If your goal is pure drawing prompts, the dedicated{' '}
                <Link href="/random-animal-generator-for-drawing">
                  random animal generator for drawing
                </Link>{' '}
                page keeps the workflow focused on sketch practice. If you need a list you can paste into a
                worksheet or chat, switch to names. If the group wants a theatrical reveal, spin the wheel.
              </p>
            </div>
          </section>

          <section id="drawing-challenges" className="home-section scroll-mt-24">
            <h2 className="home-section-title">Drawing Challenge Ideas with Random Animals</h2>
            <p className="home-prose mt-4">
              Artists search for a random animal generator when they want a prompt that removes decision
              fatigue. Use these challenge formats to turn a single click into a full practice session.
              Pair them with the difficulty filter so beginners stay motivated and advanced drawers still
              feel stretched.
            </p>
            <div className="mx-auto mt-10 grid max-w-5xl gap-8 text-left md:grid-cols-2">
              {DRAWING_CHALLENGE_IDEAS.map((idea) => (
                <div key={idea.title} className="border-t border-[var(--line)] pt-5">
                  <h3 className="font-display text-xl font-semibold text-[var(--ink)]">{idea.title}</h3>
                  <p className="mt-3 leading-relaxed text-[var(--ink-muted)]">{idea.text}</p>
                </div>
              ))}
            </div>
            <p className="home-prose mt-8">
              For focused art ideas, open the{' '}
              <Link href="/drawing-prompt-generator">drawing prompt generator</Link>. For a
              spin-the-wheel drawing challenge with pictures, open the{' '}
              <Link href="/random-animal-generator-wheel">random animal generator wheel</Link> and let the
              group watch the pointer land. That format works especially well for live streams, art club
              nights, and classroom warmups where the reveal is part of the fun.
            </p>
          </section>

          <section id="classroom-uses" className="home-section scroll-mt-24">
            <h2 className="home-section-title">Classroom Uses for a Random Animal Generator</h2>
            <p className="home-prose mt-4">
              Teachers and homeschool parents need tools that are fast, filterable, and free of login
              friction. This generator supports short activities that fit into a warmup, station rotation,
              or end-of-class closer without requiring preparation time.
            </p>
            <div className="mx-auto mt-10 grid max-w-5xl gap-8 text-left md:grid-cols-2">
              {CLASSROOM_ACTIVITIES.map((activity) => (
                <div key={activity.title} className="border-t border-[var(--line)] pt-5">
                  <h3 className="font-display text-xl font-semibold text-[var(--ink)]">
                    {activity.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-[var(--ink-muted)]">{activity.text}</p>
                </div>
              ))}
            </div>
            <p className="home-prose mt-8">
              Because results include facts and images, students can move from a random pick to a short
              research note without opening five different tabs. For language or science naming practice,
              generate a list with the{' '}
              <Link href="/random-animal-name-generator">random animal name generator</Link> so every
              student gets a clean copy-ready output.
            </p>
          </section>

          <section id="use-cases" className="home-section scroll-mt-24">
            <h2 className="home-section-title">Popular Ways to Use the Generator</h2>
            <div className="relative mx-auto my-8 w-full max-w-4xl overflow-hidden">
              <Image
                src="/home-usecases-atelier.png"
                alt="Teacher and students sketching animals from a reference prompt in a classroom atelier"
                width={2560}
                height={1080}
                className="h-auto w-full"
                title="Use cases for classrooms, prompts, and games"
                loading="lazy"
              />
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 text-left md:grid-cols-2 lg:grid-cols-3">
              {HOME_USE_CASES.map((useCase) => (
                <div key={useCase.title} className="border-t border-[var(--line)] pt-5">
                  <div className="text-sm font-medium text-[var(--olive)]">{useCase.label}</div>
                  <h3 className="mt-1 font-display text-xl font-semibold text-[var(--ink)]">
                    {useCase.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-[var(--ink-muted)]">{useCase.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="home-section">
            <h2 className="home-section-title">Games, Icebreakers, and Party Rounds</h2>
            <div className="home-prose mt-6 space-y-4">
              <p>
                Random animal picks are a natural fit for icebreakers, charades, Pictionary-style rounds,
                and “who goes first” decisions. Generate three animals and ask each player to act one out,
                describe it without saying the name, or draw it for the group. If you want more suspense,
                use the wheel so everyone watches the spin together.
              </p>
              <p>
                For longer game nights, combine modes: start with a wheel pick, then use hard mode for a
                bonus round, then finish with hybrid mode for a creative creature contest. Because the tool
                works on phones and laptops, it fits classroom projectors, living room TVs, and remote
                hangouts equally well.
              </p>
              <p>
                Looking for land animals only, marine animals, or insects? Use the category filter before
                you generate. That keeps a “random land animal generator” style activity focused without
                needing a separate page for every niche request.
              </p>
            </div>
          </section>

          <section className="home-section">
            <h2 className="home-section-title">Challenge Modes That Encourage Return Visits</h2>
            <div className="home-prose mt-6 space-y-4">
              <p>
                A one-click generator is useful once. Challenge modes turn it into a habit. The daily
                challenge gives you a single featured animal so artists and classrooms can share the same
                prompt. Timed mode adds urgency for sketch sprints and quiz rounds. Hard mode surfaces
                tougher subjects when easy animals feel too familiar. Hybrid mode invents a new creature
                from two source animals for writing and concept art.
              </p>
              <p>
                These modes are intentional product choices, not decoration. They give people a reason to
                come back tomorrow, keep a classroom routine consistent, and support the kind of engagement
                signals that matter once the page content is already visible to search engines.
              </p>
            </div>
          </section>

          <section id="related-tools" className="home-section scroll-mt-24">
            <h2 className="home-section-title">Explore Related Tools</h2>
            <p className="home-prose mt-4">
              The homepage targets the core query{' '}
              <strong className="font-semibold text-[var(--ink)]">random animal generator</strong>. Related
              tools cover narrower intents so visitors and search engines both get a clear path.
            </p>
            <ul className="mx-auto mt-10 max-w-5xl divide-y divide-[var(--line)] border-y border-[var(--line)] text-left">
              {CORE_TOOLS.map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="group flex flex-col gap-1 py-6 transition-colors md:flex-row md:items-baseline md:justify-between md:gap-8"
                  >
                    <div>
                      <div className="text-sm font-medium text-[var(--olive)]">{tool.label}</div>
                      <h3 className="font-display text-xl font-semibold text-[var(--ink)] group-hover:text-[var(--olive-deep)] md:text-2xl">
                        {tool.title}
                      </h3>
                      <p className="mt-2 max-w-xl text-[var(--ink-muted)] md:mt-1">{tool.description}</p>
                    </div>
                    <span className="mt-2 shrink-0 text-sm font-semibold text-[var(--olive-deep)] md:mt-0">
                      Open tool →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section id="faq" className="home-section scroll-mt-24">
            <h2 className="home-section-title">Frequently Asked Questions</h2>
            <div className="mx-auto mt-8 max-w-3xl divide-y divide-[var(--line)] border-y border-[var(--line)] text-left">
              {HOME_FAQS.map((faq) => (
                <div key={faq.question} className="py-6">
                  <h3 className="font-display text-lg font-semibold text-[var(--ink)] md:text-xl">
                    {faq.question}
                  </h3>
                  <p className="mt-3 leading-relaxed text-[var(--ink-muted)]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </article>

        <footer className="home-section border-b-0 pb-4 text-center">
          <p className="font-display text-lg font-medium text-[var(--ink)]">
            &copy; 2026 Random Animal Generator
          </p>
          <p className="mt-2 text-sm text-[var(--ink-faint)]">
            Free online tool for random animal prompts, games, and category-based discovery
          </p>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-[var(--ink-muted)]">
            <span className="font-semibold text-[var(--ink)]">Privacy:</span> All data is stored locally
            on your device. No personal information is collected or transmitted.
          </p>
        </footer>
      </div>
    </div>
  );
}
