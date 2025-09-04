import React, { useState, useMemo, useCallback } from 'react';
import type { ViewStyle, StyleProp, DimensionValue } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { Image as ExpoImage, type ImageProps as ExpoImageProps, type ImageContentFit } from 'expo-image';
import PlaceholderImage from '@/assets/icons/Placeholder.icon';
import isEmpty from '@/shared/utilities/isEmpty';
import Skeleton from '../skeleton/Skeleton';

type ImageSource = { uri?: string; require?: number } | number;

type Properties = Omit<ExpoImageProps, 'source' | 'contentFit'> & {
  source: ImageSource;
  borderRadius?: number;
  resizeMode?: ImageContentFit;
  cacheControl?: 'immutable' | 'web' | 'cacheOnly';
  priority?: 'low' | 'normal' | 'high';
  height?: DimensionValue;
  width?: DimensionValue;
  wrapperStyle?: StyleProp<ViewStyle>;
};

const ImagePreview: React.FC<Properties> = ({
  source,
  resizeMode = 'cover',
  borderRadius = 0,
  cacheControl: _cacheControl = 'immutable',
  priority: _priority = 'normal',
  height,
  width,
  wrapperStyle,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);

  // Process image source only once when props change
  const processedSource = useMemo(() => {
    // Handle number case (require)
    if (typeof source === 'number') {
      return source;
    }

    // Handle object case
    const imageSource = source as { uri?: string; require?: number };
    const imageCopy = { ...imageSource };

    // Parse URI if needed
    if (!isEmpty(imageCopy) && !isEmpty(imageCopy.uri)) {
      try {
        // Only attempt to parse if the URI appears to be JSON
        if (
          typeof imageCopy.uri === 'string' &&
          (imageCopy.uri.startsWith('{') || imageCopy.uri.startsWith('['))
        ) {
          imageCopy.uri = JSON.parse(imageCopy.uri);
        }
      } catch (_error: unknown) {
        if (__DEV__) {
          console.error(_error);
        }
      }
    }

    return imageCopy;
  }, [source]);

  // Check if we have a valid image source
  const hasValidSource = useMemo(() => {
    if (typeof processedSource === 'number') return true;
    const sourceObj = processedSource as { uri?: string };
    return !isEmpty(sourceObj?.uri);
  }, [processedSource]);

  // Handle image load events
  const handleLoadStart = useCallback(() => setIsLoading(false), []);
  const handleLoadEnd = useCallback(() => setIsLoading(false), []);

  // Prepare ExpoImage source configuration
  const expoImageSource = useMemo(() => {
    if (typeof processedSource === 'number') {
      return processedSource;
    }

    const sourceObj = processedSource as { uri?: string };
    if (sourceObj?.uri) {
      return sourceObj.uri;
    }

    return undefined;
  }, [processedSource]);
  return isLoading ? (
    <View style={[styles.loaderContainer, { borderRadius, height, width }]}>
      <Skeleton
        height="100%"
        width="100%"
        borderRadius={borderRadius}
      />
    </View>
  ) : hasValidSource && expoImageSource ? (
    <View style={[wrapperStyle, { height, width }]}>
      <ExpoImage
        source={expoImageSource}
        style={[styles.image, { height, width, borderRadius }]}
        contentFit={resizeMode}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        testID="image-preview"
        {...props}
      />
    </View>
  ) : (
    <PlaceholderImage
      style={[styles.image, { borderRadius, height, width }, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

export default React.memo(ImagePreview);
