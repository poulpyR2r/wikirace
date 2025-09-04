import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

export default function SEOHead({
  title,
  description,
  keywords = "jeu wikipedia, course wikipedia, jeu éducatif, culture générale, multijoueur, apprentissage ludique",
  ogImage,
  ogType = "website",
  canonicalUrl,
  noIndex = false,
}: SEOHeadProps) {
  const fullTitle = `${title} | WikiRace - Le jeu de course Wikipedia`;
  const baseUrl = "https://games.wikirace.taylora.fr";

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Canonical URL */}
      {canonicalUrl && (
        <link rel="canonical" href={`${baseUrl}${canonicalUrl}`} />
      )}

      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph (Facebook) */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta
        property="og:url"
        content={canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl}
      />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogImage && <meta property="og:image:width" content="1200" />}
      {ogImage && <meta property="og:image:height" content="630" />}
      <meta property="og:site_name" content="WikiRace" />
      <meta property="og:locale" content="fr_FR" />

      {/* Twitter Card */}
      <meta
        name="twitter:card"
        content={ogImage ? "summary_large_image" : "summary"}
      />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      <meta name="twitter:site" content="@wikirace_game" />
      <meta name="twitter:creator" content="@wikirace_game" />

      {/* Additional Meta Tags */}
      <meta name="author" content="WikiRace Team" />
      <meta name="language" content="French" />
      <meta name="revisit-after" content="1 days" />

      {/* Geo Tags */}
      <meta name="geo.region" content="FR" />
      <meta name="geo.placename" content="France" />

      {/* Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#0066cc" />

      {/* PWA */}
      <link rel="manifest" href="/manifest.json" />
      <meta name="application-name" content="WikiRace" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="WikiRace" />

      {/* Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "WikiRace",
          url: "https://games.wikirace.taylora.fr",
          logo: "https://games.wikirace.taylora.fr/logo.png",
          description:
            "Jeu de course multijoueur sur Wikipedia. Défiez vos amis dans une course à travers les articles Wikipedia !",
          foundingDate: "2024",
          founders: [
            {
              "@type": "Person",
              name: "WikiRace Team",
            },
          ],
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            email: "contact@wikirace.fr",
          },
          sameAs: [
            "https://twitter.com/wikirace_game",
            "https://www.linkedin.com/company/wikirace",
            "https://github.com/wikirace",
          ],
        })}
      </script>

      {/* Structured Data - WebApplication */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "WikiRace",
          url: "https://games.wikirace.taylora.fr",
          description:
            "Jeu de course multijoueur sur Wikipedia. Naviguez rapidement entre les articles pour atteindre votre cible !",
          applicationCategory: "Game",
          operatingSystem: "Web Browser",
          browserRequirements: "Requires JavaScript",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "EUR",
            category: "Free",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            ratingCount: "150",
            bestRating: "5",
          },
        })}
      </script>
    </Helmet>
  );
}
