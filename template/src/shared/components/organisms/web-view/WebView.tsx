import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Share,
} from 'react-native';
import { WebView } from 'react-native-webview';

import { SafeScreen } from '@/shared/components/templates';
import { useTheme } from '@/theme';
import type { NavigationProp } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '@/navigation/types';
import { IconButton, IconByVariant, Text } from '@/shared/components/atoms';
import rs from '@/shared/utilities/responsiveSize';
import { useNavigationHeader } from '@/shared/hooks/useNavigationHeader';
import Clipboard from '@react-native-clipboard/clipboard';
import { toast } from '@/shared/contexts/toast';

const HeaderTitle = ({ title, url }: { title: string; url: string }) => {
  const { layout, gutters } = useTheme();
  const handleCopyUrl = () => {
    Clipboard.setString(url);
    toast.show({
      title: 'URL copied to clipboard',
      type: 'success',
    });
  };
  return (
    <View style={layout.flexShrink_1}>
      <Text
        weight="semibold"
        variant="body2"
        numberOfLines={1}
      >
        {title}
      </Text>
      <View style={[layout.row, layout.itemsCenter, gutters.gap_4]}>
        <IconByVariant path="lock" />
        <TouchableOpacity
          onPress={handleCopyUrl}
          onLongPress={handleCopyUrl}
        >
          <Text
            variant="body3"
            style={{ fontSize: rs(10) }}
            numberOfLines={1}
          >
            {url}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const HeaderRight = ({
  webViewRef,
  url,
}: {
  webViewRef: React.RefObject<WebView | null>;
  url: string;
}) => {
  const { layout, gutters } = useTheme();
  const handleShare = () => {
    Share.share({
      message: 'Check out this website',
      url,
    });
  };
  return (
    <View style={[layout.row, layout.itemsCenter, gutters.gap_8]}>
      <IconButton
        icon="refresh"
        onPress={() => webViewRef.current?.reload()}
      />
      <IconButton
        icon="share"
        onPress={handleShare}
      />
    </View>
  );
};

type WebViewScreenProps = {
  route: RouteProp<{ params: { url: string; title: string } }>;
  navigation: NavigationProp<RootStackParamList>;
};

const WebViewScreen: React.FC<WebViewScreenProps> = ({ route }) => {
  const { url, title } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const webViewRef = useRef<WebView>(null);
  const { colors, layout } = useTheme();
  useNavigationHeader({
    headerTitle: (
      <HeaderTitle
        title={title}
        url={url}
      />
    ),
    headerTitleAlign: 'left',
    headerRight: (
      <HeaderRight
        webViewRef={webViewRef}
        url={url}
      />
    ),
  });

  return (
    <SafeScreen showHeader={false}>
      <Animated.View style={layout.flex_1}>
        <WebView
          ref={webViewRef}
          source={{ uri: url }}
          onLoadStart={() => {
            setIsLoading(true);
          }}
          onLoadProgress={({ nativeEvent }) => {
            Animated.timing(progressAnim, {
              toValue: nativeEvent.progress,
              duration: 300,
              useNativeDriver: false,
            }).start();
          }}
          onLoadEnd={() => setIsLoading(false)}
          onError={() =>
            toast.show({
              title: 'Error loading page',
              type: 'error',
            })
          }
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      </Animated.View>

      {isLoading && (
        <View
          style={[
            styles.progressBarContainer,
            { backgroundColor: colors.background },
          ]}
        >
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
                backgroundColor: colors.primary,
              },
            ]}
          />
        </View>
      )}
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    height: 3,
  },
  progressBarContainer: {
    height: 3,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

export default WebViewScreen;
