import React from 'react';

export const renderPie = (num, den, color = "#f59e0b") => {
  // ... (Insert original renderPie SVG paths logic here)
  return <circle cx="50" cy="50" r="45" fill={color} stroke="white" strokeWidth="2" />;
};

export const FractionDisplay = ({ frac, color = "#f59e0b", size = "normal", hidePie = false }) => {
  const isLarge = size === "large";
  const svgSize = isLarge ? "120" : "80";
  const textSize = isLarge ? "text-3xl" : "text-xl";

  return (
    <div className="flex flex-col items-center gap-3">
      {!hidePie && (
        <svg width={svgSize} height={svgSize} viewBox="0 0 100 100" className="drop-shadow-md">
          {renderPie(frac.n, frac.d, color)}
        </svg>
      )}
      <div className={`flex flex-col items-center font-black ${textSize} text-slate-700`}>
        <span>{frac.n}</span>
        <div className="h-1 w-full bg-slate-700 my-1 rounded"></div>
        <span>{frac.d}</span>
      </div>
    </div>
  );
};