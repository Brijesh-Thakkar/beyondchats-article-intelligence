import { cn } from '@/lib/utils';

interface ArticleCardSkeletonProps {
  className?: string;
}

export function ArticleCardSkeleton({ className }: ArticleCardSkeletonProps) {
  return (
    <div className={cn("rounded-lg border border-border/50 bg-card p-6 animate-pulse", className)}>
      <div className="flex items-center gap-2 mb-4">
        <div className="h-5 w-20 rounded-full bg-muted" />
        <div className="h-4 w-16 rounded bg-muted" />
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-6 w-full rounded bg-muted" />
        <div className="h-6 w-3/4 rounded bg-muted" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-2/3 rounded bg-muted" />
      </div>
    </div>
  );
}

export function ArticleListSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <ArticleCardSkeleton key={i} />
      ))}
    </div>
  );
}