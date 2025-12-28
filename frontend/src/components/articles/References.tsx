import { ExternalLink } from 'lucide-react';
import type { Reference } from '@/types/article';

interface ReferencesProps {
  references: Reference[];
}

export function References({ references }: ReferencesProps) {
  if (!references || references.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <h2 className="text-xl font-semibold mb-4 text-foreground">References</h2>
      <ul className="space-y-3">
        {references.map((ref, index) => (
          <li key={index}>
            <a
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline underline-offset-2 transition-colors"
            >
              <ExternalLink className="w-4 h-4 flex-shrink-0" />
              <span>{ref.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}