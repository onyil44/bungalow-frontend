import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { updatePassword as updatePasswordApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useUpdatePassword() {
  const qureyClient = useQueryClient();

  const {
    mutate: updatePassword,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: updatePasswordApi,
    onSuccess: () => {
      toast.success('Your password has been updated.');
      qureyClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { updatePassword, error, isUpdating };
}
