import { subDays } from 'date-fns';
import { useURL } from '../../hooks/useURL';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getDailyBookingStats } from '../../services/apiBookings';
import { getTodayUtc, getUserTimeZone } from '../../utils/time';
import { ENV } from '../../../config/env';

export function useDailyBookingStats() {
  const queryClient = useQueryClient();

  const { getURLParams } = useURL();
  const numDays = !getURLParams('last') ? 7 : Number(getURLParams('last'));
  const queryDate = subDays(
    getTodayUtc(getUserTimeZone(), true),
    numDays,
  ).toISOString();

  const {
    data: stats,
    isPending: isDailyBookingStatsLoading,
    error,
  } = useQuery({
    queryKey: ['dailyBookingStats', `last-${numDays}`],
    queryFn: () => getDailyBookingStats(queryDate),
  });

  ENV.DASHBOARD_DAYS_ARR.split(',')
    .map((arrDay) => Number(arrDay))
    .filter((arrDay) => arrDay !== numDays)
    .forEach((arrDay) => {
      const queryDate = subDays(
        getTodayUtc(getUserTimeZone(), true),
        arrDay,
      ).toISOString();
      queryClient.prefetchQuery({
        queryKey: ['dailyBookingStats', `last-${arrDay}`],
        queryFn: () => getDailyBookingStats(queryDate),
      });
    });

  return { stats, isDailyBookingStatsLoading, error };
}
