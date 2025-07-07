import React, { memo, useMemo, useCallback } from 'react';
import type { GestureResponderEvent, ViewStyle } from 'react-native';
import { Modal, View, Pressable } from 'react-native';

import type { ButtonVariant } from '../buttons/types/type';
import Text from '../text/Text';
import { useTheme } from '@/theme';
import IconByVariant from '../icon-by-variant/IconByVariant';
import withOpacity from '@/shared/utilities/withOpacity';
import rs from '@/shared/utilities/responsiveSize';
import Button from '../buttons/Button';

export interface DialogButton {
  label: string;
  type?: ButtonVariant;
  onPress: () => void;
  isLoading?: boolean;
}

export interface DialogIconConfig {
  size?: number;
  color?: string;
}

export interface DialogProps {
  title?: string;
  description?: string;
  icon?: string;
  visible?: boolean;
  onDismiss?: () => void;
  dismissible?: boolean;
  iconConfig?: DialogIconConfig;
  buttons?: DialogButton[];
}

interface DialogIconProps {
  icon: string;
  iconConfig?: DialogIconConfig;
}

const DialogIcon: React.FC<DialogIconProps> = memo(({ icon, iconConfig }) => (
  <IconByVariant
    path={icon}
    {...(iconConfig?.size !== undefined && {
      width: iconConfig.size,
      height: iconConfig.size,
    })}
    {...(iconConfig?.color && { color: iconConfig.color })}
  />
));

DialogIcon.displayName = 'DialogIcon';

interface DialogContentProps {
  title?: string;
  description?: string;
  icon?: string;
  iconConfig?: DialogIconConfig;
}

const DialogContent: React.FC<DialogContentProps> = memo(
  ({ title, description, icon, iconConfig }) => {
    const { gutters } = useTheme();

    return (
      <View style={gutters.gap_12}>
        {icon && (
          <DialogIcon
            icon={icon}
            {...(iconConfig && { iconConfig })}
          />
        )}
        {title && (
          <Text
            weight="semibold"
            variant="heading3"
            accessibilityRole="header"
          >
            {title}
          </Text>
        )}
        {description && <Text color="secondary">{description}</Text>}
      </View>
    );
  }
);

DialogContent.displayName = 'DialogContent';

interface DialogButtonsProps {
  buttons?: DialogButton[];
}

const DialogButtons: React.FC<DialogButtonsProps> = memo(({ buttons }) => {
  const { layout } = useTheme();

  const buttonContainerStyle = useMemo(() => {
    if (!buttons?.length) return [];

    const styles: ViewStyle[] = [layout.row];

    if (buttons.length === 1) {
      styles.push({ justifyContent: 'center', ...layout.flexShrink_1 });
    } else {
      styles.push({
        justifyContent: 'flex-end',
        gap: 12,
        ...layout.flexShrink_1,
      });
    }

    return styles;
  }, [buttons, layout]);
  if (!buttons?.length) return null;

  return (
    <View style={buttonContainerStyle}>
      {buttons.map((button, index) => (
        <Button
          key={`dialog-btn-${index}`}
          onPress={button.onPress}
          text={button.label}
          variant={button.type || 'primary'}
          isLoading={button.isLoading || false}
          wrapStyle={{ height: rs(44) }}
        />
      ))}
    </View>
  );
});

// Constants for better performance
const BACKDROP_OPACITY = 0.5;
const MIN_DIALOG_WIDTH = 280;
const DIALOG_MARGIN = 40;

// Main Dialog Component
const Dialog: React.FC<DialogProps> = memo(
  ({
    title,
    icon,
    description,
    buttons = [],
    visible = false,
    onDismiss,
    dismissible = true,
    iconConfig,
  }) => {
    const { gutters, layout, colors, borders } = useTheme();

    const styles = useMemo(() => {
      const backdropStyle = [
        layout?.flex_1,
        layout?.itemsCenter,
        layout.justifyCenter,
        {
          backgroundColor: withOpacity(colors?.gray5, BACKDROP_OPACITY),
        },
      ];

      const dialogStyle = [
        {
          backgroundColor: colors.background,
          maxWidth: rs('wf') - DIALOG_MARGIN,
          minWidth: rs(MIN_DIALOG_WIDTH),
        },
        borders.rounded_8,
        gutters.padding_20,
        gutters.gap_12,
      ];

      return { backdropStyle, dialogStyle };
    }, [layout, colors, borders, gutters]);

    const handleBackdropPress = useCallback(() => {
      if (dismissible && onDismiss) {
        onDismiss();
      }
    }, [dismissible, onDismiss]);

    const stopPropagation = useCallback((e: GestureResponderEvent) => {
      e.stopPropagation();
    }, []);

    // Early return for better performance
    if (!visible) return null;

    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={dismissible ? onDismiss : undefined}
        statusBarTranslucent
      >
        <Pressable
          style={styles.backdropStyle}
          onPress={handleBackdropPress}
          accessible
          accessibilityRole="button"
          accessibilityLabel="Close dialog"
        >
          <Pressable
            style={styles.dialogStyle}
            onPress={stopPropagation}
            accessible
            accessibilityLabel={title || 'Dialog'}
          >
            <DialogContent
              {...(title && { title })}
              {...(description && { description })}
              {...(icon && { icon })}
              {...(iconConfig && { iconConfig })}
            />
            <DialogButtons buttons={buttons} />
          </Pressable>
        </Pressable>
      </Modal>
    );
  }
);

export default Dialog;
