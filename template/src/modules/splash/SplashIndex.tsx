import { Loader } from '@/shared/components/atoms';
import { SafeSplashScreen } from '@/shared/components/templates';

import { useTheme } from '@/theme';

import AnimatedLogo from './components/AnimatedLogo';
import useSplash from './hooks/useSplash';
const SplashIndex = () => {
  const { gutters } = useTheme();
  const { isLoading } = useSplash();
  return (
    <SafeSplashScreen>
      <AnimatedLogo />
      {isLoading ? <Loader style={gutters.marginBottom_40} /> : null}
    </SafeSplashScreen>
  );
};

export default SplashIndex;
