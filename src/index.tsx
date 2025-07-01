import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@/theme';
import { queryClient } from '@/config/queryClient';
import Navigation from '@/navigation';
import '@/config/i18n.config';
import UiComponentsWrapper from '@/shared/contexts/UiComponentsWrapper';
import layout from './theme/layout';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const MainIndex = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={layout.flex_1}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <UiComponentsWrapper>
              <Navigation />
            </UiComponentsWrapper>
          </ThemeProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default MainIndex;
