'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';

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

const ANIMAL_EMOJI_MAP: Record<string, string> = {
  'elephant': '🐘',
  'panda': '🐼',
  'tiger': '🐯',
  'lion': '🦁',
  'bear': '🐻',
  'fox': '🦊',
  'rabbit': '🐰',
  'dog': '🐕',
  'cat': '🐱',
  'horse': '🐴',
  'deer': '🦌',
  'wolf': '🐺',
  'monkey': '🐵',
  'giraffe': '🦒',
  'zebra': '🦓',
  'koala': '🐨',
  'kangaroo': '🦘',
  'penguin': '🐧',
  'owl': '🦉',
  'eagle': '🦅',
  'parrot': '🦜',
  'flamingo': '🦢',
  'peacock': '🦚',
  'dolphin': '🐬',
  'whale': '🐋',
  'shark': '🦈',
  'octopus': '🐙',
  'crab': '🦀',
  'fish': '🐟',
  'turtle': '🐢',
  'snake': '🐍',
  'crocodile': '🐊',
  'lizard': '🦎',
  'frog': '🐸',
  'butterfly': '🦋',
  'bee': '🐝',
  'ladybug': '🐞',
  'ant': '🐜',
  'dragonfly': '🪰',
  'hedgehog': '🦔',
  'raccoon': '🦝',
  'skunk': '🦨',
  'beaver': '🦫',
  'squirrel': '🐿️',
  'chipmunk': '🐿️',
  'bat': '🦇',
  'pig': '🐷',
  'cow': '🐮',
  'sheep': '🐑',
  'goat': '🐐',
  'chicken': '🐔',
  'duck': '🦆',
  'rooster': '🐓',
  'turkey': '🦃',
  'seahorse': '🦭',
  'seal': '🦭',
  'otter': '🦦',
  'walrus': '🦭',
  'jellyfish': '🪼',
  'starfish': '⭐',
  'lobster': '🦞',
  'shrimp': '🦐',
  'squid': '🦑',
  'snail': '🐌',
  'spider': '🕷️',
  'scorpion': '🦂',
  'tortoise': '🐢',
  'iguana': '🦎',
  'chameleon': '🦎',
  'gecko': '🦎',
  'panda': '🐼',
  'red panda': '🐼',
  'red': '🐼',
  'panda': '🐼',
  'panda': '🐼',
  'panda': '🐼',
};

function getAnimalEmoji(animalName: string): string {
  const nameLower = animalName.toLowerCase();
  
  for (const [key, emoji] of Object.entries(ANIMAL_EMOJI_MAP)) {
    if (nameLower.includes(key)) {
      return emoji;
    }
  }
  
  if (nameLower.includes('bird') || nameLower.includes('eagle') || 
      nameLower.includes('owl') || nameLower.includes('parrot') ||
      nameLower.includes('flamingo') || nameLower.includes('peacock')) {
    return '🦅';
  }
  if (nameLower.includes('fish') || nameLower.includes('shark') || 
      nameLower.includes('whale') || nameLower.includes('dolphin')) {
    return '🐟';
  }
  if (nameLower.includes('reptile') || nameLower.includes('crocodile') || 
      nameLower.includes('alligator')) {
    return '🦎';
  }
  if (nameLower.includes('snake') || nameLower.includes('serpent')) {
    return '🐍';
  }
  if (nameLower.includes('turtle') || nameLower.includes('tortoise')) {
    return '🐢';
  }
  if (nameLower.includes('insect') || nameLower.includes('bee') || 
      nameLower.includes('butterfly') || nameLower.includes('ant')) {
    return '🦋';
  }
  if (nameLower.includes('spider')) {
    return '🕷️';
  }
  if (nameLower.includes('marine') || nameLower.includes('ocean')) {
    return '🐠';
  }
  if (nameLower.includes('mammal') || nameLower.includes('land')) {
    return '🦁';
  }
  
  return '🐾';
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
          className="relative w-80 h-80 md:w-96 md:h-96 rounded-full shadow-2xl border-8 border-white overflow-hidden"
          style={{ 
            background: `conic-gradient(${animals.map((a, i) => 
              `${a.color} ${(i * 100 / animals.length)}% ${((i + 1) * 100 / animals.length)}%`
            ).join(', ')})`,
            transition: 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)'
          }}
        >
          {animals.map((animal, index) => {
            const angle = index * segmentAngle;
            const emoji = getAnimalEmoji(animal.commonName);
            const textAngle = angle + segmentAngle / 2 - 90;
            
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
                  className="absolute w-full h-full flex flex-col items-center justify-start pt-8 md:pt-12"
                  style={{ 
                    transform: `rotate(${segmentAngle / 2}deg)`
                  }}
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className="text-3xl md:text-4xl md:text-5xl drop-shadow-lg">
                      {emoji}
                    </div>
                    <div className="text-white font-bold text-xs md:text-sm whitespace-nowrap drop-shadow-lg text-center px-1 bg-black/20 rounded">
                      {animal.commonName.length > 12 
                        ? animal.commonName.substring(0, 10) + '..' 
                        : animal.commonName}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
          <div className="w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-indigo-600 drop-shadow-lg" />
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-lg flex items-center justify-center border-4 border-white">
            <span className="text-2xl md:text-3xl">🎯</span>
          </div>
        </div>
      </div>

      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg rounded-full shadow-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
      >
        {isSpinning ? '🎰 Spinning...' : '🎲 SPIN THE WHEEL'}
      </button>

      {selectedAnimal && (
        <div className="mt-6 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-lg animate-fadeIn max-w-md w-full">
          <h3 className="text-2xl font-bold text-center text-indigo-600 mb-4">
            🎉 You Got: {selectedAnimal.commonName}!
          </h3>
          <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
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
