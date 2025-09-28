import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNotActiveSettings as deleteNotActiveSettingsApi } from "../../services/apiSettings.js";
import toast from "react-hot-toast";

export function useDeleteNotActiveSettings() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteNotActiveSettings,
    isPending: isDeleting,
    error,
  } = useMutation({
    mutationFn: deleteNotActiveSettingsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast.success("All invalid settings cleared.");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  return { isDeleting, error, deleteNotActiveSettings };
}
