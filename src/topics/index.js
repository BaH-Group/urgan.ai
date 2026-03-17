import { generateFractionPuzzle } from './fractions/generators';

export const TOPIC_REGISTRY = {
  fractions: {
    id: 'fractions',
    label: 'Fractions',
    icon: '🥧',
    generator: generateFractionPuzzle,
    modes: [
      { id: 'mixed', label: 'All Mixed Topics' },
      { id: 'compare', label: 'Comparing Fractions' },
      { id: 'equivalent', label: 'Equivalent Fractions' },
      { id: 'input', label: 'Missing Numerators' },
      { id: 'multiple_choice', label: 'Identify the Fraction' },
      { id: 'addition', label: 'Adding Fractions' },
      { id: 'number_line', label: 'Number Line' }
      ]
      }
      };