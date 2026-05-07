interface DrawingTipsProps {
  tips: string[];
  className?: string;
}

export function DrawingTips({ tips, className = '' }: DrawingTipsProps) {
  if (!tips || tips.length === 0) {
    return null;
  }

  return (
    <div className={`rounded-xl border border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 p-4 ${className}`}>
      <div className="mb-3 flex items-center gap-2">
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-700">Tips</span>
        <h4 className="text-sm font-bold uppercase tracking-wide text-gray-800">Drawing Tips</h4>
      </div>

      <ul className="space-y-2">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-xs font-bold text-white">
              {index + 1}
            </span>
            <p className="flex-1 text-sm leading-relaxed text-gray-700">{tip}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
