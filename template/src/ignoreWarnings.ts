import { LogBox } from 'react-native';

// Create a proper logging service
class LoggingService {
  private readonly isDev = __DEV__;

  warn(...args: unknown[]) {
    if (this.isDev) {
      console.warn(...args);
    }
  }

  error(...args: unknown[]) {
    if (this.isDev) {
      console.error(...args);
    }
  }

  info(...args: unknown[]) {
    if (this.isDev) {
      console.warn('[INFO]', ...args);
    }
  }

  log(...args: unknown[]) {
    if (this.isDev) {
      console.warn('[LOG]', ...args);
    }
  }
}

export const logger = new LoggingService();

if (__DEV__) {
  const ignoreWarns = [
    'EventEmitter.removeListener',
    '[fuego-swr-keys-from-collection-path]',
    'Setting a timer for a long period of time',
    'ViewPropTypes will be removed from React Native',
    'AsyncStorage has been extracted from react-native',
    "exported from 'deprecated-react-native-prop-types'.",
    'Non-serializable values were found in the navigation state.',
    'VirtualizedLists should never be nested inside plain ScrollViews',
  ];

  const originalWarn = console.warn;
  console.warn = (...args) => {
    for (const warning of ignoreWarns) {
      if (args[0]?.startsWith?.(warning)) {
        return;
      }
    }
    originalWarn(...args);
  };

  LogBox.ignoreAllLogs();
} else {
  LogBox.ignoreAllLogs();
}
