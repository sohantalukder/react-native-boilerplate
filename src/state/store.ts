import { create } from 'zustand';
import { AuthState, createAuthSlice } from './slices/authSlice';

// Combine all state types
export interface StoreState extends AuthState {}

// Create the store with all slices
export const useStore = create<StoreState>()((...a) => ({
  ...createAuthSlice(...a),
}));
