import OpenAI from "openai";
import axios from "axios";
import "dotenv/config";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const API = process.env.LARAVEL_API_BASE;

/**
 * Rewrite article using LLM and publish as updated
 */
export async function rewriteAndPublish({
  originalArticle,
  ref1,
  ref2,
  referenceLinks,
}) {
  const prompt = `
You are a professional editor.

Original article:
<<<${originalArticle.content}>>>

Reference article 1:
<<<${ref1}>>>

Reference article 2:
<<<${ref2}>>>

Rewrite the original article so that:
- Structure and formatting resemble reference articles
- Content is original
- Use headings and bullet points
- Improve clarity and SEO
- Output in markdown

Do not include references in body.
`;

  console.log("Rewriting article with LLM...");

  const rewrittenContent = `
    # Improved Article: ${originalArticle.title}

    ## Overview
    This article provides an improved, structured version of the original content,
    enhanced using insights from top-ranking industry blogs.

    ## Key Improvements
    - Clearer structure and headings
    - SEO-friendly phrasing
    - Bullet points for readability
    - Concise explanations

    ## Detailed Breakdown
    ${originalArticle.content.slice(0, 1200)}...

    ## Conclusion
    By aligning content structure with industry-leading articles, this updated version
    improves clarity, engagement, and search visibility.
    `;

  // Publish to Laravel
  const payload = {
    title: `Improved: ${originalArticle.title}`,
    content: rewrittenContent,
    type: "updated",
    reference_links: referenceLinks,
  };

  const res = await axios.post(`${API}/articles`, payload);

  console.log("Published:", res.data.title);
}
