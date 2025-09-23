import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Text from '@/shared/components/atoms/text/Text';
import IconByVariant from '@/shared/components/atoms/icon-by-variant/IconByVariant';
import { useTheme } from '@/theme';
import { KeyOrValue, MultiSelectItem } from '../types';
import { getDisplayValue } from '../utils';
import { MULTI_SELECT_LIST_CONSTANTS } from '../constants';

type BadgeBarProps = {
  selected: KeyOrValue[];
  data: MultiSelectItem[];
  maxVisible?: number;
  showAll: boolean;
  onToggleShowAll: (show: boolean) => void;
  onRemove: (stored: KeyOrValue) => void;
  badgeBaseStyle?: object;
  badgeStyles?: object;
  badgeTextStyles?: object;
};

const BadgeBar: React.FC<BadgeBarProps> = ({
  selected,
  data,
  maxVisible = MULTI_SELECT_LIST_CONSTANTS.MAX_VISIBLE_BADGES,
  showAll,
  onToggleShowAll,
  onRemove,
  badgeBaseStyle,
  badgeStyles,
  badgeTextStyles,
}) => {
  const { layout, gutters, colors } = useTheme();
  if (selected.length === 0) return null;

  const shouldShowMore = selected.length > maxVisible && !showAll;
  const badgesToShow = shouldShowMore ? selected.slice(0, maxVisible) : selected;
  const remaining = selected.length - maxVisible;

  return (
    <View style={[layout.row, layout.wrap, gutters.gap_6]}>
      {badgesToShow.map((stored, idx) => {
        const item = data.find((d) => d.key === stored || d.value === stored);
        const label = getDisplayValue(item, stored);
        return (
          <TouchableOpacity
            key={`badge-${String(stored)}-${idx}`}
            style={[badgeBaseStyle, badgeStyles, layout.row, layout.itemsCenter]}
            onPress={() => onRemove(stored)}
            accessibilityRole="button"
            accessibilityLabel={`Remove ${String(label)}`}
          >
            <Text
              variant="body3"
              color="default"
              style={badgeTextStyles}
            >
              {String(label)}
            </Text>
            <View style={gutters.marginLeft_4}>
              <IconByVariant
                path="delete"
                width={12}
                height={12}
                color={colors.text}
              />
            </View>
          </TouchableOpacity>
        );
      })}

      {shouldShowMore && (
        <TouchableOpacity
          style={[badgeBaseStyle, badgeStyles, layout.row, layout.itemsCenter, { backgroundColor: colors.primary }]}
          onPress={() => onToggleShowAll(true)}
          accessibilityRole="button"
          accessibilityLabel={`Show ${remaining} more items`}
        >
          <Text
            variant="body3"
            color="white"
            style={badgeTextStyles}
          >
            +{remaining}
          </Text>
        </TouchableOpacity>
      )}

      {showAll && selected.length > maxVisible && (
        <TouchableOpacity
          style={[badgeBaseStyle, badgeStyles, layout.row, layout.itemsCenter, { backgroundColor: colors.primary }]}
          onPress={() => onToggleShowAll(false)}
          accessibilityRole="button"
          accessibilityLabel="Show less items"
        >
          <Text
            variant="body3"
            color="white"
            style={badgeTextStyles}
          >
            Show less
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default BadgeBar;
