// Animal data types and database
import animalsData from './animals-data.json';

export type DrawingDifficulty = 'easy' | 'medium' | 'hard';

export interface Animal {
  id: string;
  commonName: string;
  scientificName: string;
  category: 'mammals' | 'birds' | 'reptiles' | 'marine' | 'insects';
  facts: string[];
  imageUrl: string;
  imageAlt: string;
  // Drawing-specific metadata
  drawingDifficulty: DrawingDifficulty;
  drawingTips: string[]; // 2-3 actionable tips (10-15 words each)
  bodyParts: string[]; // 3-5 distinctive body parts for hybrid mode
}

// Import animal database from JSON file
export const ANIMAL_DATABASE: Animal[] = animalsData as Animal[];

// Category definitions
export const CATEGORIES = {
  mammals: 'Mammals',
  birds: 'Birds',
  reptiles: 'Reptiles',
  marine: 'Marine Animals',
  insects: 'Insects'
} as const;

export type CategoryKey = keyof typeof CATEGORIES;

// Get count of animals per category
export function getCategoryCounts() {
  const counts: Record<CategoryKey, number> = {
    mammals: 0,
    birds: 0,
    reptiles: 0,
    marine: 0,
    insects: 0
  };
  
  ANIMAL_DATABASE.forEach(animal => {
    counts[animal.category]++;
  });
  
  return counts;
}

// Get count of animals per difficulty level
export function getDifficultyCounts() {
  const counts: Record<DrawingDifficulty, number> = {
    easy: 0,
    medium: 0,
    hard: 0
  };
  
  ANIMAL_DATABASE.forEach(animal => {
    if (animal.drawingDifficulty) {
      counts[animal.drawingDifficulty]++;
    }
  });
  
  return counts;
}
