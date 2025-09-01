import axios from "axios";

// Use French Wikipedia
const WIKI_API = "https://fr.wikipedia.org/w/api.php";
const WIKI_REST = "https://fr.wikipedia.org/api/rest_v1";

export function normalizeTitle(raw: string): string {
  const noFrag = raw.split("#")[0];
  const replaced = noFrag.replace(/_/g, " ").trim();
  if (!replaced) return "";
  const first = replaced[0].toUpperCase() + replaced.slice(1);
  return first.replace(/\s+/g, "_");
}

export async function getRandomTitle(): Promise<string> {
  const params = new URLSearchParams({
    action: "query",
    list: "random",
    rnnamespace: "0",
    rnlimit: "1",
    format: "json",
    origin: "*",
  });
  const { data } = await axios.get(`${WIKI_API}?${params.toString()}`);
  const title = data?.query?.random?.[0]?.title as string;
  return normalizeTitle(title);
}

export async function getMobileHtml(
  title: string
): Promise<{ html: string; title: string }> {
  const t = normalizeTitle(title);
  // Use desktop Parsoid HTML to get full content (no collapsed sections)
  const url = `${WIKI_REST}/page/html/${encodeURIComponent(t)}`;
  const { data } = await axios.get(url, { responseType: "text" });
  return { html: String(data), title: t };
}
