import { generateFractionPuzzle } from './fractions/generators';
import { FractionGame } from './fractions/components/FractionGame';
import { generateArithmeticPuzzle } from './arithmetic/generators';
import { ArithmeticGame } from './arithmetic/components/ArithmeticGame';

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
  }
};
