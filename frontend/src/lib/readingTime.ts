/**
 * Calculate estimated reading time for an article
 * @param content - The article content (markdown or plain text)
 * @returns Estimated reading time in minutes
 */
export function calculateReadingTime(content: string): number {
  // Average reading speed: 200-250 words per minute
  const wordsPerMinute = 225;
  
  // Remove markdown syntax for more accurate word count
  const plainText = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Replace links with link text
    .replace(/[#*_~`>]/g, '') // Remove markdown symbols
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();

  const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  return Math.max(1, readingTime); // Minimum 1 minute
}

/**
 * Format reading time for display
 * @param minutes - Reading time in minutes
 * @returns Formatted string like "5 min read"
 */
export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}