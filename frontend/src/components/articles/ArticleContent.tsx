import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface ArticleContentProps {
  content: string;
  type: 'original' | 'updated';
}

/**
 * Cleans malformed markdown content for AI-updated articles.
 * Fixes issues like excessive indentation (which creates unwanted code blocks),
 * standalone "# Improved" headings, and code fences around headings.
 * 
 * Only applied to articles with type === "updated".
 */
function cleanUpdatedMarkdown(content: string): string {
  let cleaned = content;

  // CRITICAL: Remove leading whitespace from lines (indentation causes code blocks in markdown)
  // This fixes the main issue where headings and content are indented with 4+ spaces
  cleaned = cleaned.replace(/^[ \t]+/gm, '');

  // Remove standalone "# Improved" lines (sometimes split from "# Improved Article: ...")
  cleaned = cleaned.replace(/^#\s*Improved\s*$/gm, '');
  
  // Also remove "# Improved\n\nArticle:" pattern (newline-split title)
  cleaned = cleaned.replace(/^#\s*Improved\s*\n+Article:\s*/gm, '# ');
  
  // Remove code fences that wrap markdown headings
  cleaned = cleaned.replace(/```\s*\n?(#{1,6}\s+[^\n`]+)\n?\s*```/g, '$1');
  
  // Remove empty code blocks
  cleaned = cleaned.replace(/```\s*```/g, '');
  
  // Remove orphaned code fence markers on their own lines
  cleaned = cleaned.replace(/^\s*```\s*$/gm, '');

  // Clean up excessive blank lines (more than 2 consecutive)
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  return cleaned.trim();
}

/**
 * Checks if content contains HTML tags
 */
function isHtmlContent(content: string): boolean {
  return /<[a-z][\s\S]*>/i.test(content);
}

/**
 * Cleans HTML content by removing leading whitespace that causes
 * markdown to treat it as code blocks.
 */
function cleanHtmlContent(content: string): string {
  let cleaned = content;
  
  // Remove leading whitespace from lines (prevents code block interpretation)
  cleaned = cleaned.replace(/^[\t ]+/gm, '');
  
  // Clean up excessive blank lines
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
  
  return cleaned.trim();
}

export function ArticleContent({ content, type }: ArticleContentProps) {
  // Determine if content is HTML
  const hasHtml = useMemo(() => isHtmlContent(content), [content]);
  
  // Process content based on type and format
  const processedContent = useMemo(() => {
    if (type === 'updated') {
      return cleanUpdatedMarkdown(content);
    }
    // For original articles with HTML, clean the whitespace
    if (hasHtml) {
      return cleanHtmlContent(content);
    }
    return content;
  }, [content, type, hasHtml]);

  return (
    <article
      className="
        prose
        prose-lg
        max-w-none
        prose-headings:font-bold
        prose-headings:tracking-tight
        prose-h1:text-3xl
        prose-h1:mt-8
        prose-h1:mb-4
        prose-h2:text-2xl
        prose-h2:mt-6
        prose-h2:mb-3
        prose-h3:text-xl
        prose-h3:mt-5
        prose-h3:mb-2
        prose-p:leading-relaxed
        prose-p:mb-4
        prose-ul:my-4
        prose-ul:list-disc
        prose-ul:pl-6
        prose-ol:my-4
        prose-ol:list-decimal
        prose-ol:pl-6
        prose-li:my-1
        prose-a:text-primary
        prose-a:underline
        prose-strong:font-semibold
        prose-code:bg-muted
        prose-code:px-1.5
        prose-code:py-0.5
        prose-code:rounded
        prose-code:text-sm
        prose-pre:bg-muted
        prose-pre:p-4
        prose-pre:rounded-lg
        prose-blockquote:border-l-4
        prose-blockquote:border-primary
        prose-blockquote:pl-4
        prose-blockquote:italic
        dark:prose-invert
      "
    >
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        rehypePlugins={hasHtml ? [rehypeRaw] : []}
      >
        {processedContent}
      </ReactMarkdown>
    </article>
  );
}