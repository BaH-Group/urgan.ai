import React from 'react';

export const NumberLine = ({ frac, color = "#3b82f6", showAnswer = false }) => {
  const points = [];
  const denominator = frac.d;
  
  // Create tick marks
  for (let i = 0; i <= denominator; i++) {
    points.push(i);
  }

  return (
    <div className="w-full py-8 px-4">
      <div className="relative h-2 bg-slate-200 rounded-full w-full">
        {/* Tick Marks */}
        {points.map((p) => (
          <div 
            key={p} 
            className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
            style={{ left: `${(p / denominator) * 100}%` }}
          >
            <div className={`w-1 ${p === 0 || p === denominator ? 'h-6' : 'h-4'} bg-slate-400 rounded-full`}></div>
            <span className="mt-4 text-sm font-bold text-slate-500">
              {p === 0 ? '0' : p === denominator ? '1' : ''}
            </span>
          </div>
        ))}

        {/* Marker (The Question or Answer) */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 transition-all duration-500 ease-out"
          style={{ left: `${(frac.n / frac.d) * 100}%` }}
        >
          <div 
            className={`w-6 h-6 -translate-x-1/2 rounded-full border-4 border-white shadow-lg animate-pulse`}
            style={{ backgroundColor: color }}
          ></div>
          {showAnswer && (
            <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded shadow-sm border border-slate-100 whitespace-nowrap font-black text-slate-700">
              {frac.n}/{frac.d}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
