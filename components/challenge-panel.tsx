'use client';

import { useState } from 'react';

interface ChallengePanelProps {
  onDailyChallenge: () => void;
  onTimedChallenge: () => void;
  onHardMode: () => void;
  onHybridMode: () => void;
  isDailyCompleted?: boolean;
}

const CHALLENGES = [
  {
    id: 'daily',
    label: 'Daily',
    title: 'Daily Challenge',
    description:
      "Same animal for everyone today. Complete it to unlock tomorrow's challenge.",
  },
  {
    id: 'timed',
    label: 'Timed',
    title: '10-Minute Timed Challenge',
    description: 'Race against the clock and draw as much as you can in 10 minutes.',
  },
  {
    id: 'hard',
    label: 'Hard',
    title: 'Hard Mode',
    description: 'Only the most challenging animals. Test your advanced drawing skills.',
  },
  {
    id: 'hybrid',
    label: 'Hybrid',
    title: 'Hybrid Animal',
    description: 'Combine two animals into one creative creature for a more unusual prompt.',
  },
] as const;

export function ChallengePanel({
  onDailyChallenge,
  onTimedChallenge,
  onHardMode,
  onHybridMode,
  isDailyCompleted = false,
}: ChallengePanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handlers = {
    daily: onDailyChallenge,
    timed: onTimedChallenge,
    hard: onHardMode,
    hybrid: onHybridMode,
  } as const;

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="btn-outline-ink flex w-full items-center justify-center gap-2 px-6 py-3"
        aria-expanded={isOpen}
        aria-controls="challenge-panel-content"
      >
        <span>Challenge Modes</span>
        <svg
          className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div id="challenge-panel-content" className="home-surface mt-3 p-5 md:p-6">
          <h3 className="font-display text-xl font-semibold text-[var(--ink)]">Challenge Modes</h3>
          <p className="mt-1 text-sm text-[var(--ink-faint)]">
            Structured prompts when you want more than a quick pick.
          </p>

          <div className="mt-5 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {CHALLENGES.map((challenge) => {
              const disabled = challenge.id === 'daily' && isDailyCompleted;
              return (
                <button
                  key={challenge.id}
                  type="button"
                  onClick={handlers[challenge.id]}
                  disabled={disabled}
                  className="w-full py-4 text-left transition-colors hover:bg-[var(--paper)]/60 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-xs font-semibold text-[var(--olive)]">
                      {challenge.label}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h4 className="flex flex-wrap items-center gap-2 text-base font-semibold text-[var(--ink)]">
                        {challenge.title}
                        {challenge.id === 'daily' && isDailyCompleted && (
                          <span className="text-xs font-medium text-[var(--olive)]">Completed</span>
                        )}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--ink-muted)]">
                        {challenge.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
