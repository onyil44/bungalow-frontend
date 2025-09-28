import { useQuery } from '@tanstack/react-query';
import { getCabinOccupaidDays } from '../../services/apiBookings';
import { serverToVM } from '../../services/booking.adapters';

const userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

export function useCabinOccupaidDays(cabinId) {
  const {
    data: cabinOccupaidDays,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ['cabinOccupaidDays', cabinId],
    queryFn: () => {
      if (!cabinId) return [];
      return getCabinOccupaidDays(cabinId);
    },
    select: (data) => data.map((b) => serverToVM(b, userTZ)),
    retry: false,
  });

  return { cabinOccupaidDays, isLoading, error };
}
