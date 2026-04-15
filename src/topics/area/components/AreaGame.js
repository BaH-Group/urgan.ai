import React from 'react';

const ShapeRenderer = ({ puzzle }) => {
  const { type, width, height, side } = puzzle;
  
  if (type === 'area_grid') {
    const cells = [];
    for (let i = 0; i < height * width; i++) {
      cells.push(
        <div 
          key={i} 
          className="w-8 h-8 md:w-12 md:h-12 border border-sky-200 bg-sky-50 transition-colors"
        ></div>
      );
    }
    return (
      <div 
        className="grid gap-0 border-2 border-sky-400 bg-white shadow-sm p-1 rounded-sm"
        style={{ 
          gridTemplateColumns: `repeat(${width}, minmax(0, 1fr))`,
          width: 'auto'
        }}
      >
        {cells}
      </div>
    );
  }

  if (type === 'area_rect' || type === 'area_square') {
    const w = type === 'area_square' ? side : width;
    const h = type === 'area_square' ? side : height;
    
    // Scale for display (max dimension around 150-200px)
    const scale = Math.min(200 / Math.max(w, h), 30);
    
    return (
      <div className="relative flex items-center justify-center">
        {/* The Shape */}
        <div 
          className="bg-indigo-50 border-4 border-indigo-400 rounded-lg shadow-sm flex items-center justify-center relative"
          style={{ 
            width: `${w * scale}px`, 
            height: `${h * scale}px` 
          }}
        >
          {/* Grid lines inside (optional, subtle) */}
          <div className="absolute inset-0 opacity-10 pointer-events-none"
               style={{ 
                 backgroundImage: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)',
                 backgroundSize: `${scale}px ${scale}px`
               }}>
          </div>
        </div>
        
        {/* Labels */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 font-black text-xl text-indigo-600">
          {w}
        </div>
        <div className="absolute top-1/2 -right-10 -translate-y-1/2 font-black text-xl text-indigo-600">
          {h}
        </div>
      </div>
    );
  }

  return null;
};

export const AreaGame = ({ 
  currentPuzzle, 
  feedback, 
  inputValue, 
  handleAnswer, 
  CustomKeypad,
  showHint,
  setShowHint
}) => {
  const getCorrectAnswerDisplay = () => {
    return currentPuzzle?.answer?.toString() || '';
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg p-4 md:p-8 relative overflow-hidden border border-slate-200">
      {/* Feedback Overlay */}
      {feedback && (
        <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm transition-opacity`}>
          <div className={`text-4xl md:text-6xl font-black flex flex-col items-center mb-4
            ${feedback === 'correct' ? 'text-emerald-500 animate-bounce' : 
              feedback === 'timeup' ? 'text-rose-500' : 'text-rose-500 animate-pulse'}`}>
            {feedback === 'correct' ? '🎉 Correct! 🎉' : 
             feedback === 'timeup' ? '⏰ Time is Up!' : '❌ Incorrect!'}
          </div>
          
          {(feedback === 'incorrect' || feedback === 'timeup') && (
            <div className="text-xl md:text-3xl text-slate-700 bg-white px-6 py-3 rounded-2xl shadow-lg border-4 border-slate-100 mt-4">
              Correct Answer: <span className="text-emerald-500 font-black">{getCorrectAnswerDisplay()}</span>
            </div>
          )}
        </div>
      )}

      <h2 className="text-xl md:text-2xl font-extrabold text-center text-slate-800 mb-6">
        {currentPuzzle.type === 'area_grid' ? 'What is the area of this shape in unit squares?' : 'Calculate the area of the shape!'}
      </h2>

      <div className="flex flex-col items-center justify-center w-full mb-4">
        <div className="flex flex-col items-center justify-center bg-slate-50 p-6 md:p-10 rounded-3xl border border-slate-200 shadow-sm w-full max-w-2xl mb-6 min-h-[200px]">
          <div className="transform scale-90 md:scale-100">
            <ShapeRenderer puzzle={currentPuzzle} />
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
            <div className={`text-5xl md:text-7xl font-black min-w-[100px] h-20 md:h-24 flex items-center justify-center border-b-8 transition-colors ${inputValue ? 'border-emerald-500 text-emerald-600' : 'border-slate-300 text-slate-300'}`}>
                {inputValue || '?'}
            </div>
            <div className="transform scale-90 md:scale-100">
              <CustomKeypad />
            </div>
        </div>
      </div>

      {/* Hint Section */}
      <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col items-center min-h-[80px]">
        {!showHint ? (
          <button 
            onClick={() => setShowHint(true)}
            className="text-slate-400 hover:text-amber-500 font-bold flex items-center gap-2 transition-colors text-sm"
          >
            <span>💡</span> Need a hint? (Costs 5 points)
          </button>
        ) : (
          <div className="bg-amber-50 border-2 border-amber-200 p-3 rounded-xl text-amber-800 text-center font-medium max-w-xl text-sm">
            💡 <strong>Hint:</strong> {currentPuzzle.hint}
          </div>
        )}
      </div>
    </div>
  );
};
