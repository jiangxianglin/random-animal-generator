import Image from 'next/image';
import Link from 'next/link';
import { AnimalWheelTool, ScrollToWheelButton } from '@/components/animal-wheel-tool';
import { ANIMAL_DATABASE } from '@/lib/animals';
import { buildBreadcrumbSchema, buildFaqSchema, buildHowToSchema, buildWebAppSchema } from '@/lib/seo';

const USE_CASES = [
  {
    label: 'Play',
    title: 'Party Games & Decision Making',
    description:
      'Let the Random Animal Generator Wheel decide who goes first, who picks the movie, or settle friendly disputes with a fun random selector.',
  },
  {
    label: 'Learn',
    title: 'Educational Activities',
    description:
      'Teachers and parents can use this animal wheel spinner to create engaging animal-themed lessons. Perfect for biology classes, nature studies, and wildlife education.',
  },
  {
    label: 'Write',
    title: 'Creative Writing Prompts',
    description:
      'Use the wheel picker to select an animal for your next story character, setting inspiration, or plot element.',
  },
  {
    label: 'RPG',
    title: 'Role-Playing Games',
    description:
      'Perfect for tabletop RPGs, classroom activities, or family game nights where random animal selection is needed.',
  },
  {
    label: 'Team',
    title: 'Team Building Activities',
    description:
      'Split into teams randomly, assign animal roles, or create animal-themed group challenges with the wheel.',
  },
  {
    label: 'Draw',
    title: 'Art & Drawing Challenges',
    description:
      'Artists can use the wheel as a prompt generator for sketch sessions and quick drawing challenges.',
  },
] as const;

const TIPS = [
  'Click the spin button and watch the wheel rotate.',
  'Wait for the wheel to stop completely.',
  'The pointer at the top shows your selected animal.',
  'Change categories to explore different animal groups.',
  'Share your results with friends or classmates.',
] as const;

const FAQS = [
  {
    question: 'How does the Random Animal Generator Wheel work?',
    answer:
      'Choose a category, click spin, and wait for the pointer to land on a random animal. The result includes a name, image, and quick facts you can use right away.',
  },
  {
    question: 'Is this animal wheel spinner free?',
    answer:
      'Yes. The random animal wheel is free to use with no signup, downloads, or premium unlock for the core spinner.',
  },
  {
    question: 'Can I filter the wheel by animal category?',
    answer:
      'Yes. You can spin across all animals or focus on mammals, birds, reptiles, marine animals, or insects.',
  },
  {
    question: 'What is the difference between the wheel and the main generator?',
    answer:
      'The wheel is best for one-at-a-time picks with a playful reveal. The homepage generator is better when you want multiple cards, difficulty filters, and challenge modes.',
  },
] as const;

const HOW_TO_STEPS = [
  {
    name: 'Choose a category',
    text: 'Pick all animals or focus the wheel on mammals, birds, reptiles, marine animals, or insects.',
  },
  {
    name: 'Spin the wheel',
    text: 'Click the wheel spinner and wait for the pointer to stop on a random animal.',
  },
  {
    name: 'Use the result',
    text: 'Review the selected animal and use it for games, classroom activities, or creative prompts.',
  },
] as const;

