import { useQuery } from '@tanstack/react-query';
import { marketplaceService } from '@/services/marketplace.service';

export function useJobCategories() {
  return useQuery({
    queryKey: ['job-categories'],
    queryFn: () => marketplaceService.getJobCategories(),
    staleTime: 1000 * 60 * 10,
  });
}

export function useJobOccupationsByCategory(categoryId: number | null) {
  return useQuery({
    queryKey: ['job-occupations', categoryId],
    queryFn: () => marketplaceService.getJobOccupationsByCategory(categoryId!),
    enabled: categoryId !== null,
    staleTime: 1000 * 60 * 10,
  });
}
