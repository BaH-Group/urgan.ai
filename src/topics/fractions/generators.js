import { shuffleArray } from '../../utils/arrayHelpers';

// --- DYNAMIC PUZZLE GENERATORS ---

const generateEquivalentPuzzle = () => {
  const bases = [
    { n: 1, d: 2 }, { n: 1, d: 3 }, { n: 2, d: 3 }, 
    { n: 1, d: 4 }, { n: 3, d: 4 }, { n: 1, d: 5 },
    { n: 1, d: 1 } // One Whole
  ];
  const base = bases[Math.floor(Math.random() * bases.length)];
  
  const targetM = Math.floor(Math.random() * 2) + 1; 
  const target = { n: base.n * targetM, d: base.d * targetM };

  let correctM = Math.floor(Math.random() * 3) + 1;
  while (correctM === targetM) {
    correctM = Math.floor(Math.random() * 3) + 1;
  }
  const correctOpt = { n: base.n * correctM, d: base.d * correctM };

  const options = [correctOpt];
  const used = new Set([`${correctOpt.n}/${correctOpt.d}`]);
  
  while (options.length < 3) {
    const wrongD = Math.floor(Math.random() * 10) + 3; 
    const wrongN = Math.floor(Math.random() * wrongD) + 1; 
    const key = `${wrongN}/${wrongD}`;
    
    if (!used.has(key) && (wrongN / wrongD !== base.n / base.d)) {
      used.add(key);
      options.push({ n: wrongN, d: wrongD });
    }
  }

  shuffleArray(options);
  const answer = options.findIndex(o => o.n === correctOpt.n && o.d === correctOpt.d);

  return { 
    type: "equivalent", 
    target, 
    options, 
    answer, 
    hint: "Look for a fraction that takes up the exact same amount of space, even if the pieces are cut smaller." 
  };
};

const generateComparePuzzle = () => {
  const type = Math.random();
  let f1, f2, hint;

  if (type < 0.33) {
    const d = Math.floor(Math.random() * 8) + 3; 
    const n1 = Math.floor(Math.random() * (d - 1)) + 1;
    let n2 = Math.floor(Math.random() * (d - 1)) + 1;
    while (n1 === n2) n2 = Math.floor(Math.random() * (d - 1)) + 1;
    f1 = { n: n1, d };
    f2 = { n: n2, d };
    hint = "Rule 1: The denominators are the same. Which has MORE pieces?";
  } else if (type < 0.66) {
    const n = Math.floor(Math.random() * 5) + 1;
    let d1 = Math.floor(Math.random() * 6) + n + 1;
    let d2 = Math.floor(Math.random() * 6) + n + 1;
    while (d1 === d2) d2 = Math.floor(Math.random() * 6) + n + 1;
    f1 = { n, d: d1 };
    f2 = { n, d: d2 };
    hint = "Rule 2: The numerators are the same. A bigger bottom number means SMALLER slices!";
  } else {
    const baseDen = Math.floor(Math.random() * 4) + 2; 
    const baseNum = Math.floor(Math.random() * (baseDen - 1)) + 1;
    
    if (Math.random() > 0.5) {
      const m1 = Math.floor(Math.random() * 2) + 1;
      const m2 = Math.floor(Math.random() * 2) + 2;
      f1 = { n: baseNum * m1, d: baseDen * m1 };
      f2 = { n: baseNum * m2, d: baseDen * m2 };
      hint = "Rule 3: Simplify them! They might cover the exact same amount of space.";
    } else {
      f1 = { n: Math.floor(Math.random() * 4) + 1, d: Math.floor(Math.random() * 4) + 2 };
      f2 = { n: Math.floor(Math.random() * 4) + 1, d: Math.floor(Math.random() * 4) + 2 };
      while (f1.n / f1.d === f2.n / f2.d) {
        f2.d = Math.floor(Math.random() * 4) + 2;
      }
      hint = "Rule 3: Try comparing both of them to 1/2 to see which one is bigger.";
    }
  }

  const val1 = f1.n / f1.d;
  const val2 = f2.n / f2.d;
  let answer = "=";
  if (Math.abs(val1 - val2) < 0.001) answer = "=";
  else if (val1 > val2) answer = ">";
  else answer = "<";

  return { type: "compare", f1, f2, answer, hint };
};

