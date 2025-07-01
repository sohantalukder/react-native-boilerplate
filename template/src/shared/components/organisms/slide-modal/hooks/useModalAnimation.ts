import rs from '@/shared/utilities/responsiveSize';
import { useCallback, useRef, useState, useEffect } from 'react';
import { Animated, Platform, StatusBar as RNStatusBar } from 'react-native';

const STATUS_BAR_HEIGHT =
  Platform.OS === 'android' ? RNStatusBar.currentHeight || 0 : 0;

const ANIMATION_CONFIG = {
  friction: 8,
  tension: 50,
  useNativeDriver: true,
} as const;

const SCREEN_HEIGHT = rs('hf');
const useModalAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationValue = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const animateToValue = useCallback(
    (toValue: number, onComplete?: () => void) => {
      setIsAnimating(true);
      Animated.spring(animationValue, {
        ...ANIMATION_CONFIG,
        toValue,
      }).start((finished) => {
        if (finished) {
          setIsAnimating(false);
          onComplete?.();
        }
      });
    },
    [animationValue]
  );

  const openModal = useCallback(() => {
    setIsVisible(true);
    animateToValue(STATUS_BAR_HEIGHT);
  }, [animateToValue]);

  const closeModal = useCallback(() => {
    if (isAnimating) return;

    animateToValue(rs('hf'), () => {
      // Use requestAnimationFrame to ensure smooth transition
      requestAnimationFrame(() => {
        setIsVisible(false);
      });
    });
  }, [isAnimating, animateToValue]);

  // Reset animation value when modal becomes invisible
  useEffect(() => {
    if (!isVisible) {
      animationValue.setValue(SCREEN_HEIGHT);
    }
  }, [isVisible, animationValue]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      animationValue.stopAnimation();
    };
  }, [animationValue]);

  return {
    isVisible,
    isAnimating,
    animationValue,
    openModal,
    closeModal,
  };
};

export default useModalAnimation;
