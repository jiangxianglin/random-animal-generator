'use client';

import { useEffect, useRef, useState } from 'react';
import { Animal, CategoryKey, DrawingDifficulty } from '@/lib/animals';
import { ChallengeManager } from '@/lib/challenge-manager';
import { AnimalGenerator } from '@/lib/generator';
import { ShareManager } from '@/lib/share-manager';
import { AnimalCard } from '@/components/animal-card';
import { GeneratorControls } from '@/components/generator-controls';

const generator = new AnimalGenerator();
const challengeManager = new ChallengeManager();
const shareManager = new ShareManager();

type PracticeMode = 'free' | 'silhouette' | 'gesture' | 'texture' | 'daily';

const PRACTICE_MODES: {
  id: PracticeMode;
  label: string;
  hint: string;
  quantity: number;
  difficulty: DrawingDifficulty | null;
  timerSeconds: number | null;
}[] = [
  {
    id: 'free',
    label: 'Free practice',
    hint: 'Pick your own filters',
    quantity: 3,
    difficulty: 'medium',
    timerSeconds: null,
  },
  {
    id: 'silhouette',
    label: '5-min silhouette',
    hint: 'Easy shapes, bold outline',
    quantity: 1,
    difficulty: 'easy',
    timerSeconds: 300,
  },
  {
    id: 'gesture',
    label: '3-min gesture',
    hint: 'Capture motion fast',
    quantity: 1,
    difficulty: 'medium',
    timerSeconds: 180,
  },
  {
    id: 'texture',
    label: '15-min texture',
    hint: 'Fur, feathers, scales',
    quantity: 1,
    difficulty: 'hard',
    timerSeconds: 900,
  },
  {
    id: 'daily',
    label: "Today's prompt",
    hint: 'One shared daily animal',
    quantity: 1,
    difficulty: null,
    timerSeconds: null,
  },
];

