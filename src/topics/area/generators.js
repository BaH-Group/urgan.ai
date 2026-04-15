import { shuffleArray } from '../../utils/arrayHelpers';

const generateRectangleArea = () => {
  const width = Math.floor(Math.random() * 10) + 2;
  const height = Math.floor(Math.random() * 8) + 2;
  return {
    type: 'area_rect',
    width,
    height,
    answer: width * height,
    hint: `Area is length times width: ${width} × ${height}`
  };
};

const generateSquareArea = () => {
  const side = Math.floor(Math.random() * 9) + 2;
  return {
    type: 'area_square',
    side,
    answer: side * side,
    hint: `A square has equal sides. Multiply side by itself: ${side} × ${side}`
  };
};

const generateGridArea = () => {
  const width = Math.floor(Math.random() * 6) + 2;
  const height = Math.floor(Math.random() * 5) + 2;
  return {
    type: 'area_grid',
    width,
    height,
    answer: width * height,
    hint: `Count the number of unit squares inside the shape!`
  };
};

export const generateAreaPuzzle = (mode) => {
  if (mode === 'rectangles') return generateRectangleArea();
  if (mode === 'squares') return generateSquareArea();
  if (mode === 'grid') return generateGridArea();

  const r = Math.random();
  if (r < 0.4) return generateRectangleArea();
  if (r < 0.7) return generateSquareArea();
  return generateGridArea();
};
