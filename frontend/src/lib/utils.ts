import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Strips HTML tags and decodes basic HTML entities from a string.
 * Returns a clean text excerpt suitable for article previews.
 */
export function stripHtml(content: string, maxLength: number = 140): string {
  // Remove all HTML tags
  let text = content.replace(/<[^>]*>/g, ' ');
  
  // Decode common HTML entities
  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–');
  
  // Remove markdown characters and normalize whitespace
  text = text
    .replace(/[#*`_~\[\]]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Truncate and append ellipsis if needed
  if (text.length > maxLength) {
    return text.slice(0, maxLength).trim() + '...';
  }
  
  return text;
}
