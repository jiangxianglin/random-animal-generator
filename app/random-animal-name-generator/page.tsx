import Link from 'next/link';
import { AnimalNameGeneratorClient } from '@/components/animal-name-generator-client';
import { buildBreadcrumbSchema, buildFaqSchema, buildHowToSchema, buildWebAppSchema } from '@/lib/seo';

const FAQS = [
  {
    question: 'What does the random animal name generator do?',
    answer:
      'It picks animal names at random from the site database. You can choose the quantity, narrow results by category, and switch between common names, scientific names, or both.',
  },
  {
    question: 'Can I generate animal names for writing or classroom activities?',
    answer:
      'Yes. This tool works well for creative writing prompts, classroom warmups, quiz rounds, icebreakers, and quick vocabulary exercises.',
  },
  {
    question: 'Does the generator include scientific names?',
    answer:
      'Yes. You can generate common names only, scientific names only, or a combined format that shows both.',
  },
  {
    question: 'Can I filter the animal names by category?',
    answer:
      'Yes. You can generate names from all animals or focus on mammals, birds, reptiles, marine animals, or insects.',
  },
] as const;

const HOW_TO_STEPS = [
  {
    name: 'Set the format',
    text: 'Choose whether you want common names, scientific names, or both in the final output.',
  },
  {
    name: 'Pick quantity and category',
    text: 'Decide how many names you need and optionally narrow the results to one animal category.',
  },
  {
    name: 'Generate and copy',
    text: 'Generate the list, review the output, and copy the results for writing prompts, games, or classroom use.',
  },
] as const;

export default function RandomAnimalNameGeneratorPage() {
  const structuredData = [
    buildWebAppSchema({
      name: 'Random Animal Name Generator',
      description:
        'Generate random animal names with category filters and common or scientific formats for writing, classroom use, and games.',
      path: '/random-animal-name-generator',
      featureList: [
        'Generate 1 to 12 random animal names',
        'Common name, scientific name, or combined display',
        'Category filters for mammals, birds, reptiles, marine animals, and insects',
        'Copy generated animal name lists instantly',
      ],
    }),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Random Animal Name Generator', path: '/random-animal-name-generator' },
    ]),
    buildHowToSchema(
      'How to use the random animal name generator',
      'A short guide for generating and copying random animal name lists.',
      '/random-animal-name-generator',
      HOW_TO_STEPS,
    ),
    buildFaqSchema(FAQS),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className="border-b border-slate-200 bg-[#f8f7f1] px-4 py-8 md:px-6">
        <div className="mx-auto max-w-7xl text-center md:text-left">
          <h1 className="text-3xl font-black text-slate-900 md:text-5xl">
            Random Animal Name Generator
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700 md:text-lg">
            Generate a copy-ready list of random animal names in seconds. Filter by category, choose
            common or scientific formats, and use the results for writing prompts, classroom
            vocabulary, or game rounds. No signup required.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 md:text-base">
            Need a one-at-a-time picker? Try the{' '}
            <Link
              href="/random-animal-generator-wheel"
              className="font-semibold text-emerald-800 underline underline-offset-4"
            >
              random animal wheel spinner
            </Link>
            . Want images and drawing difficulty filters? Use the{' '}
            <Link href="/" className="font-semibold text-emerald-800 underline underline-offset-4">
              random animal generator
            </Link>
            .
          </p>
        </div>
      </header>

      <AnimalNameGeneratorClient />
    </>
  );
}
