import React, { useState, useMemo, useCallback } from 'react';
import type { ViewStyle, StyleProp, DimensionValue } from 'react-native';
import { StyleSheet, View } from 'react-native';
import FastImage, { type ImageStyle as FastImageStyle, type ResizeMode } from '@d11/react-native-fast-image';
import PlaceholderImage from '@/assets/icons/Placeholder.icon';
import isEmpty from '@/shared/utilities/isEmpty';
import Skeleton from '../skeleton/Skeleton';

type ImageSource = { uri?: string; require?: number } | number;

type Properties = {
  source: ImageSource;
  borderRadius?: number;
  resizeMode?: ResizeMode;
  priority?: 'low' | 'normal' | 'high';
  cache?: 'immutable' | 'web' | 'cacheOnly';
  height?: DimensionValue;
  width?: DimensionValue;
  wrapperStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<FastImageStyle>;
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
  testID?: string;
};

const ImagePreview: React.FC<Properties> = ({
  source,
  resizeMode = 'cover',
  borderRadius = 0,
  cache: _cache = 'immutable',
  priority: _priority = 'normal',
  height,
  width,
  wrapperStyle,
  style,
  onLoadStart,
  onLoadEnd,
  testID,
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
  const handleLoadStart = useCallback(() => {
    setIsLoading(true);
    onLoadStart?.();
  }, [onLoadStart]);
  
  const handleLoadEnd = useCallback(() => {
    setIsLoading(false);
    onLoadEnd?.();
  }, [onLoadEnd]);

  // Prepare FastImage source configuration
  const fastImageSource = useMemo(() => {
    if (typeof processedSource === 'number') {
      return processedSource;
    }

    const sourceObj = processedSource as { uri?: string };
    if (sourceObj?.uri) {
      return {
        uri: sourceObj.uri,
        priority: _priority === 'high' ? FastImage.priority.high : _priority === 'low' ? FastImage.priority.low : FastImage.priority.normal,
        cache: _cache === 'web' ? FastImage.cacheControl.web : _cache === 'cacheOnly' ? FastImage.cacheControl.cacheOnly : FastImage.cacheControl.immutable,
      };
    }

    return undefined;
  }, [processedSource, _priority, _cache]);
  return isLoading ? (
    <View style={[styles.loaderContainer, { borderRadius, height, width }]}>
      <Skeleton
        height="100%"
        width="100%"
        borderRadius={borderRadius}
      />
    </View>
  ) : hasValidSource && fastImageSource ? (
    <View style={[wrapperStyle, { height, width }]}>
      <FastImage
        source={fastImageSource}
        style={[styles.image, { height, width, borderRadius }, style]}
        resizeMode={resizeMode}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        testID={testID || 'image-preview'}
        {...props}
      />
    </View>
  ) : (
    <PlaceholderImage
      style={[styles.image, { borderRadius, height, width }, style]}
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
