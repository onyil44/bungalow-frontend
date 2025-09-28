import { useMutation } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setAccessToken } from './authSlice';

export function useLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isPending: isLoggingIn, mutate: login } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      toast.success('Logged In');
      dispatch(setAccessToken(data.accessToken));
      navigate('/admin', { replace: true });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { isLoggingIn, login };
}
