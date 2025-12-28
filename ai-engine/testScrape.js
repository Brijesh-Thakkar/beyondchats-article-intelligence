import { scrapeArticleContent } from "./scrapeArticle.js";

const testUrl =
  "https://www.nextiva.com/blog/conversational-ai-vs-chatbots.html"; 

(async () => {
  const content = await scrapeArticleContent(testUrl);
  console.log("Content length:", content.length);
  console.log(content.slice(0, 500)); // preview first 500 chars
})();
