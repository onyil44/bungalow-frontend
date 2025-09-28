import { useMutation } from '@tanstack/react-query';
import { activateAccount as activateAccountApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';

export function useActivateAccount() {
  const navigate = useNavigate();
  const { token } = useParams();

  const {
    mutate: activateAccount,
    isPending: isActivating,
    error,
  } = useMutation({
    mutationFn: ({ password, passwordConfirm }) =>
      activateAccountApi({ password, passwordConfirm, token }),
    onSuccess: () => {
      toast.success('Your password created. Please log in.');
      navigate('/login', { replace: true });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { activateAccount, isActivating, error };
}
