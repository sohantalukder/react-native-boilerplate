import { useEffect, useRef, useMemo } from 'react';
import { Animated, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ContextMenuConfig, ContextMenuItem } from '@/types/contextMenuTypes';
import rs from '@/shared/utilities/responsiveSize';
import { Colors } from '@/theme/types/colors';
import { logger } from '@/ignoreWarnings';

export type ContextMenuConfigWithKey = ContextMenuConfig & {
  key: string;
};

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const useAnimatedContextMenu = (
  config: ContextMenuConfigWithKey,
  onHide: () => void
) => {
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  // Animation logic
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  const hideWithAnimation = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide();
    });
  };

  const handleBackdropPress = () => {
    hideWithAnimation();
  };

  const handleItemPress = async (item: ContextMenuItem) => {
    if (item.disabled) return;

    if (config.dismissOnSelect !== false) {
      hideWithAnimation();
    }

    try {
      await item.onPress();
    } catch (error) {
      logger.error('Context menu item error:', error);
    }
  };

  // Menu positioning logic
  const calculateHorizontalPosition = (
    menuWidth: number,
    triggerBounds?: { x: number; width: number }
  ) => {
    if (!triggerBounds) {
      return rs(16);
    }

    let x = triggerBounds.x;

    // Adjust for right edge overflow
    if (x + menuWidth > screenWidth - rs(16)) {
      x = screenWidth - menuWidth - rs(16);
    }

    // Ensure left edge boundary
    if (x < rs(16)) {
      x = rs(16);
    }

    // Handle right-side alignment
    if (triggerBounds.x + triggerBounds.width > screenWidth * 0.7) {
      x = Math.max(rs(16), triggerBounds.x + triggerBounds.width - menuWidth);
    }

    return x;
  };

  const calculateVerticalPosition = (
    estimatedHeight: number,
    triggerBounds?: { y: number; height: number }
  ) => {
    if (!triggerBounds) {
      return rs(100);
    }

    const spaceBelow =
      screenHeight -
      (triggerBounds.y + triggerBounds.height) -
      insets.bottom -
      rs(16);
    const spaceAbove = triggerBounds.y - insets.top - rs(16);

    if (spaceBelow >= estimatedHeight) {
      return triggerBounds.y + triggerBounds.height - rs(12);
    }

    if (spaceAbove >= estimatedHeight) {
      return triggerBounds.y - estimatedHeight + rs(12);
    }

    return spaceBelow > spaceAbove
      ? triggerBounds.y + triggerBounds.height - rs(12)
      : Math.max(
          rs(16) + insets.top,
          triggerBounds.y - estimatedHeight + rs(12)
        );
  };

  const menuPosition = useMemo(() => {
    const maxWidth = config.maxWidth ?? rs(280);
    const menuWidth = Math.min(maxWidth, screenWidth - rs(32));
    const estimatedHeight = rs(200); // Rough estimate

    const x = config.position
      ? calculateHorizontalPosition(menuWidth, config.triggerBounds)
      : rs(16);

    const y = config.position
      ? calculateVerticalPosition(estimatedHeight, config.triggerBounds)
      : Math.min(
          screenHeight - insets.bottom - estimatedHeight - rs(16),
          rs(100)
        );

    return {
      left: x,
      top: y,
      width: menuWidth,
    };
  }, [config.position, config.triggerBounds, config.maxWidth, insets]);

  const getContainerStyle = (colors: Colors) => ({
    position: 'absolute' as const,
    ...menuPosition,
    backgroundColor: colors.background,
    borderRadius: rs(12),
    shadowColor: colors.text,
    shadowOffset: {
      width: 0,
      height: rs(4),
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    maxHeight: screenHeight * 0.7,
  });

  return {
    fadeAnim,
    scaleAnim,
    handleBackdropPress,
    handleItemPress,
    getContainerStyle,
  };
};
