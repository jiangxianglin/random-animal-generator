'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimalCard } from '@/components/animal-card';
import { ChallengePanel } from '@/components/challenge-panel';
import { CompatibilityNotice } from '@/components/compatibility-notice';
import { GeneratorControls } from '@/components/generator-controls';
import { HistoryPanel } from '@/components/history-panel';
import { HybridAnimalCard } from '@/components/hybrid-animal-card';
import { TimerDisplay } from '@/components/timer-display';
import { Animal, CategoryKey, DrawingDifficulty } from '@/lib/animals';
import { ChallengeManager, ChallengeMode, HybridAnimal } from '@/lib/challenge-manager';
import { AnimalGenerator } from '@/lib/generator';
import { HistoryEntry, HistoryManager } from '@/lib/history-manager';
import { buildFaqSchema, buildWebAppSchema } from '@/lib/seo';
import { SITE_NAME } from '@/lib/site';

const generator = new AnimalGenerator();
const challengeManager = new ChallengeManager();
const historyManager = new HistoryManager();

const HOME_FAQS = [
  {
    question: 'How does the random animal generator work?',
    answer:
      'The generator selects animals at random from a curated database of 100+ species. You can control quantity, category, and difficulty, then use the results for prompts, learning, or games.',
  },
  {
    question: 'Can I filter by category or difficulty?',
    answer:
      'Yes. You can filter by major animal groups and by drawing difficulty, which makes the tool useful for both general discovery and more structured practice.',
  },
  {
    question: 'What information comes with each result?',
    answer:
      'Each result includes the animal name, image, category, facts, and difficulty context. Many entries also include drawing tips and challenge-friendly presentation.',
  },
  {
    question: 'Is the random animal generator free to use?',
    answer: 'Yes. The generator is free to use with no registration required.',
  },
  {
    question: 'Does the site offer more than simple random picks?',
    answer:
      'Yes. The site also includes daily, timed, hard mode, and hybrid generation for users who want more structured prompts.',
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
] as const;

function HomeContent() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [hybridAnimal, setHybridAnimal] = useState<HybridAnimal | null>(null);
  const [challengeMode, setChallengeMode] = useState<ChallengeMode | null>(null);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [isDailyCompleted, setIsDailyCompleted] = useState<boolean>(false);
  const [shouldScrollToResults, setShouldScrollToResults] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(3);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DrawingDifficulty | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    setIsDailyCompleted(challengeManager.isDailyCompleted());
  }, []);

  const clearChallengeMode = () => {
    challengeManager.stopTimer();
    challengeManager.clearChallenge();
    setChallengeMode(null);
    setIsTimerActive(false);
    setTimerSeconds(0);
  };

  const handleSelectHistoryEntry = (entry: HistoryEntry) => {
    setAnimals(entry.animals);
    setHybridAnimal(null);
    setChallengeMode((entry.challengeMode as ChallengeMode) || null);
    setSelectedQuantity(entry.filters.quantity);
    setSelectedCategory(entry.filters.category);
    setSelectedDifficulty(entry.filters.difficulty);
    setShouldScrollToResults(true);
  };

  const handleClearHistory = () => {};

  const handleResetFilters = () => {
    clearChallengeMode();
    setSelectedQuantity(3);
    setSelectedCategory(null);
    setSelectedDifficulty(null);
    router.push('/', { scroll: false });
  };

  const handleGenerate = () => {
    try {
      clearChallengeMode();
      const generated = generator.generate(
        selectedQuantity,
        selectedCategory,
        selectedDifficulty,
      );
      setAnimals(generated);
      setHybridAnimal(null);
      setChallengeMode(null);
      setShouldScrollToResults(true);
      historyManager.addToHistory(
        generated,
        selectedCategory,
        selectedDifficulty,
        null,
      );

      const params = new URLSearchParams();
      if (selectedCategory) params.set('category', selectedCategory);
      if (selectedDifficulty) params.set('difficulty', selectedDifficulty);
      if (selectedQuantity !== 3) params.set('quantity', selectedQuantity.toString());
      const queryString = params.toString();
      router.push(queryString ? `?${queryString}` : '/', { scroll: false });
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const handleDailyChallenge = () => {
    try {
      clearChallengeMode();
      const animal = challengeManager.getDailyChallenge();
      setAnimals([animal]);
      setHybridAnimal(null);
      setChallengeMode('daily');
      setSelectedQuantity(1);
      setSelectedCategory(animal.category);
      setSelectedDifficulty(animal.drawingDifficulty);
      setShouldScrollToResults(true);
      historyManager.addToHistory([animal], null, animal.drawingDifficulty, 'daily');
      router.push('?mode=daily', { scroll: false });
      challengeManager.markDailyCompleted();
      setIsDailyCompleted(true);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const handleTimedChallenge = () => {
    try {
      clearChallengeMode();
      const challenge = challengeManager.startTimedChallenge(600, null, {
        onTick: (remainingSeconds) => setTimerSeconds(remainingSeconds),
        onComplete: () => {
          setIsTimerActive(false);
          alert("Time's up! Challenge complete!");
        },
      });

      const animal = challenge.animal as Animal;
      setAnimals([animal]);
      setHybridAnimal(null);
      setChallengeMode('timed');
      setIsTimerActive(true);
      setTimerSeconds(600);
      setSelectedQuantity(1);
      setSelectedCategory(animal.category);
      setSelectedDifficulty(animal.drawingDifficulty);
      setShouldScrollToResults(true);
      historyManager.addToHistory([animal], null, animal.drawingDifficulty, 'timed');
      router.push('?mode=timed', { scroll: false });
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const handleHardMode = () => {
    try {
      clearChallengeMode();
      const animal = challengeManager.generateHardMode();
      setAnimals([animal]);
      setHybridAnimal(null);
      setChallengeMode('hard');
      setSelectedQuantity(1);
      setSelectedCategory(animal.category);
      setSelectedDifficulty(animal.drawingDifficulty);
      setShouldScrollToResults(true);
      historyManager.addToHistory([animal], null, 'hard', 'hard');
      router.push('?mode=hard', { scroll: false });
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const handleHybridMode = () => {
    try {
      clearChallengeMode();
      const hybrid = challengeManager.generateHybridAnimal();
      setHybridAnimal(hybrid);
      setAnimals([]);
      setChallengeMode('hybrid');
      setSelectedQuantity(2);
      setSelectedCategory(null);
      setSelectedDifficulty(hybrid.difficulty);
      setShouldScrollToResults(true);

      if (hybrid.sourceAnimals.length > 0) {
        historyManager.addToHistory(
          hybrid.sourceAnimals,
          null,
          hybrid.sourceAnimals[0].drawingDifficulty,
          'hybrid',
        );
      }

      router.push('?mode=hybrid', { scroll: false });
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  useEffect(() => {
    const mode = searchParams.get('mode') as ChallengeMode | null;
    const hasFilters =
      searchParams.has('category') ||
      searchParams.has('difficulty') ||
      searchParams.has('quantity');

    if (mode === 'daily') {
      const animal = challengeManager.getDailyChallenge();
      setAnimals([animal]);
      setChallengeMode('daily');
      challengeManager.markDailyCompleted();
      setIsDailyCompleted(true);
      setSelectedQuantity(1);
      setSelectedCategory(animal.category);
      setSelectedDifficulty(animal.drawingDifficulty);
      return;
    }

    if (mode === 'timed') {
      const challenge = challengeManager.startTimedChallenge(600, null, {
        onTick: (remainingSeconds) => setTimerSeconds(remainingSeconds),
        onComplete: () => {
          setIsTimerActive(false);
          alert("Time's up! Challenge complete!");
        },
      });
      const animal = challenge.animal as Animal;
      setAnimals([animal]);
      setChallengeMode('timed');
      setIsTimerActive(true);
      setTimerSeconds(600);
      setSelectedQuantity(1);
      setSelectedCategory(animal.category);
      setSelectedDifficulty(animal.drawingDifficulty);
      return;
    }

    if (mode === 'hard') {
      const animal = challengeManager.generateHardMode();
      setAnimals([animal]);
      setChallengeMode('hard');
      setSelectedQuantity(1);
      setSelectedCategory(animal.category);
      setSelectedDifficulty(animal.drawingDifficulty);
      return;
    }

    if (mode === 'hybrid') {
      const hybrid = challengeManager.generateHybridAnimal();
      setHybridAnimal(hybrid);
      setChallengeMode('hybrid');
      setSelectedQuantity(2);
      setSelectedCategory(null);
      setSelectedDifficulty(hybrid.difficulty);
      return;
    }

    if (!hasFilters) {
      setAnimals([]);
      setHybridAnimal(null);
      setChallengeMode(null);
      setSelectedQuantity(3);
      setSelectedCategory(null);
      setSelectedDifficulty(null);
      return;
    }

    const category = searchParams.get('category') as CategoryKey | null;
    const difficulty = searchParams.get('difficulty') as DrawingDifficulty | null;
    const quantity = parseInt(searchParams.get('quantity') || '3', 10);
    setSelectedQuantity(quantity);
    setSelectedCategory(category);
    setSelectedDifficulty(difficulty);
    setAnimals(generator.generate(quantity, category, difficulty));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      challengeManager.stopTimer();
    };
  }, []);

  useEffect(() => {
    if (!shouldScrollToResults) {
      return;
    }

    if (animals.length === 0 && !hybridAnimal) {
      return;
    }

    const resultsSection = document.getElementById('results');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setShouldScrollToResults(false);
  }, [animals, hybridAnimal, shouldScrollToResults]);

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
    buildFaqSchema(HOME_FAQS),
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-amber-50 to-orange-50">
      <TimerDisplay remainingSeconds={timerSeconds} isActive={isTimerActive} />
      <CompatibilityNotice />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-10 top-20 h-72 w-72 animate-pulse rounded-full bg-emerald-300/15 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 animate-pulse rounded-full bg-amber-300/15 blur-3xl delay-1000" />
        <div className="absolute left-1/2 top-1/2 h-80 w-80 animate-pulse rounded-full bg-orange-300/10 blur-3xl delay-500" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-6">
        <div className="flex min-h-screen flex-col justify-center py-8">
          <header className="mb-8 text-center">
            <div className="mb-4 inline-block">
              <div className="text-6xl font-bold md:text-7xl">RA</div>
            </div>
            <h1 className="mb-4 bg-gradient-to-r from-emerald-700 via-green-600 to-amber-600 bg-clip-text text-4xl font-extrabold text-transparent drop-shadow-lg md:text-6xl">
              Random Animal Generator
            </h1>
            <p className="mx-auto mb-2 max-w-2xl text-lg font-medium text-gray-700 md:text-xl">
              Generate random animals for drawing prompts, classroom activities, games, and creative inspiration
            </p>
            <p className="mx-auto max-w-xl text-sm text-gray-600 md:text-base">
              Free online animal tool with category filters, challenge modes, and difficulty-based discovery
            </p>
          </header>

          <section className="mx-auto mb-8 flex w-full max-w-2xl flex-col gap-4">
            <GeneratorControls
              quantity={selectedQuantity}
              category={selectedCategory}
              difficulty={selectedDifficulty}
              onQuantityChange={setSelectedQuantity}
              onCategoryChange={setSelectedCategory}
              onDifficultyChange={setSelectedDifficulty}
              onGenerate={handleGenerate}
              onReset={handleResetFilters}
            />
            <ChallengePanel
              onDailyChallenge={handleDailyChallenge}
              onTimedChallenge={handleTimedChallenge}
              onHardMode={handleHardMode}
              onHybridMode={handleHybridMode}
              isDailyCompleted={isDailyCompleted}
            />
            <HistoryPanel
              onSelectEntry={handleSelectHistoryEntry}
              onClearHistory={handleClearHistory}
            />
          </section>

          <section className="mx-auto mb-8 grid w-full max-w-5xl gap-4 md:grid-cols-2">
            {CORE_TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex min-h-40 flex-col justify-between rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-600 via-cyan-600 to-emerald-600 p-7 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-sky-100">
                  {tool.label}
                </div>
                <div>
                  <h2 className="mb-3 text-3xl font-extrabold leading-tight md:text-4xl">
                    {tool.title}
                  </h2>
                  <p className="max-w-md text-base leading-7 text-sky-50">{tool.description}</p>
                </div>
                <div className="mt-6 inline-flex items-center text-base font-semibold text-white">
                  Open tool
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    -&gt;
                  </span>
                </div>
              </Link>
            ))}
          </section>

          <div className="relative mx-auto mt-8 w-full max-w-3xl overflow-hidden rounded-xl shadow-xl opacity-90">
            <Image
              src="/RandomAnimalGenerator-hero.png"
              alt="Random Animal Generator homepage showing wildlife examples from multiple categories"
              width={1920}
              height={1080}
              priority
              className="h-auto max-h-48 w-full object-cover"
              title="Explore random animals for games, learning, and creative prompts"
            />
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex flex-col items-center gap-2 text-gray-500">
              <span className="text-sm font-medium">Choose filters and click Generate Animals to start</span>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>

        {(animals.length > 0 || hybridAnimal) && (
          <section className="mb-12 scroll-mt-8" id="results">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-gray-800 drop-shadow-sm md:text-4xl">
                {challengeMode === 'daily' && 'Daily Challenge'}
                {challengeMode === 'timed' && 'Timed Challenge'}
                {challengeMode === 'hard' && 'Hard Mode Challenge'}
                {challengeMode === 'hybrid' && 'Hybrid Animal Challenge'}
                {!challengeMode && 'Your Generated Animals'}
              </h2>
              <p className="mt-2 text-lg text-gray-600">
                {challengeMode === 'daily' && "Try today's featured animal challenge."}
                {challengeMode === 'timed' && 'Race the timer and see what animal you get.'}
                {challengeMode === 'hard' && 'Test yourself with a more difficult animal prompt.'}
                {challengeMode === 'hybrid' && 'Create a unique hybrid creature from multiple animals.'}
                {!challengeMode && 'Click on any card to learn more.'}
              </p>
            </div>

            {hybridAnimal && (
              <div className="mx-auto max-w-2xl">
                <HybridAnimalCard hybrid={hybridAnimal} />
              </div>
            )}

            {animals.length > 0 && (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {animals.map((animal) => (
                  <AnimalCard key={animal.id} animal={animal} />
                ))}
              </div>
            )}
          </section>
        )}

        {animals.length === 0 && !hybridAnimal && !challengeMode && (
          <section className="mb-12 rounded-2xl border border-dashed border-emerald-200 bg-white/80 p-8 text-center text-gray-600 shadow-sm">
            <p className="text-lg font-medium text-gray-800">No animals generated yet.</p>
            <p className="mt-2 text-sm">
              Pick a quantity, category, or difficulty, then click <strong>Generate Animals</strong>.
            </p>
          </section>
        )}

        <section className="mb-8 rounded-2xl border border-emerald-100 bg-white/95 p-8 shadow-2xl backdrop-blur-sm md:p-10">
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600">
              <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">About This Random Animal Tool</h2>
          </div>

          <div className="relative mx-auto mb-8 w-full max-w-2xl overflow-hidden rounded-xl shadow-lg">
            <Image
              src="/RandomAnimalGenerator-BiodiversityShowcase.png"
              alt="Animal biodiversity showcase featuring mammals, birds, reptiles, marine life, and insects"
              width={1200}
              height={1200}
              className="h-auto max-h-96 w-full object-contain"
              title="Five categories of wildlife"
              loading="lazy"
            />
          </div>

          <div className="space-y-4 text-lg leading-relaxed text-gray-700">
            <p>
              <strong>Random Animal Generator</strong> is a flexible online tool for anyone who
              needs a quick animal prompt. You can use it to discover animals at random, narrow
              results by category, or generate more focused prompts for drawing, classroom
              activities, games, and creative projects.
            </p>
            <p>
              The current database includes more than 100 curated species across mammals, birds,
              reptiles, marine animals, and insects. Each result combines visual reference, quick
              facts, and difficulty-based context so the site can support both general random
              selection and more intentional use cases.
            </p>
          </div>
        </section>

        <section className="mb-8 rounded-2xl border border-amber-100 bg-white/95 p-8 shadow-2xl backdrop-blur-sm md:p-10">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600">
              <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Popular Ways to Use the Generator</h2>
          </div>

          <div className="relative mx-auto mb-8 w-full max-w-4xl overflow-hidden rounded-xl shadow-lg">
            <Image
              src="/RandomAnimalGenerator-UseCasesSection.png"
              alt="Students and teachers using the random animal generator tool"
              width={2560}
              height={1080}
              className="h-auto w-full"
              title="Use cases for classrooms, prompts, and games"
              loading="lazy"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {HOME_USE_CASES.map((useCase) => (
              <div
                key={useCase.title}
                className="group rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-amber-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-lg"
              >
                <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  {useCase.label}
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">{useCase.title}</h3>
                <p className="leading-relaxed text-gray-700">{useCase.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8 rounded-2xl border border-sky-100 bg-white/95 p-8 shadow-2xl backdrop-blur-sm md:p-10">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-cyan-600">
              <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Explore Related Tools</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {CORE_TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg"
              >
                <div className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                  {tool.label}
                </div>
                <h3 className="mb-3 text-2xl font-bold text-gray-900">{tool.title}</h3>
                <p className="text-gray-700">{tool.description}</p>
                <div className="mt-5 text-sm font-semibold text-sky-700">Open tool -&gt;</div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-8 rounded-2xl border border-green-100 bg-white/95 p-8 shadow-2xl backdrop-blur-sm md:p-10">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600">
              <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {HOME_FAQS.map((faq) => (
              <div
                key={faq.question}
                className="rounded-xl border border-gray-200 bg-gradient-to-r from-gray-50 to-emerald-50 p-6 transition-all duration-300 hover:border-emerald-300 hover:shadow-md"
              >
                <h3 className="mb-3 flex items-start gap-3 text-lg font-bold text-gray-900">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                    Q
                  </span>
                  {faq.question}
                </h3>
                <p className="pl-9 leading-relaxed text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="py-10 text-center text-gray-700">
          <div className="mb-4 inline-block rounded-full border border-emerald-200 bg-white/60 px-6 py-3 backdrop-blur-sm">
            <p className="font-medium">&copy; 2026 Random Animal Generator</p>
          </div>
          <p className="mb-4 text-gray-600">
            Free online tool for random animal prompts, games, and category-based discovery
          </p>
          <div className="inline-block rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm">
            <p className="text-emerald-800">
              <span className="font-semibold">Privacy:</span> All data is stored locally on your
              device. No personal information is collected or transmitted.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-amber-50 to-orange-50">
          <div className="text-center">
            <div className="mb-4 text-6xl font-bold">RA</div>
            <p className="text-xl font-medium text-gray-700">Loading...</p>
          </div>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
