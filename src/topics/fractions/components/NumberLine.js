import React from 'react';
import { NumberLine as SharedNumberLine } from '../../../components/math/NumberLine';

export const NumberLine = ({ frac, color = "#3b82f6", showAnswer = false }) => {
  return (
    <SharedNumberLine 
      value={frac.n} 
      max={frac.d} 
      step={1} 
      color={color} 
      showAnswer={showAnswer} 
      labels={{ 0: '0', [frac.d]: '1' }}
    />
  );
};
