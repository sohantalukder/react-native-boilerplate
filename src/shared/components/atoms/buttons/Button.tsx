import React, { memo, useMemo } from 'react';

import { useTheme } from '@/theme';

import Loader from '../loader/Loader';
import { Ripple, Text, IconByVariant } from '@/shared/components/atoms';
import { buttonStyles } from './styles/button.styles';
import { ButtonProps } from './types/type';
import { View } from 'react-native';

const Button: React.FC<ButtonProps> = memo(
  ({
    activityColor,
    bgColor,
    borderRadius = 8,
    disabled,
    icon,
    iconPosition = 'left',
    isLoading,
    onPress = () => {},
    rippleColor,
    textColor,
    textStyle = {},
    text = '',
    variant = 'primary',
    wrapStyle,
  }) => {
    const { colors } = useTheme();

    // Memoize styles to prevent recalculation on re-renders
    const styles = React.useMemo(
      () => buttonStyles({ bgColor, borderRadius, colors }),
      [borderRadius, bgColor, colors]
    );

    const handlePress = React.useCallback(() => {
      if (!isLoading) {
        onPress();
      }
    }, [isLoading, onPress]);

    const renderButton = () => (
      <View style={styles.iconGap}>
        {iconPosition === 'left' && typeof icon === 'string' ? (
          <IconByVariant path={icon} />
        ) : (
          icon
        )}
        {text ? (
          <Text
            numberOfLines={1}
            variant="body1"
            weight="medium"
            style={[
              {
                color: textColor ?? styles[variant].color ?? colors.text,
              },
              textStyle,
            ]}
          >
            {text}
          </Text>
        ) : null}
        {iconPosition === 'right' &&
          (typeof icon === 'string' ? <IconByVariant path={icon} /> : icon)}
      </View>
    );

    const loaderColor = useMemo(() => {
      const color = {
        outline: colors.text,
        primary: colors.white,
        secondary: colors.white,
        success: colors.white,
        danger: colors.white,
        warning: colors.white,
        info: colors.white,
      };
      if (isLoading) {
        return activityColor ?? color[variant as keyof typeof color];
      }
      return color[variant as keyof typeof color];
    }, [isLoading, activityColor, colors.white, variant]);

    const buttonContent = (
      <Ripple
        borderRadius={borderRadius}
        disabled={disabled || isLoading}
        onPress={() => handlePress()}
        rippleColor={rippleColor}
      >
        <View style={[styles.container, styles[variant] ?? {}, wrapStyle]}>
          {isLoading ? <Loader color={loaderColor} /> : renderButton()}
        </View>
      </Ripple>
    );

    return buttonContent;
  }
);

export default Button;
