import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { ToastProps } from '../../components/atoms/toast';
import { AnimatedToast } from './AnimatedToast';
import styles from './styles';

export type ToastConfig = ToastProps & {
  key: string;
  timeout?: number;
};

// Create a singleton instance to manage global toast state
class ToastManager {
  private toastQueue: Omit<ToastConfig, 'key'>[] = [];
  private currentSetToast: ((toasts: ToastConfig[]) => void) | null = null;
  private currentToasts: ToastConfig[] = [];

  show(toast: Omit<ToastConfig, 'key'>) {
    const key = Math.random().toString();
    const newToast = { ...toast, key };

    if (this.currentSetToast) {
      this.currentToasts = [...this.currentToasts, newToast];
      this.currentSetToast(this.currentToasts);
    } else {
      this.toastQueue.push(toast);
    }

    return () => this.hide(key);
  }

  hide(key: string) {
    if (this.currentSetToast) {
      this.currentToasts = this.currentToasts.filter((t) => t.key !== key);
      this.currentSetToast(this.currentToasts);
    }
  }

  setToastSetter(setter: ((toasts: ToastConfig[]) => void) | null) {
    this.currentSetToast = setter;
    // Process any queued toasts
    if (setter && this.toastQueue.length > 0) {
      const queuedToasts = this.toastQueue.map((toast) => ({
        ...toast,
        key: Math.random().toString(),
      }));
      this.currentToasts = [...this.currentToasts, ...queuedToasts];
      this.toastQueue = [];
      setter(this.currentToasts);
    }
  }

  clearToastSetter() {
    this.currentSetToast = null;
  }

  getCurrentToasts() {
    return this.currentToasts;
  }
}

// Create singleton instance
const toastManager = new ToastManager();

// Export manager functions
export const toast = toastManager;

export const setToastManager = (
  setter: ((toasts: ToastConfig[]) => void) | null
) => {
  toastManager.setToastSetter(setter);
};

export const ToastContainer = () => {
  const [toasts, setToasts] = useState<ToastConfig[]>(
    toastManager.getCurrentToasts()
  );

  // Subscribe to manager updates
  useEffect(() => {
    setToastManager(setToasts);
    return () => {
      toastManager.clearToastSetter();
    };
  }, []);

  const hideToast = useCallback((key: string) => {
    toastManager.hide(key);
  }, []);

  if (toasts.length === 0) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {toasts.map((item: ToastConfig) => (
          <AnimatedToast
            key={item.key}
            toast={item}
            hide={() => hideToast(item.key)}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};
