import { DrawingDifficulty } from '@/lib/animals';

interface DifficultyBadgeProps {
  difficulty: DrawingDifficulty;
  className?: string;
}

const difficultyConfig = {
  easy: {
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-600',
    textColor: 'text-white',
    label: 'Easy',
    icon: '✓'
  },
  medium: {
    color: 'bg-yellow-500',
    hoverColor: 'hover:bg-yellow-600',
    textColor: 'text-white',
    label: 'Medium',
    icon: '◆'
  },
  hard: {
    color: 'bg-red-500',
    hoverColor: 'hover:bg-red-600',
    textColor: 'text-white',
    label: 'Hard',
    icon: '★'
  }
};

export function DifficultyBadge({ difficulty, className = '' }: DifficultyBadgeProps) {
  const config = difficultyConfig[difficulty];
  
  return (
    <span 
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${config.color} ${config.hoverColor} ${config.textColor} text-sm font-semibold rounded-full shadow-md transition-all duration-200 ${className}`}
      aria-label={`Drawing difficulty: ${config.label}`}
    >
      <span className="text-xs">{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
}
