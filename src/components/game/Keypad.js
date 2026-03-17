import React from 'react';

export const Keypad = ({ handlePress, feedback, inputValue, onSubmit }) => {
  return (
    <div className="grid grid-cols-3 gap-2 w-full max-w-[240px] mx-auto mt-6">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <button
          key={num}
          onClick={() => handlePress(num.toString())}
          disabled={feedback !== null}
          className="bg-white border-2 border-slate-200 hover:border-sky-400 hover:bg-sky-50 text-slate-700 font-black py-3 rounded-xl shadow-sm text-2xl transition-all disabled:opacity-50 active:scale-95"
        >
          {num}
        </button>
      ))}
      <button
        onClick={() => handlePress('Del')}
        disabled={feedback !== null || inputValue === ''}
        className="bg-rose-50 border-2 border-rose-200 hover:border-rose-400 hover:bg-rose-100 text-rose-600 font-black py-3 rounded-xl shadow-sm text-xl transition-all disabled:opacity-50 active:scale-95 flex justify-center items-center"
      >
        ⌫
      </button>
      <button
        onClick={() => handlePress('0')}
        disabled={feedback !== null}
        className="bg-white border-2 border-slate-200 hover:border-sky-400 hover:bg-sky-50 text-slate-700 font-black py-3 rounded-xl shadow-sm text-2xl transition-all disabled:opacity-50 active:scale-95"
      >
        0
      </button>
      <button
        onClick={onSubmit}
        disabled={inputValue === '' || feedback !== null}
        className="bg-emerald-500 border-2 border-emerald-600 hover:bg-emerald-600 text-white font-black py-3 rounded-xl shadow-sm text-2xl transition-all disabled:opacity-50 active:scale-95 flex justify-center items-center"
      >
        ✓
      </button>
    </div>
  );
};
