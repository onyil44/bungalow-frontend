import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth';
import { useSelector } from 'react-redux';
import { selectAuthStatus } from './authSlice';

export function useCurrentUser() {
  const status = useSelector(selectAuthStatus);

  const {
    data: user,
    isPending: isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    retry: false,
    enabled: status === 'authenticated',
    staleTime: 30_000,
  });

  return { user, isLoading, error, refetch };
}
