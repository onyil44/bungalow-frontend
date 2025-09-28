import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { updateMe as updateMeApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useUpdateMe() {
  const qureyClient = useQueryClient();

  const {
    mutate: updateMe,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: updateMeApi,
    onSuccess: () => {
      toast.success('Your account has been updated.');
      qureyClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { updateMe, error, isUpdating };
}
