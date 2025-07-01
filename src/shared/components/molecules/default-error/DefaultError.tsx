import { useErrorBoundary } from 'react-error-boundary';
import { TouchableOpacity, View } from 'react-native';

import { useTheme } from '@/theme';
import { Text } from '@/shared/components/atoms';
import { staticFontStyles } from '@/theme/fonts';

type Properties = {
  readonly onReset?: () => void;
};

const DefaultError: React.FC<Properties> = ({ onReset = () => {} }) => {
  const { gutters, layout } = useTheme();
  const { resetBoundary } = useErrorBoundary();

  return (
    <View
      style={[
        layout.flex_1,
        layout.justifyCenter,
        layout.itemsCenter,
        gutters.gap_16,
        gutters.padding_16,
      ]}
    >
      <Text variant="heading1">Oops!</Text>
      <Text
        variant="body2"
        style={staticFontStyles.alignCenter}
      >
        An error occurred while loading this screen. Please try again.
      </Text>

      {onReset ? (
        <TouchableOpacity
          onPress={() => {
            resetBoundary();
            onReset();
          }}
        >
          <Text
            variant="body2"
            style={gutters.marginTop_10}
            color="error"
          >
            Try again
          </Text>
        </TouchableOpacity>
      ) : undefined}
    </View>
  );
};

export default DefaultError;
