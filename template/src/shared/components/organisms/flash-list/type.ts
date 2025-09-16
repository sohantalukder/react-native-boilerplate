import { FlashListProps as RNFlashListProps } from '@shopify/flash-list';

/**
 * @description This is a props for the flash list.
 */
export interface FlashListProps<T> extends RNFlashListProps<T> {
  /**
   * @description The loading state of the list.
   */
  isLoading?: boolean;
  /**
   * @description The text for the empty state.
   */
  emptyText?: string;
  /**
   * @description The description for the empty state.
   */
  emptyDescription?: string;
  /**
   * @description The fetching state of the next page.
   */
  isFetchingNextPage?: boolean;
  /**
   * @description The has next page state.
   */
  hasNextPage?: boolean;
  /**
   * @description The error state of the list.
   */
  error?: string;
  /**
   * @description The refetch function.
   */
  refetch?: () => void;

  /**
   * @description THe check bottomSheet enabled
   */
  isBottomSheet?: boolean;
  /**
   * @description The skeleton for the list.
   */
  skeleton?: React.ReactNode;
}
