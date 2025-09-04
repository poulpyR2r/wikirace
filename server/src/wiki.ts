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

// Pool of popular target pages for WikiRace
const POPULAR_TARGETS = [
  "France",
  "Paris",
  "États-Unis",
  "Allemagne",
  "Italie",
  "Espagne",
  "Napoleon_Ier",
  "Louis_XIV",
  "Charles_de_Gaulle",
  "Marie_Curie",
  "Albert_Einstein",
  "Léonard_de_Vinci",
  "Mozart",
  "Bach",
  "Première_Guerre_mondiale",
  "Seconde_Guerre_mondiale",
  "Révolution_française",
  "Renaissance",
  "Moyen_Âge",
  "Antiquité",
  "Soleil",
  "Lune",
  "Terre",
  "Mars",
  "Jupiter",
  "Chat",
  "Chien",
  "Lion",
  "Éléphant",
  "Aigle",
  "Football",
  "Tennis",
  "Basketball",
  "Jeux_olympiques",
  "Cinéma",
  "Musique",
  "Littérature",
  "Peinture",
  "Sculpture",
  "Christianisme",
  "Islam",
  "Bouddhisme",
  "Judaïsme",
  "Europe",
  "Asie",
  "Afrique",
  "Amérique",
  "Océanie",
  "Mathématiques",
  "Physique",
  "Chimie",
  "Biologie",
  "Médecine",
];

export function getRandomTarget(): string {
  const randomIndex = Math.floor(Math.random() * POPULAR_TARGETS.length);
  return normalizeTitle(POPULAR_TARGETS[randomIndex]);
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
