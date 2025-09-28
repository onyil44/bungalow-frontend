import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateGuest as updateGuestApi } from '../../services/apiGuests';
import toast from 'react-hot-toast';

export function useUpdateGuests() {
  const queryClient = useQueryClient();

  const {
    mutate: updateGuest,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: ({ guestId, ...dataObj }) => updateGuestApi(guestId, dataObj),
    onSuccess: () => {
      toast.success('Guest updated.');
      queryClient.invalidateQueries(['guests']);
    },
    onError: (err) => {
      toast.error(err.message);
      console.log(err.message);
    },
  });

  return { updateGuest, isUpdating, error };
}
