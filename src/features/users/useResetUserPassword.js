import { useMutation, useQueryClient } from '@tanstack/react-query';
import { resetUserPassword as resetUserPasswordApi } from '../../services/apiUsers';
import toast from 'react-hot-toast';

export function useResetUserPassword() {
  const queryClient = useQueryClient();
  const {
    mutate: resetUserPassword,
    isPending: isUserPasswordResetting,
    error,
  } = useMutation({
    mutationFn: (userId) => resetUserPasswordApi(userId),
    onSuccess: () => {
      toast.success('User password has been reset.');
      queryClient.invalidateQueries(['users']);
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { resetUserPassword, isUserPasswordResetting, error };
}
