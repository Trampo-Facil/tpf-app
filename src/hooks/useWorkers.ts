import { useQuery } from '@tanstack/react-query';
import { marketplaceService } from '@/services/marketplace.service';
import type { WorkerFilters } from '@/types/api.types';

export function useWorkers(filters: WorkerFilters) {
  return useQuery({
    queryKey: ['workers', filters],
    queryFn: () => marketplaceService.getWorkers(filters),
    staleTime: 1000 * 60 * 2,
  });
}
