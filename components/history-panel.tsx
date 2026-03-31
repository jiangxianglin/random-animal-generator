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
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-emerald-200 overflow-hidden">
      <button
        onClick={toggleExpanded}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-emerald-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-inset"
        aria-expanded={isExpanded}
        aria-controls="history-content"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-left">
            <h3 className="font-bold text-gray-900 text-lg">Drawing History</h3>
            <p className="text-sm text-gray-600">
              {stats ? `${stats.totalCount} animals practiced` : 'Loading...'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {history.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClearClick();
              }}
              className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Clear history"
            >
              Clear All
            </button>
          )}
          <svg
            className={`w-6 h-6 text-gray-600 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div id="history-content" className="border-t border-emerald-100">
          {stats && (
            <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Total Animals</p>
                  <p className="font-bold text-gray-900 text-lg">{stats.totalCount}</p>
                </div>
                {stats.mostCommonCategory && (
                  <div>
                    <p className="text-gray-600">Most Practiced</p>
                    <p className="font-bold text-gray-900 text-lg capitalize">{stats.mostCommonCategory}</p>
                  </div>
                )}
                <div>
                  <p className="text-gray-600">Categories Used</p>
                  <p className="font-bold text-gray-900 text-lg">
                    {Object.entries(stats.categoryDistribution).filter(([, count]) => count > 0).length}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Sessions</p>
                  <p className="font-bold text-gray-900 text-lg">{history.length}</p>
                </div>
              </div>
            </div>
          )}

          {history.length === 0 ? (
            <div className="px-6 py-8 text-center">
              <div className="text-4xl mb-3">🎨</div>
              <p className="text-gray-600">No history yet. Generate some animals to start practicing!</p>
            </div>
          ) : (
            <div className="px-6 py-4 max-h-96 overflow-y-auto">
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
            <div className="text-center mb-4">
              <div className="text-5xl mb-3">⚠️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Clear All History?</h3>
              <p className="text-gray-600">
                This will remove all your drawing history. This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCancelClear}
                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmClear}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors"
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
