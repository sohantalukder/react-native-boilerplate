import { IconButton } from '@/shared/components/atoms';
import debounceHandler from '@/shared/utilities/debounceHandler';
import rs, { rf } from '@/shared/utilities/responsiveSize';
import { useTheme } from '@/theme';
import { fontWeight } from '@/theme/fonts';
import React, { useState, useCallback, useRef, useMemo } from 'react';
import { TextInput } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS, interpolate } from 'react-native-reanimated';

interface AnimatedSearchProps {
  onExpandChange?: (isExpanded: boolean) => void;
  onSearch?: (text: string) => void;
  value?: string;
}

// Constants moved outside component to prevent recreation
const DEFAULT_SEARCH_WIDTH = 32;
const ANIMATED_SEARCH_WIDTH = rs('wf') - 80;

// Animation configs - memoized to prevent recreation
const TIMING_CONFIG = { duration: 300 };

const AnimatedTextInput: React.FC<AnimatedSearchProps> = ({ onExpandChange, onSearch, value = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { layout, colors, gutters } = useTheme();
  const textInputRef = useRef<TextInput>(null);
  const [searchTerm, setSearchTerm] = useState(value);

  // Single animated value for all animations
  const animationProgress = useSharedValue(0);

  // Memoize theme-dependent styles
  const textInputStyle = useMemo(
    () => [
      layout.flex_1,
      layout.itemsCenter,
      layout.justifyCenter,
      {
        fontSize: rf(16),
        lineHeight: rf(18),
        color: colors.text,
        fontWeight: fontWeight.semibold,
      },
    ],
    [layout, colors.text]
  );

  const placeholderColor = useMemo(() => colors.gray5, [colors.gray5]);

  const handleSearch = useCallback(
    (text: string) => {
      // Avoid unnecessary calls if text hasn't changed
      if (searchTerm === text) return;

      setSearchTerm(text);
      handleDebouncedSearch(text);
    },
    [onSearch]
  );

  const handleDebouncedSearch = useCallback(
    debounceHandler((text: string) => {
      onSearch?.(text);
    }, 300),
    [onSearch]
  );

  const handleAnimationComplete = useCallback(
    (expanded: boolean) => {
      setIsExpanded(expanded);
      onExpandChange?.(expanded);

      if (expanded) {
        // Focus input after expansion
        setTimeout(() => textInputRef.current?.focus(), 50);
      }
    },
    [onExpandChange, onSearch]
  );

  const handleCollapse = useCallback(() => {
    animationProgress.value = withTiming(0, TIMING_CONFIG, (finished) => {
      if (finished) {
        runOnJS(handleAnimationComplete)(false);
      }
    });
  }, [animationProgress, handleAnimationComplete]);

  const handleExpand = useCallback(() => {
    animationProgress.value = withTiming(1, TIMING_CONFIG, (finished) => {
      if (finished) {
        runOnJS(handleAnimationComplete)(true);
      }
    });
  }, [animationProgress, handleAnimationComplete]);

  const handleCancel = useCallback(() => {
    textInputRef.current?.clear();
    setSearchTerm('');
    onSearch?.('');
    handleCollapse();
  }, [onSearch, handleCollapse]);

  const toggleSearch = useCallback(() => {
    if (isExpanded) {
      handleCancel();
    } else {
      handleExpand();
    }
  }, [isExpanded, handleCancel, handleExpand]);

  // Single animated style with interpolation for better performance
  const animatedContainerStyle = useAnimatedStyle(() => {
    const width = interpolate(animationProgress.value, [0, 1], [DEFAULT_SEARCH_WIDTH, ANIMATED_SEARCH_WIDTH], 'clamp');

    const scale = interpolate(animationProgress.value, [0, 0.5, 1], [1, 1.02, 1], 'clamp');

    return {
      width,
      transform: [{ scale }],
    };
  }, []);

  const animatedInputStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(animationProgress.value, [0, 0.3, 1], [0, 0, 1], 'clamp'),
    }),
    []
  );

  // Memoize container style
  const containerStyle = useMemo(
    () => [layout.row, layout.itemsCenter, animatedContainerStyle],
    [layout.row, layout.itemsCenter, animatedContainerStyle]
  );

  // Memoize input container style
  const inputContainerStyle = useMemo(
    () => [gutters.marginLeft_4, animatedInputStyle],
    [gutters.marginLeft_4, animatedInputStyle]
  );

  const handleTextInputSubmit = useCallback(() => {
    textInputRef.current?.blur();
  }, []);

  const handleBlur = useCallback(() => {
    // Only collapse if search is empty
    if (!searchTerm.trim()) {
      handleCollapse();
    }
  }, [handleCollapse, searchTerm]);

  return (
    <Animated.View
      style={[
        isExpanded ? layout.flex_1 : layout.flexShrink_1,
        layout.fullWidth,
        layout.itemsCenter,
        { minHeight: rs(38) },
        containerStyle,
      ]}
    >
      <IconButton
        onPress={toggleSearch}
        icon={isExpanded ? 'leftArrow' : 'search'}
      />
      <Animated.View style={[layout.flex_1, inputContainerStyle]}>
        <TextInput
          ref={textInputRef}
          style={textInputStyle}
          placeholder="Search..."
          placeholderTextColor={placeholderColor}
          onChangeText={handleSearch}
          returnKeyType="search"
          onSubmitEditing={handleTextInputSubmit}
          onBlur={handleBlur}
          editable={isExpanded}
          defaultValue={value}
          autoCorrect={false}
          autoCapitalize="none"
          spellCheck={false}
          clearButtonMode="never"
        />
      </Animated.View>
    </Animated.View>
  );
};

export default React.memo(AnimatedTextInput);
