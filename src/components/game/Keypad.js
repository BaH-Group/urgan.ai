import React from 'react';

export const Keypad = ({ onKeyPress, onSubmit, onBackspace, disabled, inputValue }) => (
  <div className="grid grid-cols-3 gap-2 w-full max-w-[240px] mx-auto mt-6">
    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
      <button
        key={num}
        onClick={() => onKeyPress(num.toString())}
        disabled={disabled}
        className="bg-white border-2 border-slate-200 hover:border-sky-400 text-slate-700 font-black py-3 rounded-xl text-2xl"
      >
        {num}
      </button>
    ))}
    <button onClick={onBackspace} disabled={disabled || !inputValue} className="bg-rose-50 border-rose-200 text-rose-600 py-3 rounded-xl text-xl">⌫</button>
    <button onClick={() => onKeyPress('0')} disabled={disabled} className="bg-white border-slate-200 text-slate-700 py-3 rounded-xl text-2xl">0</button>
    <button onClick={onSubmit} disabled={!inputValue || disabled} className="bg-emerald-500 text-white py-3 rounded-xl text-2xl">✓</button>
  </div>
);