'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { AnimalWheelSpinner } from '@/components/animal-wheel-spinner';
import { ANIMAL_DATABASE, Animal } from '@/lib/animals';
import Link from 'next/link';
import { buildBreadcrumbSchema, buildFaqSchema, buildHowToSchema, buildWebAppSchema } from '@/lib/seo';

const WHEEL_COLORS = [
  '#6366F1',
  '#8B5CF6',
  '#EC4899',
  '#F59E0B',
  '#10B981',
  '#3B82F6',
  '#EF4444',
  '#14B8A6',
  '#F97316',
  '#84CC16',
];

interface WheelAnimal {
  id: string;
  commonName: string;
  imageUrl: string;
  imageAlt: string;
  color: string;
}

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
];

const FAQS = [
  {
    question: 'How does the Random Animal Generator Wheel work?',
    answer:
      'When you click the spin button, the wheel selects one animal at random from the current category.',
  },
  {
    question: 'Can I use this Random Animal Generator Wheel for commercial purposes?',
    answer:
      'Yes. The wheel is free to use for educational, entertainment, and commercial purposes.',
  },
  {
    question: 'How many animals are in the database?',
    answer:
      `The current database includes ${ANIMAL_DATABASE.length}+ animals across mammals, birds, reptiles, marine animals, and insects.`,
  },
  {
    question: 'Is the selection truly random?',
    answer:
      'Yes. Each spin selects from the available animal set without a fixed pattern for the user.',
  },
  {
    question: 'Is the Random Animal Generator Wheel mobile-friendly?',
    answer:
      'Yes. The tool is designed to work on smartphones, tablets, and desktop screens.',
  },
] as const;

