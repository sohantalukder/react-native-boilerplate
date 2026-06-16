import { ScrollView } from 'react-native';

import {
  ExampleBottomSpacing,
  ExampleFeatureSection,
  ExampleHeader,
  ExampleStatsSection,
  ExampleUserCard,
  ExampleWelcome,
} from '@/modules/example/components';
import { useExampleController } from '@/modules/example/hooks/useExampleController';
import { ScreenContainer } from '@sohantalukder/rn-kit';

function Example() {
  const { features, userData } = useExampleController();

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ExampleHeader />
        <ExampleWelcome />
        <ExampleUserCard userData={userData} />
        <ExampleFeatureSection features={features} />
        <ExampleStatsSection />
        <ExampleBottomSpacing />
      </ScrollView>
    </ScreenContainer>
  );
}

export default Example;
