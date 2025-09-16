import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useRef, useCallback, useMemo } from 'react';
import { Animated, Platform, Text } from 'react-native';
import { IconButton } from '@/shared/components/atoms';
import type { StackNavigationOptions } from '@react-navigation/stack';
import { useTheme } from '@/theme';
import { fontWeight } from '@/theme/fonts';

// Utility function to sanitize text and prevent character encoding issues
const sanitizeText = (text: string): string => {
  if (!text) return '';
  // Remove any non-printable characters and normalize text
  return (
    text
      // eslint-disable-next-line no-control-regex
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Remove control characters
      .replace(/\uFEFF/g, '') // Remove BOM
      .trim()
  );
};

type NavigationHeaderProps = {
  headerTitle?: React.ReactNode;
  headerRight?: React.ReactNode;
  title?: string;
  headerTitleAlign?: 'left' | 'center';
  backgroundColor?: string;
  handleBack?: () => void;
  /** Callback function that will be called when the title is pressed */
  onTitlePress?: () => void;
  leftIconColor?: string;
};

const useNavigationHeader = ({
  headerTitle,
  headerRight,
  title,
  headerTitleAlign = 'left',
  backgroundColor,
  handleBack,
  onTitlePress,
  leftIconColor,
}: NavigationHeaderProps) => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const { colors, typographies } = useTheme();

  // Memoize handlers to prevent recreation
  const handleGoBack = useCallback(() => {
    if (handleBack) {
      handleBack();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation, handleBack]);

  const headerLeft = useCallback(() => {
    return React.createElement(IconButton, {
      size: 'medium',
      icon: 'leftArrow',
      onPress: handleGoBack,
      iconColor: leftIconColor ?? colors.text,
    });
  }, [handleGoBack, leftIconColor, colors.text]);

  const headerBackgroundColor = useMemo(() => {
    if (backgroundColor) {
      return backgroundColor;
    }
    return colors.background;
  }, [backgroundColor, colors.background]);

  // Title press handler
  const handleTitlePress = useCallback(() => {
    if (onTitlePress) {
      onTitlePress();
    }
  }, [onTitlePress]);

  const headerTitleComponent = useCallback(() => {
    if (headerTitle) {
      return headerTitle;
    }
    if (title && onTitlePress) {
      const sanitizedTitle = sanitizeText(title);
      return React.createElement(
        Text,
        {
          onPress: handleTitlePress,
          numberOfLines: 1,
          ellipsizeMode: 'tail',
          style: {
            ...typographies.heading3,
            fontWeight: fontWeight.semibold,
            textAlign: headerTitleAlign === 'center' ? 'center' : 'left',
            fontFamily: 'Onest-SemiBold',
            maxWidth: '80%',
          },
        },
        sanitizedTitle
      );
    }
    if (title) {
      const sanitizedTitle = sanitizeText(title);
      return React.createElement(
        Text,
        {
          numberOfLines: 1,
          ellipsizeMode: 'tail',
          style: {
            ...typographies.heading3,
            fontWeight: fontWeight.semibold,
            textAlign: headerTitleAlign === 'center' ? 'center' : 'left',
            fontFamily: 'Onest-SemiBold',
            maxWidth: '80%',
          },
        },
        sanitizedTitle
      );
    }
    return null;
  }, [
    headerTitle,
    title,
    onTitlePress,
    handleTitlePress,
    typographies.heading3,
    headerTitleAlign,
  ]);
  const headerRightComponent = useCallback(() => headerRight, [headerRight]);

  // Memoize navigation options to prevent recreation
  const navigationOptions = useMemo(
    (): StackNavigationOptions => ({
      headerShown: true,
      headerBackTitle: '',
      headerShadowVisible: false,
      headerTitleStyle: {
        fontFamily: 'Onest-SemiBold',
        fontWeight: fontWeight.semibold,
        fontSize: typographies.heading3.fontSize,
        color: typographies.heading3.color,
        maxWidth: '80%',
      },
      headerBackButtonDisplayMode: 'minimal',
      headerTitleAlign: headerTitleAlign || (title ? 'center' : 'left'),
      headerStyle: {
        height: Platform.OS === 'ios' ? 110 : 80,
        backgroundColor: headerBackgroundColor,
      },
      headerLeftContainerStyle: {
        paddingLeft: 10,
        paddingBottom: 16,
      },
      headerRightContainerStyle: {
        paddingRight: 16,
        paddingBottom: 16,
      },
      headerTitleContainerStyle: {
        paddingBottom: 16,
        maxWidth: '80%',
        flex: 1,
      },
      headerLeft,
      headerTitle: headerTitleComponent,
      headerRight: headerRightComponent,
    }),
    [
      typographies.heading3,
      headerTitleAlign,
      title,
      headerLeft,
      headerTitleComponent,
      headerRightComponent,
      headerBackgroundColor,
    ]
  );

  // Single useLayoutEffect for both animation and navigation setup
  useLayoutEffect(() => {
    // Cancel previous animation if running
    if (animationRef.current) {
      animationRef.current.stop();
    }

    // Start animation
    animationRef.current = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    });
    animationRef.current.start();

    // Set navigation options
    navigation.setOptions(navigationOptions);

    // Cleanup function
    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
        animationRef.current = null;
      }
    };
  }, [navigation, navigationOptions, fadeAnim]);
};

export { useNavigationHeader };
