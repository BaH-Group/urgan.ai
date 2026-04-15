import React from 'react';

export const PrimeNumberGame = ({ 
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
    if (currentPuzzle.type === 'prime_is_prime' || currentPuzzle.type === 'prime_find_in_list') {
      return currentPuzzle.correctValue.toString();
    }
    return currentPuzzle.answer.toString();
  };

  const getTitle = () => {
    switch (currentPuzzle.type) {
      case 'prime_is_prime': return 'Is this a prime number?';
      case 'prime_find_in_list': return 'Which of these is a prime number?';
      case 'prime_next': return `What is the next prime after ${currentPuzzle.start}?`;
      case 'prime_smallest_factor': return `What is the smallest prime factor of ${currentPuzzle.number}?`;
      default: return 'Prime Number Challenge!';
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg p-6 md:p-10 relative overflow-hidden border border-slate-200">
      {/* Feedback Overlay */}
      {feedback && (
        <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm transition-opacity`}>
          <div className={`text-5xl md:text-7xl font-black flex flex-col items-center mb-6
            ${feedback === 'correct' ? 'text-emerald-500 animate-bounce' : 
              feedback === 'timeup' ? 'text-rose-500' : 'text-rose-500 animate-pulse'}`}>
            {feedback === 'correct' ? '🎉 Correct! 🎉' : 
             feedback === 'timeup' ? '⏰ Time is Up!' : '❌ Incorrect!'}
          </div>
          
          {(feedback === 'incorrect' || feedback === 'timeup') && (
            <div className="text-2xl md:text-4xl text-slate-700 bg-white px-8 py-4 rounded-2xl shadow-lg border-4 border-slate-100 mt-6">
              Correct Answer: <span className="text-emerald-500 font-black">{getCorrectAnswerDisplay()}</span>
            </div>
          )}
        </div>
      )}

      <h2 className="text-2xl md:text-3xl font-extrabold text-center text-slate-800 mb-10">
        {getTitle()}
      </h2>

      <div className="flex flex-col items-center justify-center w-full mb-8">
        {currentPuzzle.type === 'prime_is_prime' && (
          <div className="flex flex-col items-center gap-8 mb-8">
            <div className="text-8xl md:text-9xl font-black text-slate-700 bg-slate-50 p-12 rounded-3xl border border-slate-200 shadow-sm min-w-[240px] text-center">
              {currentPuzzle.number}
            </div>
            <div className="flex gap-6 w-full max-w-md">
              {currentPuzzle.options.map((opt, idx) => (
                <button 
                  key={opt}
                  onClick={() => handleAnswer(idx)}
                  className={`flex-1 py-8 rounded-2xl text-4xl font-black transition-all hover:-translate-y-1 hover:shadow-lg border-4 
                    ${opt === 'Yes' ? 'bg-emerald-50 border-emerald-100 text-emerald-600 hover:border-emerald-400' : 'bg-rose-50 border-rose-100 text-rose-600 hover:border-rose-400'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentPuzzle.type === 'prime_find_in_list' && (
          <div className="grid grid-cols-2 gap-4 md:gap-6 w-full max-w-lg mb-8">
            {currentPuzzle.options.map((opt, idx) => (
              <button 
                key={`${opt}-${idx}`}
                onClick={() => handleAnswer(idx)}
                className="py-8 bg-white border-4 border-slate-200 hover:border-sky-400 rounded-2xl text-5xl font-black text-slate-700 transition-all hover:-translate-y-1 hover:shadow-md"
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {(currentPuzzle.type === 'prime_next' || currentPuzzle.type === 'prime_smallest_factor') && (
          <div className="flex flex-col items-center w-full max-w-2xl bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm mb-8">
            <div className="text-7xl md:text-9xl font-black text-slate-700 mb-8">
              {currentPuzzle.type === 'prime_next' ? currentPuzzle.start : currentPuzzle.number}
            </div>
            <div className={`text-6xl md:text-8xl font-black min-w-[120px] h-24 md:h-32 flex items-center justify-center border-b-8 transition-colors ${inputValue ? 'border-emerald-500 text-emerald-600' : 'border-slate-300 text-slate-300'}`}>
              {inputValue || '?'}
            </div>
            <div className="mt-8 w-full">
              <CustomKeypad />
            </div>
          </div>
        )}
      </div>

      {/* Hint Section */}
      <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col items-center min-h-[100px]">
        {!showHint ? (
          <button 
            onClick={() => setShowHint(true)}
            className="text-slate-400 hover:text-amber-500 font-bold flex items-center gap-2 transition-colors"
          >
            <span>💡</span> Need a hint? (Costs 5 points)
          </button>
        ) : (
          <div className="bg-amber-50 border-2 border-amber-200 p-4 rounded-xl text-amber-800 text-center font-medium max-w-2xl">
            💡 <strong>Hint:</strong> {currentPuzzle.hint}
          </div>
        )}
      </div>
    </div>
  );
};
