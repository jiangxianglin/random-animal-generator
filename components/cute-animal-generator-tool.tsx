'use client';

import { useMemo, useState } from 'react';
import {
  buildCutePrompt,
  CUTE_ACTIONS,
  CUTE_EMOTIONS,
  CUTE_LOCATIONS,
  generateCutePrompt,
  getCuteAnimals,
  type CutePromptResult,
} from '@/lib/cute-prompts';
import { ShareManager } from '@/lib/share-manager';

const shareManager = new ShareManager();

const EXAMPLE_SIMPLE = [
  'Red Panda',
  'Koala',
  'Otter',
  'Puffin',
  'Hedgehog',
] as const;

const EXAMPLE_COMPLEX = [
  'red panda | sharing a snack | curious | in a mossy forest clearing',
  'koala | napping in a sunbeam | sleepy | on a rainy windowsill',
  'otter | splashing in a puddle | playful | along a misty riverbank',
  'puffin | carrying a flower | joyful | beside a flower market stall',
  'hedgehog | peeking from behind a tree | shy | under paper lanterns at dusk',
] as const;

type CuteAnimalGeneratorToolProps = {
  initialResult: CutePromptResult;
};

export function CuteAnimalGeneratorTool({ initialResult }: CuteAnimalGeneratorToolProps) {
  const [includeAction, setIncludeAction] = useState(false);
  const [includeEmotion, setIncludeEmotion] = useState(false);
  const [includeLocation, setIncludeLocation] = useState(false);
  const [showStoryOptions, setShowStoryOptions] = useState(false);
  const [result, setResult] = useState<CutePromptResult>(initialResult);
  const [copied, setCopied] = useState(false);
  const [spinKey, setSpinKey] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const poolCount = useMemo(() => getCuteAnimals().length, []);
  const hasStoryBits = Boolean(result.action || result.emotion || result.location);

  const handleGenerate = () => {
    setIsGenerating(true);
    const next = generateCutePrompt({
      includeAction,
      includeEmotion,
      includeLocation,
    });
    setResult(next);
    setCopied(false);
    setSpinKey((key) => key + 1);

    window.setTimeout(() => setIsGenerating(false), 280);

    if (typeof document !== 'undefined') {
      document.getElementById('cute-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCopy = async () => {
    const text = hasStoryBits
      ? [
          'Cute animal generator',
          result.prompt,
          '',
          `Animal: ${result.simpleLine}`,
          `Prompt: ${result.complexLine}`,
        ].join('\n')
      : result.animal.commonName;

    const ok = await shareManager.copyToClipboard(text);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Cute Animal Generator',
          text: result.prompt,
          url,
        });
        return;
      } catch {
        // Fall through to Twitter intent when the user cancels or share fails.
      }
    }
    shareManager.shareToTwitter(result.animal);
  };

  const remixSameAnimal = () => {
    if (!includeAction && !includeEmotion && !includeLocation) {
      setShowStoryOptions(true);
      setIncludeAction(true);
      setIncludeEmotion(true);
      setIncludeLocation(true);
      setResult(
        buildCutePrompt(result.animal, {
          includeAction: true,
          includeEmotion: true,
          includeLocation: true,
        }),
      );
      setSpinKey((key) => key + 1);
      return;
    }

    setResult(
      buildCutePrompt(result.animal, {
        includeAction,
        includeEmotion,
        includeLocation,
      }),
    );
    setSpinKey((key) => key + 1);
  };

  return (
    <section id="cute-generator" className="scroll-mt-24">
      <div className="rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow-soft)] md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[var(--olive)]">Cute animal generator</p>
            <h2 className="mt-1 font-display text-2xl font-semibold text-[var(--ink)] md:text-3xl">
              Meet a cute animal
            </h2>
            <p className="mt-2 max-w-2xl text-[var(--ink-muted)]">
              Tap generate for a friendly pick from {poolCount} curated cuties. Want a drawing or
              story spark? Open the optional story toggles below.
            </p>
          </div>
          <p className="text-sm text-[var(--ink-faint)]">{poolCount} cute picks</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleGenerate}
            className="home-cta min-w-[12rem]"
            disabled={isGenerating}
          >
            {isGenerating ? 'Finding…' : 'Generate cute animal'}
          </button>
          <button type="button" onClick={remixSameAnimal} className="home-cta-ghost !text-[var(--ink)]">
            {hasStoryBits ? 'Remix scene' : 'Add a tiny story'}
          </button>
        </div>

        <div id="cute-results" className="mt-8 scroll-mt-24">
          <div
            key={spinKey}
            className="animate-home-rise overflow-hidden rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface-elevated)]"
          >
            <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr] md:items-stretch">
              <div className="relative flex min-h-64 items-center justify-center bg-[var(--paper-deep)] p-4 md:min-h-80">
                <img
                  src={result.animal.imageUrl}
                  alt={result.animal.imageAlt}
                  className="max-h-72 w-full object-contain transition-transform duration-300 md:max-h-96"
                  loading="eager"
                />
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8">
                <p className="text-sm font-medium text-[var(--olive)]">Your cute animal</p>
                <h3 className="mt-2 font-display text-3xl font-semibold leading-tight text-[var(--ink)] md:text-4xl">
                  {result.animal.commonName}
                </h3>
                <p className="mt-2 text-sm italic text-[var(--ink-faint)]">
                  {result.animal.scientificName}
                </p>

                {hasStoryBits ? (
                  <p className="mt-5 text-lg leading-snug text-[var(--ink-muted)]">{result.prompt}</p>
                ) : (
                  <p className="mt-5 text-[var(--ink-muted)]">
                    Soft, friendly, and ready to screenshot—or add a tiny story for drawing and games.
                  </p>
                )}

                <div className="mt-6 flex flex-wrap gap-3">
                  <button type="button" onClick={handleCopy} className="home-cta-ghost !text-[var(--ink)]">
                    {copied ? 'Copied' : hasStoryBits ? 'Copy prompt' : 'Copy name'}
                  </button>
                  <button type="button" onClick={handleShare} className="home-cta-ghost !text-[var(--ink)]">
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[var(--line)] pt-6">
          <button
            type="button"
            onClick={() => setShowStoryOptions((open) => !open)}
            className="flex w-full items-center justify-between gap-3 text-left"
            aria-expanded={showStoryOptions}
          >
            <span>
              <span className="block font-semibold text-[var(--ink)]">Optional: tiny story options</span>
              <span className="mt-1 block text-sm text-[var(--ink-muted)]">
                Action, emotion, and location for drawing or classroom prompts
              </span>
            </span>
            <span className="text-sm font-medium text-[var(--olive)]">
              {showStoryOptions ? 'Hide' : 'Show'}
            </span>
          </button>

          {showStoryOptions ? (
            <fieldset className="mt-4">
              <legend className="sr-only">Prompt options</legend>
              <div className="grid gap-3 sm:grid-cols-3">
                <label className="flex cursor-pointer items-start gap-3 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface-elevated)] px-4 py-3">
                  <input
                    type="checkbox"
                    checked={includeAction}
                    onChange={(event) => setIncludeAction(event.target.checked)}
                    className="mt-1"
                  />
                  <span>
                    <span className="block font-semibold text-[var(--ink)]">Action</span>
                    <span className="mt-1 block text-sm text-[var(--ink-muted)]">
                      What the animal is doing ({CUTE_ACTIONS.length} beats)
                    </span>
                  </span>
                </label>
                <label className="flex cursor-pointer items-start gap-3 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface-elevated)] px-4 py-3">
                  <input
                    type="checkbox"
                    checked={includeEmotion}
                    onChange={(event) => setIncludeEmotion(event.target.checked)}
                    className="mt-1"
                  />
                  <span>
                    <span className="block font-semibold text-[var(--ink)]">Emotion</span>
                    <span className="mt-1 block text-sm text-[var(--ink-muted)]">
                      Mood or expression ({CUTE_EMOTIONS.length} feelings)
                    </span>
                  </span>
                </label>
                <label className="flex cursor-pointer items-start gap-3 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface-elevated)] px-4 py-3">
                  <input
                    type="checkbox"
                    checked={includeLocation}
                    onChange={(event) => setIncludeLocation(event.target.checked)}
                    className="mt-1"
                  />
                  <span>
                    <span className="block font-semibold text-[var(--ink)]">Location</span>
                    <span className="mt-1 block text-sm text-[var(--ink-muted)]">
                      Where the scene happens ({CUTE_LOCATIONS.length} places)
                    </span>
                  </span>
                </label>
              </div>
              <p className="mt-3 text-sm text-[var(--ink-faint)]">
                Options apply on the next generate (or use Remix scene on the same animal).
              </p>
            </fieldset>
          ) : null}
        </div>

        <div className="mt-10 grid gap-8 border-t border-[var(--line)] pt-8 md:grid-cols-2">
          <div>
            <h3 className="font-display text-xl font-semibold text-[var(--ink)]">Simple picks</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--ink-muted)]">
              {EXAMPLE_SIMPLE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-[var(--ink)]">
              Story combinations
            </h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--ink-muted)]">
              {EXAMPLE_COMPLEX.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
