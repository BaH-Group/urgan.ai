import React from 'react';
import { Keypad } from './Keypad';

export default {
  title: 'Game/Keypad',
  component: Keypad,
  decorators: [
    (Story) => (
      <div className="bg-slate-100 p-8 min-h-[400px] flex items-center justify-center">
        <div className="bg-white p-10 rounded-3xl shadow-lg border border-slate-200 w-full max-w-md">
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    handlePress: { action: 'pressed' },
    onSubmit: { action: 'submitted' },
    feedback: { 
      control: { type: 'select', options: [null, 'correct', 'incorrect', 'timeup'] } 
    }
  }
};

const Template = (args) => <Keypad {...args} />;

export const Default = Template.bind({});
Default.args = {
  feedback: null,
  inputValue: ''
};

export const WithInput = Template.bind({});
WithInput.args = {
  feedback: null,
  inputValue: '12'
};

export const Correct = Template.bind({});
Correct.args = {
  feedback: 'correct',
  inputValue: '42'
};

export const Incorrect = Template.bind({});
Incorrect.args = {
  feedback: 'incorrect',
  inputValue: '13'
};

export const TimeUp = Template.bind({});
TimeUp.args = {
  feedback: 'timeup',
  inputValue: ''
};