export default function RandomAnimalGeneratorWheelPage() {
  const structuredData = [
    buildWebAppSchema({
      name: 'Random Animal Generator Wheel',
      description:
        'A free online spinning wheel that randomly selects animals for games, education, and creative prompts.',
      path: '/random-animal-generator-wheel',
      featureList: [
        'Random animal selection via spinning wheel',
        'Category filtering for mammals, birds, reptiles, marine animals, and insects',
        'Instant results with animal facts and images',
        'Works on desktop and mobile devices',
      ],
    }),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Random Animal Generator Wheel', path: '/random-animal-generator-wheel' },
    ]),
    buildHowToSchema(
      'How to use the random animal generator wheel',
      'A short guide for spinning the wheel and using the selected animal.',
      '/random-animal-generator-wheel',
      HOW_TO_STEPS,
    ),
    buildFaqSchema(FAQS),
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <header className="mb-6 text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
            Random Animal Generator Wheel
          </h1>
          <p className="text-sm text-gray-600 md:text-base">
            Free online tool - {ANIMAL_DATABASE.length}+ animals - instant results
          </p>
          <p className="mx-auto mt-3 max-w-3xl text-sm text-gray-600 md:text-base">
            Use this <strong>animal wheel spinner</strong> when you need a quick random pick for
            games or lessons. For a full-page generator with cards and filters, try the{' '}
            <Link href="/" className="font-semibold text-indigo-700 underline underline-offset-4">
              random animal generator
            </Link>
            . For a copy-ready list output, use the{' '}
            <Link
              href="/random-animal-name-generator"
              className="font-semibold text-indigo-700 underline underline-offset-4"
            >
              random animal name generator
            </Link>
            .
          </p>
        </header>

        <AnimalWheelTool />

        <section className="mb-16">
          <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white shadow-xl">
            <h2 className="mb-6 text-center text-3xl font-bold">How to Use the Random Animal Wheel</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {TIPS.map((tip, index) => (
                <div key={tip} className="flex items-start gap-3 rounded-xl bg-white/10 p-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white font-bold text-indigo-600">
                    {index + 1}
                  </span>
                  <p className="text-white/90">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-6">
          <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="mb-3 text-xl font-bold text-gray-900">
              What is the Random Animal Generator Wheel?
            </h2>
            <p className="mb-2 text-sm text-gray-700">
              The <strong>Random Animal Generator Wheel</strong> is a free online spinning tool
              designed to help you pick animals for games, educational activities, creative writing,
              and quick decision making.
            </p>
            <p className="text-sm text-gray-700">
              It is useful for teachers, parents, game masters, writers, and anyone who needs a fast
              and entertaining way to pick random animals. No registration is required and no
              downloads are needed.
            </p>
            <p className="mt-3 text-sm text-gray-700">
              If you want a broader generator with animal cards and filters, use the{' '}
              <Link href="/" className="font-semibold text-indigo-700 underline underline-offset-4">
                main Random Animal Generator
              </Link>
              . If you need a copy-ready list of names instead of a spinner, try the{' '}
              <Link
                href="/random-animal-name-generator"
                className="font-semibold text-indigo-700 underline underline-offset-4"
              >
                Random Animal Name Generator
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">Popular Use Cases</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {USE_CASES.map((useCase) => (
              <div
                key={useCase.title}
                className="rounded-xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl"
              >
                <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                  {useCase.label}
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">{useCase.title}</h3>
                <p className="text-gray-600">{useCase.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="rounded-2xl bg-white p-8 shadow-xl">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              Why Use Our Random Animal Generator Wheel?
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-3 text-xl font-semibold text-indigo-600">Instant & Easy to Use</h3>
                <p className="mb-4 text-gray-700">
                  No registration required. No downloads needed. Just open the page, select a
                  category, and spin.
                </p>

                <h3 className="mb-3 text-xl font-semibold text-indigo-600">Works Everywhere</h3>
                <p className="mb-4 text-gray-700">
                  The wheel is designed to work on desktop, tablet, and mobile devices.
                </p>

                <h3 className="mb-3 text-xl font-semibold text-indigo-600">Diverse Animal Collection</h3>
                <p className="text-gray-700">
                  The database includes {ANIMAL_DATABASE.length}+ animals across mammals, birds,
                  reptiles, marine animals, and insects.
                </p>
              </div>

              <div>
                <div className="relative mb-6 h-64 overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src="/home-biodiversity-field-guide.png"
                    alt="Field guide style showcase of mammal, bird, reptile, marine animal, and insect"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-indigo-600">Fun & Engaging</h3>
                <p className="mb-4 text-gray-700">
                  The spinning animation adds excitement to random selection for games, learning,
                  and creative prompts.
                </p>

                <h3 className="mb-3 text-xl font-semibold text-indigo-600">Completely Free</h3>
                <p className="mb-4 text-gray-700">
                  The tool is free to use with no hidden costs, premium gates, or login steps.
                </p>

                <h3 className="mb-3 text-xl font-semibold text-indigo-600">Regular Updates</h3>
                <p className="text-gray-700">
                  The project can expand over time with more animals, more tool variations, and
                  better category coverage.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="rounded-2xl bg-gradient-to-br from-green-50 to-blue-50 p-8 shadow-xl">
            <div className="relative mb-8 h-64 overflow-hidden rounded-xl shadow-lg md:h-80">
              <Image
                src="/random-animal-wheel-interface-preview.png"
                alt="Random Animal Generator Wheel interface preview showing the spinner and category filters"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <div className="mx-auto max-w-4xl space-y-6">
              {FAQS.map((faq) => (
                <div key={faq.question} className="rounded-xl bg-white p-6">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="rounded-2xl bg-indigo-600 p-8 text-center text-white shadow-xl">
            <h2 className="mb-4 text-3xl font-bold">Ready to Spin?</h2>
            <p className="mx-auto mb-6 max-w-2xl text-xl text-indigo-100">
              Start exploring the animal kingdom with our interactive Random Animal Generator Wheel.
            </p>
            <ScrollToWheelButton />
          </div>
        </section>

        <section className="mb-16">
          <div className="rounded-2xl bg-white p-8 shadow-xl">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Related Tools</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Link
                href="/"
                className="rounded-xl border border-gray-200 p-6 transition-all hover:border-indigo-300 hover:shadow-lg"
              >
                <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                  Home
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Random Animal Generator</h3>
                <p className="mb-4 text-sm text-gray-600">
                  Use the main generator for cards, filters, and challenge modes.
                </p>
                <span className="text-sm font-medium text-indigo-600">Open tool -&gt;</span>
              </Link>

              <Link
                href="/random-animal-name-generator"
                className="rounded-xl border border-gray-200 p-6 transition-all hover:border-indigo-300 hover:shadow-lg"
              >
                <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                  Names
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Random Animal Name Generator
                </h3>
                <p className="mb-4 text-sm text-gray-600">
                  Generate a copy-ready list of animal names for writing or class.
                </p>
                <span className="text-sm font-medium text-indigo-600">Open tool -&gt;</span>
              </Link>

              <Link
                href="/random-animal-generator-for-drawing"
                className="rounded-xl border border-gray-200 p-6 transition-all hover:border-indigo-300 hover:shadow-lg"
              >
                <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                  Drawing
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Drawing Prompt Generator</h3>
                <p className="mb-4 text-sm text-gray-600">
                  Get animal drawing prompts with difficulty filters for sketch practice.
                </p>
                <span className="text-sm font-medium text-indigo-600">Open tool -&gt;</span>
              </Link>
            </div>
          </div>
        </section>

        <footer className="border-t border-gray-200 py-8 text-center text-gray-600">
          <p className="mb-2">
            Random Animal Generator Wheel - A free online tool for games, education, and fun.
          </p>
          <p className="text-sm">&copy; 2026 Random Animal Generator. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
