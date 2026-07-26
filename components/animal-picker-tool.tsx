'use client';

import { useState } from 'react';
import { Animal, CategoryKey, DrawingDifficulty } from '@/lib/animals';
import { ChallengeManager } from '@/lib/challenge-manager';
import { AnimalGenerator } from '@/lib/generator';
import { ShareManager } from '@/lib/share-manager';
import { AnimalCard } from '@/components/animal-card';
import { GeneratorControls } from '@/components/generator-controls';

const generator = new AnimalGenerator();
const challengeManager = new ChallengeManager();
const shareManager = new ShareManager();

type PickerMode = 'one' | 'list' | 'category' | 'today';

const PICKER_MODES: {
  id: PickerMode;
  label: string;
  hint: string;
  quantity: number;
  difficulty: DrawingDifficulty | null;
}[] = [
  {
    id: 'one',
    label: 'Pick one',
    hint: 'Instant single animal',
    quantity: 1,
    difficulty: null,
  },
  {
    id: 'list',
    label: 'Pick a list',
    hint: '3 animals for teams or rounds',
    quantity: 3,
    difficulty: null,
  },
  {
    id: 'category',
    label: 'Category pick',
    hint: 'Lock mammals, birds, and more',
    quantity: 1,
    difficulty: null,
  },
  {
    id: 'today',
    label: "Today's pick",
    hint: 'One shared animal for everyone',
    quantity: 1,
    difficulty: null,
  },
];

function scrollToResults() {
  if (typeof document === 'undefined') {
    return;
  }

  const resultsSection = document.getElementById('picker-results');
  if (resultsSection) {
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function buildPickerText(animals: Animal[], mode: PickerMode) {
  const modeLabel = PICKER_MODES.find((item) => item.id === mode)?.label ?? 'Pick';
  const lines = animals.map(
    (animal, index) =>
      `${index + 1}. ${animal.commonName} (${animal.scientificName}) — ${animal.category}`,
  );
  return [`Random animal picker: ${modeLabel}`, ...lines].join('\n');
}

export function AnimalPickerTool() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DrawingDifficulty | null>(null);
  const [pickerMode, setPickerMode] = useState<PickerMode>('one');
  const [copied, setCopied] = useState(false);

  const applyPickerMode = (mode: PickerMode) => {
    const config = PICKER_MODES.find((item) => item.id === mode);
    if (!config) return;

    setPickerMode(mode);
    setSelectedQuantity(config.quantity);
    setSelectedDifficulty(config.difficulty);
    if (mode === 'one' || mode === 'list' || mode === 'today') {
      setSelectedCategory(null);
    }
  };

  const handleReset = () => {
    applyPickerMode('one');
    setSelectedQuantity(1);
    setSelectedCategory(null);
    setSelectedDifficulty(null);
    setAnimals([]);
    setCopied(false);
  };

  const handleGenerate = () => {
    try {
      let generated: Animal[];

      if (pickerMode === 'today') {
        generated = [challengeManager.getDailyChallenge()];
      } else {
        generated = generator.generate(selectedQuantity, selectedCategory, selectedDifficulty);
      }

      setAnimals(generated);
      setCopied(false);
      setTimeout(scrollToResults, 0);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const handleCopy = async () => {
    if (animals.length === 0) return;
    const ok = await shareManager.copyToClipboard(buildPickerText(animals, pickerMode));
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <section id="generator" className="mx-auto mb-10 w-full max-w-3xl scroll-mt-24">
        <div className="home-surface mb-4 p-5 md:p-6">
          <div className="border-b border-[var(--line)] pb-4">
            <h2 className="font-display text-xl font-semibold text-[var(--ink)] md:text-2xl">
              Picker modes
            </h2>
            <p className="mt-1 text-sm text-[var(--ink-muted)]">
              Built for a fair, fast pick—games, classrooms, writing, and quick decisions.
            </p>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {PICKER_MODES.map((mode) => {
              const active = pickerMode === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => applyPickerMode(mode.id)}
                  className={`rounded-[var(--radius-sm)] border px-3 py-3 text-left transition-colors ${
                    active
                      ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]'
                      : 'border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--line-strong)]'
                  }`}
                >
                  <div className="text-sm font-semibold">{mode.label}</div>
                  <div
                    className={`mt-0.5 text-xs ${active ? 'text-[var(--paper)]/75' : 'text-[var(--ink-faint)]'}`}
                  >
                    {mode.hint}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {pickerMode === 'today' ? (
          <div className="home-surface p-6 md:p-8">
            <p className="text-sm leading-relaxed text-[var(--ink-muted)]">
              Today&apos;s pick is the same animal for everyone—useful for classroom rounds, family
              game night, or a shared writing prompt.
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
            generateLabel={pickerMode === 'one' ? 'Pick a random animal' : 'Pick animals'}
          />
        )}
      </section>

      <section id="picker-results" className="mb-12 scroll-mt-12">
        {animals.length > 0 ? (
          <>
            <div className="mb-6 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
              <div>
                <h2 className="font-display text-2xl font-semibold text-[var(--ink)] md:text-3xl">
                  Your pick
                </h2>
                <p className="mt-2 text-sm text-[var(--ink-muted)] md:text-base">
                  Open a card for facts and images, or copy the result for chat, slides, or worksheets.
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="btn-outline-ink shrink-0 px-4 py-2.5 text-sm"
              >
                {copied ? 'Copied' : 'Copy pick'}
              </button>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {animals.map((animal) => (
                <AnimalCard key={animal.id} animal={animal} />
              ))}
            </div>
          </>
        ) : (
          <div className="border border-dashed border-[var(--line-strong)] bg-[var(--surface)] px-6 py-10 text-center">
            <p className="font-display text-xl font-semibold text-[var(--ink)]">No animal picked yet</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[var(--ink-muted)]">
              Choose a picker mode above, then pick. Use Pick one for the classic random animal
              picker, or Today&apos;s pick when everyone needs the same result.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {PICKER_MODES.filter((mode) => mode.id !== 'one').map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => applyPickerMode(mode.id)}
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
