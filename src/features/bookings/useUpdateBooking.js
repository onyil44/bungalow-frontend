import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking as updateBookingApi } from '../../services/apiBookings';
import { useParams } from 'react-router';
import toast from 'react-hot-toast';
import { vmCreateToServer } from '../../services/booking.adapters';

export function useUpdateBooking() {
  const queryClient = useQueryClient();
  const { bookingId } = useParams();

  const { mutate: updateBooking, isPending: isUpdating } = useMutation({
    mutationFn: ({ bookingId, ...dataObj }) => {
      if (dataObj._id)
        return updateBookingApi(dataObj._id, vmCreateToServer(dataObj));
      else return updateBookingApi(bookingId, vmCreateToServer(dataObj));
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['booking', bookingId]);
      toast.success('Booking updated');
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return { updateBooking, isUpdating };
}
