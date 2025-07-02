import type { StyleProp, TextStyle } from 'react-native';
import Text from '../text/Text';

type InputLabelProps = {
  readonly text?: string;
  readonly labelStyle?: StyleProp<TextStyle>;
};

export const InputLabel: React.FC<InputLabelProps> = ({ text, labelStyle }) => {
  if (!text) return null;
  return (
    <Text
      style={labelStyle}
      variant="body2"
    >
      {text}
    </Text>
  );
};
