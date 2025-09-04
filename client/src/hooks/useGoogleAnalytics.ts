import { useEffect } from "react";

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
  }
}

// Configuration Google Analytics
const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID; // Remplacez par votre vrai ID Google Analytics

export const useGoogleAnalytics = () => {
  useEffect(() => {
    // Ne pas charger en développement (toujours charger pour simplifier)
    // if (process.env.NODE_ENV !== "production") {
    //   return;
    // }

    // Charger Google Analytics
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_TRACKING_ID}', {
        page_title: document.title,
        page_location: window.location.href,
        custom_map: {
          'custom_parameter': 'game_mode'
        }
      });
    `;
    document.head.appendChild(script2);

    return () => {
      // Cleanup si nécessaire
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  // Fonction pour tracker les événements
  const trackEvent = (
    action: string,
    category: string,
    label?: string,
    value?: number
  ) => {
    if (typeof window.gtag !== "undefined") {
      window.gtag("event", action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  };

  // Fonction pour tracker les pages
  const trackPageView = (page_title: string, page_location: string) => {
    if (typeof window.gtag !== "undefined") {
      window.gtag("config", GA_TRACKING_ID, {
        page_title,
        page_location,
      });
    }
  };

  // Événements spécifiques à WikiRace
  const trackGameEvent = {
    // Création de partie
    createRoom: (rounds: number) =>
      trackEvent("create_room", "game", "rounds", rounds),

    // Rejoindre une partie
    joinRoom: (roomCode: string) => trackEvent("join_room", "game", roomCode),

    // Démarrage d'une manche
    startRound: (players: number) =>
      trackEvent("start_round", "game", "players", players),

    // Fin de manche
    finishRound: (winner: boolean, steps: number, duration: number) => {
      trackEvent("finish_round", "game", winner ? "won" : "lost", steps);
      trackEvent(
        "round_duration",
        "performance",
        "seconds",
        Math.round(duration / 1000)
      );
    },

    // Navigation Wikipedia
    wikiClick: (fromArticle: string, toArticle: string) => {
      trackEvent(
        "wiki_navigation",
        "wikipedia",
        `${fromArticle} -> ${toArticle}`
      );
    },

    // Partage
    shareRoom: (method: string) => trackEvent("share_room", "social", method),

    // Erreurs
    gameError: (errorType: string) =>
      trackEvent("game_error", "error", errorType),
  };

  return {
    trackEvent,
    trackPageView,
    trackGameEvent,
  };
};
