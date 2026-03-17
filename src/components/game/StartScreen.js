import React from 'react';
import { TOPIC_REGISTRY } from '../../topics';

export const StartScreen = ({ 
  topic, 
  setTopic, 
  mode, 
  setMode, 
  difficulty, 
  setDifficulty, 
  totalRounds, 
  setTotalRounds, 
  startGame 
}) => {
  const selectedTopicData = TOPIC_REGISTRY[topic];

  return (
    <div className="min-h-screen bg-slate-100 p-4 flex items-center justify-center font-sans text-slate-900">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-lg w-full">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{selectedTopicData.icon}</div>
          <h1 className="text-4xl font-extrabold text-sky-600">{selectedTopicData.label} Challenge</h1>
          <p className="text-slate-500 mt-2 font-medium">Test your skills in a race against time!</p>
        </div>
        
        <div className="mb-6">
          <label className="block text-slate-700 font-bold mb-3 uppercase tracking-wide text-sm">Select Topic</label>
          <div className="relative">
            <select 
              value={topic} 
              onChange={(e) => {
                setTopic(e.target.value);
                setMode('mixed'); // Reset mode when topic changes
              }}
              className="w-full p-4 rounded-xl font-bold border-2 border-slate-200 text-slate-700 bg-white hover:border-indigo-300 focus:border-indigo-500 focus:outline-none appearance-none shadow-sm cursor-pointer text-lg transition-colors"
            >
              {Object.values(TOPIC_REGISTRY).map(t => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
              <svg className="fill-current h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-slate-700 font-bold mb-3 uppercase tracking-wide text-sm">Select Mode</label>
          <div className="relative">
            <select 
              value={mode} 
              onChange={(e) => setMode(e.target.value)}
              className="w-full p-4 rounded-xl font-bold border-2 border-slate-200 text-slate-700 bg-white hover:border-indigo-300 focus:border-indigo-500 focus:outline-none appearance-none shadow-sm cursor-pointer text-lg transition-colors"
            >
              {selectedTopicData.modes.map(m => (
                <option key={m.id} value={m.id}>{m.label}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
              <svg className="fill-current h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-slate-700 font-bold mb-3 uppercase tracking-wide text-sm">Select Difficulty</label>
          <div className="flex gap-2">
              {['easy', 'medium', 'hard'].map(d => (
                <button 
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`flex-1 py-3 capitalize rounded-xl font-bold border-2 transition-all ${difficulty === d ? 'bg-sky-500 text-white border-sky-500 shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:border-sky-300'}`}
                >{d}</button>
              ))}
          </div>
          <p className="text-sm text-sky-600 mt-2 text-center font-medium bg-sky-50 py-1 rounded-lg">
            {difficulty === 'easy' ? '⏱️ 30 seconds per question' : difficulty === 'medium' ? '⏱️ 20 seconds per question' : '⏱️ 10 seconds per question'}
          </p>
        </div>

        <div className="mb-10">
          <label className="block text-slate-700 font-bold mb-3 uppercase tracking-wide text-sm">Number of Questions</label>
          <div className="flex gap-2">
              {[5, 10, 15, 20].map(num => (
                <button 
                  key={num}
                  onClick={() => setTotalRounds(num)}
                  className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all ${totalRounds === num ? 'bg-amber-400 text-white border-amber-400 shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:border-amber-300'}`}
                >{num}</button>
              ))}
          </div>
        </div>

        <button onClick={startGame} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-2xl py-4 rounded-2xl shadow-lg transition-transform transform hover:-translate-y-1 active:scale-95">
          START GAME
        </button>
      </div>
    </div>
  );
};
