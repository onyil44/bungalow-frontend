import { useMutation, useQueryClient } from '@tanstack/react-query';
import { restoreBookings as restoreBookingsApi } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export function useRestoreBokings() {
  const queryClient = useQueryClient();

  const {
    mutate: restoreBookings,
    isPending: isBookingsRestoring,
    error,
  } = useMutation({
    mutationFn: restoreBookingsApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['bookings']);
      toast.success('Bookings restored.');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { restoreBookings, isBookingsRestoring, error };
}
