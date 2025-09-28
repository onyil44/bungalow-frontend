import { useMutation } from '@tanstack/react-query';
import { createBooking as createBookingApi } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { vmCreateToServer } from '../../services/booking.adapters';

export function useCreateBooking() {
  const {
    mutate: createBooking,
    isPending: isBookingCreating,
    error,
  } = useMutation({
    mutationFn: (data) => createBookingApi(vmCreateToServer(data)),
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { createBooking, isBookingCreating, error };
}
