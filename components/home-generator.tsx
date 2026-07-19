'use client';

import { useEffect, useState } from 'react';
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

const generator = new AnimalGenerator();
const challengeManager = new ChallengeManager();
const historyManager = new HistoryManager();

const HOME_QUICK_LINKS = [
  { href: '#how-it-works', label: 'How it works' },
  { href: '#drawing-challenges', label: 'Drawing challenges' },
  { href: '#classroom-uses', label: 'Classroom uses' },
  { href: '#faq', label: 'FAQ' },
] as const;

export function HomeGenerator() {
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

  return (
    <>
      <TimerDisplay remainingSeconds={timerSeconds} isActive={isTimerActive} />
      <CompatibilityNotice />

      <section id="generator" className="mx-auto mb-4 scroll-mt-24 flex w-full max-w-3xl flex-col gap-4">
        <nav aria-label="On this page" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {HOME_QUICK_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-medium text-[var(--ink-muted)] underline-offset-4 transition-colors hover:text-[var(--olive-deep)] hover:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>
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

      {(animals.length > 0 || hybridAnimal) && (
        <section className="mb-12 scroll-mt-8" id="results">
          <div className="mb-8 text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[var(--ink)] md:text-4xl">
              {challengeMode === 'daily' && 'Daily Challenge'}
              {challengeMode === 'timed' && 'Timed Challenge'}
              {challengeMode === 'hard' && 'Hard Mode Challenge'}
              {challengeMode === 'hybrid' && 'Hybrid Animal Challenge'}
              {!challengeMode && 'Your Generated Animals'}
            </h2>
            <p className="mt-2 text-lg text-[var(--ink-muted)]">
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
        <section className="mx-auto mb-12 max-w-3xl border border-dashed border-[var(--line-strong)] bg-[var(--surface)] px-6 py-8 text-center">
          <p className="font-display text-lg font-medium text-[var(--ink)]">No animals generated yet.</p>
          <p className="mt-2 text-sm text-[var(--ink-muted)]">
            Pick a quantity, category, or difficulty, then click <strong>Generate Animals</strong>.
          </p>
        </section>
      )}
    </>
  );
}

export function HomeGeneratorFallback() {
  return (
    <section
      id="generator"
      className="home-surface mx-auto mb-12 scroll-mt-24 w-full max-w-3xl p-8 text-center"
    >
      <p className="font-display text-lg font-semibold text-[var(--ink)]">Loading the animal generator…</p>
      <p className="mt-2 text-sm text-[var(--ink-muted)]">
        Choose quantity, category, and difficulty, then generate random animals for drawing,
        games, or classroom activities.
      </p>
    </section>
  );
}
