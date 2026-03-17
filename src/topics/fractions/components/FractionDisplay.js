import React from 'react';

// SVG Pie Chart Generator
export const renderPie = (num, den, color = "#f59e0b") => {
  if (den === 1 || num === den) {
    return <circle cx="50" cy="50" r="45" fill={color} stroke="white" strokeWidth="2" />;
  }
  if (num <= 0 || isNaN(num)) {
    return <circle cx="50" cy="50" r="45" fill="#f1f5f9" stroke="white" strokeWidth="2" />;
  }

  const paths = [];
  for (let i = 0; i < den; i++) {
    const isColored = i < num;
    const startAngle = (i * 360) / den - 90;
    const endAngle = ((i + 1) * 360) / den - 90;

    const startRad = (Math.PI / 180) * startAngle;
    const endRad = (Math.PI / 180) * endAngle;

    const x1 = 50 + 45 * Math.cos(startRad);
    const y1 = 50 + 45 * Math.sin(startRad);
    const x2 = 50 + 45 * Math.cos(endRad);
    const y2 = 50 + 45 * Math.sin(endRad);

    const largeArc = 360 / den > 180 ? 1 : 0;
    const pathData = `M 50 50 L ${x1} ${y1} A 45 45 0 ${largeArc} 1 ${x2} ${y2} Z`;

    paths.push(
      <path
        key={i}
        d={pathData}
        fill={isColored ? color : "#f1f5f9"}
        stroke="white"
        strokeWidth="2"
        className="transition-colors duration-200"
      />
    );
  }
  return paths;
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
