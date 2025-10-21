// useArtwork.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./api";

export interface IParams {
  search?: string;
}

export const useArtwork = () => {
  const queryClient = useQueryClient();

  const getArtwork = (props: IParams) =>
    useQuery({
      queryKey: ["artwork", props],
      queryFn: () =>
        api.get("/artwork", { params: props }).then((res) => res.data), // ✅
    });

  const getOneArtwork = (id: string) =>
    useQuery({
      queryKey: ["artwork", id],
      queryFn: () => api.get(`/artwork/${id}`).then((res) => res.data),
      enabled: !!id, // ID mavjud bo‘lgandagina so‘rov yuboradi
    });

  const createArtwork = useMutation({
    mutationFn: (body: any) =>
      api.post("/artwork", body).then((res) => res.data), // ✅
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artwork"] });
    },
    onError: (error) => {
      console.error("Create failed:", error);
    },
  });

  const deleteArtwork = useMutation({
    mutationFn: (id: string) =>
      api.delete(`/artwork/${id}`).then((res) => res.data), // ✅
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["artwork"] });
    },
  });

  return {
    getArtwork,
    deleteArtwork,
    createArtwork,
    getOneArtwork,
  };
};
