import React from 'react';
import { ArithmeticGame } from './ArithmeticGame';
import { Keypad } from '../../../components/game/Keypad';

export default {
  title: 'Math/ArithmeticGame',
  component: ArithmeticGame,
  decorators: [
    (Story) => (
      <div className="bg-slate-100 p-8 min-h-screen flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => (
  <ArithmeticGame 
    {...args} 
    CustomKeypad={() => (
      <Keypad 
        handlePress={() => {}} 
        feedback={args.feedback} 
        inputValue={args.inputValue} 
      />
    )} 
  />
);

export const Addition = Template.bind({});
Addition.args = {
  currentPuzzle: {
    a: 12,
    b: 15,
    operation: '+',
    answer: 27,
    type: 'arithmetic_input',
    hint: 'Try adding 12 and 15 step by step!'
  },
  feedback: null,
  inputValue: '',
  showHint: false
};

export const Subtraction = Template.bind({});
Subtraction.args = {
  currentPuzzle: {
    a: 45,
    b: 12,
    operation: '-',
    answer: 33,
    type: 'arithmetic_input',
    hint: 'What do you get when you take 12 away from 45?'
  },
  feedback: null,
  inputValue: '3',
  showHint: false
};

export const Multiplication = Template.bind({});
Multiplication.args = {
  currentPuzzle: {
    a: 7,
    b: 8,
    operation: '×',
    answer: 56,
    type: 'arithmetic_input',
    hint: 'Think of 7 groups of 8!'
  },
  feedback: 'correct',
  inputValue: '56',
  showHint: false
};

export const MultipleChoice = Template.bind({});
MultipleChoice.args = {
  currentPuzzle: {
    a: 8,
    b: 9,
    operation: '×',
    answer: 2,
    correctValue: 72,
    options: [64, 81, 72, 63],
    type: 'arithmetic_choice',
    hint: 'Think of 8 groups of 9!'
  },
  feedback: null,
  inputValue: '',
  showHint: false
};

export const NumberLine = Template.bind({});
NumberLine.args = {
  currentPuzzle: {
    value: 42,
    max: 50,
    step: 5,
    answer: 42,
    type: 'arithmetic_number_line',
    hint: 'Look at the marks on the line. What number is the dot on?'
  },
  feedback: null,
  inputValue: '4',
  showHint: false
};
