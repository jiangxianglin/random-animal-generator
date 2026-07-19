'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
  ANIMAL_DATABASE,
  CATEGORIES,
  CategoryKey,
  DrawingDifficulty,
} from '@/lib/animals';
type NameFormat = 'common' | 'scientific' | 'both';
type OutputMode = 'list' | 'writing' | 'study' | 'game';

type NameResult = {
  id: string;
  commonName: string;
  scientificName: string;
  category: CategoryKey;
  difficulty: DrawingDifficulty;
};

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

const USE_CASES = [
  {
    label: 'Writing',
    title: 'Story prompts',
    description:
      'Pull a fast list of creature ideas for mascots, scenes, factions, quests, or character themes.',
  },
  {
    label: 'Classroom',
    title: 'Vocabulary drills',
    description:
      'Switch between common and scientific names for quick biology practice and naming exercises.',
  },
  {
    label: 'Games',
    title: 'Quiz rounds',
    description:
      'Generate a short pack of animal names for charades, guessing games, and icebreakers.',
  },
] as const;

const QUANTITY_OPTIONS = [1, 2, 3, 4, 5, 6, 8, 10, 12] as const;

const FORMAT_OPTIONS: Array<{ value: NameFormat; label: string; note: string }> = [
  { value: 'both', label: 'Common + Scientific', note: 'Best for mixed use' },
  { value: 'common', label: 'Common only', note: 'Cleaner for games' },
  { value: 'scientific', label: 'Scientific only', note: 'Best for study' },
];

const OUTPUT_MODE_OPTIONS: Array<{
  value: OutputMode;
  label: string;
  note: string;
}> = [
  { value: 'list', label: 'Plain list', note: 'Fast copy-ready names' },
  { value: 'writing', label: 'Writing mode', note: 'Adds creative prompt context' },
  { value: 'study', label: 'Study mode', note: 'Focuses on category and science use' },
  { value: 'game', label: 'Game mode', note: 'Built for quick rounds and guessing' },
];

const QUICK_PRESETS: Array<{
  label: string;
  description: string;
  quantity: number;
  category: CategoryKey | 'all';
  format: NameFormat;
  mode: OutputMode;
}> = [
  {
    label: 'Quick List',
    description: 'Fast general-use names',
    quantity: 6,
    category: 'all',
    format: 'common',
    mode: 'list',
  },
  {
    label: 'Science Class',
    description: 'Scientific names for study',
    quantity: 8,
    category: 'all',
    format: 'scientific',
    mode: 'study',
  },
  {
    label: 'Writing Prompts',
    description: 'Mixed names for story ideas',
    quantity: 5,
    category: 'mammals',
    format: 'both',
    mode: 'writing',
  },
  {
    label: 'Game Round',
    description: 'Short list for quizzes',
    quantity: 4,
    category: 'all',
    format: 'common',
    mode: 'game',
  },
];

function shuffle<T>(items: T[]) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }

  return copy;
}

function formatName(result: NameResult, format: NameFormat) {
  if (format === 'common') {
    return result.commonName;
  }

  if (format === 'scientific') {
    return result.scientificName;
  }

  return `${result.commonName} (${result.scientificName})`;
}

function getCategoryPrompt(category: CategoryKey) {
  const prompts: Record<CategoryKey, string> = {
    mammals: 'works well for a character, mascot, or companion idea',
    birds: 'fits a fast-moving scout, messenger, or sky-themed concept',
    reptiles: 'suggests stealth, tension, or a cold-blooded creature theme',
    marine: 'fits an ocean setting, mystery scene, or water-based creature idea',
    insects: 'works for swarm energy, tiny details, or unusual creature prompts',
  };

  return prompts[category];
}

function getStudyNote(category: CategoryKey, difficulty: DrawingDifficulty) {
  const categoryFocus: Record<CategoryKey, string> = {
    mammals: 'A strong example for vertebrate and habitat discussion.',
    birds: 'Useful for classifying feathers, beaks, and flight adaptations.',
    reptiles: 'Good for comparing scales, cold-blooded traits, and habitats.',
    marine: 'Useful for marine ecosystems and body adaptation examples.',
    insects: 'Good for talking about exoskeletons, segmentation, and diversity.',
  };

  const difficultyNote: Record<DrawingDifficulty, string> = {
    easy: 'Easy enough for quick worksheet or flashcard use.',
    medium: 'Good balance for practice, discussion, and recall.',
    hard: 'Better when you want a more advanced or less obvious example.',
  };

  return `${categoryFocus[category]} ${difficultyNote[difficulty]}`;
}

