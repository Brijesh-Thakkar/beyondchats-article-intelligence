import { useQuery } from '@tanstack/react-query';
import { fetchArticles, fetchArticleById } from '@/lib/api';
import type { Article } from '@/types/article';

export function useArticles() {
  return useQuery<Article[], Error>({
    queryKey: ['articles'],
    queryFn: fetchArticles,
  });
}

export function useArticle(id: string | number) {
  return useQuery<Article, Error>({
    queryKey: ['article', id],
    queryFn: () => fetchArticleById(id),
    enabled: !!id,
  });
}