import { fontFamily, fontWeight } from '@/theme/fonts';
import { Colors } from '@/theme/types/colors';
import { MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';
import { Platform } from 'react-native';

export const screenOptions = ({
  colors,
}: {
  colors: Colors;
}): MaterialTopTabNavigationOptions => {
  return {
    swipeEnabled: true,
    tabBarLabelStyle: {
      fontFamily: fontFamily.medium,
      fontWeight: fontWeight.medium,
      textTransform: 'none',
    },
    tabBarActiveTintColor: colors.text,
    tabBarInactiveTintColor: colors.gray4,
    tabBarStyle: {
      borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
      borderBottomColor: colors.gray8,
    },
    tabBarIndicatorStyle: {
      backgroundColor: colors.primary,
    },
  };
};
