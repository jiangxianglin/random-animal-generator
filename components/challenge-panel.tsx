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
  isDailyCompleted = false
}: ChallengePanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
        aria-expanded={isOpen}
        aria-controls="challenge-panel-content"
      >
        <span className="text-2xl">🏆</span>
        <span>Challenge Modes</span>
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Challenge Options Panel */}
      {isOpen && (
        <div
          id="challenge-panel-content"
          className="mt-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6 border-2 border-purple-200 animate-fadeIn"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-3xl">🏆</span>
            Challenge Modes
          </h3>

          <div className="space-y-4">
            {/* Daily Drawing Challenge */}
            <div className="group bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border-2 border-blue-200 hover:border-blue-400 hover:shadow-md transition-all duration-300">
              <button
                onClick={onDailyChallenge}
                className="w-full text-left"
                disabled={isDailyCompleted}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl flex-shrink-0">📅</span>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
                      Daily Drawing Challenge
                      {isDailyCompleted && (
                        <span className="text-sm bg-green-500 text-white px-2 py-0.5 rounded-full">
                          ✓ Completed
                        </span>
                      )}
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Same animal for everyone today. Complete it to unlock tomorrow&apos;s challenge!
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {/* Timed Challenge */}
            <div className="group bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-lg border-2 border-orange-200 hover:border-orange-400 hover:shadow-md transition-all duration-300">
              <button
                onClick={onTimedChallenge}
                className="w-full text-left"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl flex-shrink-0">⏱️</span>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">
                      10-Minute Timed Challenge
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Race against the clock! Draw as fast as you can in 10 minutes.
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {/* Hard Mode */}
            <div className="group bg-gradient-to-br from-red-50 to-pink-50 p-4 rounded-lg border-2 border-red-200 hover:border-red-400 hover:shadow-md transition-all duration-300">
              <button
                onClick={onHardMode}
                className="w-full text-left"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl flex-shrink-0">🔥</span>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">
                      Hard Mode
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Only the most challenging animals. Test your advanced drawing skills!
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {/* Hybrid Animal */}
            <div className="group bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-lg border-2 border-purple-200 hover:border-purple-400 hover:shadow-md transition-all duration-300">
              <button
                onClick={onHybridMode}
                className="w-full text-left"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl flex-shrink-0">🧬</span>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">
                      Hybrid Animal
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Combine two animals into one creative creature! Ultimate drawing challenge.
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
