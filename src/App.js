import React, { useState, useEffect } from 'react';
import { TOPIC_REGISTRY } from './topics';
import { StartScreen } from './components/game/StartScreen';
import { ResultScreen } from './components/game/ResultScreen';
import { Keypad } from './components/game/Keypad';

export default function App() {
  // Game Configuration States
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'result'
  const [difficulty, setDifficulty] = useState('medium');
  const [totalRounds, setTotalRounds] = useState(10);
  const [topic, setTopic] = useState('fractions');
  const [mode, setMode] = useState('mixed');

  // Playing States
  const [puzzleNumber, setPuzzleNumber] = useState(1);
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [feedback, setFeedback] = useState(null); 
  const [showHint, setShowHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [inputValue, setInputValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  
  // Tracking & Report States
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [totalTime, setTotalTime] = useState(0);

  const getTimeLimit = () => {
    if (difficulty === 'easy') return 30;
    if (difficulty === 'hard') return 10;
    return 20; // medium
  };

  const startGame = () => {
    const topicData = TOPIC_REGISTRY[topic];
    setScore(0);
    setCorrectCount(0);
    setWrongCount(0);
    setPuzzleNumber(1);
    setCurrentPuzzle(topicData.generator(mode));
    setTimeLeft(getTimeLimit());
    setStartTime(Date.now());
    setFeedback(null);
    setShowHint(false);
    setInputValue('');
    setSelectedOptions([]);
    setGameState('playing');
  };

  const nextPuzzle = () => {
    const topicData = TOPIC_REGISTRY[topic];
    if (puzzleNumber >= totalRounds) {
      setTotalTime(Math.floor((Date.now() - startTime) / 1000));
      setGameState('result');
    } else {
      setPuzzleNumber(p => p + 1);
      setCurrentPuzzle(topicData.generator(mode));
      setTimeLeft(getTimeLimit());
      setShowHint(false);
      setFeedback(null);
      setInputValue(''); 
      setSelectedOptions([]);
    }
  };

  // Timer Effect
  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0 && !feedback) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing' && !feedback) {
      handleAnswer(null, true);
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft, feedback]);

  const handleAnswer = (answer, isTimeUp = false) => {
    if (feedback) return;

    let isCorrect = false;
    if (!isTimeUp) {
      if (currentPuzzle.type === 'multiple_choice') {
        const sortedCorrect = [...currentPuzzle.answer].sort();
        const sortedSelected = [...answer].sort();
        isCorrect = JSON.stringify(sortedCorrect) === JSON.stringify(sortedSelected);
      } else {
        isCorrect = answer === currentPuzzle.answer;
      }
    }

    if (isCorrect) {
      setFeedback('correct');
      setScore(s => s + (timeLeft * 10) + (difficulty === 'hard' ? 50 : difficulty === 'medium' ? 25 : 10));
      setCorrectCount(c => c + 1);
    } else {
      setFeedback(isTimeUp ? 'timeup' : 'incorrect');
      setWrongCount(w => w + 1);
    }

    setTimeout(nextPuzzle, 2500);
  };

  const handleKeypadPress = (key) => {
    if (feedback !== null) return;
    if (key === 'Del') {
      setInputValue(prev => prev.slice(0, -1));
    } else {
      setInputValue(prev => (prev + key).slice(0, 3));
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  };

  if (gameState === 'start') {
    return (
      <StartScreen 
        topic={topic}
        setTopic={setTopic}
        mode={mode}
        setMode={setMode}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        totalRounds={totalRounds}
        setTotalRounds={setTotalRounds}
        startGame={startGame}
      />
    );
  }

  if (gameState === 'result') {
    return (
      <ResultScreen 
        difficulty={difficulty}
        score={score}
        correctCount={correctCount}
        totalRounds={totalRounds}
        wrongCount={wrongCount}
        totalTime={totalTime}
        formatTime={formatTime}
        restartGame={() => setGameState('start')}
      />
    );
  }

  const TopicGameComponent = TOPIC_REGISTRY[topic].component;

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans flex flex-col items-center text-slate-900">
      <div className="w-full max-w-4xl flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm mb-4 border border-slate-200">
        <div className="text-sky-600 font-bold text-lg">
          Round {puzzleNumber} / {totalRounds}
        </div>
        <div className="text-amber-500 font-black text-2xl">
          Score: {score}
        </div>
      </div>

      <div className="w-full max-w-4xl mb-6 relative">
        <div className="flex justify-between text-xs font-bold text-slate-500 mb-1 px-1">
          <span>Time Remaining</span>
          <span className={timeLeft <= 5 ? "text-rose-500 animate-pulse font-black" : ""}>{timeLeft}s</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden shadow-inner">
          <div 
            className={`h-full transition-all duration-1000 ease-linear ${timeLeft <= 5 ? 'bg-rose-500' : 'bg-emerald-400'}`} 
            style={{ width: `${(timeLeft / getTimeLimit()) * 100}%` }}
          ></div>
        </div>
      </div>

      <TopicGameComponent 
        currentPuzzle={currentPuzzle}
        feedback={feedback}
        inputValue={inputValue}
        setInputValue={setInputValue}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        handleAnswer={handleAnswer}
        showHint={showHint}
        setShowHint={(val) => {
          if (val && !showHint) setScore(s => Math.max(0, s - 5));
          setShowHint(val);
        }}
        CustomKeypad={() => (
          <Keypad 
            handlePress={handleKeypadPress}
            feedback={feedback}
            inputValue={inputValue}
            onSubmit={() => handleAnswer(parseInt(inputValue, 10))}
          />
        )}
      />
    </div>
  );
}
