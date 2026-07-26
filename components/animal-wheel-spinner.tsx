'use client';

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
  return animalName.length > 11 ? `${animalName.substring(0, 9)}…` : animalName;
}

export function AnimalWheelSpinner({ animals, onSpinComplete }: AnimalWheelSpinnerProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedAnimal, setSelectedAnimal] = useState<WheelAnimal | null>(null);
  const [spinDurationMs, setSpinDurationMs] = useState(4500);
  const wheelRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const segmentAngle = animals.length > 0 ? 360 / animals.length : 360;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const spinWheel = () => {
    if (isSpinning || animals.length === 0) return;

    setIsSpinning(true);
    setSelectedAnimal(null);

    const duration = 4000 + Math.random() * 2000;
    const extraRotations = 5 + Math.random() * 5;
    const randomAngle = Math.random() * 360;
    const totalRotation = rotation + extraRotations * 360 + randomAngle;

    setSpinDurationMs(duration);
    setRotation(totalRotation);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsSpinning(false);
      const normalizedRotation = totalRotation % 360;
      const pointerAngle = (360 - normalizedRotation + 90) % 360;
      const selectedIndex = Math.floor(pointerAngle / segmentAngle) % animals.length;
      const result = animals[selectedIndex];
      setSelectedAnimal(result);
      onSpinComplete?.(result);
    }, duration);
  };

  useEffect(() => {
    if (!wheelRef.current) return;
    wheelRef.current.style.transition = isSpinning
      ? `transform ${spinDurationMs}ms cubic-bezier(0.17, 0.67, 0.12, 0.99)`
      : 'none';
    wheelRef.current.style.transform = `rotate(${rotation}deg)`;
  }, [rotation, isSpinning, spinDurationMs]);

  if (animals.length === 0) {
    return (
      <div className="flex min-h-[20rem] w-full flex-col items-center justify-center px-4 text-center">
        <p className="font-display text-xl font-semibold text-[var(--ink)]">Preparing the wheel…</p>
        <p className="mt-2 max-w-sm text-sm text-[var(--ink-muted)]">
          Shuffle a category to load twelve animals onto the spinner.
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-7">
      <div className="relative">
        <div
          className="absolute -inset-3 rounded-full border border-[var(--line)] bg-[var(--paper-deep)]/70"
          aria-hidden="true"
        />
        <div
          ref={wheelRef}
          className="wheel-ring relative h-72 w-72 overflow-hidden rounded-full border-[10px] border-[var(--surface-elevated)] md:h-96 md:w-96"
          style={{
            background: `conic-gradient(${animals
              .map(
                (animal, i) =>
                  `${animal.color} ${i * (100 / animals.length)}% ${(i + 1) * (100 / animals.length)}%`,
              )
              .join(', ')})`,
          }}
        >
          {animals.map((animal, index) => {
            const angle = index * segmentAngle;
            return (
              <div
                key={`${animal.id}-${index}`}
                className="absolute inset-0"
                style={{
                  clipPath: `polygon(50% 50%, 50% 0%, ${100 - 50 / animals.length}% 0%, ${100 - 50 / animals.length}% 100%, ${50 / animals.length}% 100%, ${50 / animals.length}% 0%)`,
                  transform: `rotate(${angle}deg)`,
                }}
              >
                <div
                  className="absolute flex h-full w-full flex-col items-center justify-start pt-7 md:pt-10"
                  style={{ transform: `rotate(${segmentAngle / 2}deg)` }}
                >
                  <span className="max-w-[4.5rem] text-center text-[11px] font-semibold leading-tight text-[var(--paper)] drop-shadow-[0_1px_2px_rgba(28,26,23,0.55)] md:max-w-[5.5rem] md:text-sm">
                    {getAnimalLabel(animal.commonName)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1"
          aria-hidden="true"
        >
          <div className="h-0 w-0 border-l-[9px] border-r-[9px] border-t-[14px] border-l-transparent border-r-transparent border-t-[var(--ink)]" />
        </div>

        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-[var(--surface-elevated)] bg-[var(--ink)] text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--paper)] md:h-[4.5rem] md:w-[4.5rem] md:text-xs">
            Spin
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={spinWheel}
        disabled={isSpinning}
        className="btn-ink px-8 py-4 text-lg disabled:cursor-not-allowed disabled:opacity-50"
        aria-busy={isSpinning}
      >
        {isSpinning ? 'Spinning…' : 'Spin the Wheel'}
      </button>

      {selectedAnimal && (
        <div className="w-full max-w-md border-t border-[var(--line)] pt-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">
            Pointer landed on
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-[var(--ink)]">
            {selectedAnimal.commonName}
          </h3>
          <p className="mt-2 text-sm text-[var(--ink-muted)]">
            Full photo and details are below—tap the image to view large.
          </p>
        </div>
      )}
    </div>
  );
}
