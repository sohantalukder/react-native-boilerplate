/* eslint-env jest */
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const Reanimated = jest.requireActual('react-native-reanimated/mock');

  Reanimated.default.call = () => {};

  return Reanimated;
});

jest.mock('react-native-mmkv', () => {
  class MMKV {
    store = new Map();

    set(key, value) {
      this.store.set(key, String(value));
    }

    getString(key) {
      return this.store.get(key);
    }

    delete(key) {
      this.store.delete(key);
    }

    clearAll() {
      this.store.clear();
    }
  }

  return { MMKV };
});

jest.mock('react-native-device-info', () => ({
  getApplicationName: jest.fn(() => 'ReactNativeTemplate'),
  getBuildNumber: jest.fn(() => '1'),
  getBundleId: jest.fn(() => 'com.reactnativetemplate'),
  getSystemName: jest.fn(() => 'iOS'),
  getSystemVersion: jest.fn(() => '17.0'),
  getVersion: jest.fn(() => '1.0.0'),
}));

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(() => jest.fn()),
  fetch: jest.fn(() =>
    Promise.resolve({
      isConnected: true,
      isInternetReachable: true,
      type: 'wifi',
    })
  ),
}));
