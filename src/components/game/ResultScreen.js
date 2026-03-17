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
    <div className="min-h-screen bg-sky-100 flex items-center justify-center p-4 font-sans text-slate-900">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl text-center max-w-lg w-full">
        <div className="text-6xl mb-2">🏆</div>
        <h1 className="text-4xl font-extrabold text-sky-600 mb-2">Match Complete!</h1>
        <p className="text-slate-500 font-medium mb-6">Here is how you performed on {difficulty} mode.</p>
        
        <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-200">
           <div className="text-xl font-bold text-slate-500 mb-1">Final Score</div>
           <div className="text-5xl font-black text-amber-500 mb-6 drop-shadow-sm">{score}</div>
           
           <div className="grid grid-cols-2 gap-4 text-left">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                 <div className="text-slate-400 text-xs font-bold uppercase tracking-wide">Right Answers</div>
                 <div className="text-emerald-500 font-black text-3xl">{correctCount} <span className="text-lg text-slate-300">/ {totalRounds}</span></div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                 <div className="text-slate-400 text-xs font-bold uppercase tracking-wide">Wrong / Time Up</div>
                 <div className="text-rose-500 font-black text-3xl">{wrongCount}</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 col-span-2 flex justify-between items-center">
                 <div className="text-slate-400 text-xs font-bold uppercase tracking-wide">Accuracy</div>
                 <div className="text-indigo-500 font-black text-2xl">{Math.round((correctCount / totalRounds) * 100)}%</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 col-span-2 flex justify-between items-center">
                 <div className="text-slate-400 text-xs font-bold uppercase tracking-wide">Total Time Taken</div>
                 <div className="text-sky-600 font-black text-2xl">{formatTime(totalTime)}</div>
              </div>
           </div>
        </div>
        
        <button 
          onClick={restartGame}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xl py-4 px-8 w-full rounded-2xl shadow-lg transition-transform transform hover:-translate-y-1 active:scale-95"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};
