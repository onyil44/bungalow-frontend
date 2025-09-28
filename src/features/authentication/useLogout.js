import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setAccessToken } from './authSlice';

export function useLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const {
    mutate: logout,
    isPending: isLogingout,
    error,
  } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.success('Logged Out');
      dispatch(setAccessToken(null));
      queryClient.removeQueries();
      navigate('/login', { replace: true });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err);
    },
  });

  return { logout, isLogingout, error };
}
