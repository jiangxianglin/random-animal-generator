'use client';

import { useState, useEffect } from 'react';
import { HistoryManager, HistoryEntry, HistoryStats } from '@/lib/history-manager';
import { HistoryEntryCard } from './history-entry';

interface HistoryPanelProps {
  onSelectEntry: (entry: HistoryEntry) => void;
  onClearHistory: () => void;
}

export function HistoryPanel({ onSelectEntry, onClearHistory }: HistoryPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [stats, setStats] = useState<HistoryStats | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [historyManager] = useState(() => new HistoryManager());

  useEffect(() => {
    setHistory(historyManager.getHistory());
    setStats(historyManager.getStats());
  }, [historyManager]);

  const handleClearClick = () => {
    setShowClearConfirm(true);
  };

  const handleConfirmClear = () => {
    historyManager.clearHistory();
    setHistory([]);
    setStats(historyManager.getStats());
    onClearHistory();
    setShowClearConfirm(false);
  };

  const handleCancelClear = () => {
    setShowClearConfirm(false);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="home-surface overflow-hidden">
      <button
        type="button"
        onClick={toggleExpanded}
        className="flex w-full items-center justify-between px-6 py-4 transition-colors duration-200 hover:bg-[var(--paper)] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--olive-soft)]"
        aria-expanded={isExpanded}
        aria-controls="history-content"
      >
        <div className="text-left">
          <h3 className="font-display text-lg font-semibold text-[var(--ink)]">Drawing History</h3>
          <p className="text-sm text-[var(--ink-faint)]">
            {stats ? `${stats.totalCount} animals practiced` : 'Loading...'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {history.length > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClearClick();
              }}
              className="rounded-[var(--radius-sm)] px-3 py-1.5 text-sm font-medium text-[var(--ink-muted)] transition-colors hover:bg-[var(--paper-deep)] hover:text-[var(--ink)]"
              aria-label="Clear history"
            >
              Clear All
            </button>
          )}
          <svg
            className={`h-5 w-5 text-[var(--ink-muted)] transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div id="history-content" className="border-t border-[var(--line)]">
          {stats && (
            <div className="border-b border-[var(--line)] bg-[var(--paper)] px-6 py-4">
              <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                <div>
                  <p className="text-[var(--ink-faint)]">Total Animals</p>
                  <p className="font-display text-lg font-semibold text-[var(--ink)]">{stats.totalCount}</p>
                </div>
                {stats.mostCommonCategory && (
                  <div>
                    <p className="text-[var(--ink-faint)]">Most Practiced</p>
                    <p className="font-display text-lg font-semibold capitalize text-[var(--ink)]">
                      {stats.mostCommonCategory}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-[var(--ink-faint)]">Categories Used</p>
                  <p className="font-display text-lg font-semibold text-[var(--ink)]">
                    {Object.entries(stats.categoryDistribution).filter(([, count]) => count > 0).length}
                  </p>
                </div>
                <div>
                  <p className="text-[var(--ink-faint)]">Sessions</p>
                  <p className="font-display text-lg font-semibold text-[var(--ink)]">{history.length}</p>
                </div>
              </div>
            </div>
          )}

          {history.length === 0 ? (
            <div className="px-6 py-8 text-center">
              <p className="text-[var(--ink-muted)]">
                No history yet. Generate some animals to start practicing!
              </p>
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto px-6 py-4">
              <div className="space-y-3">
                {history.map((entry) => (
                  <HistoryEntryCard
                    key={entry.id}
                    entry={entry}
                    onClick={() => onSelectEntry(entry)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--ink)]/45 p-4">
          <div className="home-surface w-full max-w-sm p-6">
            <div className="mb-5 text-center">
              <h3 className="font-display text-xl font-semibold text-[var(--ink)]">Clear All History?</h3>
              <p className="mt-2 text-[var(--ink-muted)]">
                This will remove all your drawing history. This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCancelClear}
                className="btn-outline-ink flex-1 px-4 py-2.5"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmClear}
                className="flex-1 rounded-[var(--radius-sm)] bg-[var(--ink)] px-4 py-2.5 font-semibold text-[var(--paper)] transition-colors hover:bg-[var(--olive-deep)]"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
