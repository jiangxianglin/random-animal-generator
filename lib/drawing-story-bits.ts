import type { Animal } from './animals';

/** Studio-oriented story beats for drawing prompts (distinct from cute storybook tone). */
export const DRAWING_ACTIONS = [
  'mid-stride with weight shifting forward',
  'turning to look over its shoulder',
  'crouching low before a leap',
  'stretching after rest',
  'drinking from a shallow pool',
  'grooming fur or feathers',
  'calling with an open mouth',
  'climbing along a rough branch',
  'landing after a short hop',
  'bracing against a sudden gust',
] as const;

export const DRAWING_EMOTIONS = [
  'alert',
  'tense',
  'curious',
  'calm',
  'wary',
  'focused',
  'exhausted',
  'playful',
  'defiant',
  'serene',
] as const;

export const DRAWING_LOCATIONS = [
  'in a misty forest clearing',
  'on sunlit rocky outcrops',
  'beside a reflective tide pool',
  'under a stormy sky',
  'inside a dim studio spotlight',
  'along a windy cliff edge',
  'in tall dry grass at golden hour',
  'against a simple charcoal backdrop',
  'near a quiet classroom window',
  'on a snowy ridge line',
] as const;

export type DrawingStoryOptions = {
  includeAction: boolean;
  includeEmotion: boolean;
  includeLocation: boolean;
};

export type DrawingPromptBrief = {
  animal: Animal;
  action: string | null;
  emotion: string | null;
  location: string | null;
  simpleLine: string;
  complexLine: string;
  narrativeLine: string;
  hasStoryBits: boolean;
};

function pickRandom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function buildDrawingPromptBrief(
  animal: Animal,
  options: DrawingStoryOptions,
  parts?: { action?: string; emotion?: string; location?: string },
): DrawingPromptBrief {
  const action = options.includeAction ? parts?.action ?? pickRandom(DRAWING_ACTIONS) : null;
  const emotion = options.includeEmotion ? parts?.emotion ?? pickRandom(DRAWING_EMOTIONS) : null;
  const location = options.includeLocation ? parts?.location ?? pickRandom(DRAWING_LOCATIONS) : null;

  const simpleLine = `${animal.commonName} (${animal.drawingDifficulty})`;
  const complexLine = [animal.commonName, action, emotion, location].filter(Boolean).join(' | ');

  const segments: string[] = [`Draw a ${animal.commonName}`];
  if (emotion) segments.push(`feeling ${emotion}`);
  if (action) segments.push(action);
  if (location) segments.push(location);

  return {
    animal,
    action,
    emotion,
    location,
    simpleLine,
    complexLine,
    narrativeLine: segments.join(', '),
    hasStoryBits: Boolean(action || emotion || location),
  };
}

export function buildDrawingPromptBriefs(
  animals: Animal[],
  options: DrawingStoryOptions,
): DrawingPromptBrief[] {
  return animals.map((animal) => buildDrawingPromptBrief(animal, options));
}
