import type { DialogManagerProps } from './types';

class DialogManager {
  private dialogQueue: DialogManagerProps[] = [];
  private currentDialog: DialogManagerProps | null = null;
  private currentSetDialog:
    | ((dialog: DialogManagerProps | null) => void)
    | null = null;

  show(props: DialogManagerProps) {
    this.currentDialog = props;
    if (this.currentSetDialog) {
      this.currentSetDialog(props);
    } else {
      this.dialogQueue.push(props);
    }
  }

  hide() {
    this.currentDialog = null;
    if (this.currentSetDialog) {
      this.currentSetDialog(null);
    }
  }

  progress(isLoading: boolean, buttonIndex?: number) {
    if (this.currentDialog && this.currentSetDialog) {
      // Update the loading state of buttons
      const updatedDialog = {
        ...this.currentDialog,
        buttons: this.currentDialog.buttons?.map((button, index) => ({
          ...button,
          // If buttonIndex is specified, only update that button, otherwise update the last button (confirm button)
          isLoading:
            buttonIndex !== undefined
              ? index === buttonIndex
                ? isLoading
                : button.isLoading
              : index === (this.currentDialog?.buttons?.length || 0) - 1
                ? isLoading
                : button.isLoading,
        })),
      };
      this.currentDialog = updatedDialog as DialogManagerProps;
      this.currentSetDialog(updatedDialog as DialogManagerProps);
    }
  }

  setDialogSetter(
    setter: ((dialog: DialogManagerProps | null) => void) | null
  ) {
    this.currentSetDialog = setter;
    // Process any queued dialogs
    if (setter && this.dialogQueue.length > 0) {
      const nextDialog = this.dialogQueue.shift() || null;
      this.currentDialog = nextDialog;
      setter(nextDialog);
    }
  }

  clearDialogSetter() {
    this.currentSetDialog = null;
    this.currentDialog = null;
  }
}

// Singleton instance
const dialogManagerInstance = new DialogManager();

export const getDialogManager = () => dialogManagerInstance;

export const setDialogManager = (
  setter: ((dialog: DialogManagerProps | null) => void) | null
) => {
  dialogManagerInstance.setDialogSetter(setter);
};
