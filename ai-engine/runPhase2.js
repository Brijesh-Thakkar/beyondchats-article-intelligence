import axios from "axios";
import "dotenv/config";

import { searchWithSerpAPI } from "./serpSearch.js";
import { scrapeArticleContent } from "./scrapeArticle.js";
import { rewriteAndPublish } from "./llmRewriteAndPublish.js";

const API = process.env.LARAVEL_API_BASE;

async function run() {
  console.log("Starting Phase 2...");

  const { data: articles } = await axios.get(`${API}/articles`);
  const originals = articles.filter(a => a.type === "original").slice(0, 1);

  for (const article of originals) {
    console.log(`\nProcessing: ${article.title}`);

    // Google Search
    const links = await searchWithSerpAPI(article.title);
    if (links.length < 2) {
      console.log("Not enough reference links, skipping");
      continue;
    }

    // Scrape competitor articles
    const ref1 = await scrapeArticleContent(links[0]);
    const ref2 = await scrapeArticleContent(links[1]);

    if (ref1.length < 500 || ref2.length < 500) {
      console.log("Reference content too small, skipping");
      continue;
    }

    // Rewrite and publish
    await rewriteAndPublish({
      originalArticle: article,
      ref1,
      ref2,
      referenceLinks: links,
    });
  }

  console.log("\nPhase 2 completed successfully");
}

run();
