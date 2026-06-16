import { apiInstances } from '@/config/http/apiInstance.config';
import type {
  ExampleUser,
  UsersResponse,
} from '@/modules/example/types/example.type';

export const exampleService = {
  async getRandomUser(): Promise<ExampleUser> {
    const response = await apiInstances.service.get<UsersResponse>('users', {
      params: { limit: 1 },
    });
    const user = response.users[0];

    if (!user) {
      throw new Error('No user found');
    }

    return user;
  },
};
