import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getGuets } from '../../services/apiGuests';
import { useAllSearchParamsFilter } from '../../hooks/useAllSearchParamsFilters';
import { useURL } from '../../hooks/useURL';
import { PAGE_SIZE } from '../../utils/config';

export function useGuests() {
  const queryClient = useQueryClient();

  const { filter } = useAllSearchParamsFilter();

  const { getURLParams } = useURL();

  const sort = getURLParams('sortBy') || 'fullName';
  const page = +getURLParams('page') || 1;
  const limit = +getURLParams('limit') || PAGE_SIZE;

  const {
    data: { guests, count } = {},
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ['guests', filter, sort, page, limit],
    queryFn: () => getGuets(filter, sort, page, limit),
  });

  const lastPage = Math.ceil(count / limit);

  if (!lastPage)
    queryClient.prefetchQuery({
      queryKey: ['guests', filter, sort, page + 1, limit],
      queryFn: () => getGuets(filter, sort, page + 1, limit),
    });

  if (page !== 1)
    queryClient.prefetchQuery({
      queryKey: ['guests', filter, sort, page - 1, limit],
      queryFn: () => getGuets(filter, sort, page - 1, limit),
    });

  return { guests, count, isLoading, error };
}
