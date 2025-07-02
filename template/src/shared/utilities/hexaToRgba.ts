import type { ColorValue } from 'react-native';

const hexToRgbA = (hex: ColorValue, opacity: number): string => {
  if (typeof hex !== 'string') {
    throw new Error('Hex color must be a string');
  }

  let c: string | string[] = hex.replace('#', '');

  if (!/^([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(c)) {
    throw new Error('Bad Hex');
  }

  // Expand shorthand hex (e.g., "f00") to full form (e.g., "ff0000")
  if (c.length === 3) {
    c = c
      .split('')
      .map((char) => char + char)
      .join('');
  }

  // Parse the hex color
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export default hexToRgbA;