function getGameNote(category: CategoryKey) {
  const notes: Record<CategoryKey, string> = {
    mammals: 'Easy to use for charades or quick guessing rounds.',
    birds: 'Works well for sound, motion, or flying-action clues.',
    reptiles: 'Good for harder rounds with stronger visual clues.',
    marine: 'Useful for underwater or habitat-based quiz prompts.',
    insects: 'Adds variety and surprise to group game rounds.',
  };

  return notes[category];
}

function getResultSupportText(result: NameResult, mode: OutputMode) {
  if (mode === 'writing') {
    return getCategoryPrompt(result.category);
  }

  if (mode === 'study') {
    return getStudyNote(result.category, result.difficulty);
  }

  if (mode === 'game') {
    return getGameNote(result.category);
  }

  return 'Ready to paste into a list, worksheet, prompt set, or naming session.';
}

function getCopyLine(result: NameResult, format: NameFormat, mode: OutputMode) {
  const name = formatName(result, format);

  if (mode === 'writing') {
    return `${name} - ${getCategoryPrompt(result.category)}`;
  }

  if (mode === 'study') {
    return `${name} - ${CATEGORIES[result.category]} - ${getStudyNote(result.category, result.difficulty)}`;
  }

  if (mode === 'game') {
    return `${name} - ${getGameNote(result.category)}`;
  }

  return name;
}

function generateResults(
  animals: Array<{
    id: string;
    commonName: string;
    scientificName: string;
    category: CategoryKey;
    difficulty: DrawingDifficulty;
  }>,
  quantity: number,
) {
  return shuffle(animals).slice(0, quantity);
}