function scrollToResults() {
  if (typeof document === 'undefined') {
    return;
  }

  const resultsSection = document.getElementById('drawing-results');
  if (resultsSection) {
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function buildPromptText(animals: Animal[], mode: PracticeMode) {
  const modeLabel = PRACTICE_MODES.find((item) => item.id === mode)?.label ?? 'Free practice';
  const lines = animals.map((animal, index) => {
    const tips = animal.drawingTips?.slice(0, 2).join(' ') ?? '';
    return `${index + 1}. Draw a ${animal.commonName} (${animal.drawingDifficulty}) — ${animal.category}. ${tips}`.trim();
  });
  return [`Drawing prompt session: ${modeLabel}`, ...lines].join('\n');
}

interface DrawingGeneratorToolProps {
  generateLabel?: string;
}

export function DrawingGeneratorTool({
  generateLabel = 'Generate Drawing Prompts',
}: DrawingGeneratorToolProps) {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [selectedQuantity, setSelectedQuantity] = useState(3);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DrawingDifficulty | null>('medium');
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('free');
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
  const [timerFinished, setTimerFinished] = useState(false);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearTimer();
  }, []);

  const startTimer = (seconds: number) => {
    clearTimer();
    setTimerFinished(false);
    setRemainingSeconds(seconds);
    timerRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev === null) return prev;
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          setTimerFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const applyPracticeMode = (mode: PracticeMode) => {
    const config = PRACTICE_MODES.find((item) => item.id === mode);
    if (!config) return;

    setPracticeMode(mode);
    setSelectedQuantity(config.quantity);
    setSelectedDifficulty(config.difficulty);
    if (mode !== 'free') {
      setSelectedCategory(null);
    }
    clearTimer();
    setRemainingSeconds(null);
    setTimerFinished(false);
  };

  const handleReset = () => {
    applyPracticeMode('free');
    setSelectedQuantity(3);
    setSelectedCategory(null);
    setSelectedDifficulty('medium');
    setAnimals([]);
    clearTimer();
    setRemainingSeconds(null);
    setTimerFinished(false);
  };

  const handleGenerate = () => {
    try {
      let generated: Animal[];

      if (practiceMode === 'daily') {
        generated = [challengeManager.getDailyChallenge()];
      } else {
        generated = generator.generate(selectedQuantity, selectedCategory, selectedDifficulty);
      }

      setAnimals(generated);
      setCopied(false);

      const config = PRACTICE_MODES.find((item) => item.id === practiceMode);
      if (config?.timerSeconds) {
        startTimer(config.timerSeconds);
      } else {
        clearTimer();
        setRemainingSeconds(null);
        setTimerFinished(false);
      }

      setTimeout(scrollToResults, 0);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const handleCopyPrompts = async () => {
    if (animals.length === 0) return;
    const ok = await shareManager.copyToClipboard(buildPromptText(animals, practiceMode));
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <section id="generator" className="mx-auto mb-10 w-full max-w-3xl scroll-mt-24">
        <div className="home-surface mb-4 p-5 md:p-6">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[var(--line)] pb-4">
            <div>
              <h2 className="font-display text-xl font-semibold text-[var(--ink)] md:text-2xl">
                Practice modes
              </h2>
              <p className="mt-1 text-sm text-[var(--ink-muted)]">
                Built for artists who need a clear brief, not another blank page.
              </p>
            </div>
            {remainingSeconds !== null && (
              <div
                className={`rounded-[var(--radius-sm)] px-3 py-2 font-display text-lg font-semibold tabular-nums ${
                  timerFinished
                    ? 'bg-[var(--olive-soft)] text-[var(--olive-deep)]'
                    : 'bg-[var(--ink)] text-[var(--paper)]'
                }`}
                aria-live="polite"
              >
                {timerFinished ? 'Time up' : formatTime(remainingSeconds)}
              </div>
            )}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {PRACTICE_MODES.map((mode) => {
              const active = practiceMode === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => applyPracticeMode(mode.id)}
                  className={`rounded-[var(--radius-sm)] border px-3 py-3 text-left transition-colors ${
                    active
                      ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]'
                      : 'border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--line-strong)]'
                  }`}
                >
                  <div className="text-sm font-semibold">{mode.label}</div>
                  <div className={`mt-0.5 text-xs ${active ? 'text-[var(--paper)]/75' : 'text-[var(--ink-faint)]'}`}>
                    {mode.hint}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {practiceMode === 'daily' ? (
          <div className="home-surface p-6 md:p-8">
            <p className="text-sm leading-relaxed text-[var(--ink-muted)]">
              Today&apos;s prompt is the same animal for everyone—perfect for art club check-ins,
              Discord challenges, or a classroom warm-up with one shared subject.
            </p>
            <button
              type="button"
              onClick={handleGenerate}
              className="btn-ink mt-5 w-full px-6 py-4 text-lg"
            >
              Reveal today&apos;s animal
            </button>
          </div>
        ) : (
          <GeneratorControls
            quantity={selectedQuantity}
            category={selectedCategory}
            difficulty={selectedDifficulty}
            onQuantityChange={setSelectedQuantity}
            onCategoryChange={setSelectedCategory}
            onDifficultyChange={setSelectedDifficulty}
            onGenerate={handleGenerate}
            onReset={handleReset}
            generateLabel={
              PRACTICE_MODES.find((item) => item.id === practiceMode)?.timerSeconds
                ? `${generateLabel} + Start Timer`
                : generateLabel
            }
          />
        )}
      </section>

      <section id="drawing-results" className="mb-12 scroll-mt-12">
        {animals.length > 0 ? (
          <>
            <div className="mb-6 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
              <div>
                <h2 className="font-display text-2xl font-semibold text-[var(--ink)] md:text-3xl">
                  Your drawing prompts
                </h2>
                <p className="mt-2 text-sm text-[var(--ink-muted)] md:text-base">
                  Open a card for reference images and drawing tips, then start the sketch.
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopyPrompts}
                className="btn-outline-ink shrink-0 px-4 py-2.5 text-sm"
              >
                {copied ? 'Copied' : 'Copy prompts'}
              </button>
            </div>
            {timerFinished && (
              <p className="mb-4 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--olive-soft)] px-4 py-3 text-sm text-[var(--olive-deep)]">
                Timer finished—step back, compare silhouettes, then generate the next round.
              </p>
            )}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {animals.map((animal) => (
                <AnimalCard key={animal.id} animal={animal} />
              ))}
            </div>
          </>
        ) : (
          <div className="border border-dashed border-[var(--line-strong)] bg-[var(--surface)] px-6 py-10 text-center">
            <p className="font-display text-xl font-semibold text-[var(--ink)]">
              No prompts yet
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[var(--ink-muted)]">
              Choose a practice mode above, then generate. Silhouette and gesture modes start a timer
              so you can work like a studio warmup.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {PRACTICE_MODES.filter((mode) => mode.id !== 'free').map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => applyPracticeMode(mode.id)}
                  className="rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface-elevated)] px-3 py-2 text-xs font-semibold text-[var(--ink-muted)] transition-colors hover:border-[var(--olive)] hover:text-[var(--olive-deep)]"
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
