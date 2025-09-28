import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins.js';

export function useCabins(cabinIds = null) {
  const {
    isPending,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ['cabins', cabinIds],
    queryFn: () => getCabins(cabinIds),
  });
  return { isPending, error, cabins };
}
