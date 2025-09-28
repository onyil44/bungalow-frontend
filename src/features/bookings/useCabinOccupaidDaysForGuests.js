import { useQuery } from '@tanstack/react-query';
import { getCabinOccupaidDaysForGuests } from '../../services/apiBookings';
import { serverToVM } from '../../services/booking.adapters';
import { getUserTimeZone } from '../../utils/time';

export function useCabinOccupaidDaysForGuests(cabinId) {
  const {
    data: cabinOccupaidDays,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ['cabinOccupaidDaysForGuests', cabinId],
    queryFn: () => {
      if (!cabinId) return [];
      return getCabinOccupaidDaysForGuests(cabinId);
    },
    select: (data) => data.map((b) => serverToVM(b, getUserTimeZone())),
    retry: false,
  });

  return { cabinOccupaidDays, isLoading, error };
}
