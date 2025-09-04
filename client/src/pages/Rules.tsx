import React from "react";
import Button from "../components/Button";
import WikiFooter from "../components/WikiFooter";
import WikiNavigation from "../components/WikiNavigation";
import WikiHeader from "../components/WikiHeader";

export default function Rules({ onBackHome }: { onBackHome: () => void }) {
  return (
    <div className="min-h-screen bg-white">
      <WikiHeader
        breadcrumbs={[
          { text: "WikiRace" },
          { text: "Accueil", href: "/", onClick: onBackHome },
          { text: "Règles du jeu" },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Article principal */}
          <div className="bg-white border border-gray-300 rounded-sm shadow-sm mb-8">
            {/* En-tête d'article */}
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h1 className="text-2xl font-serif text-black font-normal">
                WikiRace - Règles du jeu
              </h1>
              <div className="text-sm text-gray-600 mt-1">
                Règlement officiel • WikiRace
              </div>
            </div>

            {/* Contenu de l'article */}
            <div className="p-6">
              {/* Introduction */}
              <div className="mb-6">
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  <strong>WikiRace</strong> est un jeu de course en ligne où les
                  joueurs naviguent à travers les articles de <em>Wikipedia</em>{" "}
                  pour atteindre un article cible en utilisant uniquement les
                  liens internes.
                </p>
              </div>

              {/* Objectif */}
              <div className="mb-6">
                <h2 className="text-lg font-serif text-black mb-3 font-normal">
                  Objectif du jeu
                </h2>
                <div className="bg-green-50 border border-green-200 rounded-sm p-4">
                  <div className="text-sm text-green-800">
                    <strong>But principal :</strong> Être le premier joueur à
                    naviguer de l'article de départ vers l'article cible en
                    cliquant uniquement sur les liens Wikipedia internes.
                  </div>
                </div>
              </div>

              {/* Règles principales */}
              <div className="mb-6">
                <h2 className="text-lg font-serif text-black mb-3 font-normal">
                  Règles principales
                </h2>
                <div className="space-y-4">
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                    <div className="text-sm text-blue-800">
                      <strong>1. Navigation autorisée</strong>
                      <ul className="mt-2 space-y-1 ml-4">
                        <li>
                          • Seuls les liens internes Wikipedia sont autorisés
                        </li>
                        <li>
                          • Les liens vers d'autres sites web sont interdits
                        </li>
                        <li>
                          • La fonction "recherche" de Wikipedia est interdite
                        </li>
                        <li>• Le bouton "retour" du navigateur est interdit</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <div className="text-sm text-yellow-800">
                      <strong>2. Démarrage de la manche</strong>
                      <ul className="mt-2 space-y-1 ml-4">
                        <li>• Tous les joueurs commencent sur la même page</li>
                        <li>
                          • Un compte à rebours de 3 secondes précède chaque
                          manche
                        </li>
                        <li>
                          • La page cible est révélée au début du countdown
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
                    <div className="text-sm text-purple-800">
                      <strong>3. Victoire et points</strong>
                      <ul className="mt-2 space-y-1 ml-4">
                        <li>
                          • Le premier à atteindre l'article cible gagne la
                          manche
                        </li>
                        <li>• Le gagnant reçoit 10 points</li>
                        <li>• Les autres joueurs ne reçoivent pas de points</li>
                        <li>
                          • Le joueur avec le plus de points gagne la partie
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interdictions */}
              <div className="mb-6">
                <h2 className="text-lg font-serif text-black mb-3 font-normal">
                  Interdictions
                </h2>
                <div className="bg-red-50 border border-red-200 rounded-sm p-4">
                  <div className="text-sm text-red-800">
                    <strong>Actions interdites :</strong>
                    <ul className="mt-2 space-y-1 ml-4">
                      <li>• Utiliser des moteurs de recherche externes</li>
                      <li>• Ouvrir de nouveaux onglets ou fenêtres</li>
                      <li>• Modifier l'URL manuellement</li>
                      <li>• Utiliser des extensions de navigateur pour aide</li>
                      <li>
                        • Communiquer avec d'autres joueurs pendant la manche
                      </li>
                      <li>
                        • Quitter et rejoindre la partie en cours de manche
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Fair-play */}
              <div className="mb-6">
                <h2 className="text-lg font-serif text-black mb-3 font-normal">
                  Esprit sportif
                </h2>
                <div className="bg-gray-50 border border-gray-200 rounded-sm p-4">
                  <div className="text-sm text-gray-700">
                    <p className="mb-2">
                      <strong>WikiRace</strong> repose sur l'esprit sportif et
                      le fair-play. Les joueurs sont encouragés à :
                    </p>
                    <ul className="space-y-1 ml-4">
                      <li>• Respecter les règles même sans surveillance</li>
                      <li>
                        • Féliciter les autres joueurs pour leurs victoires
                      </li>
                      <li>• Partager des stratégies après les parties</li>
                      <li>• Maintenir une atmosphère conviviale</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action de retour */}
              <div className="space-y-3">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={onBackHome}
                  className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
                >
                  Retour à l'accueil
                </Button>
              </div>
            </div>
          </div>

          {/* Section variants de jeu */}
          <div className="bg-gray-50 border border-gray-200 rounded-sm p-4 mb-6">
            <h3 className="text-base font-serif text-black mb-3 font-normal">
              Variantes possibles
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div>
                <strong>Mode équipe :</strong> Les joueurs peuvent former des
                équipes et collaborer pour trouver le chemin le plus court.
              </div>
              <div>
                <strong>Mode chrono :</strong> Limite de temps fixée pour chaque
                manche (ex: 5 minutes maximum).
              </div>
              <div>
                <strong>Mode handicap :</strong> Certains types d'articles
                peuvent être interdits (ex: pas de pays, pas de dates).
              </div>
            </div>
          </div>

          <WikiNavigation
            links={[
              { text: "Comment jouer", href: "/how-to-play" },
              { text: "Créer une partie", href: "/create" },
            ]}
          />

          <WikiFooter />
        </div>
      </div>
    </div>
  );
}
