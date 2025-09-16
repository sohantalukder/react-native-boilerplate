import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ContextMenuConfig } from '@/types/contextMenuTypes';
import styles from './styles';
import { AnimatedContextMenu } from './AnimatedContextMenu';

export type ContextMenuConfigWithKey = ContextMenuConfig & {
  key: string;
};

// Create a singleton instance to manage global context menu state
class ContextMenuManager {
  private menuQueue: ContextMenuConfig[] = [];
  private currentSetMenu:
    | ((menu: ContextMenuConfigWithKey | null) => void)
    | null = null;
  private currentMenu: ContextMenuConfigWithKey | null = null;

  show(config: ContextMenuConfig) {
    const key = Math.random().toString(); // NOSONAR S2245,
    const newMenu = { ...config, key };

    if (this.currentSetMenu) {
      requestAnimationFrame(() => {
        this.currentMenu = newMenu;
        this.currentSetMenu!(this.currentMenu);
      });
    } else {
      this.menuQueue.push(config);
    }

    return () => this.hide();
  }

  hide() {
    if (this.currentSetMenu) {
      requestAnimationFrame(() => {
        this.currentMenu = null;
        this.currentSetMenu!(this.currentMenu);
      });
    }
  }

  setMenuSetter(
    setter: ((menu: ContextMenuConfigWithKey | null) => void) | null
  ) {
    this.currentSetMenu = setter;
    // Process any queued menus
    if (setter && this.menuQueue.length > 0) {
      const queuedMenu = this.menuQueue[this.menuQueue.length - 1]; // Take the last one
      this.currentMenu = {
        ...queuedMenu,
        key: Math.random().toString(), // NOSONAR S2245,
      };
      this.menuQueue = [];
      setter(this.currentMenu);
    }
  }

  clearMenuSetter() {
    this.currentSetMenu = null;
  }

  getCurrentMenu() {
    return this.currentMenu;
  }
}

// Create singleton instance
const contextMenuManager = new ContextMenuManager();

// Export manager functions
export const contextMenu = contextMenuManager;

export const setContextMenuManager = (
  setter: ((menu: ContextMenuConfigWithKey | null) => void) | null
) => {
  contextMenuManager.setMenuSetter(setter);
};

export const ContextMenuContainer = () => {
  const [menu, setMenu] = useState<ContextMenuConfigWithKey | null>(
    contextMenuManager.getCurrentMenu()
  );

  // Subscribe to manager updates
  useEffect(() => {
    setContextMenuManager(setMenu);
    return () => {
      contextMenuManager.clearMenuSetter();
    };
  }, []);

  const hideMenu = useCallback(() => {
    contextMenuManager.hide();
  }, []);

  return menu ? (
    <SafeAreaView
      style={styles.container}
      pointerEvents="box-none"
    >
      <View
        style={styles.content}
        pointerEvents="box-none"
      >
        <AnimatedContextMenu
          config={menu}
          onHide={hideMenu}
        />
      </View>
    </SafeAreaView>
  ) : null;
};
