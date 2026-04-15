import React from 'react';
import { FractionDisplay, renderPie } from './FractionDisplay';
import { NumberLine } from './NumberLine';

export const FractionGame = ({ 
  currentPuzzle, 
  feedback, 
  inputValue, 
  setInputValue, 
  selectedOptions, 
  setSelectedOptions, 
  handleAnswer, 
  CustomKeypad,
  showHint,
  setShowHint
}) => {
  const getCorrectAnswerDisplay = () => {
    if (!currentPuzzle) return '';
    if (currentPuzzle.type === 'compare') return currentPuzzle.answer;
    if (currentPuzzle.type === 'input' || currentPuzzle.type === 'addition') return currentPuzzle.answer;
    if (currentPuzzle.type === 'equivalent') {
      const opt = currentPuzzle.options[currentPuzzle.answer];
      return `${opt.n} / ${opt.d}`;
    }
    if (currentPuzzle.type === 'multiple_choice') {
      return currentPuzzle.answer.map(idx => `${currentPuzzle.options[idx].n} / ${currentPuzzle.options[idx].d}`).join(', ');
    }
    return '';
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
        {currentPuzzle.type === "compare" ? "Which symbol makes this true?" : 
         currentPuzzle.type === "input" ? "Fill in the missing number!" : 
         currentPuzzle.type === "addition" ? "Add the fractions together!" : 
         currentPuzzle.type === "multiple_choice" ? "Select ALL matching fractions!" : 
         currentPuzzle.type === "number_line" ? "Which fraction is shown on the number line?" :
         "Find the matching equivalent fraction!"}
      </h2>

      {/* Puzzle Type: COMPARE */}
      {currentPuzzle.type === "compare" && (
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-6">
          <FractionDisplay frac={currentPuzzle.f1} color="#3b82f6" size="medium" />
          
          <div className="flex flex-row md:flex-col gap-3">
            <button onClick={() => handleAnswer(">")} className="w-14 h-14 md:w-16 md:h-16 bg-slate-100 hover:bg-amber-100 border-4 border-slate-200 hover:border-amber-400 rounded-2xl text-3xl font-black text-slate-700 hover:text-amber-600 transition-all shadow-sm">&gt;</button>
            <button onClick={() => handleAnswer("=")} className="w-14 h-14 md:w-16 md:h-16 bg-slate-100 hover:bg-emerald-100 border-4 border-slate-200 hover:border-emerald-400 rounded-2xl text-3xl font-black text-slate-700 hover:text-emerald-600 transition-all shadow-sm">=</button>
            <button onClick={() => handleAnswer("<")} className="w-14 h-14 md:w-16 md:h-16 bg-slate-100 hover:bg-rose-100 border-4 border-slate-200 hover:border-rose-400 rounded-2xl text-3xl font-black text-slate-700 hover:text-rose-600 transition-all shadow-sm">&lt;</button>
          </div>

          <FractionDisplay frac={currentPuzzle.f2} color="#ec4899" size="medium" />
        </div>
      )}

      {/* Puzzle Type: NUMBER LINE */}
      {currentPuzzle.type === "number_line" && (
        <div className="flex flex-col items-center">
          <div className="mb-6 w-full max-w-2xl bg-slate-50 p-4 md:p-6 rounded-3xl border-4 border-slate-100 shadow-inner overflow-x-auto">
            <NumberLine frac={currentPuzzle.target} color="#f59e0b" showAnswer={feedback !== null} />
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {currentPuzzle.options.map((opt, idx) => (
              <button 
                key={`${opt.n}/${opt.d}-${idx}`}
                onClick={() => handleAnswer(idx)}
                className="px-6 py-4 bg-white border-4 border-slate-200 hover:border-amber-400 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <FractionDisplay frac={opt} color="#f59e0b" hidePie={true} size="small" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Puzzle Type: EQUIVALENT */}
      {currentPuzzle.type === "equivalent" && (
        <div className="flex flex-col items-center">
          <div className="mb-6 p-4 bg-sky-50 rounded-3xl border-4 border-sky-100 shadow-inner w-full max-w-xs">
            <p className="text-center text-sky-700 font-bold mb-2 text-sm uppercase tracking-wide">Target</p>
            <FractionDisplay frac={currentPuzzle.target} color="#8b5cf6" size="medium" />
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {currentPuzzle.options.map((opt, idx) => (
              <button 
                key={`${opt.n}/${opt.d}-${idx}`}
                onClick={() => handleAnswer(idx)}
                className="px-6 py-4 bg-white border-4 border-slate-200 hover:border-emerald-400 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <FractionDisplay frac={opt} color="#10b981" hidePie={true} size="small" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Puzzle Type: MULTIPLE CHOICE */}
      {currentPuzzle.type === "multiple_choice" && (
        <div className="flex flex-col items-center">
          <div className="mb-6 p-4 bg-sky-50 rounded-3xl border-4 border-sky-100 shadow-inner w-full max-w-[140px] flex justify-center">
            <svg width="100" height="100" viewBox="0 0 100 100" className="drop-shadow-md">
              {renderPie(currentPuzzle.target.n, currentPuzzle.target.d, "#3b82f6")}
            </svg>
          </div>
          
          <div className="grid grid-cols-2 gap-3 md:gap-4 w-full max-w-md">
            {currentPuzzle.options.map((opt, idx) => (
              <button 
                key={`${opt.n}/${opt.d}-${idx}`}
                onClick={() => {
                  if (selectedOptions.includes(idx)) {
                    setSelectedOptions(selectedOptions.filter(i => i !== idx));
                  } else {
                    setSelectedOptions([...selectedOptions, idx]);
                  }
                }}
                className={`py-4 bg-white border-4 rounded-xl transition-all shadow-sm flex justify-center ${selectedOptions.includes(idx) ? 'border-amber-400 bg-amber-50 shadow-md scale-105' : 'border-slate-200 hover:border-sky-400 hover:-translate-y-1 hover:shadow-md'}`}
              >
                <FractionDisplay frac={opt} color="#3b82f6" hidePie={true} size="small" />
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => handleAnswer(selectedOptions)}
            disabled={selectedOptions.length === 0 || feedback !== null}
            className="mt-6 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 text-white font-bold rounded-full text-lg shadow-md transition-transform transform hover:-translate-y-1 active:scale-95"
          >
            Check Answer
          </button>
        </div>
      )}

      {/* Puzzle Type: INPUT */}
      {currentPuzzle.type === "input" && (
        <div className="flex flex-col items-center justify-center w-full mb-4">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-sm w-full max-w-2xl justify-center mb-6">
            <FractionDisplay frac={currentPuzzle.f1} color="#3b82f6" size="medium" />
            <div className="text-4xl font-black text-slate-300">=</div>
            <div className="flex flex-col items-center gap-2">
              <svg width="100" height="100" viewBox="0 0 100 100" className="drop-shadow-md">
                {renderPie(parseInt(inputValue || 0, 10), currentPuzzle.f2.d, "#10b981")}
              </svg>
              <div className="flex flex-col items-center font-black text-2xl text-slate-700">
                <div className={`w-16 h-8 flex items-center justify-center border-b-4 ${inputValue ? 'border-emerald-500 text-emerald-600' : 'border-slate-300 text-slate-300'} bg-white rounded-t-lg transition-colors`}>
                  {inputValue || '?'}
                </div>
                <div className="h-1 w-full bg-slate-700 my-1 rounded"></div>
                <span>{currentPuzzle.f2.d}</span>
              </div>
            </div>
          </div>
          <div className="transform scale-90">
            <CustomKeypad />
          </div>
        </div>
      )}

      {/* Puzzle Type: ADDITION */}
      {currentPuzzle.type === "addition" && (
        <div className="flex flex-col items-center justify-center w-full mb-4">
          <div className="flex flex-row items-center gap-3 md:gap-6 bg-slate-50 p-4 md:p-6 rounded-3xl border border-slate-200 shadow-sm overflow-x-auto w-full max-w-3xl justify-center mb-6">
            <FractionDisplay frac={currentPuzzle.f1} color="#3b82f6" size="small" />
            <div className="text-3xl font-black text-slate-300">+</div>
            <FractionDisplay frac={currentPuzzle.f2} color="#ec4899" size="small" />
            <div className="text-3xl font-black text-slate-300">=</div>
            <div className="flex flex-col items-center gap-2">
              <svg width="60" height="60" viewBox="0 0 100 100" className="drop-shadow-md shrink-0">
                {renderPie(parseInt(inputValue || 0, 10), currentPuzzle.f3.d, "#10b981")}
              </svg>
              <div className="flex flex-col items-center font-black text-xl text-slate-700">
                <div className={`w-12 h-6 flex items-center justify-center border-b-4 ${inputValue ? 'border-emerald-500 text-emerald-600' : 'border-slate-300 text-slate-300'} bg-white rounded-t-lg transition-colors`}>
                  {inputValue || '?'}
                </div>
                <div className="h-0.5 w-full bg-slate-700 my-0.5 rounded"></div>
                <span>{currentPuzzle.f3.d}</span>
              </div>
            </div>
          </div>
          <div className="transform scale-90">
            <CustomKeypad />
          </div>
        </div>
      )}

      {/* Hint Section */}
      <div className="mt-4 pt-4 border-t border-slate-200 flex flex-col items-center min-h-[60px]">
        {!showHint ? (
          <button 
            onClick={() => setShowHint(true)}
            className="text-slate-400 hover:text-amber-500 font-bold flex items-center gap-2 transition-colors text-sm"
          >
            <span>💡</span> Need a hint? (Costs 5 points)
          </button>
        ) : (
          <div className="bg-amber-50 border-2 border-amber-200 p-2 rounded-xl text-amber-800 text-center font-medium max-w-xl text-xs md:text-sm">
            💡 <strong>Hint:</strong> {currentPuzzle.hint}
          </div>
        )}
      </div>
    </div>
  );
};
