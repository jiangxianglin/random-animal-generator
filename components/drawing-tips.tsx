interface DrawingTipsProps {
  tips: string[];
  className?: string;
}

export function DrawingTips({ tips, className = '' }: DrawingTipsProps) {
  if (!tips || tips.length === 0) {
    return null;
  }

  return (
    <div className={`bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">🎨</span>
        <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
          Drawing Tips
        </h4>
      </div>
      
      <ul className="space-y-2">
        {tips.map((tip, index) => (
          <li key={index} className="flex gap-2 items-start">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mt-0.5">
              <span className="text-white text-xs font-bold">{index + 1}</span>
            </span>
            <p className="text-sm text-gray-700 leading-relaxed flex-1">
              {tip}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
