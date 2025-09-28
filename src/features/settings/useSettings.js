import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings.js";

export function useSettings(isActive) {
  const {
    isPending,
    data: settings,
    error,
  } = useQuery({
    queryKey: ["settings", isActive],
    queryFn: () => getSettings(isActive),
  });

  return { isPending, error, settings };
}
