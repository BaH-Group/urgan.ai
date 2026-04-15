import React from 'react';
import { NumberLine } from '../../../components/math/NumberLine';

export const ArithmeticGame = ({ 
  currentPuzzle, 
  feedback, 
  inputValue, 
  setInputValue, 
  handleAnswer, 
  CustomKeypad,
  showHint,
  setShowHint
}) => {
  const getCorrectAnswerDisplay = () => {
    if (!currentPuzzle) return '';
    if (currentPuzzle.type === 'arithmetic_choice') {
      return currentPuzzle.correctValue.toString();
    }
    return currentPuzzle.answer.toString();
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
        {currentPuzzle.type === 'arithmetic_choice' ? 'Select the correct answer!' : 
         currentPuzzle.type === 'arithmetic_number_line' ? 'What number is shown on the line?' :
         'Solve the arithmetic problem!'}
      </h2>

      <div className="flex flex-col items-center justify-center w-full mb-4">
        {currentPuzzle.type !== 'arithmetic_number_line' ? (
          <div className="flex flex-row items-center gap-4 md:gap-8 bg-slate-50 p-6 md:p-10 rounded-3xl border border-slate-200 shadow-sm w-full max-w-2xl justify-center mb-6">
            <div className="text-5xl md:text-7xl font-black text-slate-700">{currentPuzzle.a}</div>
            <div className="text-4xl md:text-6xl font-black text-sky-500">{currentPuzzle.operation}</div>
            <div className="text-5xl md:text-7xl font-black text-slate-700">{currentPuzzle.b}</div>
            <div className="text-4xl md:text-6xl font-black text-slate-300">=</div>

            {currentPuzzle.type === 'arithmetic_input' && (
              <div className={`text-5xl md:text-7xl font-black min-w-[80px] h-20 md:h-24 flex items-center justify-center border-b-8 transition-colors ${inputValue ? 'border-emerald-500 text-emerald-600' : 'border-slate-300 text-slate-300'}`}>
                {inputValue || '?'}
              </div>
            )}

            {currentPuzzle.type === 'arithmetic_choice' && (
              <div className="text-5xl md:text-7xl font-black text-amber-500">?</div>
            )}
          </div>
        ) : (
          <div className="w-full max-w-2xl bg-slate-50 p-6 md:p-10 rounded-3xl border border-slate-200 shadow-sm mb-6">
            <div className="transform scale-90 md:scale-100">
              <NumberLine 
                value={currentPuzzle.value} 
                max={currentPuzzle.max} 
                step={currentPuzzle.step} 
                color="#f59e0b" 
                showAnswer={feedback !== null} 
              />
            </div>
            <div className="flex justify-center mt-6">
              <div className={`text-5xl md:text-7xl font-black min-w-[80px] h-20 md:h-24 flex items-center justify-center border-b-8 transition-colors ${inputValue ? 'border-emerald-500 text-emerald-600' : 'border-slate-300 text-slate-300'}`}>
                {inputValue || '?'}
              </div>
            </div>
          </div>
        )}

        {(currentPuzzle.type === 'arithmetic_input' || currentPuzzle.type === 'arithmetic_number_line') && (
          <div className="transform scale-90 md:scale-100">
            <CustomKeypad />
          </div>
        )}

        {currentPuzzle.type === 'arithmetic_choice' && (
          <div className="grid grid-cols-2 gap-3 md:gap-4 w-full max-w-md">
            {currentPuzzle.options.map((opt, idx) => (
              <button 
                key={`${opt}-${idx}`}
                onClick={() => handleAnswer(idx)}
                className="py-4 md:py-6 bg-white border-4 border-slate-200 hover:border-sky-400 rounded-2xl text-3xl md:text-4xl font-black text-slate-700 transition-all hover:-translate-y-1 hover:shadow-md"
              >
                {opt}
              </button>
            ))}
          </div>
        )}
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
