import { View } from 'react-native';

import { useTheme } from '@sohantalukder/rn-kit';

export function ExampleBottomSpacing() {
  const { gutters } = useTheme();

  return <View style={gutters.marginBottom_40} />;
}
