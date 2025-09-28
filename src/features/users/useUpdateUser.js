import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser as updateUserApi } from '../../services/apiUsers';
import toast from 'react-hot-toast';

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const {
    mutate: updateUser,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: ({ _id: userId, ...dataObj }) => updateUserApi(userId, dataObj),
    onSuccess: () => {
      toast.success('User updated.');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { updateUser, isUpdating, error };
}
