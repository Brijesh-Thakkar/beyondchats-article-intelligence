import axios from "axios";
import "dotenv/config";

const SERPAPI_KEY = process.env.SERPAPI_KEY;

export async function searchWithSerpAPI(title) {
  if (!SERPAPI_KEY) {
    throw new Error("SERPAPI_KEY not found in .env");
  }

  const query = `${title} blog article`;

  const response = await axios.get("https://serpapi.com/search.json", {
    params: {
      engine: "google",
      q: query,
      api_key: SERPAPI_KEY,
      num: 10,
      hl: "en",
      gl: "us",
    },
  });

  const organic = response.data.organic_results || [];
  const news = response.data.news_results || [];

  const combined = [...organic, ...news];

  const links = combined
    .map((r) => r.link)
    .filter(
      (link) =>
        link &&
        link.startsWith("http") &&
        !link.includes("beyondchats.com") &&
        !link.includes("youtube.com") &&
        !link.includes("linkedin.com")
    )
    .slice(0, 2);

  return links;
}
