'use client';

import { Animal } from '@/lib/animals';
import { useState } from 'react';
import { DifficultyBadge } from './difficulty-badge';
import { DrawingTips } from './drawing-tips';

interface AnimalCardProps {
  animal: Animal;
}

const categoryColors = {
  mammals: 'from-amber-500 to-orange-600',
  birds: 'from-sky-500 to-blue-600',
  reptiles: 'from-emerald-500 to-green-600',
  marine: 'from-cyan-500 to-teal-600',
  insects: 'from-purple-500 to-pink-600',
};

const categoryEmojis = {
  mammals: '🦁',
  birds: '🦅',
  reptiles: '🦎',
  marine: '🐋',
  insects: '🦋',
};

export function AnimalCard({ animal }: AnimalCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  
  return (
    <>
    <div 
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100"
    >
      {/* Image Container with Overlay */}
      <div 
        className="relative w-full h-56 bg-gradient-to-br from-stone-100 via-amber-50 to-emerald-50 overflow-hidden flex items-center justify-center cursor-pointer"
        onClick={() => setIsImageModalOpen(true)}
      >
        <img
          src={animal.imageUrl}
          alt={animal.imageAlt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            // Hide the broken image and show styled placeholder
            e.currentTarget.style.display = 'none';
            const parent = e.currentTarget.parentElement;
            if (parent && !parent.querySelector('.placeholder-content')) {
              const placeholder = document.createElement('div');
              placeholder.className = 'placeholder-content absolute inset-0 flex flex-col items-center justify-center p-6 text-center';
              placeholder.innerHTML = `
                <div class="text-6xl mb-4">${categoryEmojis[animal.category]}</div>
                <div class="text-2xl font-bold text-gray-700">${animal.commonName}</div>
                <div class="text-sm text-gray-500 italic mt-2">${animal.scientificName}</div>
              `;
              parent.appendChild(placeholder);
            }
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r ${categoryColors[animal.category]} text-white text-xs sm:text-sm font-semibold rounded-full shadow-lg backdrop-blur-sm`}>
            <span>{categoryEmojis[animal.category]}</span>
            <span className="capitalize hidden sm:inline">{animal.category}</span>
          </span>
        </div>
        
        {/* Difficulty Badge */}
        <div className="absolute top-4 left-4 z-10">
          <DifficultyBadge difficulty={animal.drawingDifficulty} />
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
            {animal.commonName}
          </h3>
          
          <p className="text-sm italic text-gray-500 font-medium">
            {animal.scientificName}
          </p>
        </div>
        
        {/* Drawing Tips Section */}
        {animal.drawingTips && animal.drawingTips.length > 0 && (
          <DrawingTips tips={animal.drawingTips} className="mb-4" />
        )}
        
        {/* Facts */}
        <div className={`space-y-3 transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-32 overflow-hidden'}`}>
          {animal.facts.map((fact, index) => (
            <div key={index} className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center mt-0.5">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed flex-1">
                {fact}
              </p>
            </div>
          ))}
        </div>
        
        {/* Expand Button */}
        {animal.facts.length > 2 && (
          <button 
            className="mt-4 text-sm font-semibold text-emerald-600 hover:text-emerald-800 transition-colors flex items-center gap-1 min-h-[44px] py-2"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? (
              <>
                <span>Show Less</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </>
            ) : (
              <>
                <span>Read More</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </button>
        )}
      </div>
    </div>

    {/* Image Modal for enlarged view */}
    {isImageModalOpen && (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm transition-opacity duration-200"
        onClick={() => setIsImageModalOpen(false)}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsImageModalOpen(false)}
          className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110"
          aria-label="Close"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Animal Info Badge */}
        <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl max-w-sm">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <span className={`inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r ${categoryColors[animal.category]} text-white text-sm font-semibold rounded-full`}>
              <span>{categoryEmojis[animal.category]}</span>
              <span className="capitalize">{animal.category}</span>
            </span>
            <DifficultyBadge difficulty={animal.drawingDifficulty} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">{animal.commonName}</h3>
          <p className="text-sm italic text-gray-600">{animal.scientificName}</p>
        </div>

        {/* Large Image */}
        <div 
          className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={animal.imageUrl}
            alt={animal.imageAlt}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent && !parent.querySelector('.placeholder-content')) {
                const placeholder = document.createElement('div');
                placeholder.className = 'placeholder-content bg-gradient-to-br from-stone-100 via-amber-50 to-emerald-50 rounded-lg p-12 flex flex-col items-center justify-center text-center';
                placeholder.innerHTML = `
                  <div class="text-9xl mb-6">${categoryEmojis[animal.category]}</div>
                  <div class="text-4xl font-bold text-gray-700 mb-2">${animal.commonName}</div>
                  <div class="text-xl text-gray-500 italic">${animal.scientificName}</div>
                `;
                parent.appendChild(placeholder);
              }
            }}
          />
        </div>
      </div>
    )}
    </>
  );
}
