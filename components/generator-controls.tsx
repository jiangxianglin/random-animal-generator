'use client';

import { useState } from 'react';
import { CATEGORIES, CategoryKey } from '@/lib/animals';

interface GeneratorControlsProps {
  onGenerate: (quantity: number, category: CategoryKey | null) => void;
}

export function GeneratorControls({ onGenerate }: GeneratorControlsProps) {
  const [quantity, setQuantity] = useState(3);
  const [category, setCategory] = useState<CategoryKey | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    onGenerate(quantity, category);
    setTimeout(() => setIsGenerating(false), 600);
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 border border-purple-100">
      <div className="space-y-5">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-2">
          <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl">
            <div className="text-2xl font-bold text-purple-600">101</div>
            <div className="text-xs text-gray-600 font-medium">Animals</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl">
            <div className="text-2xl font-bold text-indigo-600">5</div>
            <div className="text-xs text-gray-600 font-medium">Categories</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
            <div className="text-2xl font-bold text-blue-600">100%</div>
            <div className="text-xs text-gray-600 font-medium">Free</div>
          </div>
        </div>

        {/* Quantity Selector */}
        <div>
          <label htmlFor="quantity" className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
            How many animals?
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[1, 3, 5, 10].map((num) => (
              <button
                key={num}
                onClick={() => setQuantity(num)}
                className={`py-3 px-4 rounded-xl font-bold transition-all duration-200 ${
                  quantity === num
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Category Selector */}
        <div>
          <label htmlFor="category" className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Choose a category
          </label>
          <select
            id="category"
            value={category || ''}
            onChange={(e) => setCategory(e.target.value as CategoryKey || null)}
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none transition-all text-gray-900 bg-white cursor-pointer font-medium hover:border-purple-300 text-base"
          >
            <option value="">🌍 All Animals</option>
            <option value="mammals">🦁 Mammals</option>
            <option value="birds">🦅 Birds</option>
            <option value="reptiles">🦎 Reptiles</option>
            <option value="marine">🐋 Marine Animals</option>
            <option value="insects">🦋 Insects</option>
          </select>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="group relative w-full px-6 py-5 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300 text-xl overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Button Content */}
          <span className="relative flex items-center justify-center gap-3">
            {isGenerating ? (
              <>
                <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <svg className="w-7 h-7 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Generate Animals</span>
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  );
}
