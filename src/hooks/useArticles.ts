import { axiosInstance } from "@/lib/axios";
import { CreateArticle, UpdateDraftArticle } from "@/types/article";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useFetchArticles = () => {
  return useQuery({
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/articles`);
      return data.data;
    },
    queryKey: ["fetch.articles"],
  });
};

export const useFetchArticlesByUserId = (userId: string | null | undefined) => {
  return useQuery({
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/articles/users/${userId}`);
      return data.data;
    },
    queryKey: ["fetch.articles", userId],
    enabled: !!userId,
  });
};

export const useFetchArticleById = (id: string | string[]) => {
  return useQuery({
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/articles/${id}`);
      return data.data;
    },
    queryKey: ["fetch.articles", id],
    enabled: !!id,
  });
};

export const useFetchArticleBySlug = (slug: string | string[]) => {
  return useQuery({
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/articles/${slug}`);
      return data.data;
    },
    queryKey: ["fetch.articles", slug],
    enabled: !!slug,
  });
};

export const useCreateArticle = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  return useMutation<void, Error, CreateArticle>({
    mutationFn: async (data) => {
      const response = await axiosInstance.post("/api/articles", data);
      return response.data;
    },
    onSuccess,
    onError,
  });
};

export const useUpdateArticle = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  return useMutation<void, Error, UpdateDraftArticle>({
    mutationFn: async (data) => {
      const { id } = data;
      const response = await axiosInstance.patch(`/api/articles/${id}`, data);
      return response.data;
    },
    onSuccess,
    onError,
  });
};
