import { useQuery } from '@tanstack/react-query';
import { getGuset } from '../../services/apiGuests';
import { useParams } from 'react-router';

export function useGuest(id = null) {
  const guestIdParam = useParams()?.guestId;
  const guestId = id || guestIdParam;
  const {
    data: guest,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ['guest', guestId],
    queryFn: () => getGuset(guestId),
    retry: false,
  });

  return { guest, isLoading, error };
}
