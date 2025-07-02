import { create } from 'zustand';
import type { AuthState} from './slices/authSlice';
import { createAuthSlice } from './slices/authSlice';

// Combine all state types
export interface StoreState extends AuthState {}

// Create the store with all slices
export const useStore = create<StoreState>()((...a) => ({
  ...createAuthSlice(...a),
}));
