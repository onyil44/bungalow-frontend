import { useMutation } from '@tanstack/react-query';
import { receptionistAutoLogin as receptionistAutoLoginApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setAccessToken } from './authSlice';

export function useReceptionistAutoLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isPending: isReceptionistAutoLoggin, mutate: receptionistAutoLogin } =
    useMutation({
      mutationFn: receptionistAutoLoginApi,
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

  return { isReceptionistAutoLoggin, receptionistAutoLogin };
}
