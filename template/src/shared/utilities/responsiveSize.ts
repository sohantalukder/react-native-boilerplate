import { Dimensions, StatusBar, PixelRatio } from 'react-native';

// Design reference dimensions (adjust based on your design mockup)
const DESIGN_WIDTH = 375;
const DESIGN_HEIGHT = 812;

// Breakpoints for different device categories
const BREAKPOINTS = {
  small: 480,
  medium: 768,
  large: 1024,
  xlarge: 1200,
} as const;

type DeviceSize = keyof typeof BREAKPOINTS;
type SpecialSize = 'wf' | 'hf' | 'hwh' | 'statusBarHeight';

/**
 * Round a number value to avoid sub-pixel rendering issues
 */
export const round = (value: number): number =>
  Math.round(PixelRatio.roundToNearestPixel(value));

/**
 * Get current screen dimensions
 */
const getScreenDimensions = () => {
  const { height, width } = Dimensions.get('window');
  return { height, width };
};

/**
 * Get safe screen dimensions (excluding status bar and other system UI)
 */
const getSafeScreenDimensions = () => {
  const { height, width } = getScreenDimensions();
  const statusBarHeight = StatusBar.currentHeight || 0;
  return {
    height: height - statusBarHeight,
    width,
    statusBarHeight,
  };
};

/**
 * Determine device size category based on screen width
 */
export const getDeviceSize = (): DeviceSize => {
  const { width } = getScreenDimensions();

  if (width < BREAKPOINTS.small) return 'small';
  if (width < BREAKPOINTS.medium) return 'medium';
  if (width < BREAKPOINTS.large) return 'large';
  return 'xlarge';
};

/**
 * Check if device is in portrait orientation
 */
export const isPortrait = (): boolean => {
  const { height, width } = getScreenDimensions();
  return height > width;
};

/**
 * Get scaling factors based on design dimensions
 */
const getScaleFactors = () => {
  const { height, width } = getScreenDimensions();

  return {
    widthScale: width / DESIGN_WIDTH,
    heightScale: height / DESIGN_HEIGHT,
    // Use the smaller scale to ensure content fits on screen
    minScale: Math.min(width / DESIGN_WIDTH, height / DESIGN_HEIGHT),
    // Use average for balanced scaling
    avgScale: (width / DESIGN_WIDTH + height / DESIGN_HEIGHT) / 2,
  };
};

/**
 * Scale width based on design width
 */
export const scaleWidth = (size: number): number => {
  const { widthScale } = getScaleFactors();
  return round(size * widthScale);
};

/**
 * Scale height based on design height
 */
export const scaleHeight = (size: number): number => {
  const { heightScale } = getScaleFactors();
  return round(size * heightScale);
};

/**
 * Scale size proportionally (maintains aspect ratio)
 */
export const scaleSize = (size: number): number => {
  const { minScale } = getScaleFactors();
  return round(size * minScale);
};

/**
 * Moderate scale - less aggressive scaling for text and smaller elements
 */
export const moderateScale = (size: number, factor: number = 0.5): number => {
  const { minScale } = getScaleFactors();
  return round(size + (minScale - 1) * factor * size);
};

/**
 * Responsive sizing function with multiple scaling strategies
 */
const rs = (
  size: number | SpecialSize,
  strategy: 'width' | 'height' | 'min' | 'moderate' = 'min'
): number => {
  const { height, width } = getScreenDimensions();
  const { height: safeHeight, statusBarHeight } = getSafeScreenDimensions();

  // Handle special size values
  switch (size) {
    case 'wf':
      return round(width);
    case 'hf':
      return round(height);
    case 'hwh':
      return round(safeHeight);
    case 'statusBarHeight':
      return round(statusBarHeight);
  }

  // Apply scaling strategy
  switch (strategy) {
    case 'width':
      return scaleWidth(size);
    case 'height':
      return scaleHeight(size);
    case 'moderate':
      return moderateScale(size);
    case 'min':
    default:
      return scaleSize(size);
  }
};

/**
 * Responsive font size with device-specific adjustments
 */
export const responsiveFontSize = (size: number): number => {
  const deviceSize = getDeviceSize();
  const baseSize = moderateScale(size);

  // Adjust font size based on device category
  const adjustments = {
    small: 0.9,
    medium: 1,
    large: 1.1,
    xlarge: 1.2,
  };

  return round(baseSize * adjustments[deviceSize]);
};

/**
 * Get responsive spacing values
 */
export const spacing = {
  xs: () => rs(4),
  sm: () => rs(8),
  md: () => rs(16),
  lg: () => rs(24),
  xl: () => rs(32),
  xxl: () => rs(48),
} as const;

/**
 * Responsive padding/margin helper
 */
export const getSpacing = (multiplier: number = 1): number => {
  return rs(8 * multiplier);
};

/**
 * Device-specific values
 */
export const deviceSpecific = <T>(values: {
  small?: T;
  medium?: T;
  large?: T;
  xlarge?: T;
  default: T;
}): T => {
  const deviceSize = getDeviceSize();
  return values[deviceSize] ?? values.default;
};

/**
 * Orientation-specific values
 */
export const orientationSpecific = <T>(values: {
  portrait: T;
  landscape: T;
}): T => {
  return isPortrait() ? values.portrait : values.landscape;
};

/**
 * Create responsive dimensions object
 */
export const createResponsiveDimensions = () => {
  const { height, width } = getScreenDimensions();
  const { height: safeHeight } = getSafeScreenDimensions();

  return {
    window: { width, height },
    safeArea: { width, height: safeHeight },
    scale: getScaleFactors(),
    deviceSize: getDeviceSize(),
    isPortrait: isPortrait(),
    breakpoints: BREAKPOINTS,
  };
};

// Export the main responsive function
export default rs;

// Export additional utilities
export {
  scaleWidth as rw,
  scaleHeight as rh,
  scaleSize as rs2,
  moderateScale as ms,
  responsiveFontSize as rf,
};
