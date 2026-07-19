'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { AnimalWheelSpinner } from '@/components/animal-wheel-spinner';
import { ANIMAL_DATABASE, Animal } from '@/lib/animals';

const WHEEL_COLORS = [
  '#6366F1',
  '#8B5CF6',
  '#EC4899',
  '#F59E0B',
  '#10B981',
  '#3B82F6',
  '#EF4444',
  '#14B8A6',
  '#F97316',
  '#84CC16',
];

interface WheelAnimal {
  id: string;
  commonName: string;
  imageUrl: string;
  imageAlt: string;
  color: string;
}

export function AnimalWheelTool() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

  const categories = [
    { value: 'all', label: 'All Animals', count: ANIMAL_DATABASE.length },
    {
      value: 'mammals',
      label: 'Mammals',
      count: ANIMAL_DATABASE.filter((a) => a.category === 'mammals').length,
    },
    {
      value: 'birds',
      label: 'Birds',
      count: ANIMAL_DATABASE.filter((a) => a.category === 'birds').length,
    },
    {
      value: 'reptiles',
      label: 'Reptiles',
      count: ANIMAL_DATABASE.filter((a) => a.category === 'reptiles').length,
    },
    {
      value: 'marine',
      label: 'Marine',
      count: ANIMAL_DATABASE.filter((a) => a.category === 'marine').length,
    },
    {
      value: 'insects',
      label: 'Insects',
      count: ANIMAL_DATABASE.filter((a) => a.category === 'insects').length,
    },
  ];

  const wheelAnimals = useMemo(() => {
    const filtered =
      selectedCategory === 'all'
        ? ANIMAL_DATABASE
        : ANIMAL_DATABASE.filter((a) => a.category === selectedCategory);

    return filtered.slice(0, 12).map(
      (animal, index): WheelAnimal => ({
        id: animal.id,
        commonName: animal.commonName,
        imageUrl: animal.imageUrl,
        imageAlt: animal.imageAlt,
        color: WHEEL_COLORS[index % WHEEL_COLORS.length],
      }),
    );
  }, [selectedCategory]);

  const handleSpinComplete = (animal: WheelAnimal) => {
    const fullAnimal = ANIMAL_DATABASE.find((entry) => entry.id === animal.id);
    setSelectedAnimal(fullAnimal || null);
  };

  return (
    <>
      <section className="mb-6">
        <div className="flex flex-col items-stretch gap-4 lg:flex-row">
          <div className="w-full lg:w-3/5">
            <AnimalWheelSpinner animals={wheelAnimals} onSpinComplete={handleSpinComplete} />
          </div>

          <div className="w-full lg:w-2/5">
            <div className="h-full rounded-2xl bg-white p-4 shadow-lg">
              <h2 className="mb-3 text-lg font-bold text-gray-900">Choose Your Category</h2>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`rounded-lg p-3 text-left text-sm transition-all ${
                      selectedCategory === cat.value
                        ? 'bg-indigo-600 text-white shadow-lg'
                        : 'bg-gray-50 text-gray-700 hover:bg-indigo-50'
                    }`}
                  >
                    <div className="font-semibold">{cat.label}</div>
                    <div
                      className={`text-xs ${
                        selectedCategory === cat.value ? 'text-indigo-200' : 'text-gray-500'
                      }`}
                    >
                      {cat.count} animals
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-4 rounded-lg bg-indigo-50 p-3">
                <p className="text-xs text-indigo-800">
                  <strong>Tip:</strong> The wheel shows up to 12 animals. Select a category to focus
                  the results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedAnimal && (
        <section className="mb-6">
          <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="relative h-64 overflow-hidden rounded-xl bg-gray-100 md:w-1/2">
                <Image
                  src={selectedAnimal.imageUrl}
                  alt={selectedAnimal.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="mb-1 text-2xl font-bold text-gray-900">
                  {selectedAnimal.commonName}
                </h2>
                <p className="mb-3 text-base italic text-indigo-600">
                  {selectedAnimal.scientificName}
                </p>
                <div className="mb-4 space-y-2">
                  {selectedAnimal.facts.slice(0, 2).map((fact, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-xl" aria-hidden="true">
                        *
                      </span>
                      <p className="text-sm text-gray-700">{fact}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
                    {selectedAnimal.category.charAt(0).toUpperCase() +
                      selectedAnimal.category.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export function ScrollToWheelButton() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="transform rounded-full bg-white px-8 py-4 text-lg font-bold text-indigo-600 shadow-lg transition-all hover:scale-105 hover:bg-indigo-50"
    >
      Back to the Wheel
    </button>
  );
}
