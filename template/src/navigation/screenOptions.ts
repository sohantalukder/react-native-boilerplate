import { StackNavigationOptions } from '@react-navigation/stack';
import { Platform } from 'react-native';

const screenOptions: StackNavigationOptions = {
  headerShown: false,
  cardStyle:
    Platform.OS === 'android' ? { backgroundColor: 'transparent' } : undefined,
  cardOverlayEnabled: true,
  // Remove custom cardStyleInterpolator for iOS to let default animation work
  cardStyleInterpolator:
    Platform.OS === 'ios'
      ? undefined
      : ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress,
          },
        }),
  transitionSpec:
    Platform.OS === 'ios'
      ? undefined // Use default iOS animation
      : {
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

export { screenOptions };
