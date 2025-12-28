import { Link } from 'react-router-dom';
import { Clock, Sparkles, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Article } from '@/types/article';
import { calculateReadingTime, formatReadingTime } from '@/lib/readingTime';
import { stripHtml } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const readingTime = calculateReadingTime(article.content);
  const isAI = article.type === 'updated';

  return (
    <Link to={`/articles/${article.id}`} className="block group">
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 border-border/50 bg-card">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 mb-3">
            <Badge 
              variant="secondary" 
              className={`text-xs font-medium ${
                isAI 
                  ? 'bg-ai/10 text-ai hover:bg-ai/20' 
                  : 'bg-success/10 text-success hover:bg-success/20'
              }`}
            >
              {isAI ? (
                <>
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI Updated
                </>
              ) : (
                <>
                  <FileText className="w-3 h-3 mr-1" />
                  Original
                </>
              )}
            </Badge>
            <span className="flex items-center text-xs text-muted-foreground">
              <Clock className="w-3 h-3 mr-1" />
              {formatReadingTime(readingTime)}
            </span>
          </div>
          <h2 className="text-xl font-semibold leading-snug text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {article.title}
          </h2>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
            {stripHtml(article.content, 140)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}