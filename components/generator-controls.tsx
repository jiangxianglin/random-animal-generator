'use client';

import { useMemo, useState } from 'react';
import {
  ANIMAL_DATABASE,
  CATEGORIES,
  CategoryKey,
  DrawingDifficulty,
} from '@/lib/animals';
import { AnimalGenerator } from '@/lib/generator';

interface GeneratorControlsProps {
  quantity: number;
  category: CategoryKey | null;
  difficulty: DrawingDifficulty | null;
  onQuantityChange: (quantity: number) => void;
  onCategoryChange: (category: CategoryKey | null) => void;
  onDifficultyChange: (difficulty: DrawingDifficulty | null) => void;
  onGenerate: () => void;
  onReset: () => void;
  generateLabel?: string;
}

const generator = new AnimalGenerator();

export function GeneratorControls({
  quantity,
  category,
  difficulty,
  onQuantityChange,
  onCategoryChange,
  onDifficultyChange,
  onGenerate,
  onReset,
  generateLabel = 'Generate Animals',
}: GeneratorControlsProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const difficultyCounts = useMemo(() => generator.getDifficultyCounts(category), [category]);
  const availableCount = useMemo(() => {
    let filtered = ANIMAL_DATABASE;
    if (category) filtered = filtered.filter((animal) => animal.category === category);
    if (difficulty) filtered = filtered.filter((animal) => animal.drawingDifficulty === difficulty);
    return filtered.length;
  }, [category, difficulty]);

  const handleGenerate = () => {
    setIsGenerating(true);
    onGenerate();
    setTimeout(() => setIsGenerating(false), 600);
  };

  return (
    <div className="home-surface p-6 md:p-8">
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-3 border-b border-[var(--line)] pb-5">
          <div className="text-center">
            <div className="font-display text-2xl font-semibold text-[var(--ink)]">
              {ANIMAL_DATABASE.length}
            </div>
            <div className="mt-0.5 text-xs font-medium text-[var(--ink-faint)]">Animals</div>
          </div>
          <div className="text-center">
            <div className="font-display text-2xl font-semibold text-[var(--ink)]">
              {Object.keys(CATEGORIES).length}
            </div>
            <div className="mt-0.5 text-xs font-medium text-[var(--ink-faint)]">Categories</div>
          </div>
          <div className="text-center">
            <div className="font-display text-2xl font-semibold text-[var(--olive)]">
              {availableCount}
            </div>
            <div className="mt-0.5 text-xs font-medium text-[var(--ink-faint)]">Available</div>
          </div>
        </div>

        <div>
          <label htmlFor="quantity" className="mb-3 block text-sm font-semibold text-[var(--ink)]">
            How many animals?
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[1, 3, 5, 10].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => onQuantityChange(num)}
                className={`rounded-[var(--radius-sm)] px-4 py-3 text-sm font-semibold transition-colors ${
                  quantity === num
                    ? 'bg-[var(--ink)] text-[var(--paper)]'
                    : 'border border-[var(--line)] bg-[var(--surface)] text-[var(--ink-muted)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="category" className="mb-3 block text-sm font-semibold text-[var(--ink)]">
            Choose a category
          </label>
          <select
            id="category"
            value={category || ''}
            onChange={(e) => onCategoryChange((e.target.value as CategoryKey) || null)}
            className="w-full cursor-pointer rounded-[var(--radius-sm)] border border-[var(--line-strong)] bg-[var(--surface-elevated)] px-4 py-3.5 text-base font-medium text-[var(--ink)] transition-colors hover:border-[var(--olive)] focus:border-[var(--olive)] focus:outline-none focus:ring-2 focus:ring-[var(--olive-soft)]"
          >
            <option value="">All Animals</option>
            <option value="mammals">Mammals</option>
            <option value="birds">Birds</option>
            <option value="reptiles">Reptiles</option>
            <option value="marine">Marine Animals</option>
            <option value="insects">Insects</option>
          </select>
        </div>

        <div>
          <label htmlFor="difficulty" className="mb-3 block text-sm font-semibold text-[var(--ink)]">
            Drawing difficulty
          </label>
          <select
            id="difficulty"
            value={difficulty || ''}
            onChange={(e) => onDifficultyChange((e.target.value as DrawingDifficulty) || null)}
            className="w-full cursor-pointer rounded-[var(--radius-sm)] border border-[var(--line-strong)] bg-[var(--surface-elevated)] px-4 py-3.5 text-base font-medium text-[var(--ink)] transition-colors hover:border-[var(--olive)] focus:border-[var(--olive)] focus:outline-none focus:ring-2 focus:ring-[var(--olive-soft)]"
          >
            <option value="">
              All Levels ({difficultyCounts.easy + difficultyCounts.medium + difficultyCounts.hard})
            </option>
            <option value="easy">Easy ({difficultyCounts.easy})</option>
            <option value="medium">Medium ({difficultyCounts.medium})</option>
            <option value="hard">Hard ({difficultyCounts.hard})</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating || availableCount < quantity}
            className="btn-ink flex w-full items-center justify-center gap-2 px-6 py-4 text-lg"
          >
            {isGenerating ? (
              <>
                <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Generating...</span>
              </>
            ) : availableCount < quantity ? (
              <span className="text-base">Not enough animals for this filter</span>
            ) : (
              <span>{generateLabel}</span>
            )}
          </button>

          <button
            onClick={onReset}
            type="button"
            className="btn-outline-ink w-full px-6 py-4 text-base"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}
