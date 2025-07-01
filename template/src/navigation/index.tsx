import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from '@/theme';
import { RootStackParamList } from './types';
import routes from './routes';
import { screenOptions } from './screenOptions';
import { Startup } from '@/modules';
import { Example } from '@/modules';
const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
  const { navigationTheme, variant } = useTheme();

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName={routes.startup}
        key={variant}
        screenOptions={screenOptions}
      >
        <Stack.Screen
          component={Startup}
          name={routes.startup}
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
