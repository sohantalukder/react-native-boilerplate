import { useEffect, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { Image, useTheme } from '@sohantalukder/rn-kit';
import defaultLogo from '@/assets/images/logo.png';

const AnimatedLogo = () => {
  const { logo, gutters, layout, colors } = useTheme();

  // Animated values
  const scale = useSharedValue(0.8);
  const rotation = useSharedValue(-15);
  const opacity = useSharedValue(0);

  // Start the animation sequence
  useEffect(() => {
    // Animate opacity first
    opacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.ease),
    });

    // Animate scale with bounce effect
    scale.value = withDelay(
      200,
      withSequence(
        withTiming(1.2, { duration: 1000, easing: Easing.out(Easing.cubic) }),
        withTiming(0.95, { duration: 300 }),
        withTiming(1.05, { duration: 300 }),
        withTiming(1.0, { duration: 300 })
      )
    );

    // Animate rotation to settle
    rotation.value = withDelay(
      100,
      withTiming(0, { duration: 1250, easing: Easing.out(Easing.ease) })
    );
  }, [opacity, scale, rotation]);

  // Animated styles
  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
      opacity: opacity.value,
    }),
    []
  );

  const styles = useMemo(() => {
    return animatedLogoStyles(colors);
  }, [colors]);

  return (
    <View
      style={[
        layout.flex_1,
        layout.justifyCenter,
        layout.itemsCenter,
        gutters.marginBottom_80,
      ]}
    >
      <Animated.View style={[animatedStyle, styles.logoContainer]}>
        <Image
          source={logo ?? defaultLogo}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

export default AnimatedLogo;

const animatedLogoStyles = (colors: { gray9: string }) =>
  StyleSheet.create({
    logo: {
      height: 200,
      width: 200,
    },
    logoContainer: {
      // Add shadow for better visual appeal
      elevation: 8, // Android shadow
      shadowColor: colors.gray9,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
  });
