import React from "react";
import Button from "../components/Button";
import WikiFooter from "../components/WikiFooter";
import WikiNavigation from "../components/WikiNavigation";
import WikiHeader from "../components/WikiHeader";

export default function About({ onBackHome }: { onBackHome: () => void }) {
  return (
    <div className="min-h-screen bg-white">
      <WikiHeader
        breadcrumbs={[
          { text: "WikiRace" },
          { text: "Accueil", href: "/", onClick: onBackHome },
          { text: "À propos" },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Article principal */}
          <div className="bg-white border border-gray-300 rounded-sm shadow-sm mb-8">
            {/* En-tête d'article */}
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h1 className="text-2xl font-serif text-black font-normal">
                À propos de WikiRace
              </h1>
              <div className="text-sm text-gray-600 mt-1">
                Histoire et mission • WikiRace
              </div>
            </div>

            {/* Contenu de l'article */}
            <div className="p-6">
              {/* Introduction */}
              <div className="mb-6">
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  <strong>WikiRace</strong> est un jeu multijoueur en ligne qui
                  transforme la navigation sur Wikipedia en une course
                  passionnante entre amis. Inspiré du concept original de
                  "Wikipedia racing", notre plateforme offre une expérience
                  moderne et accessible à tous.
                </p>
              </div>

              {/* Mission */}
              <div className="mb-6">
                <h2 className="text-lg font-serif text-black mb-3 font-normal">
                  Notre mission
                </h2>
                <div className="bg-blue-50 border border-blue-200 rounded-sm p-4">
                  <div className="text-sm text-blue-800">
                    <strong>Démocratiser l'apprentissage ludique</strong>
                    <br />
                    <br />
                    Nous croyons que l'apprentissage peut être amusant et
                    social. WikiRace encourage la découverte de nouveaux sujets
                    tout en développant des compétences de navigation et de
                    logique dans un environnement convivial et éducatif.
                  </div>
                </div>
              </div>

              {/* Histoire */}
              <div className="mb-6">
                <h2 className="text-lg font-serif text-black mb-3 font-normal">
                  Histoire du projet
                </h2>
                <div className="space-y-4">
                  <div className="bg-green-50 border-l-4 border-green-400 p-4">
                    <div className="text-sm text-green-800">
                      <strong>2024 - Naissance du projet</strong>
                      <br />
                      L'idée de WikiRace est née de sessions informelles entre
                      amis qui se défiaient à naviguer rapidement sur Wikipedia.
                      Nous avons décidé de créer une plateforme dédiée pour
                      partager cette expérience avec le monde entier.
                    </div>
                  </div>

                  <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
                    <div className="text-sm text-purple-800">
                      <strong>Philosophie open-source</strong>
                      <br />
                      WikiRace s'inspire de l'esprit de Wikipedia : le partage
                      libre de la connaissance. Notre plateforme est conçue pour
                      être accessible, transparente et centrée sur la
                      communauté.
                    </div>
                  </div>
                </div>
              </div>

              {/* Fonctionnalités */}
              <div className="mb-6">
                <h2 className="text-lg font-serif text-black mb-3 font-normal">
                  Ce qui nous rend unique
                </h2>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="bg-gray-50 border border-gray-200 rounded-sm p-3">
                    <strong>🚀 Temps réel :</strong> Courses en direct avec
                    synchronisation instantanée entre tous les joueurs.
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-sm p-3">
                    <strong>🎯 Simplicité :</strong> Interface intuitive,
                    création de partie en un clic, pas d'inscription
                    obligatoire.
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-sm p-3">
                    <strong>📊 Statistiques :</strong> Historique détaillé des
                    parcours pour analyser et améliorer ses stratégies.
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-sm p-3">
                    <strong>🌍 Éducatif :</strong> Découverte naturelle de
                    nouveaux sujets grâce aux liens Wikipedia.
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-sm p-3">
                    <strong>🤝 Social :</strong> Partage de codes de partie,
                    défis entre amis, esprit de compétition saine.
                  </div>
                </div>
              </div>

              {/* Technologie */}
              <div className="mb-6">
                <h2 className="text-lg font-serif text-black mb-3 font-normal">
                  Technologie
                </h2>
                <div className="bg-orange-50 border border-orange-200 rounded-sm p-4">
                  <div className="text-sm text-orange-800">
                    <strong>Stack technique moderne :</strong>
                    <ul className="mt-2 space-y-1 ml-4">
                      <li>• Frontend : React + TypeScript + Tailwind CSS</li>
                      <li>• Backend : Node.js + Express + WebSocket</li>
                      <li>• API Wikipedia officielle pour le contenu</li>
                      <li>• Déploiement cloud avec haute disponibilité</li>
                      <li>
                        • Architecture serverless pour une scalabilité optimale
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Communauté */}
              <div className="mb-6">
                <h2 className="text-lg font-serif text-black mb-3 font-normal">
                  Communauté et contributions
                </h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-sm p-4">
                  <div className="text-sm text-yellow-800">
                    <strong>Rejoignez la communauté WikiRace !</strong>
                    <br />
                    <br />
                    Nous encourageons les retours, suggestions et contributions
                    de notre communauté. Que vous soyez développeur, designer,
                    ou simplement passionné par le projet, votre participation
                    est la bienvenue.
                    <br />
                    <br />
                    <em>Contact : community@wikirace.example.com</em>
                  </div>
                </div>
              </div>

              {/* Remerciements */}
              <div className="mb-6">
                <h2 className="text-lg font-serif text-black mb-3 font-normal">
                  Remerciements
                </h2>
                <div className="space-y-2 text-sm text-gray-700">
                  <div>
                    <strong>Wikipedia Foundation :</strong> Pour avoir créé et
                    maintenu la plus grande encyclopédie libre du monde.
                  </div>
                  <div>
                    <strong>Communauté open-source :</strong> Pour les outils et
                    bibliothèques qui rendent ce projet possible.
                  </div>
                  <div>
                    <strong>Nos testeurs :</strong> Les premiers joueurs qui ont
                    testé WikiRace et nous ont aidés à l'améliorer.
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
                    Commencer à jouer maintenant
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="bg-gray-50 border border-gray-200 rounded-sm p-4 mb-6">
            <h3 className="text-base font-serif text-black mb-3 font-normal">
              En quelques chiffres
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">∞</div>
                <div>Articles Wikipedia disponibles</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">100%</div>
                <div>Gratuit et open-source</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600">&lt; 1s</div>
                <div>Temps de synchronisation</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-orange-600">24/7</div>
                <div>Disponibilité du service</div>
              </div>
            </div>
          </div>

          <WikiNavigation
            links={[
              { text: "Politique de confidentialité", href: "/privacy" },
              { text: "Avertissements", href: "/disclaimer" },
              { text: "Règles du jeu", href: "/rules" },
            ]}
          />

          <WikiFooter />
        </div>
      </div>
    </div>
  );
}
