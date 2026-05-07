'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface WheelAnimal {
  id: string;
  commonName: string;
  imageUrl: string;
  imageAlt: string;
  color: string;
}

interface AnimalWheelSpinnerProps {
  animals: WheelAnimal[];
  onSpinComplete?: (animal: WheelAnimal) => void;
}

function getAnimalLabel(animalName: string): string {
  return animalName.length > 12 ? `${animalName.substring(0, 10)}..` : animalName;
}

export function AnimalWheelSpinner({ animals, onSpinComplete }: AnimalWheelSpinnerProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedAnimal, setSelectedAnimal] = useState<WheelAnimal | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const segmentAngle = 360 / animals.length;

  const spinWheel = () => {
    if (isSpinning || animals.length === 0) return;

    setIsSpinning(true);
    setSelectedAnimal(null);

    const spinDuration = 4000 + Math.random() * 2000;
    const extraRotations = 5 + Math.random() * 5;
    const randomAngle = Math.random() * 360;
    const totalRotation = rotation + extraRotations * 360 + randomAngle;

    setRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const normalizedRotation = totalRotation % 360;
      const pointerAngle = (360 - normalizedRotation + 90) % 360;
      const selectedIndex = Math.floor(pointerAngle / segmentAngle) % animals.length;
      const result = animals[selectedIndex];
      setSelectedAnimal(result);
      onSpinComplete?.(result);
    }, spinDuration);
  };

  useEffect(() => {
    if (wheelRef.current) {
      wheelRef.current.style.transition = isSpinning
        ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)'
        : 'none';
      wheelRef.current.style.transform = `rotate(${rotation}deg)`;
    }
  }, [rotation, isSpinning]);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative">
        <div
          ref={wheelRef}
          className="relative h-80 w-80 overflow-hidden rounded-full border-8 border-white shadow-2xl md:h-96 md:w-96"
          style={{
            background: `conic-gradient(${animals
              .map(
                (animal, i) =>
                  `${animal.color} ${i * (100 / animals.length)}% ${(i + 1) * (100 / animals.length)}%`,
              )
              .join(', ')})`,
            transition: 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)',
          }}
        >
          {animals.map((animal, index) => {
            const angle = index * segmentAngle;

            return (
              <div
                key={animal.id}
                className="absolute inset-0"
                style={{
                  clipPath: `polygon(50% 50%, 50% 0%, ${100 - 50 / animals.length}% 0%, ${100 - 50 / animals.length}% 100%, ${50 / animals.length}% 100%, ${50 / animals.length}% 0%)`,
                  transform: `rotate(${angle}deg)`,
                }}
              >
                <div
                  className="absolute flex h-full w-full flex-col items-center justify-start pt-8 md:pt-12"
                  style={{ transform: `rotate(${segmentAngle / 2}deg)` }}
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className="rounded bg-black/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white md:text-xs">
                      Pick
                    </div>
                    <div className="rounded bg-black/20 px-1 text-center text-xs font-bold whitespace-nowrap text-white drop-shadow-lg md:text-sm">
                      {getAnimalLabel(animal.commonName)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-2 transform">
          <div className="h-0 w-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-indigo-600 drop-shadow-lg" />
        </div>

        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg md:h-20 md:w-20">
            Spin
          </div>
        </div>
      </div>

      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className="transform rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-105 hover:from-indigo-700 hover:to-purple-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
      </button>

      {selectedAnimal && (
        <div className="mt-6 w-full max-w-md rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 p-6 shadow-lg">
          <h3 className="mb-4 text-center text-2xl font-bold text-indigo-600">
            You Got: {selectedAnimal.commonName}
          </h3>
          <div className="relative h-48 w-full overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={selectedAnimal.imageUrl}
              alt={selectedAnimal.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 448px"
            />
          </div>
        </div>
      )}
    </div>
  );
}
