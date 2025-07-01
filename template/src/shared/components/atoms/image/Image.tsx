import React, { useState, useMemo, useCallback } from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  DimensionValue,
} from 'react-native';
import FastImage, { ResizeMode, FastImageProps } from 'react-native-fast-image';
import PlaceholderImage from '@/assets/icons/Placeholder.icon';
import isEmpty from '@/shared/utilities/isEmpty';
import Skeleton from '../skeleton/Skeleton';

type ImageSource = { uri?: string; require?: number } | number;

type Properties = FastImageProps & {
  source: ImageSource;
  borderRadius?: number;
  resizeMode?: ResizeMode;
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
  cacheControl = 'immutable',
  priority = 'normal',
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
    const imageCopy = { ...source };

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
      } catch (e) {
        // Keep original URI if parsing fails
      }
    }

    return imageCopy;
  }, [source]);

  // Check if we have a valid image source
  const hasValidSource = useMemo(() => {
    if (typeof processedSource === 'number') return true;
    return !isEmpty(processedSource?.uri);
  }, [processedSource]);

  // Handle image load events
  const handleLoadStart = useCallback(() => setIsLoading(false), []);
  const handleLoadEnd = useCallback(() => setIsLoading(false), []);

  // Prepare FastImage source configuration
  const fastImageSource = useMemo(() => {
    if (typeof processedSource === 'number') {
      return processedSource;
    }

    if (processedSource?.uri) {
      return {
        ...processedSource,
        priority: FastImage.priority[priority],
        cache: FastImage.cacheControl[cacheControl],
      };
    }

    return undefined;
  }, [processedSource, priority, cacheControl]);
  return isLoading ? (
    <View style={[styles.loaderContainer, { borderRadius, height, width }]}>
      <Skeleton
        height="100%"
        width="100%"
        borderRadius={borderRadius}
      />
    </View>
  ) : hasValidSource ? (
    <View style={[wrapperStyle, { height, width }]}>
      <FastImage
        source={fastImageSource}
        style={[styles.image, { height, width, borderRadius }]}
        resizeMode={resizeMode}
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
