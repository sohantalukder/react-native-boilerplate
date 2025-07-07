import type { StackNavigationOptions } from '@react-navigation/stack';
import { Platform } from 'react-native';

const baseOptions: StackNavigationOptions = {
  headerShown: false,
  cardOverlayEnabled: true,
};

const androidOptions: StackNavigationOptions = {
  ...baseOptions,
  cardStyle: { backgroundColor: 'transparent' },
  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      opacity: progress,
    },
  }),
  transitionSpec: {
    open: {
      animation: 'spring',
      config: {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
      },
    },
    close: {
      animation: 'spring',
      config: {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
      },
    },
  },
};

const iosOptions: StackNavigationOptions = {
  ...baseOptions,
  // iOS uses default animations - no custom properties needed
};

const screenOptions: StackNavigationOptions =
  Platform.OS === 'ios' ? iosOptions : androidOptions;

export { screenOptions };
