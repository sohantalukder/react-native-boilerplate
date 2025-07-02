import type { StateCreator } from 'zustand';
import localStore from '@/services/storage/localStore.service';

// Simple user interface for template
interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: IUser | null;
  // Actions
  logout: () => void;
  setUser: (user: AuthState['user']) => void;
}

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
  isAuthenticated: false,
  user: null,
  logout: () => {
    localStore.clearApiToken();
    set({
      isAuthenticated: false,
      user: null,
    });
  },

  setUser: (user) => {
    set({
      user,
      isAuthenticated: !!user,
    });
  },
});
