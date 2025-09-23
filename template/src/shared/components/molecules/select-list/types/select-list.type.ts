import { TextStyle, ViewStyle, StyleProp } from 'react-native';

/**
 * Represents a single item in the select list
 */
export type SelectItem = {
  /** Unique identifier for the item */
  key?: string | number;
  /** Display value for the item */
  value?: string | number;
  /** Whether the item is disabled */
  disabled?: boolean;
};

/**
 * Props for the SelectList component
 */
export interface SelectListProps {
  /** Callback function called when an item is selected */
  setSelected: (value: string | number | undefined) => void;
  /** Placeholder text displayed when no item is selected */
  placeholder?: string;
  /** Custom styles for the select box container */
  boxStyles?: StyleProp<ViewStyle>;
  /** Custom styles for the input text */
  inputStyles?: StyleProp<TextStyle>;
  /** Custom styles for the dropdown container */
  dropdownStyles?: StyleProp<ViewStyle>;
  /** Custom styles for individual dropdown items */
  dropdownItemStyles?: ViewStyle;
  /** Custom styles for dropdown item text */
  dropdownTextStyles?: StyleProp<TextStyle>;
  /** Maximum height of the dropdown list */
  maxHeight?: number;
  /** Array of items to display in the dropdown */
  data: SelectItem[];
  /** Default selected option */
  defaultOption?: SelectItem;
  /** Custom arrow icon component or false to hide */
  arrowicon?: React.ReactNode | false;
  /** Custom close icon component or false to hide */
  closeicon?: React.ReactNode | false;
  /** Whether to enable search functionality. \ndefault is true */
  search?: boolean;
  /** Placeholder text for the search input */
  searchPlaceholder?: string;
  /** Text displayed when no items match the search */
  notFoundText?: string;
  /** Custom styles for disabled items */
  disabledItemStyles?: StyleProp<ViewStyle>;
  /** Custom styles for disabled item text */
  disabledTextStyles?: StyleProp<TextStyle>;
  /** Callback function called when selection changes */
  onSelect?: () => void;
  /** What value to save when item is selected ('key' or 'value') */
  save?: 'key' | 'value';
  /** Whether the dropdown should be shown initially */
  dropdownShown?: boolean;
  /** Font family for text elements */
  fontFamily?: string;
  /** Label text for the select field */
  label?: string;
}
