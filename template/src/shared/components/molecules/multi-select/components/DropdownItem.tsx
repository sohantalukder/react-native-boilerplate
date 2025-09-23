import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/theme';
import Text from '@/shared/components/atoms/text/Text';
import { Checkbox } from '@/shared/components/atoms';
import { MultiSelectItem } from '../types';
import { MULTI_SELECT_LIST_CONSTANTS } from '../constants';
import rs from '@/shared/utilities/responsiveSize';

type DropdownItemProps = {
  item: MultiSelectItem;
  isSelected: boolean;
  onToggle: (item: MultiSelectItem) => void;
  checkboxContainerStyle?: object;
  checkBoxStyles?: object;
  dropdownItemStyles?: object;
  dropdownTextStyles?: object;
  disabledItemStyles?: object;
  disabledTextStyles?: object;
  disabledCheckBoxStyles?: object;
};

const DropdownItem: React.FC<DropdownItemProps> = ({
  item,
  isSelected,
  onToggle,
  checkboxContainerStyle,
  checkBoxStyles,
  dropdownItemStyles,
  dropdownTextStyles,
  disabledItemStyles,
  disabledTextStyles,
  disabledCheckBoxStyles,
}) => {
  const { gutters, layout, colors } = useTheme();
  const valueStr = String(item.value ?? '');

  const baseRow = [gutters.paddingHorizontal_20, gutters.paddingVertical_10, layout.row, layout.itemsCenter];

  if (item.disabled) {
    return (
      <View style={[...baseRow, { backgroundColor: colors.gray1, opacity: rs(0.5) }, disabledItemStyles]}>
        <View style={[{ marginRight: rs(10) }, checkboxContainerStyle, disabledCheckBoxStyles]}>
          <Checkbox
            checked={isSelected}
            disabled
            size={MULTI_SELECT_LIST_CONSTANTS.CHECKBOX_SIZE}
          />
        </View>
        <Text
          color="disabled"
          style={disabledTextStyles}
        >
          {valueStr}
        </Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={[...baseRow, dropdownItemStyles]}
      onPress={() => onToggle(item)}
      accessibilityRole="button"
      accessibilityLabel={`${isSelected ? 'Deselect' : 'Select'} ${valueStr}`}
    >
      <View style={[{ marginRight: rs(10) }, checkboxContainerStyle, checkBoxStyles]}>
        <Checkbox
          checked={isSelected}
          onPress={() => onToggle(item)}
          size={MULTI_SELECT_LIST_CONSTANTS.CHECKBOX_SIZE}
        />
      </View>
      <Text
        color="default"
        style={dropdownTextStyles}
      >
        {valueStr}
      </Text>
    </TouchableOpacity>
  );
};

export default DropdownItem;
