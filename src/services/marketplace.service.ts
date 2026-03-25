import { apiClient } from './api/client';
import type {
  City,
  JobCategory,
  JobOccupation,
  PaginatedResponse,
  State,
  Worker,
  WorkerFilters,
} from '@/types/api.types';

export const marketplaceService = {
  async getWorkers(filters: WorkerFilters): Promise<PaginatedResponse<Worker>> {
    const response = await apiClient.get<PaginatedResponse<Worker>>('/worker/paginated', {
      params: filters,
    });
    return response.data;
  },

  async getJobCategories(): Promise<JobCategory[]> {
    const response = await apiClient.get<JobCategory[]>('/job/categories');
    return response.data;
  },

  async getJobOccupationsByCategory(categoryId: number): Promise<JobOccupation[]> {
    const response = await apiClient.get<JobOccupation[]>(
      `/job/category/${categoryId}/occupations`,
    );
    return response.data;
  },

  async getStates(): Promise<State[]> {
    const response = await apiClient.get<State[]>('/locales/states');
    return response.data;
  },

  async getCitiesByState(stateCode: string): Promise<City[]> {
    const response = await apiClient.get<City[]>(`/locales/state/${stateCode}/cities`);
    return response.data;
  },
};
