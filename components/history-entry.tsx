'use client';

import { HistoryEntry } from '@/lib/history-manager';
import { DifficultyBadge } from './difficulty-badge';

interface HistoryEntryCardProps {
  entry: HistoryEntry;
  onClick: () => void;
}

function formatTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days !== 1 ? 's' : ''} ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months !== 1 ? 's' : ''} ago`;
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function HistoryEntryCard({ entry, onClick }: HistoryEntryCardProps) {
  const { animals, timestamp, filters, challengeMode } = entry;
  const timeAgo = formatTimeAgo(timestamp);
  const fullDate = formatDate(timestamp);

  const getChallengeLabel = () => {
    switch (challengeMode) {
      case 'daily':
        return 'Daily';
      case 'timed':
        return 'Timed';
      case 'hard':
        return 'Hard';
      case 'hybrid':
        return 'Hybrid';
      default:
        return null;
    }
  };

  const challengeLabel = getChallengeLabel();

  return (
    <button
      onClick={onClick}
      className="group w-full rounded-xl border border-gray-200 bg-gradient-to-r from-gray-50 to-white p-4 text-left transition-all duration-200 hover:border-emerald-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-inset"
    >
      <div className="flex items-start gap-4">
        <div className="flex flex-shrink-0 gap-1">
          {animals.slice(0, 4).map((animal, index) => (
            <div
              key={`${animal.id}-${index}`}
              className="relative h-12 w-12 overflow-hidden rounded-lg border-2 border-white shadow-sm"
            >
              <img
                src={animal.imageUrl}
                alt={animal.imageAlt}
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-animal.svg';
                }}
              />
            </div>
          ))}
          {animals.length > 4 && (
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-white bg-gray-100 shadow-sm">
              <span className="text-sm font-medium text-gray-600">+{animals.length - 4}</span>
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            {challengeLabel && (
              <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
                {challengeLabel}
              </span>
            )}
            {filters.difficulty && <DifficultyBadge difficulty={filters.difficulty} size="small" />}
          </div>

          <p className="mb-1 truncate text-sm font-medium text-gray-900">
            {animals.map((a) => a.commonName).join(', ')}
          </p>

          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span title={fullDate}>{timeAgo}</span>
            {filters.category && <span className="capitalize">{filters.category}</span>}
            <span>{animals.length} animal{animals.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>
    </button>
  );
}
