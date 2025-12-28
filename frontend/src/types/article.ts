export interface Article {
  id: string | number;
  title: string;
  content: string;
  type: 'original' | 'updated';
  references?: Reference[];
  created_at?: string;
  updated_at?: string;
}

export interface Reference {
  title: string;
  url: string;
}

export interface ArticlesResponse {
  articles: Article[];
}

export interface ArticleResponse {
  article: Article;
}