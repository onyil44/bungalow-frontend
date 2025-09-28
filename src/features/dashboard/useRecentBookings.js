import { subDays } from 'date-fns';
import { useURL } from '../../hooks/useURL';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookingsAfterDate } from '../../services/apiBookings';
import { getTodayUtc, getUserTimeZone } from '../../utils/time';

export function useRecentBookings() {
  const queryClient = useQueryClient();
  const { getURLParams } = useURL();

  const numDays = !getURLParams('last') ? 7 : Number(getURLParams('last'));
  const queryDate = subDays(
    getTodayUtc(getUserTimeZone(), true),
    numDays,
  ).toISOString();

  const {
    data: bookings,
    isPending: isRecentBookingsLoading,
    error,
  } = useQuery({
    queryKey: ['bookings', `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(queryDate),
  });

  process.env.DASHBOARD_DAYS_ARR.split(',')
    .map((arrDay) => Number(arrDay))
    .filter((arrDay) => arrDay !== numDays)
    .forEach((arrDay) => {
      const queryDate = subDays(
        getTodayUtc(getUserTimeZone(), true),
        arrDay,
      ).toISOString();
      queryClient.prefetchQuery({
        queryKey: ['bookings', `last-${arrDay}`],
        queryFn: () => getBookingsAfterDate(queryDate),
      });
    });

  return { bookings, isRecentBookingsLoading, error };
}
