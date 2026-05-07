'use client';

import { useState } from 'react';

interface ChallengePanelProps {
  onDailyChallenge: () => void;
  onTimedChallenge: () => void;
  onHardMode: () => void;
  onHybridMode: () => void;
  isDailyCompleted?: boolean;
}

export function ChallengePanel({
  onDailyChallenge,
  onTimedChallenge,
  onHardMode,
  onHybridMode,
  isDailyCompleted = false,
}: ChallengePanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:from-purple-700 hover:to-indigo-700 hover:shadow-xl"
        aria-expanded={isOpen}
        aria-controls="challenge-panel-content"
      >
        <span className="text-sm uppercase tracking-[0.2em]">Modes</span>
        <span>Challenge Modes</span>
        <svg
          className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          id="challenge-panel-content"
          className="mt-4 rounded-xl border-2 border-purple-200 bg-white/95 p-6 shadow-xl backdrop-blur-sm"
        >
          <h3 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-900">
            <span className="text-sm uppercase tracking-[0.2em] text-purple-700">Modes</span>
            Challenge Modes
          </h3>

          <div className="space-y-4">
            <div className="group rounded-lg border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-4 transition-all duration-300 hover:border-blue-400 hover:shadow-md">
              <button onClick={onDailyChallenge} className="w-full text-left" disabled={isDailyCompleted}>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Daily</span>
                  <div className="flex-1">
                    <h4 className="mb-1 flex items-center gap-2 text-lg font-bold text-gray-900">
                      Daily Challenge
                      {isDailyCompleted && (
                        <span className="rounded-full bg-green-500 px-2 py-0.5 text-sm text-white">
                          Completed
                        </span>
                      )}
                    </h4>
                    <p className="text-sm text-gray-700">
                      Same animal for everyone today. Complete it to unlock tomorrow&apos;s challenge.
                    </p>
                  </div>
                </div>
              </button>
            </div>

            <div className="group rounded-lg border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 p-4 transition-all duration-300 hover:border-orange-400 hover:shadow-md">
              <button onClick={onTimedChallenge} className="w-full text-left">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-sm font-semibold uppercase tracking-[0.2em] text-orange-700">Timed</span>
                  <div className="flex-1">
                    <h4 className="mb-1 text-lg font-bold text-gray-900">10-Minute Timed Challenge</h4>
                    <p className="text-sm text-gray-700">
                      Race against the clock and draw as much as you can in 10 minutes.
                    </p>
                  </div>
                </div>
              </button>
            </div>

            <div className="group rounded-lg border-2 border-red-200 bg-gradient-to-br from-red-50 to-pink-50 p-4 transition-all duration-300 hover:border-red-400 hover:shadow-md">
              <button onClick={onHardMode} className="w-full text-left">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-sm font-semibold uppercase tracking-[0.2em] text-red-700">Hard</span>
                  <div className="flex-1">
                    <h4 className="mb-1 text-lg font-bold text-gray-900">Hard Mode</h4>
                    <p className="text-sm text-gray-700">
                      Only the most challenging animals. Test your advanced drawing skills.
                    </p>
                  </div>
                </div>
              </button>
            </div>

            <div className="group rounded-lg border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50 p-4 transition-all duration-300 hover:border-purple-400 hover:shadow-md">
              <button onClick={onHybridMode} className="w-full text-left">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 text-sm font-semibold uppercase tracking-[0.2em] text-purple-700">Hybrid</span>
                  <div className="flex-1">
                    <h4 className="mb-1 text-lg font-bold text-gray-900">Hybrid Animal</h4>
                    <p className="text-sm text-gray-700">
                      Combine two animals into one creative creature for a more unusual prompt.
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
