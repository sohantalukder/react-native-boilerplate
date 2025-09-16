import { useMemo } from 'react';
import { Platform } from 'react-native';

/**
 * Custom hook to provide optimized configuration for BottomSheetFlashList
 * to fix scroll issues when used inside bottom sheets
 */
export const useBottomSheetFlashList = () => {
  const bottomSheetFlashListProps = useMemo(() => {
    return {
      // Enable scroll - force enable scrolling
      scrollEnabled: true,
      // Ensure proper scroll behavior
      nestedScrollEnabled: true,
      // Optimize for bottom sheet context
      automaticallyAdjustKeyboardInsets: false,
      // Improve scroll performance
      scrollEventThrottle: 16,
      // Ensure proper content insets
      contentInsetAdjustmentBehavior: 'never' as const,
      // Better keyboard handling
      keyboardShouldPersistTaps: 'always' as const,
      // Optimize for bottom sheet rendering - disable to ensure all items render
      removeClippedSubviews: false,
      // Better scroll indicator handling - enable for debugging
      showsVerticalScrollIndicator: true,
      // Improve scroll performance
      maxToRenderPerBatch: Platform.OS === 'ios' ? 10 : 5,
      windowSize: Platform.OS === 'ios' ? 10 : 5,
      // Better item layout handling - enable auto layout for proper sizing
      disableAutoLayout: false,
      // Enable simultaneous gesture handling for better scroll interaction
      simultaneousHandlers: undefined,
      // Platform specific optimizations
      ...(Platform.OS === 'ios' && {
        // iOS specific optimizations
        decelerationRate: 'fast' as const,
        bounces: true,
        alwaysBounceVertical: false,
        // Better scroll responsiveness on iOS
        scrollIndicatorInsets: { right: 1 },
      }),
      ...(Platform.OS === 'android' && {
        // Android specific optimizations
        overScrollMode: 'never' as const,
        scrollIndicatorInsets: { right: 1 },
        // Better nested scroll handling on Android
        nestedScrollEnabled: true,
      }),
    };
  }, []);

  return bottomSheetFlashListProps;
};
