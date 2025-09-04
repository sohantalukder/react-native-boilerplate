import React, { useRef, useState, useCallback, memo } from 'react';
import type { ViewProps, LayoutChangeEvent } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import AnimatedDot from './AnimatedDot';
import { Image } from '@/shared/components/atoms';

// Move configuration outside of component to prevent recreation
const CONFIG = {
  carouselHeight: 200,
  initialTimeout: 5000, // Auto-scroll timeout in ms
  scrollEventThrottle: 8, // Lower for smoother updates
};

type Photo = {
  id: string;
  uri: string;
  /**
   * Optional accessible description for the image
   */
  accessibilityLabel?: string;
};

/**
 * Properties for the PhotoCarousel component.
 */
type Properties = {
  /**
   * Array of photos to display in the carousel.
   */
  photos: Photo[];
  /**
   * Height of the carousel.
   * @default 200
   */
  carouselHeight?: number;
  /**
   * Style for the dots. Can be used to reposition the dots.
   */
  dotsStyle?: ViewProps['style'];
  /**
   * Whether to auto-scroll the carousel.
   * @default false
   */
  autoScroll?: boolean;
  /**
   * Interval in milliseconds for auto-scrolling.
   * @default 5000
   */
  autoScrollInterval?: number;
  /**
   * Callback when the current photo changes.
   */
  onPhotoChange?: (index: number) => void;
  /**
   * Accessibility label for the carousel.
   */
  accessibilityLabel?: string;
};

/**
 * A carousel component for displaying photos with pagination dots.
 * Optimized for performance and accessibility.
 */
const PhotoCarousel = memo<Properties>(
  ({
    photos,
    carouselHeight = CONFIG.carouselHeight,
    dotsStyle = {},
    autoScroll = false,
    autoScrollInterval = CONFIG.initialTimeout,
    onPhotoChange,
    accessibilityLabel = 'Photo carousel',
  }): React.ReactElement => {
    // State and refs
    const scrollX = useSharedValue(0);
    const flatListRef = useRef<Animated.FlatList<Photo>>(null);
    const [carouselWidth, setCarouselWidth] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const autoScrollTimer = useRef<NodeJS.Timeout | null>(null);
    const userScrolling = useRef(false);

    // Calculate current page from scroll position
    const updateCurrentPage = useCallback(
      (x: number) => {
        if (carouselWidth <= 0) return;

        const newIndex = Math.round(x / carouselWidth);
        if (
          newIndex !== currentIndex &&
          newIndex >= 0 &&
          newIndex < photos.length
        ) {
          setCurrentIndex(newIndex);
          onPhotoChange?.(newIndex);
        }
      },
      [carouselWidth, currentIndex, photos.length, onPhotoChange]
    );

    // Scroll handler with optimized performance
    const scrollHandler = useAnimatedScrollHandler({
      onScroll: (event) => {
        scrollX.value = event.contentOffset.x;
        runOnJS(updateCurrentPage)(event.contentOffset.x);
      },
      onBeginDrag: () => {
        userScrolling.current = true;
      },
      onEndDrag: () => {
        userScrolling.current = false;
      },
    });

    // Handle auto-scrolling
    React.useEffect(() => {
      if (!autoScroll || photos.length <= 1) return;

      const startAutoScroll = () => {
        autoScrollTimer.current = setInterval(() => {
          if (userScrolling.current || !flatListRef.current) return;

          const nextIndex = (currentIndex + 1) % photos.length;
          flatListRef.current.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
        }, autoScrollInterval);
      };

      startAutoScroll();

      return () => {
        if (autoScrollTimer.current) {
          clearInterval(autoScrollTimer.current);
        }
      };
    }, [autoScroll, autoScrollInterval, currentIndex, photos.length]);

    // Memoized photo rendering function
    const renderPhoto = useCallback(
      ({ item, index }: { item: Photo; index: number }) => (
        <View
          accessibilityRole="image"
          accessible={true}
          accessibilityLabel={
            item.accessibilityLabel || `Photo ${index + 1} of ${photos.length}`
          }
        >
          <Image
            source={{ uri: item.uri }}
            style={{ width: carouselWidth, height: carouselHeight }}
            resizeMode="cover"
            accessibilityLabel={item.accessibilityLabel || `Photo ${index + 1}`}
          />
        </View>
      ),
      [carouselWidth, carouselHeight, photos.length]
    );

    // Memoized key extractor
    const keyExtractor = useCallback((item: Photo) => item.id, []);

    // Handle layout measurement - only needed once per width change
    const onLayout = useCallback(
      (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        if (width !== carouselWidth) {
          setCarouselWidth(width);
        }
      },
      [carouselWidth]
    );

    // Handle empty state
    if (photos.length === 0) {
      return <View />;
    }

    return (
      <View
        style={styles.container}
        onLayout={onLayout}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={`Contains ${photos.length} photos. Swipe to navigate.`}
      >
        {carouselWidth > 0 && (
          <View
            style={[
              styles.carouselContainer,
              { width: carouselWidth, height: carouselHeight },
            ]}
          >
            <Animated.FlatList
              ref={flatListRef}
              data={photos}
              renderItem={renderPhoto}
              keyExtractor={keyExtractor}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={scrollHandler}
              scrollEventThrottle={CONFIG.scrollEventThrottle}
              initialNumToRender={1}
              maxToRenderPerBatch={2}
              windowSize={3}
              removeClippedSubviews={true}
              getItemLayout={(_, index) => ({
                length: carouselWidth,
                offset: carouselWidth * index,
                index,
              })}
            />

            {photos.length > 1 && (
              <View
                style={[styles.dotsContainer, StyleSheet.flatten(dotsStyle)]}
                accessibilityLabel={`Page ${currentIndex + 1} of ${
                  photos.length
                }`}
              >
                {photos.map((_, index) => (
                  <AnimatedDot
                    key={index}
                    index={index}
                    scrollX={scrollX}
                    carouselWidth={carouselWidth}
                  />
                ))}
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  carouselContainer: {
    borderRadius: 8,
    overflow: 'hidden', // Add rounded corners
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsContainer: {
    bottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    left: 0,
    paddingVertical: 8,
    position: 'absolute',
    right: 0,
  },
});

export default PhotoCarousel;
