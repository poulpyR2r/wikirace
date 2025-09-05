import axios from "axios";
import https from "https";

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

const httpsAgent = new https.Agent({ keepAlive: true });

async function fetchWithRetry(url: string, options: any = {}, retries = 2) {
  let lastErr: any = null;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await axios.get(url, {
        timeout: 7000,
        httpsAgent,
        headers: { "Accept-Encoding": "gzip, deflate, br" },
        ...options,
      });
    } catch (err) {
      lastErr = err;
      if (attempt === retries) break;
      await new Promise((r) => setTimeout(r, 300 * (attempt + 1)));
    }
  }
  throw lastErr;
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
  const { data } = await fetchWithRetry(`${WIKI_API}?${params.toString()}`);
  const title = data?.query?.random?.[0]?.title as string;
  return normalizeTitle(title);
}

// Check if a Wikipedia page exists
async function pageExists(title: string): Promise<boolean> {
  try {
    const params = new URLSearchParams({
      action: "query",
      titles: title,
      format: "json",
      origin: "*",
    });
    const { data } = await fetchWithRetry(`${WIKI_API}?${params.toString()}`);
    const pages = data?.query?.pages;
    if (!pages) return false;

    // If page exists, it won't have a "missing" property
    const pageId = Object.keys(pages)[0];
    return !pages[pageId].missing;
  } catch {
    return false;
  }
}

// Get a random target page that exists and has decent content
export async function getRandomTarget(): Promise<string> {
  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    try {
      // Get a random page
      const randomTitle = await getRandomTitle();

      // Check basic criteria for a good target
      if (isGoodTarget(randomTitle)) {
        // Verify the page exists and get some info about it
        const pageInfo = await getPageInfo(randomTitle);
        if (pageInfo.exists && pageInfo.hasContent) {
          return randomTitle;
        }
      }

      attempts++;
    } catch {
      attempts++;
    }
  }

  // Fallback to a safe default if we can't find a good random target
  return normalizeTitle("France");
}

// Check if a title makes a good target (not too obscure, not a disambiguation page, etc.)
function isGoodTarget(title: string): boolean {
  const normalized = title.toLowerCase();

  // Avoid disambiguation pages, lists, categories, etc.
  if (
    normalized.includes("(homonymie)") ||
    normalized.includes("(disambiguation)") ||
    normalized.includes("liste de") ||
    normalized.includes("list of") ||
    normalized.includes("catégorie:") ||
    normalized.includes("category:") ||
    normalized.includes("portail:") ||
    normalized.includes("portal:") ||
    normalized.includes("wikipédia:") ||
    normalized.includes("wikipedia:")
  ) {
    return false;
  }

  // Avoid very short titles (likely not substantial articles)
  if (title.length < 3) {
    return false;
  }

  // Avoid titles with numbers/years only
  if (/^\d+$/.test(title)) {
    return false;
  }

  return true;
}

// Get information about a page to determine if it's suitable as a target
async function getPageInfo(
  title: string
): Promise<{ exists: boolean; hasContent: boolean }> {
  try {
    const params = new URLSearchParams({
      action: "query",
      titles: title,
      prop: "extracts|pageprops",
      exintro: "1",
      explaintext: "1",
      exsectionformat: "plain",
      format: "json",
      origin: "*",
    });

    const { data } = await fetchWithRetry(`${WIKI_API}?${params.toString()}`);
    const pages = data?.query?.pages;

    if (!pages) return { exists: false, hasContent: false };

    const pageId = Object.keys(pages)[0];
    const page = pages[pageId];

    // Check if page exists
    if (page.missing) return { exists: false, hasContent: false };

    // Check if page has substantial content (at least 100 characters in intro)
    const extract = page.extract || "";
    const hasContent = extract.length >= 100;

    return { exists: true, hasContent };
  } catch {
    return { exists: false, hasContent: false };
  }
}

export async function getMobileHtml(
  title: string
): Promise<{ html: string; title: string }> {
  const t = normalizeTitle(title);
  // Use desktop Parsoid HTML to get full content (no collapsed sections)
  const url = `${WIKI_REST}/page/html/${encodeURIComponent(t)}`;
  const { data } = await fetchWithRetry(url, { responseType: "text" });
  return { html: String(data), title: t };
}
