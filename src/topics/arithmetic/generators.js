import { shuffleArray } from '../../utils/arrayHelpers';

const generateBaseArithmetic = (op = null) => {
  const operations = ['+', '-', '×', '÷'];
  const operation = op || operations[Math.floor(Math.random() * operations.length)];
  let a, b, answer;

  if (operation === '+') {
    a = Math.floor(Math.random() * 50) + 1;
    b = Math.floor(Math.random() * 50) + 1;
    answer = a + b;
  } else if (operation === '-') {
    a = Math.floor(Math.random() * 50) + 10;
    b = Math.floor(Math.random() * a) + 1;
    answer = a - b;
  } else if (operation === '×') {
    a = Math.floor(Math.random() * 12) + 1;
    b = Math.floor(Math.random() * 12) + 1;
    answer = a * b;
  } else {
    b = Math.floor(Math.random() * 10) + 1;
    answer = Math.floor(Math.random() * 10) + 1;
    a = b * answer;
  }

  return { a, b, operation, answer };
};

const generateInputPuzzle = (op = null) => {
  const base = generateBaseArithmetic(op);
  return {
    ...base,
    type: 'arithmetic_input',
    hint: `Calculate ${base.a} ${base.operation} ${base.b} and enter the result.`
  };
};

const generateMultipleChoicePuzzle = (op = null) => {
  const base = generateBaseArithmetic(op);
  const options = [base.answer];
  const used = new Set([base.answer]);

  while (options.length < 4) {
    const offset = Math.floor(Math.random() * 10) - 5;
    const wrong = base.answer + offset;
    if (wrong > 0 && !used.has(wrong)) {
      used.add(wrong);
      options.push(wrong);
    }
  }

  shuffleArray(options);
  const answerIdx = options.indexOf(base.answer);

  return {
    ...base,
    type: 'arithmetic_choice',
    options,
    answer: answerIdx,
    correctValue: base.answer,
    hint: `Which of these numbers is the result of ${base.a} ${base.operation} ${base.b}?`
  };
};

const generateNumberLinePuzzle = () => {
  const maxValues = [20, 50, 100];
  const max = maxValues[Math.floor(Math.random() * maxValues.length)];
  const value = Math.floor(Math.random() * max) + 1;
  const step = max === 20 ? 2 : max === 50 ? 5 : 10;

  return {
    type: 'arithmetic_number_line',
    value,
    max,
    step,
    answer: value,
    hint: `Look at the marks on the line. What number is the dot on?`
  };
};

export const generateArithmeticPuzzle = (mode) => {
  if (mode === 'number_line') return generateNumberLinePuzzle();
  if (mode === 'multiple_choice') return generateMultipleChoicePuzzle();

  const opMap = {
    'addition': '+',
    'subtraction': '-',
    'multiplication': '×',
    'division': '÷'
  };
  const op = opMap[mode] || null;

  if (mode === 'mixed') {
    const r = Math.random();
    if (r < 0.2) return generateNumberLinePuzzle();
    if (r < 0.6) return generateMultipleChoicePuzzle(op);
    return generateInputPuzzle(op);
  }

  return generateInputPuzzle(op);
};
