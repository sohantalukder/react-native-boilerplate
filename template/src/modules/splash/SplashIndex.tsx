import { Loader, ScreenContainer, useTheme } from '@sohantalukder/rn-kit';

import AnimatedLogo from './components/AnimatedLogo';
import useSplash from './hooks/useSplash';
const SplashIndex = () => {
  const { gutters } = useTheme();
  const { isLoading } = useSplash();
  return (
    <ScreenContainer>
      <AnimatedLogo />
      {isLoading ? <Loader style={gutters.marginBottom_40} /> : null}
    </ScreenContainer>
  );
};

export default SplashIndex;
