import { shuffleArray } from '../../utils/arrayHelpers';

const isPrime = (num) => {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
    if (num % i === 0) return false;
  }
  return num > 1;
};

const getPrimesInRange = (min, max) => {
  const primes = [];
  for (let i = min; i <= max; i++) {
    if (isPrime(i)) primes.push(i);
  }
  return primes;
};

const generateIsPrimePuzzle = () => {
  const range = Math.random() < 0.7 ? 50 : 100;
  const number = Math.floor(Math.random() * range) + 2;
  const answer = isPrime(number);

  return {
    type: 'prime_is_prime',
    number,
    answer: answer ? 0 : 1, // 0 for Yes, 1 for No
    correctValue: answer ? 'Yes' : 'No',
    options: ['Yes', 'No'],
    hint: `A prime number is only divisible by 1 and itself. Try dividing ${number} by 2, 3, 5, or 7.`
  };
};

const generateFindPrimeInList = () => {
  const primes = getPrimesInRange(2, 50);
  const correctPrime = primes[Math.floor(Math.random() * primes.length)];
  const options = [correctPrime];
  const used = new Set([correctPrime]);

  while (options.length < 4) {
    const wrong = Math.floor(Math.random() * 50) + 2;
    if (!isPrime(wrong) && !used.has(wrong)) {
      used.add(wrong);
      options.push(wrong);
    }
  }

  shuffleArray(options);
  const answerIdx = options.indexOf(correctPrime);

  return {
    type: 'prime_find_in_list',
    options,
    answer: answerIdx,
    correctValue: correctPrime,
    hint: `Only one of these numbers has exactly two factors (1 and itself).`
  };
};

const generateNextPrime = () => {
  const start = Math.floor(Math.random() * 30) + 2;
  let next = start + 1;
  while (!isPrime(next)) {
    next++;
  }

  return {
    type: 'prime_next',
    start,
    answer: next,
    hint: `What is the smallest number greater than ${start} that is only divisible by 1 and itself?`
  };
};

const generateSmallestPrimeFactor = () => {
  const nonPrimes = [];
  for (let i = 4; i < 50; i++) {
    if (!isPrime(i)) nonPrimes.push(i);
  }
  const number = nonPrimes[Math.floor(Math.random() * nonPrimes.length)];
  let smallestFactor = 2;
  while (number % smallestFactor !== 0) {
    smallestFactor++;
  }

  return {
    type: 'prime_smallest_factor',
    number,
    answer: smallestFactor,
    hint: `What is the smallest prime number that divides ${number}? Try 2, 3, 5, 7...`
  };
};

export const generatePrimePuzzle = (mode) => {
  if (mode === 'is_prime') return generateIsPrimePuzzle();
  if (mode === 'find_in_list') return generateFindPrimeInList();
  if (mode === 'next_prime') return generateNextPrime();
  if (mode === 'smallest_factor') return generateSmallestPrimeFactor();

  // Mixed mode
  const r = Math.random();
  if (r < 0.3) return generateIsPrimePuzzle();
  if (r < 0.6) return generateFindPrimeInList();
  if (r < 0.8) return generateNextPrime();
  return generateSmallestPrimeFactor();
};
