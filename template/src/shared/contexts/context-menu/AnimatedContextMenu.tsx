import React, { memo } from 'react';
import { Animated, Pressable, ScrollView } from 'react-native';
import { useTheme } from '@/theme';
import { ContextMenuConfig } from '@/types/contextMenuTypes';
import { useAnimatedContextMenu } from './hooks/useAnimatedContextMenu';
import { useContextMenuRenderers } from './components/ContextMenuRenderers';

export type ContextMenuConfigWithKey = ContextMenuConfig & {
  key: string;
};

interface AnimatedContextMenuProps {
  config: ContextMenuConfigWithKey;
  onHide: () => void;
}

export const AnimatedContextMenu: React.FC<AnimatedContextMenuProps> = memo(
  ({ config, onHide }) => {
    const { colors, layout } = useTheme();

    const {
      fadeAnim,
      scaleAnim,
      handleBackdropPress,
      handleItemPress,
      getContainerStyle,
    } = useAnimatedContextMenu(config, onHide);

    const { renderHeader, renderMenuItems, renderSections } =
      useContextMenuRenderers({
        config,
        handleItemPress,
      });

    return (
      <Pressable
        style={layout.flex_1}
        onPress={handleBackdropPress}
      >
        <Animated.View
          style={[
            getContainerStyle(colors),
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {renderHeader()}
            {renderMenuItems()}
            {renderSections()}
          </ScrollView>
        </Animated.View>
      </Pressable>
    );
  }
);
