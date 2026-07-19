'use client';

import { Animal } from '@/lib/animals';
import { useEffect, useState } from 'react';
import { DifficultyBadge } from './difficulty-badge';
import { DrawingTips } from './drawing-tips';
import { ShareButtons } from './share-buttons';

interface AnimalCardProps {
  animal: Animal;
}

const categoryColors = {
  mammals: 'from-amber-500 to-orange-600',
  birds: 'from-sky-500 to-blue-600',
  reptiles: 'from-emerald-500 to-green-600',
  marine: 'from-cyan-500 to-teal-600',
  insects: 'from-purple-500 to-pink-600',
} as const;

const categoryLabels = {
  mammals: 'Mammals',
  birds: 'Birds',
  reptiles: 'Reptiles',
  marine: 'Marine',
  insects: 'Insects',
} as const;

export function AnimalCard({ animal }: AnimalCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    if (!isImageModalOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsImageModalOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isImageModalOpen]);

  return (
    <>
      <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">
        <div
          className="relative flex h-56 w-full cursor-pointer items-center justify-center overflow-hidden bg-[var(--paper-deep)]"
          onClick={() => setIsImageModalOpen(true)}
        >
          <img
            src={animal.imageUrl}
            alt={animal.imageAlt}
            className="h-full w-full object-contain p-1 transition-opacity duration-300 group-hover:opacity-95"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent && !parent.querySelector('.placeholder-content')) {
                const placeholder = document.createElement('div');
                placeholder.className =
                  'placeholder-content absolute inset-0 flex flex-col items-center justify-center p-6 text-center';
                placeholder.innerHTML = `
                  <div class="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-3">${categoryLabels[animal.category]}</div>
                  <div class="text-2xl font-bold text-gray-700">${animal.commonName}</div>
                  <div class="mt-2 text-sm italic text-gray-500">${animal.scientificName}</div>
                `;
                parent.appendChild(placeholder);
              }
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="absolute right-4 top-4 z-10">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm ${categoryColors[animal.category]}`}
            >
              <span className="hidden sm:inline">{categoryLabels[animal.category]}</span>
              <span className="sm:hidden">{categoryLabels[animal.category].slice(0, 3)}</span>
            </span>
          </div>

          <div className="absolute left-4 top-4 z-10">
            <DifficultyBadge difficulty={animal.drawingDifficulty} />
          </div>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <h3 className="mb-2 text-2xl font-bold text-gray-900 transition-colors group-hover:text-emerald-700">
              {animal.commonName}
            </h3>
            <p className="text-sm font-medium italic text-gray-500">{animal.scientificName}</p>
          </div>

          {animal.drawingTips && animal.drawingTips.length > 0 && (
            <DrawingTips tips={animal.drawingTips} className="mb-4" />
          )}

          <div
            className={`space-y-3 transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-32 overflow-hidden'}`}
          >
            {animal.facts.map((fact, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600">
                  <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="flex-1 text-sm leading-relaxed text-gray-700">{fact}</p>
              </div>
            ))}
          </div>

          {animal.facts.length > 2 && (
            <button
              className="mt-4 flex min-h-[44px] items-center gap-1 py-2 text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-800"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              {isExpanded ? (
                <>
                  <span>Show Less</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </>
              ) : (
                <>
                  <span>Read More</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </button>
          )}

          <div className="mt-4 border-t border-gray-100 pt-4">
            <ShareButtons animal={animal} />
          </div>
        </div>
      </div>

      {isImageModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-[rgba(28,26,23,0.92)]"
          role="dialog"
          aria-modal="true"
          aria-label={`${animal.commonName} image`}
          onClick={() => setIsImageModalOpen(false)}
        >
          <div
            className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full bg-gradient-to-r px-2.5 py-1 text-xs font-semibold text-white ${categoryColors[animal.category]}`}
                >
                  {categoryLabels[animal.category]}
                </span>
                <DifficultyBadge difficulty={animal.drawingDifficulty} />
              </div>
              <h3 className="truncate font-display text-lg font-semibold text-white sm:text-xl">
                {animal.commonName}
              </h3>
              <p className="truncate text-sm italic text-white/70">{animal.scientificName}</p>
            </div>

            <button
              type="button"
              onClick={() => setIsImageModalOpen(false)}
              className="inline-flex shrink-0 items-center gap-2 rounded-[var(--radius-sm)] bg-white px-4 py-2.5 text-sm font-semibold text-[var(--ink)] shadow-lg transition hover:bg-[var(--paper)]"
              aria-label="Close image"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Close</span>
            </button>
          </div>

          <div
            className="flex min-h-0 flex-1 items-center justify-center p-4 sm:p-8"
            onClick={() => setIsImageModalOpen(false)}
          >
            <img
              src={animal.imageUrl}
              alt={animal.imageAlt}
              className="max-h-full max-w-full rounded-lg bg-black/20 object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent && !parent.querySelector('.placeholder-content')) {
                  const placeholder = document.createElement('div');
                  placeholder.className =
                    'placeholder-content rounded-lg bg-[var(--paper)] p-12 text-center';
                  placeholder.innerHTML = `
                    <div class="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-4">${categoryLabels[animal.category]}</div>
                    <div class="text-4xl font-bold text-gray-700 mb-2">${animal.commonName}</div>
                    <div class="text-xl italic text-gray-500">${animal.scientificName}</div>
                  `;
                  parent.appendChild(placeholder);
                }
              }}
            />
          </div>

          <p className="shrink-0 pb-4 text-center text-xs text-white/50">
            Press Esc or click outside the image to close
          </p>
        </div>
      )}
    </>
  );
}
