import type { ButtonVariant } from '@/shared/components/atoms/buttons/types/type';
import type { DialogManagerProps } from './types';
import { getDialogManager } from './dialogManager';

export const dialog = {
  show: (props: DialogManagerProps) => {
    const manager = getDialogManager();
    if (manager) {
      manager.show(props);
    }
  },

  hide: () => {
    const manager = getDialogManager();
    if (manager) {
      manager.hide();
      manager.progress(false);
    }
  },
  progress: (isLoading: boolean, buttonIndex?: number) => {
    const manager = getDialogManager();
    if (manager) {
      manager.progress(isLoading, buttonIndex);
    }
  },

  confirm: (
    title: string,
    description: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) => {
    dialog.show({
      title,
      description,
      buttons: [
        {
          label: 'Cancel',
          type: 'outline' as ButtonVariant,
          onPress: () => {
            dialog.hide();
            onCancel?.();
          },
        },
        {
          label: 'Confirm',
          type: 'primary' as ButtonVariant,
          onPress: async () => {
            // Show progress on the confirm button
            dialog.progress(true);
            try {
              await onConfirm();
              dialog.hide();
            } catch (error) {
              // If there's an error, stop the progress but keep the dialog open
              dialog.progress(false);
              throw error;
            }
          },
        },
      ],
    });
  },

  alert: (title: string, description: string, onPress?: () => void) => {
    dialog.show({
      title,
      description,
      buttons: [
        {
          label: 'OK',
          type: 'primary' as ButtonVariant,
          onPress: () => {
            dialog.hide();
            onPress?.();
          },
        },
      ],
    });
  },
};
