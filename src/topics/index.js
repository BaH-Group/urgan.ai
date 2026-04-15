import { generateFractionPuzzle } from './fractions/generators';
import { FractionGame } from './fractions/components/FractionGame';
import { generateArithmeticPuzzle } from './arithmetic/generators';
import { ArithmeticGame } from './arithmetic/components/ArithmeticGame';
import { generateAreaPuzzle } from './area/generators';
import { AreaGame } from './area/components/AreaGame';
import { generatePrimePuzzle } from './prime-number/generators';
import { PrimeNumberGame } from './prime-number/components/PrimeNumberGame';

export const TOPIC_REGISTRY = {
  fractions: {
    id: 'fractions',
    label: 'Fractions',
    icon: '🥧',
    generator: generateFractionPuzzle,
    component: FractionGame,
    modes: [
      { id: 'mixed', label: 'All Mixed Topics' },
      { id: 'compare', label: 'Comparing Fractions' },
      { id: 'equivalent', label: 'Equivalent Fractions' },
      { id: 'input', label: 'Missing Numerators' },
      { id: 'multiple_choice', label: 'Identify the Fraction' },
      { id: 'addition', label: 'Adding Fractions' },
      { id: 'number_line', label: 'Number Line' }
    ]
  },
  arithmetic: {
    id: 'arithmetic',
    label: 'Arithmetic',
    icon: '➕',
    generator: generateArithmeticPuzzle,
    component: ArithmeticGame,
    modes: [
      { id: 'mixed', label: 'All Mixed Operations' },
      { id: 'multiple_choice', label: 'Select the Answer (Multiple Choice)' },
      { id: 'number_line', label: 'Answer on the Line' },
      { id: 'addition', label: 'Addition' },
      { id: 'subtraction', label: 'Subtraction' },
      { id: 'multiplication', label: 'Multiplication' },
      { id: 'division', label: 'Division' }
    ]
  },
  area: {
    id: 'area',
    label: 'Area',
    icon: '📐',
    generator: generateAreaPuzzle,
    component: AreaGame,
    modes: [
      { id: 'mixed', label: 'All Mixed Area' },
      { id: 'grid', label: 'Grid Models (Unit Squares)' },
      { id: 'rectangles', label: 'Rectangles' },
      { id: 'squares', label: 'Squares' }
    ]
  },
  prime_numbers: {
    id: 'prime_numbers',
    label: 'Prime Numbers',
    icon: '🔢',
    generator: generatePrimePuzzle,
    component: PrimeNumberGame,
    modes: [
      { id: 'mixed', label: 'All Mixed Primes' },
      { id: 'is_prime', label: 'Is it Prime?' },
      { id: 'find_in_list', label: 'Find the Prime' },
      { id: 'next_prime', label: 'Next Prime' },
      { id: 'smallest_factor', label: 'Smallest Prime Factor' }
    ]
  }
};
