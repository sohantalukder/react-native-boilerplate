export interface ExampleUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  username: string;
}

export interface UsersResponse {
  users: ExampleUser[];
}

export interface ExampleFeatureViewItem {
  title: string;
  description: string;
  icon: string;
  onPress: () => void;
  isLoading: boolean;
  buttonText: string;
}
