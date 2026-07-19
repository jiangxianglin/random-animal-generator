'use client';

import { useState } from 'react';
import { Animal, CategoryKey, DrawingDifficulty } from '@/lib/animals';
import { AnimalGenerator } from '@/lib/generator';
import { AnimalCard } from '@/components/animal-card';
import { GeneratorControls } from '@/components/generator-controls';

const generator = new AnimalGenerator();

function scrollToResults() {
  if (typeof document === 'undefined') {
    return;
  }

  const resultsSection = document.getElementById('drawing-results');
  if (resultsSection) {
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function DrawingGeneratorTool() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [selectedQuantity, setSelectedQuantity] = useState(3);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DrawingDifficulty | null>('medium');

  const handleReset = () => {
    setSelectedQuantity(3);
    setSelectedCategory(null);
    setSelectedDifficulty('medium');
    setAnimals([]);
  };

  const handleGenerate = () => {
    try {
      const generated = generator.generate(selectedQuantity, selectedCategory, selectedDifficulty);
      setAnimals(generated);
      setTimeout(scrollToResults, 0);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <>
      <section className="mx-auto mb-10 w-full max-w-3xl">
        <GeneratorControls
          quantity={selectedQuantity}
          category={selectedCategory}
          difficulty={selectedDifficulty}
          onQuantityChange={setSelectedQuantity}
          onCategoryChange={setSelectedCategory}
          onDifficultyChange={setSelectedDifficulty}
          onGenerate={handleGenerate}
          onReset={handleReset}
        />
      </section>

      <section id="drawing-results" className="mb-12 scroll-mt-12">
        {animals.length > 0 ? (
          <>
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">Drawing Prompts</h2>
              <p className="mt-2 text-sm text-gray-600 md:text-base">
                Click a card to view details, then draw the animal using the reference image and tips.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {animals.map((animal) => (
                <AnimalCard key={animal.id} animal={animal} />
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-emerald-200 bg-white/80 p-8 text-center text-gray-600 shadow-sm">
            <p className="text-lg font-medium text-gray-800">No drawing prompts yet.</p>
            <p className="mt-2 text-sm">Pick filters and generate a set of random animals to draw.</p>
          </div>
        )}
      </section>
    </>
  );
}
