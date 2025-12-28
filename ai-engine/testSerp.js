import { searchWithSerpAPI } from "./serpSearch.js";

const title =
  "Which chatbot is right for your business: Intercom vs BeyondChats";

(async () => {
  const links = await searchWithSerpAPI(title);
  console.log("Top 2 links:");
  console.log(links);
})();
