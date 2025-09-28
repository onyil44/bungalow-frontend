import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCabin as updateCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useUpdateCabin() {
  const queryCliect = useQueryClient();

  const { mutate: updateCabin, isPending: isUpdating } = useMutation({
    mutationFn: updateCabinApi,
    onSuccess: () => {
      queryCliect.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin updated.");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return { isUpdating, updateCabin };
}
