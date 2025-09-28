import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSettings as createSettingsApi } from "../../services/apiSettings.js";
import toast from "react-hot-toast";

export function useCreateSettings() {
  const queryClient = useQueryClient();

  const { mutate: createSettings, isPending: isCreating } = useMutation({
    mutationFn: createSettingsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast.success("New setting created.");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return { createSettings, isCreating };
}
