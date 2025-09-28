import { useMutation, useQueryClient } from '@tanstack/react-query';
import { restoreCabins as restoreCabinsApi } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useRestoreCabins() {
  const queryClient = useQueryClient();

  const {
    mutate: restoreCabins,
    isPending: isCabinsRestoring,
    error,
  } = useMutation({
    mutationFn: restoreCabinsApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['cabins']);
      toast.success('Cabins restored.');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { restoreCabins, isCabinsRestoring, error };
}
