import { CSSProperties } from 'react';

type Color = 'azure_radiance' | 'white';

export const colors: Record<Color, CSSProperties['color']> = {
  azure_radiance: '#007BFF',
  white: '#FFFFFF',
};
