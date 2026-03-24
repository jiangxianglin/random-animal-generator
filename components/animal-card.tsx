'use client';

import { Animal } from '@/lib/animals';
import { useState } from 'react';

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
  
  return (
    <div 
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer border border-gray-100"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Image Container with Overlay */}
      <div className="relative w-full h-56 bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 overflow-hidden flex items-center justify-center">
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
        <div className="absolute top-4 right-4">
          <span className={`inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r ${categoryColors[animal.category]} text-white text-sm font-semibold rounded-full shadow-lg backdrop-blur-sm`}>
            <span>{categoryEmojis[animal.category]}</span>
            <span className="capitalize">{animal.category}</span>
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
            {animal.commonName}
          </h3>
          
          <p className="text-sm italic text-gray-500 font-medium">
            {animal.scientificName}
          </p>
        </div>
        
        {/* Facts */}
        <div className={`space-y-3 transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-32 overflow-hidden'}`}>
          {animal.facts.map((fact, index) => (
            <div key={index} className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mt-0.5">
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
            className="mt-4 text-sm font-semibold text-purple-600 hover:text-purple-800 transition-colors flex items-center gap-1"
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
  );
}
