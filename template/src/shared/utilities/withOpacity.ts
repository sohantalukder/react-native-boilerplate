import type { ColorValue } from 'react-native';

const withOpacity = (color?: ColorValue, opacity?: number) => {
  if (!color) {
    return '';
  }

  const validatedOpacity =
    typeof opacity !== 'number' || opacity < 0 || opacity > 1 ? 1 : opacity;

  const hexOpacity = Math.round(validatedOpacity * 255)
    .toString(16)
    .padStart(2, '0');

  return (String(color) + hexOpacity).toUpperCase();
};

export default withOpacity;
