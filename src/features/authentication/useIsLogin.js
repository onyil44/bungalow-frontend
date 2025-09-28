import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth';

export function useIsLogin() {
  const {
    data: user,
    isPending: isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['isLogin'],
    queryFn: getCurrentUser,
    retry: false,
  });

  return { user, isLoading, error, refetch };
}
