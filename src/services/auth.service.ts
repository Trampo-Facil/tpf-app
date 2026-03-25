import { apiClient, TOKEN_KEY } from './api/client';
import { storage } from './storage';
import type { LoginRequest, LoginResponse, RegisterWorkerRequest } from '@/types/api.types';

export const authService = {
  async signIn(data: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/sign-in', data);
    await storage.setItem(TOKEN_KEY, response.data.access_token);
    return response.data;
  },

  async registerWorker(data: RegisterWorkerRequest): Promise<void> {
    await apiClient.post('/auth/worker/sign-up', data);
  },

  async signOut(): Promise<void> {
    await storage.deleteItem(TOKEN_KEY);
  },

  async getStoredToken(): Promise<string | null> {
    return storage.getItem(TOKEN_KEY);
  },
};
