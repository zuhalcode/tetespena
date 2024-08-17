import { axiosInstance } from "@/lib/axios";
import { CreateArticle } from "@/types/client/article";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useFetchArticles = () => {
  return useQuery({
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/article`);
      return data.data;
    },
    queryKey: ["fetch.articles"],
  });
};

export const useFetchArticleBySlug = (slug: string) => {
  return useQuery({
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/api/article/${slug}`);
      return data.article;
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
      const response = await axiosInstance.post("/api/article", data);
      return response.data;
    },
    onSuccess,
    onError,
  });
};
