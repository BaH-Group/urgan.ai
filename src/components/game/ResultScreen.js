import React from 'react';

export const ResultScreen = ({ 
  difficulty, 
  score, 
  correctCount, 
  totalRounds, 
  wrongCount, 
  totalTime, 
  formatTime, 
  restartGame 
}) => {
  return (
    <div className="h-screen bg-sky-100 flex items-center justify-center p-4 font-sans text-slate-900 overflow-hidden">
      <div className="bg-white p-6 md:p-12 rounded-3xl shadow-xl text-center max-w-2xl w-full max-h-[95vh] overflow-y-auto custom-scrollbar">
        <div className="text-6xl mb-2">🏆</div>
        <h1 className="text-4xl font-extrabold text-sky-600 mb-2">Match Complete!</h1>
        <p className="text-slate-500 font-medium mb-6">Here is how you performed on {difficulty} mode.</p>
        
        <div className="bg-slate-50 rounded-2xl p-4 md:p-8 mb-8 border border-slate-200">
           <div className="text-lg md:text-2xl font-bold text-slate-500 mb-1">Final Score</div>
           <div className="text-4xl md:text-6xl font-black text-amber-500 mb-6 drop-shadow-sm">{score}</div>
           
           <div className="grid grid-cols-2 gap-3 md:gap-6 text-left">
              <div className="bg-white p-3 md:p-6 rounded-2xl shadow-sm border border-slate-100">
                 <div className="text-slate-400 text-[10px] md:text-sm font-bold uppercase tracking-wide">Right Answers</div>
                 <div className="text-emerald-500 font-black text-2xl md:text-4xl">{correctCount} <span className="text-base md:text-xl text-slate-300">/ {totalRounds}</span></div>
              </div>
              <div className="bg-white p-3 md:p-6 rounded-2xl shadow-sm border border-slate-100">
                 <div className="text-slate-400 text-[10px] md:text-sm font-bold uppercase tracking-wide">Wrong / Time Up</div>
                 <div className="text-rose-500 font-black text-2xl md:text-4xl">{wrongCount}</div>
              </div>
              <div className="bg-white p-3 md:p-6 rounded-2xl shadow-sm border border-slate-100 col-span-2 flex justify-between items-center">
                 <div className="text-slate-400 text-[10px] md:text-sm font-bold uppercase tracking-wide">Accuracy</div>
                 <div className="text-indigo-500 font-black text-xl md:text-3xl">{Math.round((correctCount / totalRounds) * 100)}%</div>
              </div>
              <div className="bg-white p-3 md:p-6 rounded-2xl shadow-sm border border-slate-100 col-span-2 flex justify-between items-center">
                 <div className="text-slate-400 text-[10px] md:text-sm font-bold uppercase tracking-wide">Total Time Taken</div>
                 <div className="text-sky-600 font-black text-xl md:text-3xl">{formatTime(totalTime)}</div>
              </div>
           </div>
        </div>
        
        <button 
          onClick={restartGame}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-2xl py-5 px-8 w-full rounded-2xl shadow-lg transition-transform transform hover:-translate-y-1 active:scale-95"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};