const generateInputPuzzle = () => {
  const bases = [{n: 1, d: 2}, {n: 1, d: 3}, {n: 2, d: 3}, {n: 1, d: 4}, {n: 3, d: 4}];
  const base = bases[Math.floor(Math.random() * bases.length)];
  const multiplier = Math.floor(Math.random() * 3) + 2; 
  
  const targetDen = base.d * multiplier;
  const answer = base.n * multiplier;
  
  return {
    type: "input",
    f1: base,
    f2: { d: targetDen }, 
    answer: answer,
    hint: `What do you multiply ${base.d} by to get ${targetDen}? Multiply the top number by that same amount!`
  };
};

const generateMultipleChoicePuzzle = () => {
  const bases = [{n: 1, d: 2}, {n: 1, d: 3}, {n: 2, d: 3}, {n: 1, d: 4}, {n: 3, d: 4}, {n: 1, d: 5}];
  const base = bases[Math.floor(Math.random() * bases.length)];
  
  const targetM = Math.floor(Math.random() * 3) + 1;
  const target = { n: base.n * targetM, d: base.d * targetM };

  const numCorrect = Math.floor(Math.random() * 2) + 2; 
  const options = [];
  const usedMultipliers = new Set();

  while(options.length < numCorrect) {
    const m = Math.floor(Math.random() * 5) + 1; 
    if (!usedMultipliers.has(m)) {
      usedMultipliers.add(m);
      options.push({ n: base.n * m, d: base.d * m, isCorrect: true });
    }
  }

  while (options.length < 4) {
    const wrongD = Math.floor(Math.random() * 10) + 2; 
    const wrongN = Math.floor(Math.random() * wrongD) + 1;
    
    if ((wrongN / wrongD) !== (base.n / base.d)) {
       const isDuplicate = options.some(o => o.n === wrongN && o.d === wrongD);
       if (!isDuplicate) {
          options.push({ n: wrongN, d: wrongD, isCorrect: false });
       }
    }
  }

  shuffleArray(options);
  
  const answer = [];
  options.forEach((opt, idx) => {
    if (opt.isCorrect) answer.push(idx);
  });

  return {
    type: "multiple_choice",
    target,
    options,
    answer,
    hint: "Look closely! There is MORE THAN ONE correct fraction. Select ALL of them!"
  };
};

const generateAdditionPuzzle = () => {
  const d = Math.floor(Math.random() * 7) + 3; 
  const n1 = Math.floor(Math.random() * (d - 1)) + 1; 
  const n2 = Math.floor(Math.random() * (d - n1)) + 1; 
  
  return {
    type: "addition",
    f1: { n: n1, d },
    f2: { n: n2, d },
    f3: { d }, 
    answer: n1 + n2,
    hint: "When the bottom numbers are the same, just add the top numbers together!"
  };
};

const generateNumberLinePuzzle = () => {
  const d = Math.floor(Math.random() * 7) + 3; // Denominator 3 to 9
  const n = Math.floor(Math.random() * (d - 1)) + 1; // Numerator 1 to d-1
  const target = { n, d };

  const options = [{ n, d, isCorrect: true }];
  const used = new Set([`${n}/${d}`]);

  while (options.length < 3) {
    const wrongD = Math.floor(Math.random() * 7) + 3;
    const wrongN = Math.floor(Math.random() * (wrongD - 1)) + 1;
    const key = `${wrongN}/${wrongD}`;

    if (!used.has(key) && (wrongN / wrongD !== n / d)) {
      used.add(key);
      options.push({ n: wrongN, d: wrongD, isCorrect: false });
    }
  }

  shuffleArray(options);
  const answer = options.findIndex(o => o.isCorrect);

  return {
    type: "number_line",
    target,
    options,
    answer,
    hint: `Count the spaces between 0 and 1. That's your denominator! Then count how many spaces the dot has moved from 0.`
  };
};

export const generateFractionPuzzle = (topic) => {
  if (topic === 'compare') return generateComparePuzzle();
  if (topic === 'equivalent') return generateEquivalentPuzzle();
  if (topic === 'input') return generateInputPuzzle();
  if (topic === 'multiple_choice') return generateMultipleChoicePuzzle();
  if (topic === 'addition') return generateAdditionPuzzle();
  if (topic === 'number_line') return generateNumberLinePuzzle();
  
  const r = Math.random();
  if (r < 0.15) return generateComparePuzzle();
  if (r < 0.30) return generateEquivalentPuzzle();
  if (r < 0.45) return generateInputPuzzle();
  if (r < 0.60) return generateMultipleChoicePuzzle();
  if (r < 0.75) return generateAdditionPuzzle();
  return generateNumberLinePuzzle();
};
