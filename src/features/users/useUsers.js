import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUsers } from '../../services/apiUsers';
import { useAllSearchParamsFilter } from '../../hooks/useAllSearchParamsFilters';
import { useURL } from '../../hooks/useURL';
import { PAGE_SIZE } from '../../utils/config';

export function useUsers() {
  const queryClient = useQueryClient();

  const { filter } = useAllSearchParamsFilter();

  const { getURLParams } = useURL();
  const sort = getURLParams('sortBy') || 'fullName';
  const page = +getURLParams('page') || 1;
  const limit = +getURLParams('limit') || PAGE_SIZE;

  const {
    data: { users, count } = {},
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ['users', filter, sort, page, limit],
    queryFn: () => getUsers(filter, sort, page, limit),
  });

  const lastPage = Math.ceil(count / limit);

  if (page < lastPage)
    queryClient.prefetchQuery({
      queryKey: ['users', filter, sort, page + 1, limit],
      queryFn: () => getUsers(filter, sort, page + 1, limit),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['users', filter, sort, page - 1, limit],
      queryFn: () => getUsers(filter, sort, page - 1, limit),
    });

  return { users, count, isLoading, error };
}
