import React, { useEffect, useRef, useState } from "react";
import { fetchWikiHtml } from "../api";
import { socket } from "../socket";
import "./WikiView.css";

function extractTitleFromHref(href: string): string | null {
  if (!href) return null;
  // Ignore same-page anchors
  if (href.startsWith("#")) return null;
  // Handle mobile HTML relative links like "./Page_Title"
  if (href.startsWith("./")) {
    const raw = decodeURIComponent(href.slice(2).split("#")[0]);
    return raw.replace(/_/g, " ");
  }
  try {
    // Parse against French Wikipedia base
    const u = new URL(href, "https://fr.wikipedia.org");
    if (!u.hostname.endsWith("wikipedia.org")) return null;
    // Standard article links
    if (u.pathname.startsWith("/wiki/")) {
      const raw = decodeURIComponent(
        u.pathname.replace("/wiki/", "").split("#")[0]
      );
      return raw.replace(/_/g, " ");
    }
    // Index.php links with title param
    if (u.pathname === "/w/index.php") {
      const title = u.searchParams.get("title");
      if (title) return decodeURIComponent(title).replace(/_/g, " ");
    }
  } catch {}
  return null;
}

export default function WikiView({
  startTitle,
  locked,
}: {
  startTitle: string;
  locked: boolean;
}) {
  const [title, setTitle] = useState(startTitle);
  const [html, setHtml] = useState("<p>Loading…</p>");
  const containerRef = useRef<HTMLDivElement>(null);

  async function load(t: string) {
    // Optimistically reflect the clicked title for UX
    try {
      setTitle(t);
    } catch {}
    // Fetch first to obtain the canonical article title, then emit navigate
    const { html, title } = await fetchWikiHtml(t);
    try {
      socket.emit("player:navigate", { title });
    } catch {}
    // Remove only specific sections: External links, Bibliography, Notes/References
    try {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = html;
      const headings = Array.from(
        wrapper.querySelectorAll(
          "h2, h3, section > header h2, section > header h3"
        )
      );
      const shouldRemove = (text: string) => {
        const s = text.trim().toLowerCase();
        return (
          s.includes("liens externes") ||
          s.includes("lien externe") ||
          s.includes("external links") ||
          s.includes("bibliographie") ||
          s.includes("notes et références") ||
          s === "notes" ||
          s === "références" ||
          s === "references"
        );
      };
      headings.forEach((h) => {
        const txt = (h.textContent || "").trim();
        if (!shouldRemove(txt)) return;
        const section = h.closest("section");
        if (section) {
          section.remove();
          return;
        }
        // Fallback: remove heading and everything until next heading
        let n: Element | null = h.nextElementSibling;
        h.remove();
        while (n && !/^H[1-6]$/.test(n.tagName)) {
          const toRemove = n;
          n = n.nextElementSibling;
          toRemove.remove();
        }
      });
      // Remove common reference list containers
      wrapper
        .querySelectorAll("ol.references, .reflist, .mw-references-wrap")
        .forEach((el) => el.remove());

      // Remove/unwrap external links (keep text, drop the anchor)
      const anchors = Array.from(wrapper.querySelectorAll("a[href]"));
      anchors.forEach((a) => {
        const href = a.getAttribute("href") || "";
        try {
          const u = new URL(href, "https://fr.wikipedia.org");
          const isWiki = u.hostname.endsWith("wikipedia.org");
          if (!isWiki) {
            const text = document.createTextNode(a.textContent || "");
            a.replaceWith(text);
          }
        } catch {
          // If URL parsing fails and it's not a hash link, remove link
          if (!href.startsWith("#")) {
            const text = document.createTextNode(a.textContent || "");
            a.replaceWith(text);
          }
        }
      });
      setTitle(title);
      setHtml(wrapper.innerHTML);
      // After content update, scroll to top
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        const c = containerRef.current;
        if (c) c.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });
    } catch {
      setTitle(title);
      setHtml(html);
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        const c = containerRef.current;
        if (c) c.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });
    }
    // Déjà émis au début
  }

  useEffect(() => {
    load(startTitle);
  }, [startTitle]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const t = extractTitleFromHref(href);
      if (t && !locked) {
        e.preventDefault();
        load(t);
        return;
      }
      // External links: open in new tab, don't intercept
      try {
        const u = new URL(href, "https://fr.wikipedia.org");
        if (!u.hostname.endsWith("wikipedia.org")) {
          a.setAttribute("target", "_blank");
          a.setAttribute("rel", "noopener noreferrer");
          return; // allow default navigation
        }
      } catch {}
      // For same-page anchors or other links we don't parse, let browser handle
    };
    el.addEventListener("click", onClick);
    return () => el.removeEventListener("click", onClick);
  }, [locked]);

  return (
    <div className="rounded border border-neutral-300 overflow-hidden bg-white">
      <header className="px-6 py-4 border-b border-neutral-300 bg-[#f8f9fa]">
        <div className="text-2xl md:text-3xl font-serif font-semibold text-black mw-page-title-main">
          {decodeURIComponent(title.replace(/_/g, " "))}
        </div>
      </header>
      <div
        ref={containerRef}
        className="wiki-content max-w-none px-6 py-6 [&_img]:h-auto [&_img]:max-w-full [&_figure]:my-4 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_td]:border [&_th]:border-neutral-200 [&_td]:border-neutral-200 [&_th]:px-2 [&_td]:px-2 [&_th]:py-1 [&_td]:py-1"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
