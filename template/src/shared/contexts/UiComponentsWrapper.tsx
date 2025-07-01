import { ToastContainer } from '@/shared/contexts/toast';
import React from 'react';
import { DialogContainer } from './dialog';

const UiComponentsWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <>
      <DialogContainer />
      <ToastContainer />
      {children}
    </>
  );
};

export default UiComponentsWrapper;
