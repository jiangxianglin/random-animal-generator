import { DrawingDifficulty } from '@/lib/animals';

interface DifficultyBadgeProps {
  difficulty: DrawingDifficulty;
  size?: 'small' | 'normal';
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

export function DifficultyBadge({ difficulty, size = 'normal', className = '' }: DifficultyBadgeProps) {
  const config = difficultyConfig[difficulty];
  const sizeClasses = size === 'small' 
    ? 'px-2 py-0.5 text-xs gap-1'
    : 'px-3 py-1.5 text-sm gap-1.5';
  
  return (
    <span 
      className={`inline-flex items-center ${sizeClasses} ${config.color} ${config.hoverColor} ${config.textColor} font-semibold rounded-full shadow-md transition-all duration-200 ${className}`}
      aria-label={`Drawing difficulty: ${config.label}`}
    >
      <span className={size === 'small' ? 'text-[10px]' : 'text-xs'}>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
}
