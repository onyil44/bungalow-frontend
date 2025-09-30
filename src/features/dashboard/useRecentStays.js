import { subDays } from 'date-fns';
import { useURL } from '../../hooks/useURL';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getStaysAfterDate } from '../../services/apiBookings';
import { getTodayUtc, getUserTimeZone } from '../../utils/time';
import { ENV } from '../../../config/env';

export function useRecentStays() {
  const queryClient = useQueryClient();

  const { getURLParams } = useURL();
  const numDays = !getURLParams('last') ? 7 : Number(getURLParams('last'));
  const queryDate = subDays(
    getTodayUtc(getUserTimeZone(), true),
    numDays,
  ).toISOString();

  const {
    data: stays,
    isPending: isStaysLoading,
    error,
  } = useQuery({
    queryKey: ['stays', `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === 'checked-in' || stay.status === 'checked-out',
  );

  ENV.DASHBOARD_DAYS_ARR.split(',')
    .map((arrDay) => Number(arrDay))
    .filter((arrDay) => arrDay !== numDays)
    .forEach((arrDay) => {
      const queryDate = subDays(
        getTodayUtc(getUserTimeZone(), true),
        arrDay,
      ).toISOString();
      queryClient.prefetchQuery({
        queryKey: ['stays', `last-${arrDay}`],
        queryFn: () => getStaysAfterDate(queryDate),
      });
    });

  return { stays, confirmedStays, isStaysLoading, numDays, error };
}
