'use client';

import { useState } from 'react';
import Image from 'next/image';
import { HybridAnimal } from '@/lib/challenge-manager';
import { DifficultyBadge } from './difficulty-badge';
import { DrawingTips } from './drawing-tips';
import { ShareButtons } from './share-buttons';

interface HybridAnimalCardProps {
  hybrid: HybridAnimal;
}

export function HybridAnimalCard({ hybrid }: HybridAnimalCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageErrors, setImageErrors] = useState<[boolean, boolean]>([false, false]);

  const handleImageError = (index: 0 | 1) => {
    setImageErrors(prev => {
      const newErrors: [boolean, boolean] = [...prev] as [boolean, boolean];
      newErrors[index] = true;
      return newErrors;
    });
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-purple-300 hover:shadow-2xl transition-all duration-300 ${
        isExpanded ? 'ring-4 ring-purple-400' : ''
      }`}
    >
      {/* Hybrid Badge */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧬</span>
          <span className="font-bold text-sm uppercase tracking-wide">Hybrid Animal</span>
        </div>
        <DifficultyBadge difficulty={hybrid.difficulty} />
      </div>

      {/* Side-by-Side Source Images */}
      <div className="grid grid-cols-2 gap-0 border-b-2 border-purple-200">
        {hybrid.imageUrls.map((imageUrl, index) => (
          <div key={index} className="relative aspect-square bg-gray-100">
            {!imageErrors[index] ? (
              <Image
                src={imageUrl}
                alt={`${hybrid.sourceAnimals[index].commonName} - Source ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
                onError={() => handleImageError(index as 0 | 1)}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
                <span className="text-4xl mb-2">🖼️</span>
                <span className="text-xs text-gray-600 text-center font-medium">
                  {hybrid.sourceAnimals[index].commonName}
                </span>
              </div>
            )}
            {/* Source Label */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs py-1 px-2 text-center font-medium">
              {hybrid.sourceAnimals[index].commonName}
            </div>
          </div>
        ))}
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Hybrid Name */}
        <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          {hybrid.commonName}
        </h3>

        {/* Combined Body Parts */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-purple-700 uppercase tracking-wide mb-2">
            Combined Body Parts:
          </h4>
          <div className="flex flex-wrap gap-2">
            {hybrid.combinedBodyParts.map((part, index) => (
              <span
                key={index}
                className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full border border-purple-300 font-medium"
              >
                {part}
              </span>
            ))}
          </div>
        </div>

        {/* Drawing Tips */}
        <DrawingTips tips={hybrid.drawingTips} />

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
          aria-expanded={isExpanded}
        >
          <span>{isExpanded ? 'Show Less' : 'Show Source Details'}</span>
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Expanded Source Details */}
        {isExpanded && (
          <div className="mt-4 space-y-4 animate-fadeIn">
            {hybrid.sourceAnimals.map((animal, index) => (
              <div
                key={animal.id}
                className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-200"
              >
                <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                  <span className="text-lg">Source {index + 1}:</span>
                  <span className="text-purple-700">{animal.commonName}</span>
                </h4>
                <p className="text-sm text-gray-600 italic mb-2">{animal.scientificName}</p>
                <div className="text-sm text-gray-700">
                  <p className="font-semibold mb-1">Body Parts:</p>
                  <p className="text-gray-600">{animal.bodyParts.join(', ')}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Share Buttons */}
        <div className="mt-4 pt-4 border-t border-purple-200">
          <ShareButtons hybrid={hybrid} />
        </div>
      </div>
    </div>
  );
}
