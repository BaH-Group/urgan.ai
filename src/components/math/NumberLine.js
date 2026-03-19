import React from 'react';

export const NumberLine = ({ value, max = 100, step = 10, color = "#3b82f6", showAnswer = false, labels = null }) => {
  const points = [];
  
  // Create tick marks
  for (let i = 0; i <= max; i += step) {
    points.push(i);
  }

  // If labels are provided, use them, otherwise use the numbers themselves
  const getLabel = (p) => {
    if (labels) return labels[p] || '';
    if (p === 0 || p === max || p % (step * 2) === 0) return p.toString();
    return '';
  };

  return (
    <div className="w-full py-12 px-6">
      <div className="relative h-2 bg-slate-200 rounded-full w-full">
        {/* Main Line Ticks */}
        {points.map((p) => (
          <div 
            key={p} 
            className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
            style={{ left: `${(p / max) * 100}%` }}
          >
            <div className={`w-1 ${p % (step * 2) === 0 ? 'h-8' : 'h-5'} bg-slate-400 rounded-full`}></div>
            <span className="mt-6 text-sm font-bold text-slate-500">
              {getLabel(p)}
            </span>
          </div>
        ))}

        {/* Marker (The Question or Answer) */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 transition-all duration-500 ease-out z-10"
          style={{ left: `${(value / max) * 100}%` }}
        >
          <div 
            className={`w-8 h-8 -translate-x-1/2 rounded-full border-4 border-white shadow-xl animate-pulse`}
            style={{ backgroundColor: color }}
          ></div>
          {showAnswer && (
            <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-white px-3 py-1.5 rounded-xl shadow-lg border-2 border-slate-100 whitespace-nowrap font-black text-slate-800 text-lg">
              {value}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
