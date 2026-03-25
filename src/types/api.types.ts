// ─── Auth ────────────────────────────────────────────────────────────────────

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface RegisterWorkerRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  jobOccupationIds: number[];
  operationCitiesIds: number[];
}

// ─── User / Worker ────────────────────────────────────────────────────────────

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface Worker {
  id: number;
  user: User;
  jobOccupations: JobOccupation[];
  operationCities: City[];
}

// ─── Job ─────────────────────────────────────────────────────────────────────

export interface JobCategory {
  id: number;
  name: string;
}

export interface JobOccupation {
  id: number;
  name: string;
  category: JobCategory;
}

// ─── Locales ─────────────────────────────────────────────────────────────────

export interface State {
  id: string;
  name: string;
}

export interface City {
  id: number;
  name: string;
  state: string;
}

// ─── Marketplace ─────────────────────────────────────────────────────────────

export interface WorkerFilters {
  page?: number;
  limit?: number;
  jobOccupationIds?: number[];
  cityIds?: number[];
  stateCode?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// ─── Generic ─────────────────────────────────────────────────────────────────

export interface ApiError {
  statusCode: number;
  message: string;
}
