import { Animal, ANIMAL_DATABASE } from './animals';

/** Curated cute-leaning pool from the local database (mammals/birds + a few gentle marine/easy). */
export const CUTE_ANIMAL_IDS = [
  'mammal_002', // Red Panda
  'mammal_004', // Giant Panda
  'mammal_010', // Koala
  'mammal_013', // Sloth
  'mammal_018', // Meerkat
  'mammal_020', // Raccoon
  'mammal_023', // Otter
  'mammal_027', // Hedgehog
  'mammal_028', // Capybara
  'mammal_029', // Red Fox
  'mammal_031', // Gray Squirrel
  'bird_002', // Penguin
  'bird_003', // Hummingbird
  'bird_004', // Owl
  'bird_006', // Flamingo
  'bird_008', // Toucan
  'bird_016', // Kiwi
  'bird_017', // Puffin
  'bird_019', // Northern Cardinal
  'marine_008', // Clownfish
  'marine_010', // Starfish
  'insect_003', // Ladybug
  'insect_007', // Firefly
] as const;

const CUTE_NAME_FALLBACK = new Set([
  'red panda',
  'giant panda',
  'koala',
  'sloth',
  'meerkat',
  'raccoon',
  'otter',
  'hedgehog',
  'capybara',
  'red fox',
  'gray squirrel',
  'penguin',
  'hummingbird',
  'owl',
  'flamingo',
  'toucan',
  'kiwi',
  'puffin',
  'northern cardinal',
  'clownfish',
  'starfish',
  'ladybug',
  'firefly',
  'pufferfish',
]);

export const CUTE_ACTIONS = [
  'napping in a sunbeam',
  'sharing a snack',
  'chasing a leaf',
  'building a tiny nest',
  'splashing in a puddle',
  'peeking from behind a tree',
  'carrying a flower',
  'rolling in soft moss',
  'waving hello',
  'repairing a tiny boat',
] as const;

export const CUTE_EMOTIONS = [
  'curious',
  'sleepy',
  'joyful',
  'shy',
  'playful',
  'brave',
  'gentle',
  'surprised',
  'cozy',
  'mischievous',
] as const;

export const CUTE_LOCATIONS = [
  'in a mossy forest clearing',
  'on a rainy windowsill',
  'beside a flower market stall',
  'in an old castle courtyard',
  'on a sunny picnic blanket',
  'inside a cozy reading nook',
  'along a misty riverbank',
  'under paper lanterns at dusk',
  'in a classroom art corner',
  'on a snowy village rooftop',
] as const;

export type CutePromptOptions = {
  includeAction: boolean;
  includeEmotion: boolean;
  includeLocation: boolean;
};

export type CutePromptResult = {
  animal: Animal;
  action: string | null;
  emotion: string | null;
  location: string | null;
  prompt: string;
  simpleLine: string;
  complexLine: string;
};

function pickRandom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function getCuteAnimals(): Animal[] {
  const byId = new Map(ANIMAL_DATABASE.map((animal) => [animal.id, animal]));
  const fromIds = CUTE_ANIMAL_IDS.map((id) => byId.get(id)).filter(Boolean) as Animal[];
  const fromNames = ANIMAL_DATABASE.filter((animal) =>
    CUTE_NAME_FALLBACK.has(animal.commonName.toLowerCase()),
  );
  const merged = new Map<string, Animal>();
  [...fromIds, ...fromNames].forEach((animal) => merged.set(animal.id, animal));

  if (merged.size >= 12) {
    return Array.from(merged.values());
  }

  // Fallback: easy mammals/birds keep the page usable if IDs drift
  return ANIMAL_DATABASE.filter(
    (animal) =>
      animal.drawingDifficulty === 'easy' &&
      (animal.category === 'mammals' || animal.category === 'birds'),
  );
}

export function buildCutePrompt(
  animal: Animal,
  options: CutePromptOptions,
  parts?: { action?: string; emotion?: string; location?: string },
): CutePromptResult {
  const action = options.includeAction ? parts?.action ?? pickRandom(CUTE_ACTIONS) : null;
  const emotion = options.includeEmotion ? parts?.emotion ?? pickRandom(CUTE_EMOTIONS) : null;
  const location = options.includeLocation ? parts?.location ?? pickRandom(CUTE_LOCATIONS) : null;

  const segments: string[] = [animal.commonName];
  if (emotion) segments.push(`looking ${emotion}`);
  if (action) segments.push(action);
  if (location) segments.push(location);

  const prompt = segments.join(', ');
  const simpleLine = animal.commonName;
  const complexLine = [animal.commonName, action, emotion, location].filter(Boolean).join(' | ');

  return {
    animal,
    action,
    emotion,
    location,
    prompt,
    simpleLine,
    complexLine,
  };
}

export function generateCutePrompt(options: CutePromptOptions): CutePromptResult {
  const pool = getCuteAnimals();
  const animal = pickRandom(pool);
  return buildCutePrompt(animal, options);
}

/** Deterministic daily cute animal for SSR-visible content. */
export function getDailyCuteAnimal(date = new Date()): Animal {
  const pool = getCuteAnimals();
  const dayKey = date.toISOString().slice(0, 10);
  let hash = 0;
  for (let i = 0; i < dayKey.length; i++) {
    hash = (hash * 31 + dayKey.charCodeAt(i)) >>> 0;
  }
  return pool[hash % pool.length];
}
