import { ToastContainer } from '@/shared/contexts/toast';
import React from 'react';
import { DialogContainer } from './dialog';
import { BottomSheetContainer } from './bottom-sheet';
import { ContextMenuContainer } from './context-menu';
const UiComponentsWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <>
      <DialogContainer />
      <ToastContainer />
      <ContextMenuContainer />
      <BottomSheetContainer />
      {children}
    </>
  );
};

export default UiComponentsWrapper;
