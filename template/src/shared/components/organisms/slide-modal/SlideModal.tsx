import layout from '@/theme/layout';
import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useCallback,
} from 'react';
import { useTheme } from '@/theme';
import { Modal, SafeAreaView } from 'react-native';
import { StatusBar } from '../../atoms';
import { StatusBarStyle } from '../../atoms/status-bar/StatusBar';

// Types
interface SlideModalProps {
  children: React.ReactNode;
}

export interface SlideModalRef {
  openModal: () => void;
  closeModal: () => void;
  isVisible: boolean;
}

const SlideModal = forwardRef<SlideModalRef, SlideModalProps>(
  ({ children }, ref) => {
    const { variant, colors } = useTheme();
    const [isVisible, setIsVisible] = useState(false);

    // Simple style calculations
    const containerStyle = [
      layout.flex_1,
      { backgroundColor: colors.background },
    ];
    const statusBarStyle =
      variant === 'dark' ? StatusBarStyle.LIGHT : StatusBarStyle.DARK;

    // Optimized modal controls
    const openModal = useCallback(() => {
      setIsVisible(true);
    }, []);

    const closeModal = useCallback(() => {
      setIsVisible(false);
    }, []);

    // Expose methods through ref
    useImperativeHandle(
      ref,
      () => ({
        openModal,
        closeModal,
        isVisible,
      }),
      [openModal, closeModal, isVisible]
    );

    return (
      <Modal
        visible={isVisible}
        transparent={true}
        animationType="slide"
        statusBarTranslucent={false}
        onRequestClose={closeModal}
        hardwareAccelerated={true}
        presentationStyle="overFullScreen"
      >
        <StatusBar
          barStyle={statusBarStyle as StatusBarStyle}
          bgColor={colors.background}
          translucent={false}
          animated={true}
        />
        <SafeAreaView style={containerStyle}>{children}</SafeAreaView>
      </Modal>
    );
  }
);

SlideModal.displayName = 'SlideModal';

export default SlideModal;
