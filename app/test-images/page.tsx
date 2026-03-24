'use client';

import { ANIMAL_DATABASE } from '@/lib/animals';
import { useState } from 'react';

export default function TestImagesPage() {
  const [imageStatus, setImageStatus] = useState<Record<string, 'loading' | 'success' | 'error'>>({});
  
  const reptiles = ANIMAL_DATABASE.filter(a => a.category === 'reptiles');

  const handleImageLoad = (id: string) => {
    setImageStatus(prev => ({ ...prev, [id]: 'success' }));
  };

  const handleImageError = (id: string) => {
    setImageStatus(prev => ({ ...prev, [id]: 'error' }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Reptile Images Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reptiles.map((animal) => {
            const status = imageStatus[animal.id] || 'loading';
            
            return (
              <div key={animal.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={animal.imageUrl}
                    alt={animal.imageAlt}
                    className="w-full h-full object-cover"
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
                  <h3 className="font-bold text-lg mb-2">{animal.commonName}</h3>
                  <p className="text-sm text-gray-600 italic mb-2">{animal.scientificName}</p>
                  
                  <div className={`inline-block px-3 py-1 rounded text-sm font-semibold ${
                    status === 'success' ? 'bg-green-100 text-green-800' :
                    status === 'error' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {status === 'success' ? '✓ Loaded' :
                     status === 'error' ? '✗ Failed' :
                     '⏳ Loading'}
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-500 break-all">
                    {animal.imageUrl}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Summary</h2>
          <div className="space-y-2">
            <p>Total Reptiles: {reptiles.length}</p>
            <p className="text-green-600">
              Loaded: {Object.values(imageStatus).filter(s => s === 'success').length}
            </p>
            <p className="text-red-600">
              Failed: {Object.values(imageStatus).filter(s => s === 'error').length}
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
