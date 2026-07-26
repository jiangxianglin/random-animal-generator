'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimalWheelSpinner } from '@/components/animal-wheel-spinner';
import { ANIMAL_DATABASE, Animal } from '@/lib/animals';
import { getAnimalImageUrl } from '@/lib/animal-image';
import { ShareManager } from '@/lib/share-manager';

const shareManager = new ShareManager();

const WHEEL_COLORS = [
  '#3D4A2E',
  '#6B7A4E',
  '#8B7355',
  '#C4A574',
  '#5C6B4A',
  '#4A5D3A',
  '#A67C52',
  '#7A8B5C',
  '#5A4A3A',
  '#8A9A6A',
];

type SpinMode = 'free' | 'party' | 'classroom' | 'drawing' | 'rpg';

const SPIN_MODES: {
  id: SpinMode;
  label: string;
  hint: string;
  category: string;
  timerSeconds: number | null;
}[] = [
  {
    id: 'free',
    label: 'Free spin',
    hint: 'Any category, no timer',
    category: 'all',
    timerSeconds: null,
  },
  {
    id: 'party',
    label: 'Party icebreaker',
    hint: 'All animals · share a fact',
    category: 'all',
    timerSeconds: null,
  },
  {
    id: 'classroom',
    label: 'Classroom round',
    hint: 'Mammals · 60s response',
    category: 'mammals',
    timerSeconds: 60,
  },
  {
    id: 'drawing',
    label: 'Drawing reveal',
    hint: 'All animals · 3-min sketch',
    category: 'all',
    timerSeconds: 180,
  },
  {
    id: 'rpg',
    label: 'RPG encounter',
    hint: 'Wild mix · story seed',
    category: 'all',
    timerSeconds: null,
  },
];

interface WheelAnimal {
  id: string;
  commonName: string;
  imageUrl: string;
  imageAlt: string;
  color: string;
}

