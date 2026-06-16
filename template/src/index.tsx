import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClientProvider } from '@tanstack/react-query';
import {
  ThemeProvider,
  UiPortalProvider,
  type ThemeStorageAdapter,
} from '@sohantalukder/rn-kit';

import { queryClient } from '@/config/queryClient';
import Navigation from '@/navigation';
import '@/config/i18n.config';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import localStore from '@/services/storage/localStore.service';
import logo from '@/assets/images/logo.png';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

const isThemeValue = (
  value: string | null | undefined
): value is ReturnType<ThemeStorageAdapter['getTheme']> =>
  value === 'default' || value === 'dark' || value === 'system';

const themeStorageAdapter: ThemeStorageAdapter = {
  getTheme: () => {
    const storedTheme = localStore.getTheme();
    return isThemeValue(storedTheme) ? storedTheme : 'system';
  },
  setTheme: value => {
    localStore.setTheme(value);
  },
};

const MainIndex = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.root}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            logo={logo}
            storageAdapter={themeStorageAdapter}
          >
            <UiPortalProvider>
              <Navigation />
            </UiPortalProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default MainIndex;
