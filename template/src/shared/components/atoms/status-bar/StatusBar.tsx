// StatusBar.tsx
import type { PropsWithChildren } from 'react';
import React, { memo } from 'react';
import type { ColorValue } from 'react-native';
import { View, Platform, StatusBar as RNStatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/theme';

export enum StatusBarStyle {
  LIGHT = 'light-content',
  DARK = 'dark-content',
}

/**
 * Properties for the StatusBar component.
 */
type Properties = PropsWithChildren<{
  /**
   * The style of the status bar.
   */
  barStyle?: StatusBarStyle;
  /**
   * Whether to show the header.
   */
  showHeader?: boolean;
  /**
   * The background color of the status bar.
   */
  bgColor?: ColorValue;
  /**
   * The extra height of the status bar.
   */
  extraHeight?: number;
  /**
   * Whether to make the status bar translucent.
   */
  translucent?: boolean;
  /**
   * Whether to animate the status bar.
   */
  animated?: boolean;
}>;

const StatusBar: React.FC<Properties> = memo(
  ({
    barStyle = StatusBarStyle.LIGHT,
    showHeader = true,
    bgColor,
    extraHeight = 0,
    animated = true,
    translucent = true,
  }) => {
    const { colors } = useTheme();
    const { top } = useSafeAreaInsets();

    // Use the background color from props or transparent from theme
    const backgroundColor = bgColor ?? colors.transparent;

    // Only create the styles when needed
    const containerStyle = showHeader
      ? {
          backgroundColor,
          paddingBottom: top + extraHeight,
        }
      : undefined;

    const statusBarProps = {
      barStyle,
      animated,
      ...(Platform.OS === 'android' && {
        translucent,
        backgroundColor: showHeader ? backgroundColor : colors.transparent,
      }),
    };

    if (!showHeader) {
      return <RNStatusBar {...statusBarProps} />;
    }

    return (
      <View style={containerStyle}>
        <RNStatusBar {...statusBarProps} />
      </View>
    );
  }
);

export default StatusBar;
