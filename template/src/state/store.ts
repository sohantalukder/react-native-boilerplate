import { create } from 'zustand';
import type { AuthState } from './slices/authSlice';
import { createAuthSlice } from './slices/authSlice';

// Combine all state types
export type StoreState = AuthState;

// Create the store with all slices
export const useStore = create<AuthState>()((...a) => ({
  ...createAuthSlice(...a),
}));
