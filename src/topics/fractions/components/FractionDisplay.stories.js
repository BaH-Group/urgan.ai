import React from 'react';
import { FractionDisplay } from './FractionDisplay';

export default {
  title: 'Math/FractionDisplay',
  component: FractionDisplay,
  argTypes: {
    color: { control: 'color' },
    size: { control: { type: 'select', options: ['normal', 'large'] } },
    hidePie: { control: 'boolean' }
  }
};

const Template = (args) => <FractionDisplay {...args} />;

export const Half = Template.bind({});
Half.args = {
  frac: { n: 1, d: 2 },
  color: '#3b82f6',
  size: 'normal',
  hidePie: false
};

export const ThreeQuarters = Template.bind({});
ThreeQuarters.args = {
  frac: { n: 3, d: 4 },
  color: '#ec4899',
  size: 'large',
  hidePie: false
};

export const FiveSixths = Template.bind({});
FiveSixths.args = {
  frac: { n: 5, d: 6 },
  color: '#10b981',
  size: 'normal',
  hidePie: false
};

export const OnlyNumbers = Template.bind({});
OnlyNumbers.args = {
  frac: { n: 2, d: 3 },
  color: '#f59e0b',
  size: 'normal',
  hidePie: true
};
