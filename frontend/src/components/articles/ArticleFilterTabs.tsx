import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Sparkles, LayoutGrid } from 'lucide-react';

export type ArticleFilter = 'all' | 'original' | 'ai_updated';

interface ArticleFilterTabsProps {
  filter: ArticleFilter;
  onFilterChange: (filter: ArticleFilter) => void;
  counts: {
    all: number;
    original: number;
    ai_updated: number;
  };
}

export function ArticleFilterTabs({ filter, onFilterChange, counts }: ArticleFilterTabsProps) {
  return (
    <Tabs value={filter} onValueChange={(v) => onFilterChange(v as ArticleFilter)}>
      <TabsList className="bg-secondary/50">
        <TabsTrigger value="all" className="gap-2">
          <LayoutGrid className="w-4 h-4" />
          <span className="hidden sm:inline">All</span>
          <span className="text-xs text-muted-foreground">({counts.all})</span>
        </TabsTrigger>
        <TabsTrigger value="original" className="gap-2">
          <FileText className="w-4 h-4" />
          <span className="hidden sm:inline">Original</span>
          <span className="text-xs text-muted-foreground">({counts.original})</span>
        </TabsTrigger>
        <TabsTrigger value="ai_updated" className="gap-2">
          <Sparkles className="w-4 h-4" />
          <span className="hidden sm:inline">AI Updated</span>
          <span className="text-xs text-muted-foreground">({counts.ai_updated})</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}