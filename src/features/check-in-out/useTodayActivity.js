import { useQuery } from '@tanstack/react-query';
import { getStaysTodayActivity } from '../../services/apiBookings';
import { serverToVM } from '../../services/booking.adapters';
import { getUserTimeZone } from '../../utils/time';

export function useTodayActivity() {
  const {
    data: activities,
    isPending: isTodayActivitiesLoading,
    error,
  } = useQuery({
    queryKey: ['today-activity'],
    queryFn: getStaysTodayActivity,
    select: (data) => data.map((b) => serverToVM(b, getUserTimeZone())),
  });

  return { activities, isTodayActivitiesLoading, error };
}
