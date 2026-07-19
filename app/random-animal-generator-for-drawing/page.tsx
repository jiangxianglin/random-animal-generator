import Link from 'next/link';
import { DrawingGeneratorTool } from '@/components/drawing-generator-tool';
import { buildBreadcrumbSchema, buildFaqSchema, buildHowToSchema, buildWebAppSchema } from '@/lib/seo';

const FAQS = [
  {
    question: 'What is a random animal generator for drawing?',
    answer:
      'It is a free tool that picks animals at random so you can use them as drawing prompts, sketch practice subjects, or art challenge ideas.',
  },
  {
    question: 'Can I filter drawing prompts by difficulty?',
    answer:
      'Yes. Use the difficulty filter to generate easy, medium, or hard animals based on drawing complexity.',
  },
  {
    question: 'Can I focus on one animal category for drawing practice?',
    answer:
      'Yes. You can generate random mammals, birds, reptiles, marine animals, or insects to practice specific shapes and anatomy.',
  },
  {
    question: 'How many drawing prompts can I generate at once?',
    answer:
      'You can generate multiple prompts at once by increasing the quantity setting, then regenerate anytime for a fresh set of animals.',
  },
] as const;

const HOW_TO_STEPS = [
  {
    name: 'Set your filters',
    text: 'Choose how many animals you want, then optionally narrow results by category and drawing difficulty.',
  },
  {
    name: 'Generate drawing prompts',
    text: 'Click Generate Animals to get a fresh set of random animals you can draw right away.',
  },
  {
    name: 'Use the results',
    text: 'Open each animal card for facts, reference images, and drawing tips to guide your sketch session.',
  },
] as const;

export default function RandomAnimalGeneratorForDrawingPage() {
  const structuredData = [
    buildWebAppSchema({
      name: 'Random Animal Generator for Drawing',
      description:
        'A free random animal generator built for drawing prompts with difficulty and category filters.',
      path: '/random-animal-generator-for-drawing',
      featureList: [
        'Instant random animal drawing prompts',
        'Difficulty filters: Easy, Medium, Hard',
        'Category filters: Mammals, Birds, Reptiles, Marine, Insects',
        'Reference images and drawing tips in each animal card',
        'Free to use with no signup',
      ],
    }),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      {
        name: 'Random Animal Generator for Drawing',
        path: '/random-animal-generator-for-drawing',
      },
    ]),
    buildHowToSchema(
      'How to generate random animals for drawing',
      'A short guide for generating animal drawing prompts with filters.',
      '/random-animal-generator-for-drawing',
      HOW_TO_STEPS,
    ),
    buildFaqSchema(FAQS),
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-orange-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        <header className="mb-8 text-center">
          <div className="mx-auto max-w-3xl rounded-3xl border border-emerald-100 bg-white/90 p-7 shadow-xl backdrop-blur-sm md:p-10">
            <h1 className="text-3xl font-extrabold text-gray-900 md:text-5xl">
              Random Animal Generator for Drawing
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-700 md:text-lg">
              Generate random animals as drawing prompts for sketch practice, art warmups, and
              classroom activities. Filter by difficulty to control how challenging the prompts feel.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-700 md:text-base">
              Prefer a one-at-a-time picker? Use the{' '}
              <Link
                href="/random-animal-generator-wheel"
                className="font-semibold text-emerald-800 underline underline-offset-4"
              >
                random animal wheel spinner
              </Link>
              . Need a copy-ready list instead of cards? Use the{' '}
              <Link
                href="/random-animal-name-generator"
                className="font-semibold text-emerald-800 underline underline-offset-4"
              >
                random animal name generator
              </Link>
              .
            </p>
          </div>
        </header>

        <DrawingGeneratorTool />

        <section className="mb-10 rounded-2xl border border-emerald-100 bg-white/95 p-8 shadow-2xl backdrop-blur-sm md:p-10">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            How to Use These Drawing Prompts
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {HOW_TO_STEPS.map((step, index) => (
              <div
                key={step.name}
                className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
                  Step {index + 1}
                </div>
                <h3 className="mt-2 text-lg font-bold text-gray-900">{step.name}</h3>
                <p className="mt-2 text-sm leading-7 text-gray-700">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 rounded-2xl border border-green-100 bg-white/95 p-8 shadow-2xl backdrop-blur-sm md:p-10">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">Frequently Asked Questions</h2>
          <div className="mt-6 space-y-4">
            {FAQS.map((faq) => (
              <article
                key={faq.question}
                className="rounded-xl border border-gray-200 bg-gradient-to-r from-gray-50 to-emerald-50 p-6"
              >
                <h3 className="text-lg font-bold text-gray-900">{faq.question}</h3>
                <p className="mt-2 text-sm leading-7 text-gray-700">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <footer className="py-10 text-center text-gray-700">
          <div className="mb-4 inline-block rounded-full border border-emerald-200 bg-white/60 px-6 py-3 backdrop-blur-sm">
            <p className="font-medium">Free drawing prompts from random animals</p>
          </div>
          <p className="text-sm text-gray-600">
            Explore more:{' '}
            <Link href="/" className="font-semibold text-emerald-800 underline underline-offset-4">
              random animal generator
            </Link>
            ,{' '}
            <Link
              href="/random-animal-generator-wheel"
              className="font-semibold text-emerald-800 underline underline-offset-4"
            >
              animal wheel spinner
            </Link>
            ,{' '}
            <Link
              href="/random-animal-name-generator"
              className="font-semibold text-emerald-800 underline underline-offset-4"
            >
              animal name list generator
            </Link>
            .
          </p>
        </footer>
      </div>
    </main>
  );
}