function shuffleAnimals(animals: Animal[]): Animal[] {
  const next = [...animals];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function buildResultText(animal: Animal, mode: SpinMode) {
  const modeLabel = SPIN_MODES.find((item) => item.id === mode)?.label ?? 'Free spin';
  return [
    `Random animal wheel: ${modeLabel}`,
    `${animal.commonName} (${animal.scientificName}) — ${animal.category}`,
    ...animal.facts.slice(0, 2),
  ].join('\n');
}

export function AnimalWheelTool() {
  const [spinMode, setSpinMode] = useState<SpinMode>('free');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [reshuffleKey, setReshuffleKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
  const [timerFinished, setTimerFinished] = useState(false);
  const [recentSpins, setRecentSpins] = useState<string[]>([]);
  const [hasMounted, setHasMounted] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsLightboxOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isLightboxOpen]);

  const categories = useMemo(
    () => [
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
    ],
    [],
  );

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearTimer();
  }, []);

  const startTimer = (seconds: number) => {
    clearTimer();
    setTimerFinished(false);
    setRemainingSeconds(seconds);
    timerRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev === null) return prev;
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          setTimerFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const applySpinMode = (mode: SpinMode) => {
    const config = SPIN_MODES.find((item) => item.id === mode);
    if (!config) return;
    setSpinMode(mode);
    setSelectedCategory(config.category);
    setReshuffleKey((key) => key + 1);
    clearTimer();
    setRemainingSeconds(null);
    setTimerFinished(false);
  };

  const wheelAnimals = useMemo(() => {
    if (!hasMounted) return [];

    const filtered =
      selectedCategory === 'all'
        ? ANIMAL_DATABASE
        : ANIMAL_DATABASE.filter((a) => a.category === selectedCategory);

    const pool = shuffleAnimals(filtered).slice(0, 12);
    return pool.map(
      (animal, index): WheelAnimal => ({
        id: animal.id,
        commonName: animal.commonName,
        imageUrl: animal.imageUrl,
        imageAlt: animal.imageAlt,
        color: WHEEL_COLORS[index % WHEEL_COLORS.length],
      }),
    );
    // reshuffleKey intentionally reshuffles the wheel slices
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, reshuffleKey, hasMounted]);

  const modeHint = SPIN_MODES.find((item) => item.id === spinMode);

  const handleSpinComplete = (animal: WheelAnimal) => {
    const fullAnimal = ANIMAL_DATABASE.find((entry) => entry.id === animal.id) ?? null;
    setSelectedAnimal(fullAnimal);
    setCopied(false);
    setIsLightboxOpen(false);

    if (fullAnimal) {
      setRecentSpins((prev) =>
        [fullAnimal.commonName, ...prev.filter((name) => name !== fullAnimal.commonName)].slice(
          0,
          5,
        ),
      );
    }

    const timerSeconds = modeHint?.timerSeconds ?? null;
    if (timerSeconds) {
      startTimer(timerSeconds);
    } else {
      clearTimer();
      setRemainingSeconds(null);
      setTimerFinished(false);
    }

    window.setTimeout(() => {
      document.getElementById('wheel-result')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 50);
  };

  const handleCopy = async () => {
    if (!selectedAnimal) return;
    const ok = await shareManager.copyToClipboard(buildResultText(selectedAnimal, spinMode));
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReshuffle = () => {
    setReshuffleKey((key) => key + 1);
    setSelectedAnimal(null);
    clearTimer();
    setRemainingSeconds(null);
    setTimerFinished(false);
  };

  return (
    <>
      <section id="generator" className="mb-10 scroll-mt-24">
        <div className="home-surface mb-4 p-5 md:p-6">
          <div className="border-b border-[var(--line)] pb-4">
            <h2 className="font-display text-xl font-semibold text-[var(--ink)] md:text-2xl">
              Spin modes
            </h2>
            <p className="mt-1 text-sm text-[var(--ink-muted)]">
              Pick a scenario first—the wheel reshuffles and optional timers match how you use the
              reveal.
            </p>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {SPIN_MODES.map((mode) => {
              const active = spinMode === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => applySpinMode(mode.id)}
                  className={`rounded-[var(--radius-sm)] border px-3 py-3 text-left transition-colors ${
                    active
                      ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]'
                      : 'border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--line-strong)]'
                  }`}
                >
                  <div className="text-sm font-semibold">{mode.label}</div>
                  <div
                    className={`mt-0.5 text-xs ${active ? 'text-[var(--paper)]/75' : 'text-[var(--ink-faint)]'}`}
                  >
                    {mode.hint}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col items-stretch gap-4 lg:flex-row">
          <div className="w-full lg:w-3/5">
            <div className="home-surface flex h-full flex-col items-center justify-center p-5 md:p-8">
              <AnimalWheelSpinner animals={wheelAnimals} onSpinComplete={handleSpinComplete} />
            </div>
          </div>

          <div className="w-full lg:w-2/5">
            <div className="home-surface h-full p-5 md:p-6">
              <h2 className="font-display text-xl font-semibold text-[var(--ink)]">
                Choose your category
              </h2>
              <p className="mt-1 text-sm text-[var(--ink-muted)]">
                Focus the pool, then spin. The wheel shows 12 freshly shuffled animals.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {categories.map((cat) => {
                  const active = selectedCategory === cat.value;
                  return (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat.value);
                        setReshuffleKey((key) => key + 1);
                        clearTimer();
                        setRemainingSeconds(null);
                        setTimerFinished(false);
                      }}
                      className={`rounded-[var(--radius-sm)] border px-3 py-3 text-left text-sm transition-colors ${
                        active
                          ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]'
                          : 'border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--line-strong)]'
                      }`}
                    >
                      <div className="font-semibold">{cat.label}</div>
                      <div
                        className={`text-xs ${active ? 'text-[var(--paper)]/75' : 'text-[var(--ink-faint)]'}`}
                      >
                        {cat.count} animals
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex flex-wrap gap-2 border-t border-[var(--line)] pt-4">
                <button
                  type="button"
                  onClick={handleReshuffle}
                  className="btn-outline-ink px-3 py-2 text-xs"
                >
                  Reshuffle wheel
                </button>
                {recentSpins.length > 0 && (
                  <p className="w-full text-xs leading-relaxed text-[var(--ink-muted)]">
                    <strong className="font-semibold text-[var(--ink)]">Recent:</strong>{' '}
                    {recentSpins.join(' · ')}
                  </p>
                )}
              </div>

              {spinMode === 'party' && (
                <p className="mt-3 text-xs leading-relaxed text-[var(--ink-muted)]">
                  After the spin: each person shares one fact, sound, or memory tied to the animal.
                </p>
              )}
              {spinMode === 'rpg' && (
                <p className="mt-3 text-xs leading-relaxed text-[var(--ink-muted)]">
                  After the spin: treat the animal as an encounter, familiar, omen, or wilderness
                  seed.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {selectedAnimal && (
        <section id="wheel-result" className="mb-10 scroll-mt-24 animate-fadeIn">
          <div className="home-surface mx-auto max-w-5xl overflow-hidden p-0 md:p-0">
            <div className="flex flex-col lg:flex-row">
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="group relative min-h-[20rem] w-full cursor-zoom-in border-b border-[var(--line)] bg-[var(--surface)] text-left lg:min-h-[28rem] lg:w-3/5 lg:border-b-0 lg:border-r"
                aria-label={`View large photo of ${selectedAnimal.commonName}`}
              >
                <Image
                  src={getAnimalImageUrl(selectedAnimal.imageUrl, 'display')}
                  alt={selectedAnimal.imageAlt}
                  fill
                  priority
                  quality={90}
                  className="object-contain p-3 transition duration-300 group-hover:scale-[1.01] md:p-5"
                  sizes="(max-width: 1024px) 100vw, 720px"
                />
                <span className="pointer-events-none absolute bottom-3 right-3 rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface-elevated)]/95 px-3 py-1.5 text-xs font-semibold text-[var(--ink-muted)] shadow-sm backdrop-blur-sm">
                  Tap to enlarge
                </span>
              </button>

              <div className="flex w-full flex-col justify-center p-6 md:p-8 lg:w-2/5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">
                  {modeHint?.label ?? 'Wheel result'}
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-[var(--ink)] md:text-3xl">
                  {selectedAnimal.commonName}
                </h2>
                <p className="mt-1 text-base italic text-[var(--ink-muted)]">
                  {selectedAnimal.scientificName}
                </p>
                <div className="mt-4 space-y-2">
                  {selectedAnimal.facts.slice(0, 2).map((fact) => (
                    <p key={fact} className="text-sm leading-relaxed text-[var(--ink-muted)]">
                      {fact}
                    </p>
                  ))}
                </div>
                <div className="mt-4">
                  <span className="inline-block border border-[var(--line)] px-3 py-1 text-xs font-medium text-[var(--ink-muted)]">
                    {selectedAnimal.category.charAt(0).toUpperCase() +
                      selectedAnimal.category.slice(1)}
                  </span>
                </div>

                {remainingSeconds !== null && (
                  <div className="mt-5 border-t border-[var(--line)] pt-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--olive)]">
                      {spinMode === 'drawing' ? 'Sketch timer' : 'Response timer'}
                    </p>
                    <p className="mt-2 font-display text-3xl font-semibold text-[var(--ink)]">
                      {formatTime(remainingSeconds)}
                    </p>
                    {timerFinished && (
                      <p className="mt-1 text-sm text-[var(--ink-muted)]">
                        Time&apos;s up—share or spin again.
                      </p>
                    )}
                  </div>
                )}

                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(true)}
                    className="btn-ink px-4 py-2.5 text-sm"
                  >
                    View large photo
                  </button>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="btn-outline-ink px-4 py-2.5 text-sm"
                  >
                    {copied ? 'Copied' : 'Copy result'}
                  </button>
                  <button
                    type="button"
                    onClick={handleReshuffle}
                    className="btn-outline-ink px-4 py-2.5 text-sm"
                  >
                    New wheel
                  </button>
                  {spinMode === 'drawing' && (
                    <Link
                      href="/drawing-prompt-generator"
                      className="btn-outline-ink inline-flex items-center px-4 py-2.5 text-sm"
                    >
                      Open drawing prompts
                    </Link>
                  )}
                  {spinMode === 'party' && (
                    <Link
                      href="/random-animal-picker"
                      className="btn-outline-ink inline-flex items-center px-4 py-2.5 text-sm"
                    >
                      Need a fast list?
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {selectedAnimal && isLightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-[rgba(28,26,23,0.94)]"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedAnimal.commonName} large photo`}
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0">
              <h3 className="truncate font-display text-lg font-semibold text-white sm:text-xl">
                {selectedAnimal.commonName}
              </h3>
              <p className="truncate text-sm italic text-white/70">
                {selectedAnimal.scientificName}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="inline-flex shrink-0 items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--paper)] px-4 py-2.5 text-sm font-semibold text-[var(--ink)]"
              aria-label="Close large photo"
            >
              Close
            </button>
          </div>

          <div className="flex min-h-0 flex-1 items-center justify-center p-3 sm:p-6">
            {/* Native img keeps iNaturalist original resolution without Next downscale */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getAnimalImageUrl(selectedAnimal.imageUrl, 'lightbox')}
              alt={selectedAnimal.imageAlt}
              className="max-h-full max-w-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <p className="shrink-0 pb-4 text-center text-xs text-white/50">
            Press Esc or click outside the image to close
          </p>
        </div>
      )}
    </>
  );
}

export function ScrollToWheelButton() {
  return (
    <a href="#generator" className="home-cta-light inline-flex px-8 py-4 text-lg">
      Back to the wheel
    </a>
  );
}
