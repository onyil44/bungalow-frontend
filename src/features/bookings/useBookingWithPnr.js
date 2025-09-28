import { useQuery } from '@tanstack/react-query';
import { getBookingWithPnr } from '../../services/apiBookings';
import { serverToVM } from '../../services/booking.adapters';
import { getUserTimeZone } from '../../utils/time';

export function useBookingWithPnr(pnrCode, email, nationalId) {
  const {
    data: booking,
    isPending: isPnrBookingLoading,
    error,
  } = useQuery({
    queryKey: ['booking', email, pnrCode, nationalId],
    queryFn: () => getBookingWithPnr(pnrCode, email, nationalId),
    select: (data) => serverToVM(data, getUserTimeZone()),
  });

  return { booking, isPnrBookingLoading, error };
}
