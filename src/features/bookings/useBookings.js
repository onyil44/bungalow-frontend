import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useURL } from '../../hooks/useURL';
import { useAllSearchParamsFilter } from '../../hooks/useAllSearchParamsFilters';
import { PAGE_SIZE } from '../../utils/config';
import { serverToVM } from '../../services/booking.adapters';
import { getUserTimeZone } from '../../utils/time';

export function useBookings() {
  const queryClient = useQueryClient();

  const { filter } = useAllSearchParamsFilter();

  const { getURLParams } = useURL();
  const sort = getURLParams('sortBy') || '-startDateUtc';
  const page = +getURLParams('page') || 1;
  const limit = +getURLParams('limit') || PAGE_SIZE;

  const {
    data: { bookings, count } = {},
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sort, page, limit],
    queryFn: () => getBookings(filter, sort, page, limit),
    select: (res) => {
      return {
        ...res,
        bookings: res.bookings.map((b) => serverToVM(b, getUserTimeZone())),
      };
    },
  });

  const lastPage = Math.ceil(count / limit);

  if (page < lastPage)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sort, page + 1, limit],
      queryFn: () => getBookings(filter, sort, page + 1, limit),
      select: (res) => {
        return { ...res, bookings: res.bookings.map((b) => serverToVM(b)) };
      },
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sort, page - 1, limit],
      queryFn: () => getBookings(filter, sort, page - 1, limit),
      select: (res) => {
        return { ...res, bookings: res.bookings.map((b) => serverToVM(b)) };
      },
    });

  return { bookings, count, error, isLoading };
}
