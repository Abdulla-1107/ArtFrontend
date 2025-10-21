// useArtwork.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./api";

export const useOrder = () => {
  const queryClient = useQueryClient();

  const createOrder = useMutation({
    mutationFn: (body: any) => api.post("/order", body).then((res) => res.data), // ✅
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
    onError: (error) => {
      console.error("Create failed:", error);
    },
  });

  return {
    createOrder,
  };
};
