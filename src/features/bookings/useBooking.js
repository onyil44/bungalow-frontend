import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../../services/apiBookings';
import { useParams } from 'react-router';
import { serverToVM } from '../../services/booking.adapters';
import { getUserTimeZone } from '../../utils/time';

export function useBooking(id = null) {
  const bookingIdParam = useParams()?.bookingId;

  const bookingId = id || bookingIdParam;

  const {
    data: booking,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBooking(bookingId),
    select: (data) => serverToVM(data, getUserTimeZone()),
    retry: false,
  });

  return { booking, isLoading, error };
}
