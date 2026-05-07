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
    <div className="rounded-2xl border border-emerald-100 bg-white/95 p-6 shadow-2xl backdrop-blur-sm md:p-8">
      <div className="space-y-5">
        <div className="mb-2 grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 p-3 text-center">
            <div className="text-2xl font-bold text-emerald-600">{ANIMAL_DATABASE.length}</div>
            <div className="text-xs font-medium text-gray-600">Animals</div>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 p-3 text-center">
            <div className="text-2xl font-bold text-amber-600">{Object.keys(CATEGORIES).length}</div>
            <div className="text-xs font-medium text-gray-600">Categories</div>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 p-3 text-center">
            <div className="text-2xl font-bold text-green-600">{availableCount}</div>
            <div className="text-xs font-medium text-gray-600">Available Now</div>
          </div>
        </div>

        <div>
          <label htmlFor="quantity" className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-800">
            <svg className="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
            How many animals?
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[1, 3, 5, 10].map((num) => (
              <button
                key={num}
                onClick={() => onQuantityChange(num)}
                className={`rounded-xl px-4 py-3 font-bold transition-all duration-200 ${
                  quantity === num
                    ? 'scale-105 bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:scale-105 hover:bg-gray-200'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="category" className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-800">
            <svg className="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Choose a category
          </label>
          <select
            id="category"
            value={category || ''}
            onChange={(e) => onCategoryChange((e.target.value as CategoryKey) || null)}
            className="w-full cursor-pointer rounded-xl border-2 border-gray-200 bg-white px-5 py-4 text-base font-medium text-gray-900 transition-all hover:border-emerald-300 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-100"
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
          <label htmlFor="difficulty" className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-800">
            <svg className="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Drawing difficulty
          </label>
          <select
            id="difficulty"
            value={difficulty || ''}
            onChange={(e) => onDifficultyChange((e.target.value as DrawingDifficulty) || null)}
            className="w-full cursor-pointer rounded-xl border-2 border-gray-200 bg-white px-5 py-4 text-base font-medium text-gray-900 transition-all hover:border-emerald-300 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-100"
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
            onClick={handleGenerate}
            disabled={isGenerating || availableCount < quantity}
            className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 px-6 py-5 text-xl font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 via-green-700 to-emerald-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative flex items-center justify-center gap-3">
              {isGenerating ? (
                <>
                  <svg className="h-6 w-6 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Generating...</span>
                </>
              ) : availableCount < quantity ? (
                <span>Not enough animals for this filter</span>
              ) : (
                <>
                  <svg className="h-7 w-7 transition-transform duration-500 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Generate Animals</span>
                </>
              )}
            </span>
          </button>

          <button
            onClick={onReset}
            type="button"
            className="w-full rounded-xl border-2 border-gray-200 bg-white px-6 py-5 text-base font-semibold text-gray-700 transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}
