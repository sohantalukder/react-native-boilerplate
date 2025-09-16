import React from 'react';
import { View, Pressable } from 'react-native';
import { Text, IconByVariant } from '@/shared/components/atoms';
import { useTheme } from '@/theme';
import { ContextMenuItem, ContextMenuSection } from '@/types/contextMenuTypes';
import { ContextMenuConfigWithKey } from '../hooks/useAnimatedContextMenu';
import {
  createAnimatedContextMenuStyles,
  getMenuItemPressedStyle,
  getMenuItemDisabledStyle,
  getHeaderTitleStyle,
  getHeaderSubtitleStyle,
  getSectionTitleTextStyle,
  getMenuItemTextStyle,
  getIconColor,
} from '../styles/animatedContextMenu.styles';
import rs from '@/shared/utilities/responsiveSize';

interface ContextMenuRenderersProps {
  config: ContextMenuConfigWithKey;
  handleItemPress: (item: ContextMenuItem) => void | Promise<void>;
}

export const useContextMenuRenderers = ({
  config,
  handleItemPress,
}: ContextMenuRenderersProps) => {
  const { colors, layout } = useTheme();
  const styles = createAnimatedContextMenuStyles(colors);

  const renderMenuItem = (item: ContextMenuItem, _index: number) => {
    return (
      <View key={item.id}>
        <Pressable
          style={({ pressed }) => [
            styles.menuItem,
            getMenuItemPressedStyle(colors, pressed),
            getMenuItemDisabledStyle(item.disabled || false),
          ]}
          onPress={() => handleItemPress(item)}
          disabled={item.disabled}
        >
          <View
            style={[layout.row, layout.itemsCenter, styles.menuItemContent]}
          >
            {config.showIcons !== false && item.icon && (
              <IconByVariant
                path={item.icon}
                width={rs(20)}
                height={rs(20)}
                color={getIconColor(colors, item)}
              />
            )}
            <Text
              variant="body2"
              style={[
                styles.menuItemText,
                getMenuItemTextStyle(colors, item.destructive),
              ]}
            >
              {item.label}
            </Text>
            {item.checked && (
              <IconByVariant
                path="check"
                width={rs(20)}
                height={rs(20)}
              />
            )}
          </View>
        </Pressable>
        {item.separator && <View style={styles.separator} />}
      </View>
    );
  };

  const renderSectionTitle = (section: ContextMenuSection) => {
    if (!section.title) return null;

    return (
      <View style={styles.sectionTitle}>
        <Text
          variant="body3"
          style={[styles.sectionTitleText, getSectionTitleTextStyle(colors)]}
        >
          {section.title}
        </Text>
      </View>
    );
  };

  const renderHeader = () => {
    if (!config.title && !config.subtitle) return null;

    return (
      <View style={styles.header}>
        {config.title && (
          <Text
            variant="body1"
            style={[styles.headerTitle, getHeaderTitleStyle(colors)]}
          >
            {config.title}
          </Text>
        )}
        {config.subtitle && (
          <Text
            variant="body3"
            style={[styles.headerSubtitle, getHeaderSubtitleStyle(colors)]}
          >
            {config.subtitle}
          </Text>
        )}
      </View>
    );
  };

  const renderMenuItems = () => {
    return config.items?.map((item: ContextMenuItem, index: number) =>
      renderMenuItem(item, index)
    );
  };

  const renderSections = () => {
    return config.sections?.map(
      (section: ContextMenuSection, sectionIndex: number) => (
        <View key={section.id}>
          {sectionIndex > 0 && <View style={styles.separator} />}
          {renderSectionTitle(section)}
          {section.items.map((item: ContextMenuItem, index: number) =>
            renderMenuItem(item, index)
          )}
        </View>
      )
    );
  };

  return {
    renderMenuItem,
    renderSectionTitle,
    renderHeader,
    renderMenuItems,
    renderSections,
    styles,
  };
};
