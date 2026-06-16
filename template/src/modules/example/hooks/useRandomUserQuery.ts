import { useQuery } from '@tanstack/react-query';

import { exampleService } from '@/modules/example/services/example.service';

export const exampleQueryKeys = {
  all: ['example'] as const,
  randomUser: () => [...exampleQueryKeys.all, 'random-user'] as const,
};

export function useRandomUserQuery() {
  return useQuery({
    queryKey: exampleQueryKeys.randomUser(),
    queryFn: exampleService.getRandomUser,
    enabled: false,
  });
}
