'use client';

interface TimerDisplayProps {
  remainingSeconds: number;
  isActive: boolean;
}

export function TimerDisplay({ remainingSeconds, isActive }: TimerDisplayProps) {
  if (!isActive) {
    return null;
  }

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const getColorClass = () => {
    if (remainingSeconds <= 60) {
      return 'from-red-600 to-red-700 animate-pulse';
    } else if (remainingSeconds <= 180) {
      return 'from-orange-600 to-orange-700';
    }
    return 'from-blue-600 to-blue-700';
  };

  const getAriaLabel = () => {
    if (remainingSeconds <= 60) {
      return `Time warning! Only ${remainingSeconds} seconds remaining.`;
    }
    return `${minutes} minutes and ${seconds} seconds remaining in timed challenge.`;
  };

  return (
    <div 
      className="fixed top-4 right-4 z-50 animate-fadeIn"
      role="timer"
      aria-label="Timed challenge countdown"
      aria-live="polite"
      aria-atomic="true"
    >
      <div 
        className={`bg-gradient-to-r ${getColorClass()} text-white px-6 py-3 rounded-full shadow-2xl border-2 border-white/30 backdrop-blur-sm`}
        aria-label={getAriaLabel()}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl" aria-hidden="true">⏱️</span>
          <div className="text-center">
            <div className="text-xs font-medium opacity-90 uppercase tracking-wide">
              Time Remaining
            </div>
            <div className="text-2xl font-bold tabular-nums" aria-hidden="true">
              {timeString}
            </div>
            <span className="sr-only">{getAriaLabel()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
