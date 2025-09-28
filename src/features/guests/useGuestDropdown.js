import { useQuery } from '@tanstack/react-query';
import { getGuestDropdown } from '../../services/apiGuests';

export function useGuestDropdown(search) {
  const { data: guests, isPending: isGuestDropdownLoading } = useQuery({
    queryKey: ['guests', search],
    queryFn: async () => {
      if (search.length < 3) return [];
      return await getGuestDropdown(search);
    },
  });

  return { guests, isGuestDropdownLoading };
}
