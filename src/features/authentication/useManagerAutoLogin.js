import { useMutation } from '@tanstack/react-query';
import { managerAutoLogin as managerAutoLoginApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setAccessToken } from './authSlice';

export function useManagerAutoLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isPending: isManagerAutoLoggin, mutate: managerAutoLogin } =
    useMutation({
      mutationFn: managerAutoLoginApi,
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

  return { isManagerAutoLoggin, managerAutoLogin };
}
