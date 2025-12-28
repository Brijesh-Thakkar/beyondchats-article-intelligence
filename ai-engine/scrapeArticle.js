import axios from "axios";
import * as cheerio from "cheerio";

/**
 * Scrape main readable content from a blog/article URL
 */
export async function scrapeArticleContent(url) {
  try {
    const { data: html } = await axios.get(url, {
      timeout: 15000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
      },
    });

    const $ = cheerio.load(html);

    // Remove noisy elements
    $("script, style, nav, footer, header, aside, noscript").remove();

    let content = "";

    // Try article tag first
    if ($("article").length) {
      content = $("article").text();
    }

    // Common blog containers as fallbacks
    if (!content || content.length < 500) {
      const candidates = [
        "main",
        ".post-content",
        ".entry-content",
        ".article-content",
        ".content",
        "#content",
      ];

      for (const selector of candidates) {
        if ($(selector).length) {
          content = $(selector).text();
          if (content.length > 500) break;
        }
      }
    }

    // Fallback: body text
    if (!content || content.length < 500) {
      content = $("body").text();
    }

    // Clean text
    content = content
      .replace(/\s+/g, " ")
      .replace(/\n+/g, "\n")
      .trim();

    return content;
  } catch (error) {
    console.error(`Failed to scrape ${url}:`, error.message);
    return "";
  }
}
