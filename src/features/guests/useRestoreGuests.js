import { useMutation, useQueryClient } from '@tanstack/react-query';
import { restoreGuests as restoreGuestsApi } from '../../services/apiGuests';
import toast from 'react-hot-toast';

export function useRestoreGuests() {
  const qureyClient = useQueryClient();

  const {
    mutate: restoreGuests,
    isPending: isGuestsRestoring,
    error,
  } = useMutation({
    mutationFn: restoreGuestsApi,
    onSuccess: () => {
      qureyClient.invalidateQueries(['guests']);
      toast.success('Guests are restored.');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { restoreGuests, isGuestsRestoring, error };
}
