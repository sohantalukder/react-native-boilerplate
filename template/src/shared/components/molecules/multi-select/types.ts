import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type KeyOrValue = string | number;

export type MultiSelectItem = {
  key?: KeyOrValue;
  value?: KeyOrValue;
  disabled?: boolean;
};

export interface MultiSelectListProps {
  setSelected: (values: KeyOrValue[] | undefined) => void;
  selectedValues?: KeyOrValue[];
  placeholder?: string;
  boxStyles?: StyleProp<ViewStyle>;
  inputStyles?: StyleProp<TextStyle>;
  dropdownStyles?: StyleProp<ViewStyle>;
  dropdownItemStyles?: ViewStyle;
  dropdownTextStyles?: StyleProp<TextStyle>;
  maxHeight?: number;
  data: MultiSelectItem[];
  arrowicon?: React.ReactNode | false;
  closeicon?: React.ReactNode | false;
  searchicon?: React.ReactNode | false;
  search?: boolean;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  searchPlaceholder?: string;
  notFoundText?: string;
  disabledItemStyles?: StyleProp<ViewStyle>;
  disabledTextStyles?: StyleProp<TextStyle>;
  disabledCheckBoxStyles?: StyleProp<ViewStyle>;
  checkBoxStyles?: StyleProp<ViewStyle>;
  labelStyles?: StyleProp<TextStyle>;
  badgeStyles?: StyleProp<ViewStyle>;
  badgeTextStyles?: StyleProp<TextStyle>;
  onSelect?: (values: KeyOrValue[]) => void;
  save?: 'key' | 'value';
  dropdownShown?: boolean;
  fontFamily?: string;
  label?: string;
  enableInfiniteScroll?: boolean;
  onLoadMore?: () => void;
  isLoading?: boolean;
  hasMore?: boolean;
  loadingComponent?: React.ReactNode;
}
