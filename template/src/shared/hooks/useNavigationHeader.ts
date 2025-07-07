import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useRef } from 'react';
import { Animated, Platform } from 'react-native';
import { IconButton } from '@/shared/components/atoms';
import type { StackNavigationOptions } from '@react-navigation/stack';
import { useTheme } from '@/theme';
import { fontWeight } from '@/theme/fonts';
import withOpacity from '@/shared/utilities/withOpacity';
type NavigationHeaderProps = {
  headerTitle?: React.ReactNode;
  headerRight?: React.ReactNode;
  title?: string;
  headerTitleAlign?: 'left' | 'center';
};

const useNavigationHeader = ({
  headerTitle,
  headerRight,
  title,
  headerTitleAlign = 'center',
}: NavigationHeaderProps) => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { colors, typographies } = useTheme();
  useLayoutEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Set navigation options
    navigation.setOptions({
      headerShown: true,
      headerBackTitle: '',
      headerShadowVisible: false,
      headerTitleStyle: {
        ...typographies.body1,
        fontWeight: fontWeight.semibold,
      },
      headerBackButtonDisplayMode: 'minimal',
      headerTitleAlign: headerTitleAlign
        ? headerTitleAlign
        : title
          ? 'center'
          : 'left',
      headerStyle: {
        height: Platform.OS === 'ios' ? 110 : 80,
        borderBottomWidth: 1,
        borderBottomColor: withOpacity(colors.text, 0.05),
      },
      headerLeftContainerStyle: {
        paddingLeft: 6,
      },
      headerRightContainerStyle: {
        paddingRight: 6,
      },
      headerLeft: () => {
        return React.createElement(IconButton, {
          size: 'medium',
          icon: 'leftArrow',
          onPress: () => {
            if (navigation.canGoBack()) navigation.goBack();
          },
        });
      },
      headerTitle: title ? title : () => headerTitle,
      headerRight: () => headerRight,
    } as StackNavigationOptions);
  }, [
    navigation,
    headerTitle,
    headerRight,
    colors.text,
    fadeAnim,
    typographies.body1,
    headerTitleAlign,
    title,
  ]);
};

export { useNavigationHeader };
