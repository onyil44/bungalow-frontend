import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createGuest as createGuestApi } from '../../services/apiGuests';
import toast from 'react-hot-toast';

export function useCreateGuest() {
  const queryClient = useQueryClient();
  const {
    mutate: createGuest,
    isPending: isCreating,
    error,
  } = useMutation({
    mutationFn: createGuestApi,
    onSuccess: () => {
      toast.success('New Guest Created');
      queryClient.invalidateQueries(['guests']);
    },
    onError: (err) => {
      toast.error(err.message);
      console.log(err.message);
    },
  });

  return { createGuest, isCreating, error };
}
