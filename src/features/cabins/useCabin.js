import { useQuery } from '@tanstack/react-query';
import { getCabin } from '../../services/apiCabins';

export function useCabin(cabinId) {
  const {
    data: cabin,
    isPending: isCabinLoading,
    error,
  } = useQuery({
    queryKey: ['cabin', cabinId],
    queryFn: () => getCabin(cabinId),
  });

  return { cabin, isCabinLoading, error };
}
