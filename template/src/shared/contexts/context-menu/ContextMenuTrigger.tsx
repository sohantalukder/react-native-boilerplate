import React, { memo, useCallback, ReactNode, useRef } from 'react';
import {
  View,
  Pressable,
  GestureResponderEvent,
  ViewStyle,
  PressableProps,
  StyleProp,
} from 'react-native';
import { contextMenu } from './contextMenuManager';
import {
  ContextMenuConfig,
  ContextMenuItem,
  ContextMenuSection,
} from '@/types/contextMenuTypes';

interface ContextMenuTriggerProps
  extends Omit<PressableProps, 'onPress' | 'onLongPress'> {
  children: ReactNode;
  menuConfig?: ContextMenuConfig;
  items?: ContextMenuItem[];
  sections?: ContextMenuSection[];
  triggerOn?: 'press' | 'longPress' | 'both';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  onLongPress?: () => void;
}

/**
 * ContextMenuTrigger - Component that triggers context menu on press/long press
 *
 * Features:
 * - Configurable trigger methods (press, long press, both)
 * - Smart positioning relative to trigger (above/below)
 * - Custom styling support
 * - Accessibility support
 */
const ContextMenuTrigger: React.FC<ContextMenuTriggerProps> = memo(
  ({
    children,
    menuConfig,
    items = [],
    sections = [],
    triggerOn = 'longPress',
    disabled = false,
    style,
    onPress,
    onLongPress,
    ...pressableProps
  }) => {
    const triggerRef = useRef<View>(null);

    const handleShowMenu = useCallback(() => {
      if (disabled) return;

      // Measure the trigger component to get its position
      triggerRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
        const config: ContextMenuConfig = {
          ...menuConfig,
          items: menuConfig?.items || items,
          sections: menuConfig?.sections || sections,
          position: {
            x: pageX,
            y: pageY + height, // Position below the trigger by default
          },
          // Add trigger dimensions for better positioning
          triggerBounds: {
            x: pageX,
            y: pageY,
            width,
            height,
          },
        };

        contextMenu.show(config);
      });
    }, [disabled, menuConfig, items, sections]);

    const handlePress = useCallback(
      (_event: GestureResponderEvent) => {
        if (triggerOn === 'press' || triggerOn === 'both') {
          handleShowMenu();
        }
        onPress?.();
      },
      [triggerOn, handleShowMenu, onPress]
    );

    const handleLongPress = useCallback(
      (_event: GestureResponderEvent) => {
        if (triggerOn === 'longPress' || triggerOn === 'both') {
          handleShowMenu();
        }
        onLongPress?.();
      },
      [triggerOn, handleShowMenu, onLongPress]
    );

    return (
      <Pressable
        ref={triggerRef}
        style={style}
        onPress={handlePress}
        onLongPress={handleLongPress}
        disabled={disabled}
        accessible
        accessibilityRole="button"
        accessibilityLabel="Show context menu"
        accessibilityHint="Long press to show context menu"
        {...pressableProps}
      >
        {children}
      </Pressable>
    );
  }
);

ContextMenuTrigger.displayName = 'ContextMenuTrigger';

export default ContextMenuTrigger;
