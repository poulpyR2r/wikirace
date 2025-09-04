import React from "react";
import Button from "../components/Button";
import WikiFooter from "../components/WikiFooter";
import WikiNavigation from "../components/WikiNavigation";
import WikiHeader from "../components/WikiHeader";

export default function HowToPlay({ onBackHome }: { onBackHome: () => void }) {
  return (
    <div className="min-h-screen bg-white">
      <WikiHeader
        breadcrumbs={[
          { text: "WikiRace" },
          { text: "Accueil", href: "/", onClick: onBackHome },
          { text: "Comment jouer" },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Article principal */}
          <div className="bg-white border border-gray-300 rounded-sm shadow-sm mb-8">
            {/* En-tête d'article */}
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h1 className="text-2xl font-serif text-black font-normal">
                Comment jouer à WikiRace
              </h1>
              <div className="text-sm text-gray-600 mt-1">
                Guide du débutant • WikiRace
              </div>
            </div>

            {/* Contenu de l'article */}
            <div className="p-6">
              {/* Introduction */}
              <div className="mb-6">
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  Ce guide vous explique étape par étape comment jouer à{" "}
                  <strong>WikiRace</strong>, depuis la création d'une partie
                  jusqu'aux stratégies avancées pour gagner.
                </p>
              </div>

              {/* Étapes pour commencer */}
              <div className="mb-6">
                <h2 className="text-lg font-serif text-black mb-3 font-normal">
                  Première partie
                </h2>
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-sm p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">1</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-blue-900 mb-2">
                          Créer ou rejoindre une partie
                        </div>
                        <div className="text-sm text-blue-800">
                          • <strong>Créer :</strong> Choisissez votre pseudo et
                          le nombre de manches
                          <br />• <strong>Rejoindre :</strong> Entrez le code de
                          partie fourni par l'organisateur
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-sm p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">2</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-green-900 mb-2">
                          Salle d'attente
                        </div>
                        <div className="text-sm text-green-800">
                          • Attendez que tous les joueurs se déclarent "Prêt"
                          <br />• La partie commence automatiquement quand tout
                          le monde est prêt
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-sm p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">3</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-purple-900 mb-2">
                          Début de manche
                        </div>
                        <div className="text-sm text-purple-800">
                          • L'article cible est révélé
                          <br />
                          • Compte à rebours de 3 secondes
                          <br />• La page de départ s'affiche - c'est parti !
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comment naviguer */}
              <div className="mb-6">
                <h2 className="text-lg font-serif text-black mb-3 font-normal">
                  Navigation pendant le jeu
                </h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-sm p-4 mb-4">
                  <div className="text-sm text-yellow-800">
                    <strong>Principe de base :</strong> Cliquez uniquement sur
                    les liens bleus dans les articles Wikipedia pour naviguer
                    vers d'autres pages.
                  </div>
                </div>

                <div className="space-y-3 text-sm text-gray-700">
                  <div>
                    <strong>✅ Autorisé :</strong>
                    <ul className="mt-1 ml-4 space-y-1">
                      <li>
                        • Cliquer sur les liens internes Wikipedia (en bleu)
                      </li>
                      <li>
                        • Lire le contenu des articles pour trouver des indices
                      </li>
                      <li>
                        • Utiliser les liens dans les infobox (boîtes
                        d'information)
                      </li>
                    </ul>
                  </div>
                  <div>
                    <strong>❌ Interdit :</strong>
                    <ul className="mt-1 ml-4 space-y-1">
                      <li>• Utiliser la barre de recherche Wikipedia</li>
                      <li>• Utiliser le bouton "Retour" du navigateur</li>
                      <li>• Ouvrir de nouveaux onglets</li>
                      <li>• Modifier l'URL manuellement</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Stratégies de base */}
              <div className="mb-6">
                <h2 className="text-lg font-serif text-black mb-3 font-normal">
                  Stratégies pour débuter
                </h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-sm p-4">
                    <div className="text-sm text-gray-700">
                      <div className="font-medium text-gray-900 mb-2">
                        Stratégie des "articles généraux"
                      </div>
                      <p>
                        Dirigez-vous vers des articles généraux comme "France",
                        "Europe", "Sciences" qui contiennent beaucoup de liens
                        vers d'autres sujets.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-sm p-4">
                    <div className="text-sm text-gray-700">
                      <div className="font-medium text-gray-900 mb-2">
                        Stratégie des "catégories"
                      </div>
                      <p>
                        Si vous cherchez un scientifique, allez vers "Science"
                        puis "Physique" ou "Biologie". Pensez par catégories
                        thématiques.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-sm p-4">
                    <div className="text-sm text-gray-700">
                      <div className="font-medium text-gray-900 mb-2">
                        Stratégie temporelle
                      </div>
                      <p>
                        Pour des événements historiques, passez par les années
                        ou les siècles correspondants (ex: "XXe siècle" → "1969"
                        → "Apollo 11").
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Astuces avancées */}
              <div className="mb-6">
                <h2 className="text-lg font-serif text-black mb-3 font-normal">
                  Astuces avancées
                </h2>
                <div className="bg-orange-50 border border-orange-200 rounded-sm p-4">
                  <div className="text-sm text-orange-800">
                    <strong>💡 Conseils de pros :</strong>
                    <ul className="mt-2 space-y-1 ml-4">
                      <li>
                        • <strong>Infobox magique :</strong> Les boîtes
                        d'information à droite contiennent souvent des liens
                        directs utiles
                      </li>
                      <li>
                        • <strong>Premier paragraphe :</strong> Les liens dans
                        le premier paragraphe mènent souvent vers des sujets
                        centraux
                      </li>
                      <li>
                        • <strong>Pensez géographique :</strong> Pays → Villes →
                        Monuments est souvent un bon chemin
                      </li>
                      <li>
                        • <strong>Liens "Voir aussi" :</strong> En bas des
                        articles, ces liens peuvent offrir des raccourcis
                        inattendus
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action de retour */}
              <div className="space-y-3">
                <Button variant="primary" fullWidth onClick={onBackHome}>
                  Retour à l'accueil
                </Button>

                <div className="text-center">
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Voir les règles officielles
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Exemples concrets */}
          <div className="bg-gray-50 border border-gray-200 rounded-sm p-4 mb-6">
            <h3 className="text-base font-serif text-black mb-3 font-normal">
              Exemple de partie
            </h3>
            <div className="text-sm text-gray-700">
              <div className="mb-2">
                <strong>Départ :</strong> "Cuisine française" →{" "}
                <strong>Cible :</strong> "Neil Armstrong"
              </div>
              <div className="bg-white rounded p-3 border border-gray-200">
                <div className="font-mono text-xs text-gray-600">
                  Cuisine française → France → Europe → Guerre froide → Course à
                  l'espace → Apollo 11 → Neil Armstrong ✅
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-600">
                <em>7 étapes - Strategy: géographie → histoire → espace</em>
              </div>
            </div>
          </div>

          <WikiNavigation
            links={[
              { text: "Règles officielles", href: "/rules" },
              { text: "Créer une partie", href: "/create" },
            ]}
          />

          <WikiFooter />
        </div>
      </div>
    </div>
  );
}
