import axios from "axios";
import "dotenv/config";

async function fetchArticles() {
  try {
    console.log("Fetching articles from Laravel...");
    const res = await axios.get("http://127.0.0.1:8001/api/articles");

    const originals = res.data.filter(
      (article) => article.type === "original"
    );

    console.log(`Found ${originals.length} original articles`);
    console.log(originals.map(a => a.title));

    return originals;
  } catch (err) {
    console.error("Error fetching articles:", err.message);
  }
}

fetchArticles();
