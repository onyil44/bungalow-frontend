import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser as deleteUserApi } from '../../services/apiUsers';
import toast from 'react-hot-toast';

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteUser,
    isPending: isUserDeleting,
    error,
  } = useMutation({
    mutationFn: (userId) => deleteUserApi(userId),
    onSuccess: () => {
      toast.success('User deleted.');
      queryClient.invalidateQueries(['users']);
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { deleteUser, isUserDeleting, error };
}
