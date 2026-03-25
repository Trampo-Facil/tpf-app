import { useQuery } from '@tanstack/react-query';
import { marketplaceService } from '@/services/marketplace.service';

export function useStates() {
  return useQuery({
    queryKey: ['states'],
    queryFn: () => marketplaceService.getStates(),
    staleTime: 1000 * 60 * 60,
  });
}

export function useCitiesByState(stateCode: string | null) {
  return useQuery({
    queryKey: ['cities', stateCode],
    queryFn: () => marketplaceService.getCitiesByState(stateCode!),
    enabled: stateCode !== null,
    staleTime: 1000 * 60 * 30,
  });
}
