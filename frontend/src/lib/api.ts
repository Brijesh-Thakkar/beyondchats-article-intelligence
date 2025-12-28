import axios from 'axios';
import type { Article, ArticlesResponse, ArticleResponse } from '@/types/article';

const api = axios.create({
  baseURL: 'http://localhost:8001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function fetchArticles(): Promise<Article[]> {
  const response = await api.get<ArticlesResponse | Article[]>('/articles');
  // Handle both { articles: [...] } and [...] response formats
  const data = response.data;
  return Array.isArray(data) ? data : data.articles;
}

export async function fetchArticleById(id: string | number): Promise<Article> {
  const response = await api.get<ArticleResponse | Article>(`/articles/${id}`);
  // Handle both { article: {...} } and {...} response formats
  const data = response.data;
  return 'article' in data ? data.article : data;
}

export default api;