const HOW_TO_STEPS = [
  {
    name: 'Choose a category',
    text: 'Select all animals or narrow the wheel to mammals, birds, reptiles, marine animals, or insects.',
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

export default function RandomAnimalGeneratorWheel() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

  const categories = [
    { value: 'all', label: 'All Animals', count: ANIMAL_DATABASE.length },
    { value: 'mammals', label: 'Mammals', count: ANIMAL_DATABASE.filter((a) => a.category === 'mammals').length },
    { value: 'birds', label: 'Birds', count: ANIMAL_DATABASE.filter((a) => a.category === 'birds').length },
    { value: 'reptiles', label: 'Reptiles', count: ANIMAL_DATABASE.filter((a) => a.category === 'reptiles').length },
    { value: 'marine', label: 'Marine', count: ANIMAL_DATABASE.filter((a) => a.category === 'marine').length },
    { value: 'insects', label: 'Insects', count: ANIMAL_DATABASE.filter((a) => a.category === 'insects').length },
  ];

  const wheelAnimals = useMemo(() => {
    const filtered =
      selectedCategory === 'all'
        ? ANIMAL_DATABASE
        : ANIMAL_DATABASE.filter((a) => a.category === selectedCategory);

    return filtered.slice(0, 12).map((animal, index): WheelAnimal => ({
      id: animal.id,
      commonName: animal.commonName,
      imageUrl: animal.imageUrl,
      imageAlt: animal.imageAlt,
      color: WHEEL_COLORS[index % WHEEL_COLORS.length],
    }));
  }, [selectedCategory]);

  const handleSpinComplete = (animal: WheelAnimal) => {
    const fullAnimal = ANIMAL_DATABASE.find((entry) => entry.id === animal.id);
    setSelectedAnimal(fullAnimal || null);
  };

  const structuredData = [
    buildWebAppSchema({
      name: 'Random Animal Generator Wheel',
      description:
        'A free online spinning wheel that randomly selects animals for games, education, and creative prompts.',
      path: '/random-animal-generator-wheel/',
      featureList: [
        'Random animal selection via spinning wheel',
        'Category filtering for mammals, birds, reptiles, marine animals, and insects',
        'Instant results with animal facts and images',
        'Works on desktop and mobile devices',
      ],
    }),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Random Animal Generator Wheel', path: '/random-animal-generator-wheel/' },
    ]),
    buildHowToSchema(
      'How to use the random animal generator wheel',
      'A short guide for spinning the wheel and using the selected animal.',
      '/random-animal-generator-wheel/',
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
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
            Random Animal Generator Wheel
          </h1>
          <p className="text-sm text-gray-600 md:text-base">
            Free online tool - {ANIMAL_DATABASE.length}+ animals - instant results
          </p>
        </div>

        <section className="mb-6">
          <div className="flex flex-col items-stretch gap-4 lg:flex-row">
            <div className="w-full lg:w-3/5">
              <AnimalWheelSpinner animals={wheelAnimals} onSpinComplete={handleSpinComplete} />
            </div>

            <div className="w-full lg:w-2/5">
              <div className="h-full rounded-2xl bg-white p-4 shadow-lg">
                <h2 className="mb-3 text-lg font-bold text-gray-900">Choose Your Category</h2>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`rounded-lg p-3 text-left text-sm transition-all ${
                        selectedCategory === cat.value
                          ? 'bg-indigo-600 text-white shadow-lg'
                          : 'bg-gray-50 text-gray-700 hover:bg-indigo-50'
                      }`}
                    >
                      <div className="font-semibold">{cat.label}</div>
                      <div
                        className={`text-xs ${
                          selectedCategory === cat.value ? 'text-indigo-200' : 'text-gray-500'
                        }`}
                      >
                        {cat.count} animals
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-4 rounded-lg bg-indigo-50 p-3">
                  <p className="text-xs text-indigo-800">
                    <strong>Tip:</strong> The wheel shows up to 12 animals. Select a category to
                    focus the results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {selectedAnimal && (
          <section className="mb-6">
            <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-xl">
              <div className="flex flex-col gap-6 md:flex-row">
                <div className="relative h-64 overflow-hidden rounded-xl bg-gray-100 md:w-1/2">
                  <Image
                    src={selectedAnimal.imageUrl}
                    alt={selectedAnimal.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="md:w-1/2">
                  <h2 className="mb-1 text-2xl font-bold text-gray-900">
                    {selectedAnimal.commonName}
                  </h2>
                  <p className="mb-3 text-base italic text-indigo-600">
                    {selectedAnimal.scientificName}
                  </p>
                  <div className="mb-4 space-y-2">
                    {selectedAnimal.facts.slice(0, 2).map((fact, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="text-xl" aria-hidden="true">*</span>
                        <p className="text-sm text-gray-700">{fact}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
                      {selectedAnimal.category.charAt(0).toUpperCase() + selectedAnimal.category.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="mb-16">
          <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white shadow-xl">
            <h2 className="mb-6 text-center text-3xl font-bold">How to Use the Random Animal Wheel</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {TIPS.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 rounded-xl bg-white/10 p-4">
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
              It is useful for teachers, parents, game masters, writers, and anyone who needs a
              fast and entertaining way to pick random animals. No registration is required and no
              downloads are needed.
            </p>
            <p className="mt-3 text-sm text-gray-700">
              If you want a broader generator with animal cards and filters, use the{' '}
              <Link href="/" className="font-semibold text-indigo-700 underline underline-offset-4">
                main Random Animal Generator
              </Link>
              . If you need a copy-ready list of names instead of a spinner, try the{' '}
              <Link href="/random-animal-name-generator" className="font-semibold text-indigo-700 underline underline-offset-4">
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
                    src="/RandomAnimalGenerator-BiodiversityShowcase.png"
                    alt="Animal biodiversity showcase featuring mammals, birds, marine animals, and insects"
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
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="transform rounded-full bg-white px-8 py-4 text-lg font-bold text-indigo-600 shadow-lg transition-all hover:scale-105 hover:bg-indigo-50"
            >
              Back to the Wheel
            </button>
          </div>
        </section>

        <section className="mb-16">
          <div className="rounded-2xl bg-white p-8 shadow-xl">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Related Tools</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-gray-200 p-6 transition-all hover:border-indigo-300 hover:shadow-lg">
                <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Decide</div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Decision Maker Wheel</h3>
                <p className="mb-4 text-sm text-gray-600">
                  Can&apos;t make a decision? Let a general decision wheel help you choose.
                </p>
                <span className="text-sm font-medium text-indigo-600">Coming Soon -&gt;</span>
              </div>

              <div className="rounded-xl border border-gray-200 p-6 transition-all hover:border-indigo-300 hover:shadow-lg">
                <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Food</div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Food Randomizer</h3>
                <p className="mb-4 text-sm text-gray-600">
                  Not sure what to eat? Spin a wheel to decide your next meal.
                </p>
                <span className="text-sm font-medium text-indigo-600">Coming Soon -&gt;</span>
              </div>

              <div className="rounded-xl border border-gray-200 p-6 transition-all hover:border-indigo-300 hover:shadow-lg">
                <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Teams</div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Team Generator</h3>
                <p className="mb-4 text-sm text-gray-600">
                  Need to split into teams? A team generator can make it fast and fair.
                </p>
                <span className="text-sm font-medium text-indigo-600">Coming Soon -&gt;</span>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-gray-200 py-8 text-center text-gray-600">
          <p className="mb-2">
            Random Animal Generator Wheel - A free online tool for games, education, and fun.
          </p>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Random Animal Generator. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}
