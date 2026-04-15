import React from 'react';
import { AreaGame } from './AreaGame';
import { Keypad } from '../../../components/game/Keypad';

export default {
  title: 'Math/AreaGame',
  component: AreaGame,
  decorators: [
    (Story) => (
      <div className="bg-slate-100 p-8 min-h-screen flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

const Template = (args) => (
  <AreaGame 
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

export const Rectangle = Template.bind({});
Rectangle.args = {
  currentPuzzle: {
    type: 'area_rect',
    width: 10,
    height: 6,
    answer: 60,
    hint: 'Area is length times width: 10 × 6'
  },
  feedback: null,
  inputValue: '',
  showHint: false
};

export const Square = Template.bind({});
Square.args = {
  currentPuzzle: {
    type: 'area_square',
    side: 7,
    answer: 49,
    hint: 'A square has equal sides. Multiply side by itself: 7 × 7'
  },
  feedback: 'correct',
  inputValue: '49',
  showHint: false
};

export const Grid = Template.bind({});
Grid.args = {
  currentPuzzle: {
    type: 'area_grid',
    width: 5,
    height: 4,
    answer: 20,
    hint: 'Count the number of unit squares inside the shape!'
  },
  feedback: null,
  inputValue: '',
  showHint: false
};
