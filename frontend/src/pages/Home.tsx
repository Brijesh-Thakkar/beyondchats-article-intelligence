import { useState, useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { ArticleListSkeleton } from '@/components/articles/ArticleCardSkeleton';
import { ArticleFilterTabs, type ArticleFilter } from '@/components/articles/ArticleFilterTabs';
import { EmptyState } from '@/components/ui/empty-state';
import { useArticles } from '@/hooks/useArticles';
import { AlertCircle } from 'lucide-react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<ArticleFilter>('all');
  
  const { data: articles, isLoading, error } = useArticles();

  const filteredArticles = useMemo(() => {
    if (!articles) return [];
    
    let result = articles;
    
    if (filter === 'original') {
      result = result.filter(article => article.type === 'original');
    } else if (filter === 'ai_updated') {
      result = result.filter(article => article.type === 'updated');
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [articles, filter, searchQuery]);

  const counts = useMemo(() => {
    if (!articles) return { all: 0, original: 0, ai_updated: 0 };
    return {
      all: articles.length,
      original: articles.filter(a => a.type === 'original').length,
      ai_updated: articles.filter(a => a.type === 'updated').length,
    };
  }, [articles]);

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <main className="container py-8 md:py-12">
        {/* Hero Section */}
        <section className="mb-10 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Discover Articles
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Explore our collection of original and AI-enhanced articles on technology, science, and innovation.
          </p>
        </section>

        {/* Filter Tabs */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <ArticleFilterTabs 
            filter={filter} 
            onFilterChange={setFilter} 
            counts={counts}
          />
        </div>

        {/* Content */}
        {isLoading ? (
          <ArticleListSkeleton />
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Failed to load articles</h3>
            <p className="text-muted-foreground max-w-sm">
              Please check that the API server is running at localhost:8001
            </p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <EmptyState 
            title={searchQuery ? "No results found" : "No articles yet"}
            description={
              searchQuery 
                ? `No articles match "${searchQuery}". Try a different search term.`
                : "Check back later for new articles."
            }
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article, index) => (
              <div 
                key={article.id} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}