function scrollToResults() {
  if (typeof document === 'undefined') {
    return;
  }

  const resultsSection = document.getElementById('generated-name-results');
  if (resultsSection) {
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function AnimalNameGeneratorClient() {
  const [quantity, setQuantity] = useState(5);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | 'all'>('all');
  const [nameFormat, setNameFormat] = useState<NameFormat>('both');
  const [outputMode, setOutputMode] = useState<OutputMode>('list');
  const [results, setResults] = useState<NameResult[]>(() =>
    generateResults(
      ANIMAL_DATABASE.map((animal) => ({
        id: animal.id,
        commonName: animal.commonName,
        scientificName: animal.scientificName,
        category: animal.category,
        difficulty: animal.drawingDifficulty,
      })),
      5,
    ),
  );
  const [copied, setCopied] = useState(false);

  const availableAnimals = useMemo(() => {
    const filtered =
      selectedCategory === 'all'
        ? ANIMAL_DATABASE
        : ANIMAL_DATABASE.filter((animal) => animal.category === selectedCategory);

    return filtered.map((animal) => ({
      id: animal.id,
      commonName: animal.commonName,
      scientificName: animal.scientificName,
      category: animal.category,
      difficulty: animal.drawingDifficulty,
    }));
  }, [selectedCategory]);

  const textOutput = useMemo(() => {
    return results
      .map((result, index) => `${index + 1}. ${getCopyLine(result, nameFormat, outputMode)}`)
      .join('\n');
  }, [nameFormat, outputMode, results]);

  const handleGenerate = () => {
    const nextResults = generateResults(availableAnimals, quantity);
    setResults(nextResults);
    setCopied(false);
    setTimeout(scrollToResults, 0);
  };

  const handleReset = () => {
    setQuantity(5);
    setSelectedCategory('all');
    setNameFormat('both');
    setOutputMode('list');
    setResults(generateResults(availableAnimals, 5));
    setCopied(false);
  };

  const handleApplyPreset = (preset: (typeof QUICK_PRESETS)[number]) => {
    const filteredAnimals =
      preset.category === 'all'
        ? ANIMAL_DATABASE
        : ANIMAL_DATABASE.filter((animal) => animal.category === preset.category);

    const mappedAnimals = filteredAnimals.map((animal) => ({
      id: animal.id,
      commonName: animal.commonName,
      scientificName: animal.scientificName,
      category: animal.category,
      difficulty: animal.drawingDifficulty,
    }));

    setQuantity(preset.quantity);
    setSelectedCategory(preset.category);
    setNameFormat(preset.format);
    setOutputMode(preset.mode);
    setResults(generateResults(mappedAnimals, preset.quantity));
    setCopied(false);
    setTimeout(scrollToResults, 0);
  };

  const handleCopy = async () => {
    if (results.length === 0) {
      return;
    }

    try {
      const payload = results.map((result) => formatName(result, nameFormat)).join('\n');
      await navigator.clipboard.writeText(payload);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(22,163,74,0.14),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.16),_transparent_30%),linear-gradient(180deg,_#f8f7f1_0%,_#ffffff_38%,_#f4fbff_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <section className="relative overflow-hidden rounded-[2rem] border border-slate-200/70 bg-[#0f172a] px-6 py-8 text-white shadow-[0_30px_90px_rgba(15,23,42,0.18)] md:px-10 md:py-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.28),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.28),_transparent_32%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="mb-4 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-200">
                Random Animal Tools
              </div>
              <p className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
                Random Animal Name Generator
              </p>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200 md:text-xl">
                Generate animal names that are ready to copy in seconds. This page is built for
                people who want a clean list output first, whether the goal is writing prompts,
                classroom practice, or fast game setup.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200/90 md:text-lg">
                Need a one-at-a-time picker for games? Try the{' '}
                <Link href="/random-animal-generator-wheel" className="font-semibold underline underline-offset-4">
                  random animal wheel spinner
                </Link>
                . Want images, facts, and filters instead of just names? Use the{' '}
                <Link href="/" className="font-semibold underline underline-offset-4">
                  random animal generator
                </Link>
                .
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white">
                  {ANIMAL_DATABASE.length}+ animals
                </div>
                <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white">
                  Common + scientific formats
                </div>
                <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white">
                  Writing, study, and game modes
                </div>
              </div>
            </div>

            <aside className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Use the tool now</h2>
                  <p className="mt-1 text-sm text-slate-300">
                    {availableAnimals.length} names available right away
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Reset
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
                    Quantity
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {QUANTITY_OPTIONS.map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setQuantity(value)}
                        className={`rounded-2xl px-3 py-2 text-sm font-semibold transition ${
                          quantity === value
                            ? 'bg-white text-slate-950'
                            : 'bg-slate-950/40 text-slate-200 ring-1 ring-white/10 hover:ring-white/30'
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
                    Format
                  </div>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {FORMAT_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setNameFormat(option.value)}
                        className={`rounded-2xl border p-3 text-left transition ${
                          nameFormat === option.value
                            ? 'border-white bg-white text-slate-950'
                            : 'border-white/10 bg-slate-950/40 text-slate-200 hover:border-white/30'
                        }`}
                      >
                        <div className="text-sm font-semibold">{option.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
                    Quick presets
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {QUICK_PRESETS.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => handleApplyPreset(preset)}
                        className="rounded-2xl border border-white/10 bg-slate-950/40 p-3 text-left transition hover:border-white/30"
                      >
                        <div className="text-sm font-semibold text-white">{preset.label}</div>
                        <div className="mt-1 text-xs text-slate-300">{preset.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleGenerate}
                    className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-bold text-slate-950 transition hover:bg-slate-100"
                  >
                    Generate Animal Names
                  </button>
                  <button
                    type="button"
                    onClick={handleCopy}
                    disabled={results.length === 0}
                    className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-base font-bold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {copied ? 'Copied' : 'Copy list'}
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section
          id="generated-name-results"
          className="mb-12 scroll-mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_22px_70px_rgba(15,23,42,0.08)] md:p-8"
        >
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">
                Results
              </div>
              <h2 className="mt-2 text-3xl font-black text-slate-900">Generated name list</h2>
              <p className="mt-2 text-base leading-7 text-slate-600">
                Use this as a clean list output for prompts, worksheets, naming exercises, or quiz setup.
              </p>
            </div>
            {results.length > 0 && (
              <div className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                {results.length} names ready in {OUTPUT_MODE_OPTIONS.find((option) => option.value === outputMode)?.label.toLowerCase()}
              </div>
            )}
          </div>

          <div className="mb-5 rounded-[1.75rem] border border-slate-200 bg-slate-950 p-5 text-white">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-lg font-bold">Copy-ready output</h3>
              <button
                type="button"
                onClick={handleCopy}
                disabled={results.length === 0}
                className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {copied ? 'Copied' : 'Copy list'}
              </button>
            </div>
            <pre className="overflow-x-auto whitespace-pre-wrap rounded-2xl bg-white/5 p-4 text-sm leading-7 text-slate-200">
              {textOutput}
            </pre>
          </div>

          <div className="mb-6">
            <div className="mx-auto max-w-3xl overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
              <Image
                src="/Copy-ready output.png"
                alt="Copy-ready output illustration showing generated animal names with common and scientific formats plus category tags"
                width={1536}
                height={1024}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>

          {results.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {results.map((result, index) => (
                <article
                  key={result.id}
                  className="group rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(180deg,_#ffffff_0%,_#f8fafc_100%)] p-5 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white">
                      List item {index + 1}
                    </span>
                    <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-800">
                      {CATEGORIES[result.category]}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black leading-tight text-slate-900">
                    {formatName(result, nameFormat)}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {getResultSupportText(result, outputMode)}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="mb-12">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
            <Image
              src="/random-animal-name-generator-HERO.png"
              alt="Hero illustration for the random animal name generator showing a premium interface with generated animal names and category filters"
              width={1536}
              height={1024}
              priority
              className="h-auto w-full object-cover"
            />
          </div>
        </section>

        <section className="mb-12">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-amber-200 bg-[linear-gradient(180deg,_#fff9eb_0%,_#fff4d9_100%)] p-6 shadow-[0_18px_55px_rgba(180,83,9,0.10)]">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-700">
                Why it works
              </div>
              <h2 className="mt-2 text-3xl font-black text-slate-900">Made for fast output</h2>
              <p className="mt-3 text-base leading-7 text-slate-700">
                The homepage generator is better for discovery. This page is for users who already
                know they want names, and want them with as little friction as possible. The output
                mode layer also lets one page serve multiple intents without turning into a generic blob.
              </p>
              <p className="mt-3 text-base leading-7 text-slate-700">
                If you want animal cards, images, and broader filtering, go back to the{' '}
                <Link href="/" className="font-semibold text-amber-700 underline underline-offset-4">
                  main Random Animal Generator
                </Link>
                . If you want a one-at-a-time picker instead of a list, use the{' '}
                <Link href="/random-animal-generator-wheel" className="font-semibold text-amber-700 underline underline-offset-4">
                  Random Animal Generator Wheel
                </Link>
                .
              </p>
              <div className="mt-5 space-y-3">
                {USE_CASES.map((item) => (
                  <div key={item.title} className="rounded-2xl bg-white/90 p-4 shadow-sm">
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">
                      {item.label}
                    </div>
                    <h3 className="mt-2 text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <div className="mx-auto max-w-xl overflow-hidden rounded-[1.5rem] border border-amber-200 bg-white shadow-sm">
                  <Image
                    src="/random-animal-name-generator-Writing.png"
                    alt="Use-case illustration showing creative writing, classroom science, and party quiz scenarios for animal name generation"
                    width={1536}
                    height={1024}
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-emerald-200 bg-[linear-gradient(180deg,_#f1fff7_0%,_#ffffff_100%)] p-6 shadow-[0_18px_55px_rgba(22,163,74,0.10)]">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">
                Quick guide
              </div>
              <h2 className="mt-2 text-2xl font-black text-slate-900">Three-step workflow</h2>
              <div className="mt-5 space-y-4">
                {[
                  'Pick how many names you need.',
                  'Choose category and output style.',
                  'Generate, review, and copy the list.',
                ].map((step, index) => (
                  <div key={step} className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    <p className="pt-2 text-sm leading-6 text-slate-700">{step}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-emerald-200 bg-white/90 p-5 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">
                  Best fit
                </div>
                <h3 className="mt-2 text-xl font-bold text-slate-900">
                  For users who want names first, not a full encyclopedia
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  This workflow is built for quick generation, shortlist building, classroom prep,
                  and game setup. Open the page, generate, copy, and move on.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-[#101828] p-6 text-white shadow-[0_22px_70px_rgba(15,23,42,0.18)] md:p-8">
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-200">
              Positioning
            </div>
            <h2 className="mt-2 text-3xl font-black">Why this page exists</h2>
            <div className="mt-4 space-y-4 text-base leading-8 text-slate-300">
              <p>
                This tool is intentionally narrower than the homepage generator. It is here to
                serve the search intent behind <strong>random animal name generator</strong>, where
                users want names first, a list they can copy fast, and only minimal supporting context.
              </p>
              <p>
                That separation is good for both UX and SEO: visitors get a more direct workflow,
                and the site gains a more focused landing page instead of forcing every query into
                the same interface.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_22px_70px_rgba(15,23,42,0.08)] md:p-8">
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">
              FAQ
            </div>
            <h2 className="mt-2 text-3xl font-black text-slate-900">Common questions</h2>
            <div className="mt-6 space-y-4">
              {FAQS.map((faq) => (
                <article key={faq.question} className="rounded-[1.5rem] border border-slate-200 p-5">
                  <h3 className="text-lg font-bold text-slate-900">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_22px_70px_rgba(15,23,42,0.08)] md:p-8">
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-indigo-700">
              How To Use
            </div>
            <h2 className="mt-2 text-3xl font-black text-slate-900">
              How this random animal name generator helps
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600 md:text-base">
              <p>
                This <strong>random animal name generator</strong> is designed for people who want
                usable output quickly. Instead of treating the page like a general animal directory,
                the tool focuses on one job: generating random animal names that can be copied,
                reused, and adapted for different situations.
              </p>
              <p>
                If you need a plain list, choose <strong>Plain list</strong> mode. If you are
                writing, switch to <strong>Writing mode</strong> to get names with lightweight
                creative context. If you are teaching or studying, <strong>Study mode</strong>
                keeps the output closer to category and scientific use. For charades, quizzes, or
                classroom rounds, <strong>Game mode</strong> gives you faster prompt-style output.
              </p>
              <p>
                That is the main difference between this page and a basic random list. The goal is
                not just to show animal names. The goal is to make those names immediately useful
                for a prompt set, a worksheet, a quiz round, a creative session, or a naming task.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_22px_70px_rgba(15,23,42,0.08)] md:p-8">
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-700">
              SEO Support
            </div>
            <h2 className="mt-2 text-3xl font-black text-slate-900">
              Best ways to use random animal names
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600 md:text-base">
              <p>
                Common use cases include writing prompts, mascot brainstorming, science vocabulary,
                animal-themed games, naming practice, and quick category-based idea generation. Some
                users want common names like <em>lion</em> or <em>otter</em>. Others want scientific
                animal names, category-specific results, or a short pack of names they can paste
                into another tool.
              </p>
              <p>
                That is why the page supports multiple formats instead of forcing one output style.
                A strong <strong>animal name generator</strong> page should not only rank for the
                head term. It should also naturally support related intents such as random animal
                names for games, animal names for writing prompts, and scientific animal names for
                class use.
              </p>
              <p>
                As the site grows, this page will also connect to more specific generators and
                category pages. That makes it a strong hub page for the broader animal naming topic,
                while still staying focused on the core intent behind{' '}
                <strong>random animal name generator</strong>.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,_#f6fef9_0%,_#ecfeff_100%)] p-6 shadow-[0_22px_70px_rgba(15,23,42,0.08)] md:p-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">
                Related tools
              </div>
              <h2 className="mt-2 text-3xl font-black text-slate-900">Keep exploring</h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href="/"
              className="rounded-[1.5rem] border border-white bg-white/80 p-5 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-lg font-bold text-slate-900">Main Random Animal Generator</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Use the full generator when you want images, facts, and drawing difficulty filters.
              </p>
            </Link>
            <Link
              href="/random-animal-generator-wheel"
              className="rounded-[1.5rem] border border-white bg-white/80 p-5 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-lg font-bold text-slate-900">Random Animal Wheel</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Switch to the wheel when you want a more playful, one-at-a-time selection flow.
              </p>
            </Link>
            <div className="rounded-[1.5rem] border border-white bg-white/80 p-5">
              <h3 className="text-lg font-bold text-slate-900">More focused tools next</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Sea, drawing, mythical, and hybrid animal generators are the next planned landers.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
