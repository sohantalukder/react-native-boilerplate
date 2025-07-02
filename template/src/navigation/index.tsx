import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '@/theme';
import type { RootStackParamList } from './types';
import routes from './routes';
import { screenOptions } from './screenOptions';
import { Example, Splash } from '@/modules';
const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
  const { navigationTheme, variant } = useTheme();

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName={routes.splash}
        key={variant}
        screenOptions={screenOptions}
      >
        <Stack.Screen
          component={Splash}
          name={routes.splash}
        />
        <Stack.Screen
          component={Example}
          name={routes.example}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
