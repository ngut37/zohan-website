import Color from 'color';

type ColorMap = Record<string, Color>;

const base: ColorMap = {
  white: Color('#fff'),
  black: Color('#000'),
};

const named: ColorMap = {
  silver: Color('#c0c0c0'),
};

export const colors = { ...base, ...named };

export type ColorName = keyof typeof colors;
