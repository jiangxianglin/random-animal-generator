'use client';

import { useState } from 'react';
import { ANIMAL_DATABASE } from '@/lib/animals';

export default function TestImagesPage() {
  const [imageStatus, setImageStatus] = useState<Record<string, 'loading' | 'success' | 'error'>>({});

  const reptiles = ANIMAL_DATABASE.filter((animal) => animal.category === 'reptiles');

  const handleImageLoad = (id: string) => {
    setImageStatus((prev) => ({ ...prev, [id]: 'success' }));
  };

  const handleImageError = (id: string) => {
    setImageStatus((prev) => ({ ...prev, [id]: 'error' }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold">Reptile Images Test</h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reptiles.map((animal) => {
            const status = imageStatus[animal.id] || 'loading';

            return (
              <div key={animal.id} className="overflow-hidden rounded-lg bg-white shadow-md">
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={animal.imageUrl}
                    alt={animal.imageAlt}
                    className="h-full w-full object-cover"
                    onLoad={() => handleImageLoad(animal.id)}
                    onError={() => handleImageError(animal.id)}
                  />
                  {status === 'loading' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                      <div className="text-gray-500">Loading...</div>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h2 className="mb-2 text-lg font-bold">{animal.commonName}</h2>
                  <p className="mb-2 text-sm italic text-gray-600">{animal.scientificName}</p>

                  <div
                    className={`inline-block rounded px-3 py-1 text-sm font-semibold ${
                      status === 'success'
                        ? 'bg-green-100 text-green-800'
                        : status === 'error'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {status === 'success' ? 'Loaded' : status === 'error' ? 'Failed' : 'Loading'}
                  </div>

                  <div className="mt-2 break-all text-xs text-gray-500">
                    {animal.imageUrl}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-bold">Summary</h2>
          <div className="space-y-2">
            <p>Total Reptiles: {reptiles.length}</p>
            <p className="text-green-600">
              Loaded: {Object.values(imageStatus).filter((status) => status === 'success').length}
            </p>
            <p className="text-red-600">
              Failed: {Object.values(imageStatus).filter((status) => status === 'error').length}
            </p>
            <p className="text-yellow-600">
              Loading: {reptiles.length - Object.keys(imageStatus).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
