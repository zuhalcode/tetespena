import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

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
