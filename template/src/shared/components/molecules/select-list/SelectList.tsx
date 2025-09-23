import React from 'react';
import { View, TouchableOpacity, Animated, TextInput, Keyboard, FlatList, Pressable } from 'react-native';
import { useTheme } from '@/theme';
import IconByVariant from '../../atoms/icon-by-variant/IconByVariant';
import AnimatedLabel from '../../atoms/text-input/AnimatedLabel';
import { selectStyles } from './styles/select.styles';
import { SelectItem, SelectListProps } from './types/select-list.type';
import { validateSelectItem } from './utils/select-list.utility';
import { SELECT_LIST_CONSTANTS } from './constants/select-list.constant';
import { logger } from '@/ignoreWarnings';
import { Text } from '../../atoms/index';

/**
 * A customizable dropdown select list component with search functionality
 *
 * @component
 * @example
 * ```tsx
 * const data = [
 *   { key: '1', value: 'Option 1' },
 *   { key: '2', value: 'Option 2' },
 * ];
 *
 * <SelectList
 *   data={data}
 *   setSelected={setValue}
 *   placeholder="Choose an option"
 *   label="Select Option"
 *   search={true}
 * />
 * ```
 */
const SelectList: React.FC<SelectListProps> = ({
  setSelected,
  placeholder,
  boxStyles,
  inputStyles,
  dropdownStyles,
  dropdownItemStyles,
  dropdownTextStyles,
  maxHeight,
  data,
  defaultOption,
  arrowicon = false,
  closeicon = false,
  search = true, // "Search must" -> on by default
  searchPlaceholder = 'Search...',
  notFoundText = 'No data found',
  disabledItemStyles,
  disabledTextStyles,
  onSelect = () => {},
  save = 'key',
  dropdownShown = false,
  fontFamily,
  label,
}) => {
  const { colors, layout, gutters } = useTheme();
  const styles = React.useMemo(() => selectStyles({ colors }), [colors]);

  const [firstRender, setFirstRender] = React.useState(true);
  const [dropdown, setDropdown] = React.useState<boolean>(dropdownShown);
  const [selectedVal, setSelectedVal] = React.useState<string | undefined>('');
  const [height, setHeight] = React.useState<number>(maxHeight ?? 200);
  const [isFocused, setIsFocused] = React.useState(false);
  const animatedValue = React.useRef(new Animated.Value(dropdown ? height : 0)).current;

  // Memoized style objects to avoid inline styles
  const searchInputStyle = React.useMemo(
    () => ({
      padding: 0,
      height: SELECT_LIST_CONSTANTS.SEARCH_INPUT_HEIGHT,
      fontFamily,
      color: colors.text,
    }),
    [fontFamily, colors.text]
  );

  const dropdownContainerStyle = React.useMemo(
    () => ({
      maxHeight: animatedValue,
      position: 'absolute' as const,
      top: SELECT_LIST_CONSTANTS.DROPDOWN_TOP_OFFSET,
      left: 0,
      right: 0,
      zIndex: SELECT_LIST_CONSTANTS.Z_INDEX,
      backgroundColor: colors.background,
      borderRadius: SELECT_LIST_CONSTANTS.BORDER_RADIUS,
      borderWidth: 1,
      borderColor: colors.gray7,
      shadowColor: colors.text,
      shadowOffset: SELECT_LIST_CONSTANTS.SHADOW_OFFSET,
      shadowOpacity: SELECT_LIST_CONSTANTS.SHADOW_OPACITY,
      shadowRadius: SELECT_LIST_CONSTANTS.SHADOW_RADIUS,
      elevation: SELECT_LIST_CONSTANTS.ELEVATION,
    }),
    [animatedValue, colors.background, colors.gray7, colors.text]
  );

  const containerStyle = React.useMemo(
    () => [styles.container, { zIndex: dropdown ? SELECT_LIST_CONSTANTS.Z_INDEX + 1 : 1 }],
    [styles.container, dropdown]
  );

  const backdropStyle = React.useMemo(
    () => ({
      position: 'absolute' as const,
      top: -1000,
      left: -1000,
      right: -1000,
      bottom: -1000,
      zIndex: SELECT_LIST_CONSTANTS.Z_INDEX - 1,
      backgroundColor: colors.transparent,
    }),
    [colors.transparent]
  );

  // Split static and dynamic styles for better performance
  const baseTextStyle = React.useMemo(
    () => ({
      fontFamily,
    }),
    [fontFamily]
  );

  const selectedTextColorStyle = React.useMemo(
    () => ({
      color: selectedVal ? colors.text : colors.gray4,
    }),
    [selectedVal, colors.text, colors.gray4]
  );

  const emptyTextStyle = React.useMemo(
    () => ({
      fontFamily,
      color: colors.text,
    }),
    [fontFamily, colors.text]
  );

  // query drives filteredData (no setTimeout hacks)
  const [query, setQuery] = React.useState('');

  /**
   * Animates the dropdown to slide down and show
   */
  const slideDown = React.useCallback(() => {
    setDropdown(true);
    setIsFocused(true);
    Animated.timing(animatedValue, {
      toValue: height,
      duration: SELECT_LIST_CONSTANTS.ANIMATION_DURATION.SLIDE_DOWN,
      useNativeDriver: false, // Cannot use native driver for height animations
    }).start();
  }, [animatedValue, height]);

  /**
   * Animates the dropdown to slide up and hide
   */
  const slideUp = React.useCallback(() => {
    setIsFocused(false);
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: SELECT_LIST_CONSTANTS.ANIMATION_DURATION.SLIDE_UP,
      useNativeDriver: false, // Cannot use native driver for height animations
    }).start(() => setDropdown(false));
  }, [animatedValue]);

  /**
   * Updates the dropdown height when maxHeight prop changes
   */
  React.useEffect(() => {
    if (maxHeight) setHeight(maxHeight);
  }, [maxHeight]);

  /**
   * Sets the default selected option when defaultOption prop changes
   */
  React.useEffect(() => {
    if (!defaultOption || !validateSelectItem(defaultOption)) return;

    // Handle both key and value, including falsy values like 0 or empty string
    const hasValidKey = defaultOption.key !== undefined && defaultOption.key !== null;
    const hasValidValue = defaultOption.value !== undefined && defaultOption.value !== null;

    if (hasValidKey) {
      setSelectedVal(defaultOption.value?.toString() ?? '');
    } else if (hasValidValue) {
      // Fallback to value if key is not available
      setSelectedVal(defaultOption.value?.toString() ?? '');
    }
  }, [defaultOption]);

  /**
   * Controls dropdown visibility based on external dropdownShown prop
   */
  React.useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }
    if (dropdownShown) slideDown();
    else slideUp();
  }, [dropdownShown, firstRender, slideDown, slideUp]);

  /**
   * Triggers onSelect callback when selection changes
   */
  React.useEffect(() => {
    if (firstRender) return;
    onSelect();
  }, [selectedVal, onSelect, firstRender]);

  /**
   * Filters the data based on the search query
   * @returns Filtered array of valid items matching the search query
   */
  const filteredData = React.useMemo(() => {
    if (!Array.isArray(data)) {
      logger.warn('SelectList: data prop must be an array');
      return [];
    }

    // Filter out invalid items and validate
    const validData = data.filter(validateSelectItem);
    if (validData.length !== data.length) {
      logger.warn('SelectList: Some items in data array are invalid and were filtered out');
    }

    const q = query.trim().toLowerCase();
    if (!search || q.length === 0) return validData;

    return validData.filter((item: SelectItem) => {
      const itemLabel = String(item?.value ?? item?.key ?? '').toLowerCase();
      return itemLabel.includes(q);
    });
  }, [data, query, search]);

  /**
   * Handles the selection of an item from the dropdown
   * @param item - The selected item
   */
  const handlePick = React.useCallback(
    (item: SelectItem) => {
      const key = item.key ?? item.value;
      const value = item.value ?? '';

      if (save === 'value') setSelected(value);
      else setSelected(key);

      setSelectedVal(value?.toString() ?? '');
      // clear search & close
      setQuery('');
      slideUp();
    },
    [save, slideUp]
  );

  /**
   * Renders a single item in the dropdown list
   * @param item - The item to render
   * @returns JSX element for the item
   */
  const renderItem = React.useCallback(
    ({ item }: { item: SelectItem }) => {
      const value = item.value ?? '';
      const disabled = !!item.disabled;

      const itemStyle = [gutters.paddingHorizontal_20, gutters.paddingVertical_10];

      const disabledItemStyle = [...itemStyle, { backgroundColor: colors.gray1, opacity: 0.5 }];

      const disabledTextStyle = [{ color: colors.gray4, fontFamily }, disabledTextStyles];
      const enabledTextStyle = [{ fontFamily, color: colors.text }, dropdownTextStyles];

      if (disabled) {
        return (
          <View style={[disabledItemStyle, disabledItemStyles]}>
            <Text style={disabledTextStyle}>{String(value)}</Text>
          </View>
        );
      }

      return (
        <TouchableOpacity
          style={[itemStyle, dropdownItemStyles]}
          onPress={() => handlePick(item)}
          accessibilityRole="button"
          accessibilityLabel={`Select ${String(value)}`}
        >
          <Text style={enabledTextStyle}>{String(value)}</Text>
        </TouchableOpacity>
      );
    },
    [
      gutters.paddingHorizontal_20,
      gutters.paddingVertical_10,
      colors.gray1,
      colors.gray4,
      colors.text,
      fontFamily,
      disabledItemStyles,
      disabledTextStyles,
      dropdownItemStyles,
      dropdownTextStyles,
      handlePick,
    ]
  );

  /**
   * Extracts a unique key for each item in the list
   * @param item - The item to extract key from
   * @param index - The index of the item
   * @returns Unique string key
   */
  const keyExtractor = (item: SelectItem, index: number) => String(item?.key ?? item?.value ?? index);

  return (
    <View style={containerStyle}>
      {dropdown && (
        <Pressable
          style={backdropStyle}
          onPress={slideUp}
        />
      )}

      {/* AnimatedLabel */}
      <AnimatedLabel
        label={label || placeholder || 'Select option'}
        value={selectedVal ?? ''}
        isFocused={selectedVal?.toString() ? true : isFocused}
      />

      {dropdown && search ? (
        <View style={[styles.select, isFocused && styles.activeContainer, boxStyles]}>
          <View style={[layout.row, layout.itemsCenter, layout.flex_1]}>
            <TextInput
              placeholder={searchPlaceholder}
              value={query}
              onChangeText={setQuery}
              style={[searchInputStyle, layout.flex_1, inputStyles]}
              returnKeyType="search"
              autoFocus
              placeholderTextColor={colors.gray4}
            />

            <TouchableOpacity
              onPress={slideUp}
              accessibilityRole="button"
              accessibilityLabel="Close"
              style={styles.arrow}
            >
              {!closeicon ? <IconByVariant path="cancel" /> : closeicon}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.select, isFocused && styles.activeContainer, boxStyles]}
          onPress={() => {
            if (!dropdown) {
              Keyboard.dismiss();
              slideDown();
            } else {
              slideUp();
            }
          }}
          accessibilityRole="button"
          accessibilityLabel="Open dropdown"
        >
          <Text style={[baseTextStyle, selectedTextColorStyle, inputStyles]}>
            {selectedVal === '' && isFocused ? placeholder || 'Select option' : String(selectedVal)}
          </Text>

          <View style={styles.arrow}>
            {!arrowicon ? (
              <IconByVariant
                path="downArrow"
                height={18}
                width={18}
              />
            ) : (
              arrowicon
            )}
          </View>
        </TouchableOpacity>
      )}

      {dropdown ? (
        <Animated.View style={[dropdownContainerStyle, dropdownStyles]}>
          <FlatList
            data={filteredData}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={[gutters.paddingVertical_10]}
            nestedScrollEnabled
            getItemLayout={(_, index) => ({
              length: SELECT_LIST_CONSTANTS.ITEM_HEIGHT,
              offset: SELECT_LIST_CONSTANTS.ITEM_HEIGHT * index,
              index,
            })}
            ListEmptyComponent={
              <TouchableOpacity
                style={[gutters.paddingHorizontal_20, gutters.paddingVertical_10, dropdownItemStyles]}
                onPress={() => {
                  setSelected(undefined);
                  setSelectedVal('');
                  setQuery('');
                  slideUp();
                }}
              >
                <Text style={[emptyTextStyle, dropdownTextStyles]}>{notFoundText}</Text>
              </TouchableOpacity>
            }
          />
        </Animated.View>
      ) : null}
    </View>
  );
};

export default SelectList;
