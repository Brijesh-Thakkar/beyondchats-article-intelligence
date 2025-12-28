import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Sparkles, FileText, AlertCircle } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { ArticleContent } from '@/components/articles/ArticleContent';
import { References } from '@/components/articles/References';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useArticle } from '@/hooks/useArticles';
import { calculateReadingTime, formatReadingTime } from '@/lib/readingTime';

function ArticleDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-6 w-24 rounded-full bg-muted" />
        <div className="h-5 w-20 rounded bg-muted" />
      </div>
      <div className="h-10 w-3/4 rounded bg-muted mb-4" />
      <div className="h-10 w-1/2 rounded bg-muted mb-8" />
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-5 w-full rounded bg-muted" />
        ))}
      </div>
    </div>
  );
}

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: article, isLoading, error } = useArticle(id || '');

  const readingTime = article ? calculateReadingTime(article.content) : 0;
  const isAI = article?.type === 'updated';

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery="" onSearchChange={() => {}} showSearch={false} />
      
      <main className="container py-8 md:py-12">
        {/* Back Button */}
        <Link to="/" className="inline-block mb-8">
          <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground -ml-4">
            <ArrowLeft className="w-4 h-4" />
            Back to articles
          </Button>
        </Link>

        <article className="max-w-3xl mx-auto">
          {isLoading ? (
            <ArticleDetailSkeleton />
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Failed to load article</h3>
              <p className="text-muted-foreground max-w-sm mb-6">
                The article could not be found or the server is unavailable.
              </p>
              <Link to="/">
                <Button variant="outline">Return to home</Button>
              </Link>
            </div>
          ) : article ? (
            <div className="animate-fade-in">
              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge 
                  variant="secondary" 
                  className={`text-sm font-medium ${
                    isAI 
                      ? 'bg-ai/10 text-ai' 
                      : 'bg-success/10 text-success'
                  }`}
                >
                  {isAI ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                      AI Updated
                    </>
                  ) : (
                    <>
                      <FileText className="w-3.5 h-3.5 mr-1.5" />
                      Original
                    </>
                  )}
                </Badge>
                <span className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1.5" />
                  {formatReadingTime(readingTime)}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 leading-tight text-balance">
                {article.title}
              </h1>

              {/* Content */}
              <ArticleContent content={article.content} type={article.type} />

              {/* References (AI articles only) */}
              {isAI && article.references && (
                <References references={article.references} />
              )}
            </div>
          ) : null}
        </article>
      </main>
    </div>
  );
}