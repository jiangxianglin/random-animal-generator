'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ANIMAL_DATABASE,
  CATEGORIES,
  CategoryKey,
  DrawingDifficulty,
} from '@/lib/animals';

type NameFormat = 'common' | 'scientific' | 'both';
type OutputMode = 'list' | 'writing' | 'study' | 'game';
type PersonaMode = 'fast' | 'writer' | 'science' | 'party';

type NameResult = {
  id: string;
  commonName: string;
  scientificName: string;
  category: CategoryKey;
  difficulty: DrawingDifficulty;
};

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

const CATEGORY_OPTIONS: Array<{ value: CategoryKey | 'all'; label: string }> = [
  { value: 'all', label: 'All animals' },
  { value: 'mammals', label: 'Mammals' },
  { value: 'birds', label: 'Birds' },
  { value: 'reptiles', label: 'Reptiles' },
  { value: 'marine', label: 'Marine' },
  { value: 'insects', label: 'Insects' },
];

const PERSONA_MODES: Array<{
  id: PersonaMode;
  label: string;
  hint: string;
  quantity: number;
  category: CategoryKey | 'all';
  format: NameFormat;
  mode: OutputMode;
}> = [
  {
    id: 'fast',
    label: 'Fast list',
    hint: 'Pasteable names, no extras',
    quantity: 6,
    category: 'all',
    format: 'common',
    mode: 'list',
  },
  {
    id: 'writer',
    label: 'Writer pack',
    hint: 'Story seeds with context',
    quantity: 5,
    category: 'mammals',
    format: 'both',
    mode: 'writing',
  },
  {
    id: 'science',
    label: 'Science drill',
    hint: 'Latin names for class',
    quantity: 8,
    category: 'all',
    format: 'scientific',
    mode: 'study',
  },
  {
    id: 'party',
    label: 'Party round',
    hint: 'Short list for guessing',
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

function mapAnimals(category: CategoryKey | 'all') {
  const filtered =
    category === 'all'
      ? ANIMAL_DATABASE
      : ANIMAL_DATABASE.filter((animal) => animal.category === category);

  return filtered.map((animal) => ({
    id: animal.id,
    commonName: animal.commonName,
    scientificName: animal.scientificName,
    category: animal.category,
    difficulty: animal.drawingDifficulty,
  }));
}

function buildTextOutput(
  results: NameResult[],
  nameFormat: NameFormat,
  outputMode: OutputMode,
  numbered: boolean,
) {
  if (results.length === 0) {
    return 'Generate a list to see copy-ready output here.';
  }

  return results
    .map((result, index) => {
      const line = getCopyLine(result, nameFormat, outputMode);
      return numbered ? `${index + 1}. ${line}` : line;
    })
    .join('\n');
}

export function AnimalNameGeneratorClient() {
  const defaultPersona = PERSONA_MODES[0];
  const [personaMode, setPersonaMode] = useState<PersonaMode | 'custom'>(defaultPersona.id);
  const [quantity, setQuantity] = useState(defaultPersona.quantity);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | 'all'>(
    defaultPersona.category,
  );
  const [nameFormat, setNameFormat] = useState<NameFormat>(defaultPersona.format);
  const [outputMode, setOutputMode] = useState<OutputMode>(defaultPersona.mode);
  const [numberedOutput, setNumberedOutput] = useState(true);
  const [results, setResults] = useState<NameResult[]>([]);
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const availableAnimals = useMemo(() => mapAnimals(selectedCategory), [selectedCategory]);

  const textOutput = useMemo(
    () => buildTextOutput(results, nameFormat, outputMode, numberedOutput),
    [nameFormat, numberedOutput, outputMode, results],
  );

  useEffect(() => {
    if (hasGenerated) {
      return;
    }

    const nextResults = generateResults(mapAnimals(defaultPersona.category), defaultPersona.quantity);
    setResults(nextResults);
    setHasGenerated(true);
  }, [defaultPersona.category, defaultPersona.quantity, hasGenerated]);

  const markCustom = () => {
    setPersonaMode('custom');
  };

  const handleGenerate = () => {
    const nextResults = generateResults(availableAnimals, quantity);
    setResults(nextResults);
    setCopied(false);
    setDownloaded(false);
    setHasGenerated(true);
    setTimeout(scrollToResults, 0);
  };

  const handleReset = () => {
    setPersonaMode(defaultPersona.id);
    setQuantity(defaultPersona.quantity);
    setSelectedCategory(defaultPersona.category);
    setNameFormat(defaultPersona.format);
    setOutputMode(defaultPersona.mode);
    setNumberedOutput(true);
    setResults(generateResults(mapAnimals(defaultPersona.category), defaultPersona.quantity));
    setCopied(false);
    setDownloaded(false);
    setHasGenerated(true);
  };

  const handleApplyPersona = (persona: (typeof PERSONA_MODES)[number]) => {
    const mappedAnimals = mapAnimals(persona.category);

    setPersonaMode(persona.id);
    setQuantity(persona.quantity);
    setSelectedCategory(persona.category);
    setNameFormat(persona.format);
    setOutputMode(persona.mode);
    setResults(generateResults(mappedAnimals, persona.quantity));
    setCopied(false);
    setDownloaded(false);
    setHasGenerated(true);
    setTimeout(scrollToResults, 0);
  };

  const handleCopy = async () => {
    if (results.length === 0) {
      return;
    }

    try {
      await navigator.clipboard.writeText(textOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleDownload = () => {
    if (results.length === 0 || typeof document === 'undefined') {
      return;
    }

    const blob = new Blob([textOutput], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const stamp = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.download = `animal-names-${stamp}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  const activePersonaLabel =
    PERSONA_MODES.find((persona) => persona.id === personaMode)?.label ?? 'Custom setup';

  return (
    <>
      <section id="generator" className="name-tool mx-auto mb-10 w-full max-w-3xl scroll-mt-24">
        <div className="home-surface p-5 md:p-6">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[var(--line)] pb-4">
            <div>
              <h2 className="font-display text-xl font-semibold text-[var(--ink)] md:text-2xl">
                Name list tool
              </h2>
              <p className="mt-1 text-sm text-[var(--ink-muted)]">
                {availableAnimals.length} names available · pick a use case, then refine
              </p>
            </div>
            <button type="button" onClick={handleReset} className="btn-outline-ink px-4 py-2 text-sm">
              Reset
            </button>
          </div>

          <div className="mt-5 space-y-5">
            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink-faint)]">
                Use case
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {PERSONA_MODES.map((persona) => {
                  const active = personaMode === persona.id;
                  return (
                    <button
                      key={persona.id}
                      type="button"
                      onClick={() => handleApplyPersona(persona)}
                      className={`name-chip rounded-[var(--radius-sm)] border p-3 text-left transition-colors ${
                        active
                          ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]'
                          : 'border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--olive)]'
                      }`}
                    >
                      <div className="text-sm font-semibold">{persona.label}</div>
                      <div
                        className={`mt-0.5 text-xs ${active ? 'text-[var(--paper)]/75' : 'text-[var(--ink-faint)]'}`}
                      >
                        {persona.hint}
                      </div>
                    </button>
                  );
                })}
              </div>
              {personaMode === 'custom' ? (
                <p className="mt-2 text-xs text-[var(--ink-faint)]">
                  Custom filters active — results still follow your quantity, category, format, and
                  mode.
                </p>
              ) : null}
            </div>

            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink-faint)]">
                Quantity
              </div>
              <div className="flex flex-wrap gap-2">
                {QUANTITY_OPTIONS.map((value) => {
                  const active = quantity === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => {
                        markCustom();
                        setQuantity(value);
                      }}
                      className={`name-chip rounded-[var(--radius-sm)] border px-3 py-2 text-sm font-semibold transition-colors ${
                        active
                          ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]'
                          : 'border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--line-strong)]'
                      }`}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink-faint)]">
                Category
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {CATEGORY_OPTIONS.map((option) => {
                  const active = selectedCategory === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        markCustom();
                        setSelectedCategory(option.value);
                      }}
                      className={`name-chip rounded-[var(--radius-sm)] border px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
                        active
                          ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]'
                          : 'border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--line-strong)]'
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink-faint)]">
                Format
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {FORMAT_OPTIONS.map((option) => {
                  const active = nameFormat === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        markCustom();
                        setNameFormat(option.value);
                      }}
                      className={`name-chip rounded-[var(--radius-sm)] border p-3 text-left transition-colors ${
                        active
                          ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]'
                          : 'border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--line-strong)]'
                      }`}
                    >
                      <div className="text-sm font-semibold">{option.label}</div>
                      <div
                        className={`mt-0.5 text-xs ${active ? 'text-[var(--paper)]/75' : 'text-[var(--ink-faint)]'}`}
                      >
                        {option.note}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink-faint)]">
                Output mode
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {OUTPUT_MODE_OPTIONS.map((option) => {
                  const active = outputMode === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        markCustom();
                        setOutputMode(option.value);
                      }}
                      className={`name-chip rounded-[var(--radius-sm)] border p-3 text-left transition-colors ${
                        active
                          ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]'
                          : 'border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--line-strong)]'
                      }`}
                    >
                      <div className="text-sm font-semibold">{option.label}</div>
                      <div
                        className={`mt-0.5 text-xs ${active ? 'text-[var(--paper)]/75' : 'text-[var(--ink-faint)]'}`}
                      >
                        {option.note}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] pt-4">
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-[var(--ink-muted)]">
                <input
                  type="checkbox"
                  checked={numberedOutput}
                  onChange={(event) => setNumberedOutput(event.target.checked)}
                  className="name-check"
                />
                Numbered lines for worksheets
              </label>
              <span className="text-xs text-[var(--ink-faint)]">Active: {activePersonaLabel}</span>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={handleGenerate} className="btn-ink flex-1 px-6 py-3.5 text-base">
                Generate animal names
              </button>
              <button
                type="button"
                onClick={handleCopy}
                disabled={results.length === 0}
                className="btn-outline-ink flex-1 px-6 py-3.5 text-base disabled:cursor-not-allowed disabled:opacity-40"
              >
                {copied ? 'Copied' : 'Copy list'}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                disabled={results.length === 0}
                className="btn-outline-ink flex-1 px-6 py-3.5 text-base disabled:cursor-not-allowed disabled:opacity-40"
              >
                {downloaded ? 'Downloaded' : 'Download .txt'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="generated-name-results" className="name-results mb-12 scroll-mt-12">
        {results.length > 0 ? (
          <div className="home-surface animate-home-rise p-6 md:p-8">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-display text-2xl font-semibold text-[var(--ink)] md:text-3xl">
                  Generated name list
                </h2>
                <p className="mt-2 text-sm text-[var(--ink-muted)] md:text-base">
                  {results.length} names · {activePersonaLabel.toLowerCase()} ·{' '}
                  {OUTPUT_MODE_OPTIONS.find((option) => option.value === outputMode)?.label.toLowerCase()}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleGenerate}
                  className="btn-outline-ink shrink-0 px-4 py-2.5 text-sm"
                >
                  Regenerate
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="btn-outline-ink shrink-0 px-4 py-2.5 text-sm"
                >
                  {copied ? 'Copied' : 'Copy list'}
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="btn-outline-ink shrink-0 px-4 py-2.5 text-sm"
                >
                  {downloaded ? 'Downloaded' : 'Download .txt'}
                </button>
              </div>
            </div>

            <div className="name-output mb-6 border border-[var(--line)] bg-[var(--ink)] p-5 text-[var(--paper)]">
              <h3 className="font-display text-lg font-semibold">Copy-ready output</h3>
              <pre className="mt-3 overflow-x-auto whitespace-pre-wrap font-sans text-sm leading-7 text-[var(--paper)]/90">
                {textOutput}
              </pre>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {results.map((result, index) => (
                <article key={`${result.id}-${index}`} className="name-result-item border-t border-[var(--line)] pt-4">
                  <div className="mb-2 flex items-center justify-between gap-3 text-xs">
                    <span className="font-semibold text-[var(--olive)]">Item {index + 1}</span>
                    <span className="text-[var(--ink-faint)]">{CATEGORIES[result.category]}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[var(--ink)]">
                    {formatName(result, nameFormat)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-muted)]">
                    {getResultSupportText(result, outputMode)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <div className="border border-dashed border-[var(--line-strong)] bg-[var(--surface)] px-6 py-10 text-center">
            <p className="font-display text-xl font-semibold text-[var(--ink)]">Preparing names…</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[var(--ink-muted)]">
              Tap a use case above—or generate—to build a copy-ready list for writing, class, or
              games.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
