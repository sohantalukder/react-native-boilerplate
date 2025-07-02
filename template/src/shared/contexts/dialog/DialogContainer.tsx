import Dialog from '@/shared/components/atoms/dialog/Dialog';
import React, { memo, useEffect, useState } from 'react';
import type { DialogManagerProps } from './types';
import { setDialogManager } from './dialogManager';

const DialogContainer: React.FC = memo(() => {
  const [currentDialog, setCurrentDialog] = useState<DialogManagerProps | null>(
    null
  );
  useEffect(() => {
    setDialogManager(setCurrentDialog);

    return () => {
      setDialogManager(null);
    };
  }, []);

  return (
    <Dialog
      {...currentDialog}
      visible={!!currentDialog}
      onDismiss={() => setCurrentDialog(null)}
    />
  );
});

export default DialogContainer;
