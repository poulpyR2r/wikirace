import React from "react";
import Button from "../components/Button";
import WikiFooter from "../components/WikiFooter";
import WikiNavigation from "../components/WikiNavigation";
import WikiHeader from "../components/WikiHeader";
import SEOHead from "../components/SEOHead";
import { useGoogleAnalytics } from "../hooks/useGoogleAnalytics";
import logo from "../../assets/Wikipedia-logo-v2.svg.webp";

export default function Home({
  onCreate,
  onJoin,
}: {
  onCreate: () => void;
  onJoin: () => void;
}) {
  const { trackEvent } = useGoogleAnalytics();

  const handleCreateClick = () => {
    trackEvent("click_create_room", "navigation", "homepage");
    onCreate();
  };

  const handleJoinClick = () => {
    trackEvent("click_join_room", "navigation", "homepage");
    onJoin();
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Accueil"
        description="WikiRace - Le jeu de course multijoueur sur Wikipedia ! Défiez vos amis dans une course passionnante à travers les articles Wikipedia. Créez ou rejoignez une partie gratuitement."
        keywords="jeu wikipedia, course wikipedia, jeu éducatif multijoueur, culture générale, wikipedia game, jeu gratuit, apprentissage ludique"
        canonicalUrl="/"
      />
      <WikiHeader
        breadcrumbs={[{ text: "WikiRace" }, { text: "L'encyclopédie du jeu" }]}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Logo et titre principal style Wikipedia */}
        <div className="text-center mb-12">
          <div className="mb-6">
            {/* Simuler le logo Wikipedia avec du texte stylisé */}
            <div className="inline-block">
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <img src={logo} alt="WikiRace" className="w-16 h-16" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-serif text-black mb-2 font-normal">
            WikiRace
          </h1>
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-gray-700 font-normal max-w-2xl mx-auto leading-relaxed">
              Crée une partie ou rejoins avec un code pour défier tes amis dans
              une course à travers les articles Wikipedia
            </p>
          </div>
        </div>

        {/* Contenu principal dans une boîte style article Wikipedia */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border border-gray-300 rounded-sm shadow-sm">
            {/* En-tête de l'article */}
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h2 className="text-xl font-serif text-black font-normal">
                Commencer une partie
              </h2>
            </div>

            {/* Contenu */}
            <div className="p-6">
              <div className="space-y-6">
                {/* <div>
                  <h3 className="text-lg font-serif text-black mb-3 font-normal">
                    Options de jeu
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    Choisissez votre mode de jeu préféré pour commencer votre
                    aventure Wikipedia.
                  </p>
                </div> */}

                <div className="space-y-3">
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={handleCreateClick}
                  >
                    Créer une nouvelle partie
                  </Button>
                  <Button
                    variant="secondary"
                    fullWidth
                    onClick={handleJoinClick}
                  >
                    Rejoindre une partie existante
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sections additionnelles style Wikipedia */}
          <div className="mt-8 space-y-6">
            <WikiNavigation
              title="Voir aussi"
              links={[
                { text: "Règles du jeu", href: "/rules" },
                { text: "Comment jouer", href: "/how-to-play" },
              ]}
            />

            <WikiFooter />
          </div>
        </div>
      </div>
    </div>
  );
}
