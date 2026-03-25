import { create } from 'zustand';
import { authService } from '@/services/auth.service';
import type { LoginRequest, RegisterWorkerRequest } from '@/types/api.types';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  initialize: () => Promise<void>;
  signIn: (data: LoginRequest) => Promise<void>;
  registerWorker: (data: RegisterWorkerRequest) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isLoading: false,
  error: null,

  initialize: async () => {
    const token = await authService.getStoredToken();
    set({ isAuthenticated: !!token });
  },

  signIn: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await authService.signIn(data);
      set({ isAuthenticated: true, isLoading: false });
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
    }
  },

  registerWorker: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await authService.registerWorker(data);
      set({ isLoading: false });
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
    }
  },

  signOut: async () => {
    await authService.signOut();
    set({ isAuthenticated: false });
  },

  clearError: () => set({ error: null }),
}));
