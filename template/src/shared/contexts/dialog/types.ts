import type { DialogProps } from '@/shared/components/atoms/dialog/Dialog';

export type DialogManagerProps = Omit<DialogProps, 'visible' | 'onDismiss'>;
