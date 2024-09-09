import { axiosInstance } from "@/lib/axios";
import {
  CreateArticle,
  SoftDeleteArticle,
  UpdateDraftArticle,
} from "@/types/article";
import { ArticleStatus } from "@prisma/client";
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

export const useFetchArticlesUserByStatus = (
  userId: string | null | undefined,
  status: ArticleStatus,
) => {
  return useQuery({
    queryFn: async () => {
      const queryParams = status ? `?status=${status}` : "";
      const { data } = await axiosInstance.get(
        `/api/articles/users/${userId}${queryParams}`,
      );
      return data.data;
    },
    queryKey: ["fetch.articles", userId],
    enabled: !!userId,
  });
};

export const useFetchArticleById = (id: string | string[]) => {
  return useQuery({
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/api/articles/submission/${id}`,
      );
      return data.data;
    },
    queryKey: ["fetch.article", id],
    enabled: !!id,
  });
};

export const useFetchArticleBySlug = (slug: string | string[]) => {
  return useQuery({
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/articles/${slug}`);
      return data.data;
    },
    queryKey: ["fetch.article", slug],
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
      const { slug } = data;
      const response = await axiosInstance.patch(`/api/articles/${slug}`, data);
      return response.data;
    },
    onSuccess,
    onError,
  });
};

export const usePublishArticle = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  return useMutation<void, Error, SoftDeleteArticle>({
    mutationFn: async (data) => {
      const { slug } = data;
      const response = await axiosInstance.patch(
        `/api/articles/${slug}/publish`,
        data,
      );
      return response.data;
    },
    onSuccess,
    onError,
  });
};

export const useSoftDeleteArticle = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  return useMutation<void, Error, SoftDeleteArticle>({
    mutationFn: async (data) => {
      const { slug } = data;
      const response = await axiosInstance.patch(
        `/api/articles/${slug}/soft-delete`,
        data,
      );
      return response.data;
    },
    onSuccess,
    onError,
  });
};
