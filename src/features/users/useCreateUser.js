import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser as createUserApi } from '../../services/apiUsers';
import toast from 'react-hot-toast';

export function useCreateUser() {
  const queryClient = useQueryClient();
  const {
    mutate: createUser,
    isPending: isCreating,
    error,
  } = useMutation({
    mutationFn: createUserApi,
    onSuccess: () => {
      toast.success('User created');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { createUser, isCreating, error };
}
