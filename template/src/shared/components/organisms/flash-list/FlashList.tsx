import { View, RefreshControl } from 'react-native';
import rs from '@/shared/utilities/responsiveSize';
import { useTheme } from '@/theme';
import { FlashList as RNFlashList } from '@shopify/flash-list';
import { EmptyContent, NoInternet } from '../../molecules';
import { useMemo } from 'react';
import { Loader } from '../../atoms';
import layout from '@/theme/layout';
import { NETWORK_ERROR } from '@/assets/constants/network.constant';
import { FlashListProps } from './type';
import { PAGINATION_CONFIG } from './constant';
import { useBottomSheetFlashList } from './useBottomSheetFlashList';

/**
 * @description This is a flash list component.
 */
const FlashList = <T,>({
  data,
  renderItem,
  refreshing,
  onRefresh,
  isLoading = false,
  emptyText = 'No Data Found',
  emptyDescription = 'No Data Found',
  isFetchingNextPage = false,
  hasNextPage = false,
  error = '',
  refetch = () => {},
  isBottomSheet = false,
  skeleton,
  ...props
}: FlashListProps<T>): React.ReactElement => {
  const { colors, gutters } = useTheme();
  const bottomSheetFlashListProps = useBottomSheetFlashList();

  // Memoize empty component
  const EmptyComponent = useMemo(() => {
    if (error === NETWORK_ERROR.noInternet) {
      return <NoInternet onRetry={refetch} />;
    }
    return (
      <EmptyContent
        style={{ marginTop: rs(20) }}
        isLoading={isLoading}
        title={emptyText}
        description={emptyDescription}
      />
    );
  }, [isLoading, emptyText, emptyDescription, error, refetch]);

  // Memoize footer component
  const FooterComponent = useMemo(() => {
    if (isFetchingNextPage && hasNextPage) {
      return (
        <View
          style={[
            gutters.paddingVertical_20,
            layout.flex_1,
            layout.itemsCenter,
          ]}
        >
          <Loader />
        </View>
      );
    }
    return null;
  }, [isFetchingNextPage, hasNextPage, gutters, layout]);

  // Memoize refresh control
  const refreshControl = useMemo(() => {
    return (
      <RefreshControl
        refreshing={refreshing ?? false}
        onRefresh={onRefresh ?? (() => {})}
        progressBackgroundColor={colors.background}
        colors={[colors.text]}
        tintColor={colors.text}
      />
    );
  }, [refreshing, onRefresh, colors]);
  // Memoize bottom sheet specific props
  const bottomSheetProps = useMemo(() => {
    if (!isBottomSheet) return {};

    return {
      ...bottomSheetFlashListProps,
      // Allow simultaneous gestures between bottom sheet and list
      simultaneousHandlers: undefined,
    };
  }, [isBottomSheet, bottomSheetFlashListProps]);

  if (isLoading && skeleton) {
    return skeleton as React.ReactElement;
  }

  return (
    <RNFlashList
      data={data}
      refreshControl={refreshControl}
      renderItem={renderItem}
      ListEmptyComponent={EmptyComponent}
      ListFooterComponent={FooterComponent}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={true}
      disableAutoLayout={false}
      keyboardShouldPersistTaps="handled"
      onEndReachedThreshold={PAGINATION_CONFIG.END_REACHED_THRESHOLD}
      overrideItemLayout={(
        _layout: { span?: number; size?: number },
        _item: T,
        _index: number,
        _maxColumns: number
      ) => {
        // eslint-disable-next-line no-param-reassign
        _layout.size = PAGINATION_CONFIG.ESTIMATED_ITEM_SIZE;
      }}
      {...bottomSheetProps}
      {...props}
    />
  );
};

export default FlashList;
