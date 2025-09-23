import { forwardRef } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useTheme } from '@/theme';
import { IconifyProps } from './iconfiy.props';

const Iconify = forwardRef<View, IconifyProps>(({ icon, width = 20, height, color, style, ...other }, ref) => {
  const { colors } = useTheme();
  const iconHeight = height ?? width;
  const iconColor = color ?? colors.primary;

  // Direct SVG URL approach - most reliable
  const svgUrl = `https://api.iconify.design/${icon}.svg?color=${encodeURIComponent(
    iconColor
  )}&width=${width}&height=${iconHeight}`;

  const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { margin: 0; padding: 0; }
            html, body { 
              width: 100%; height: 100%; 
              display: flex; justify-content: center; align-items: center;
              background: transparent; overflow: hidden;
            }
            img { 
              width: ${width}px; 
              height: ${iconHeight}px; 
              display: block;
            }
          </style>
        </head>
        <body>
          <img src="${svgUrl}" alt="${icon}" />
        </body>
      </html>
    `;

  return (
    <View
      ref={ref}
      style={[{ width, height: iconHeight }, style]}
      {...other}
    >
      <WebView
        source={{ html: htmlContent }}
        style={{
          width,
          height: iconHeight,
          backgroundColor: colors.transparent,
        }}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        javaScriptEnabled={false}
        startInLoadingState={false}
        originWhitelist={['*']}
      />
    </View>
  );
});

export default Iconify;
