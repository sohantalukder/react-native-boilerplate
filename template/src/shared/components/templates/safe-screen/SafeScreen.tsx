import type { BaseScreenProps } from '@/shared/components/templates';
import ScreenContainer from '@/shared/components/templates/screen-container/ScreenContainer';

const SafeScreen = (props: BaseScreenProps) => (
  <ScreenContainer
    {...props}
    useErrorBoundary={true}
  />
);

export default SafeScreen;
