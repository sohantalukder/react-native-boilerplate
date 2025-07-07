import withOpacity from '@/shared/utilities/withOpacity';
import { useTheme } from '@/theme';
import type { Colors } from '@/theme/types/colors';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';

const config = {
  width: 45,
  height: 26,
};

/**
 * Properties for the Switch component.
 */
type Properties = {
  /**
   * The value of the switch.
   */
  value?: boolean;
  /**
   * The onPress handler for the switch.
   */
  onPress?: (params1: boolean, params2: string) => void;
  /**
   * The active color of the switch.
   */
  activeColor?: string;
  /**
   * The name of the switch.
   */
  name?: string;
  /**
   * The background color of the switch.
   */
  bgColor?: string;
};

const Switch: React.FC<Properties> = ({
  value = false,
  activeColor,
  onPress = () => {},
  name,
  bgColor,
}) => {
  const valueRef = useRef(false);
  const { colors } = useTheme();
  const [show, setShow] = useState<boolean>(value);
  const translateRef = useRef(new Animated.Value(0)).current;
  const styles = useMemo(() => styleSheet(colors), [colors]);
  useEffect(() => {
    handleSwitch(value);
    setShow(value);
  }, [value]);

  const handleSwitch = (flag = false) => {
    Animated.timing(translateRef, {
      toValue: flag ? 18 : 0,
      duration: 300,
      delay: 100,
      useNativeDriver: false,
    }).start(() => {
      valueRef.current = flag;
    });
  };

  const backgroundColor = translateRef.interpolate({
    inputRange: [0, 18],
    outputRange: [bgColor ?? colors.gray6, activeColor ?? colors.primary],
    extrapolate: 'clamp',
  });
  const borderColor = translateRef.interpolate({
    inputRange: [0, 18],
    outputRange: [
      withOpacity(colors.gray6, 0.85),
      activeColor ?? colors.primary,
    ],
    extrapolate: 'clamp',
  });
  const circleBG = translateRef.interpolate({
    inputRange: [0, 18],
    outputRange: [colors.white, colors.white],
    extrapolate: 'clamp',
  });
  const circleSize = translateRef.interpolate({
    inputRange: [0, 18],
    outputRange: [18, 18],
    extrapolate: 'clamp',
  });
  const paddingHorizontal = translateRef.interpolate({
    inputRange: [0, 18],
    outputRange: [2.5, 2.5],
    extrapolate: 'clamp',
  });
  const handlePress = () => {
    setShow(!show);
    onPress?.(!show, name ? name?.trim() : '');
    handleSwitch(!show);
  };
  return (
    <Pressable
      onPress={handlePress}
      testID="switch"
      style={{
        width: config.width,
        height: config.height,
      }}
    >
      <Animated.View
        style={[
          styles.containerStyle,
          { backgroundColor, paddingHorizontal, borderColor },
        ]}
      >
        <Animated.View
          style={[
            styles.circleStyle,
            {
              backgroundColor: circleBG,
              height: circleSize,
              width: circleSize,
            },
            {
              transform: [
                {
                  translateX: translateRef,
                },
              ],
            },
            styles.shadowValue,
          ]}
        />
      </Animated.View>
    </Pressable>
  );
};

export default Switch;

const styleSheet = (colors: Colors) =>
  StyleSheet.create({
    circleStyle: {
      borderRadius: 24,
    },
    containerStyle: {
      borderRadius: 100,
      borderWidth: 2,
      height: config.height,
      justifyContent: 'center',
      width: config.width,
    },
    shadowValue: {
      elevation: 4,
      shadowColor: colors.background,
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
    },
  });
