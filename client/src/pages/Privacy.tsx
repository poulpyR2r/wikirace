import React from "react";
import Button from "../components/Button";
import WikiFooter from "../components/WikiFooter";
import WikiNavigation from "../components/WikiNavigation";
import WikiHeader from "../components/WikiHeader";

export default function Privacy({ onBackHome }: { onBackHome: () => void }) {
  return (
    <div className="min-h-screen bg-white">
      <WikiHeader
        breadcrumbs={[
          { text: "WikiRace" },
          { text: "Accueil", href: "/", onClick: onBackHome },
          { text: "Politique de confidentialité" },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Article principal */}
          <div className="bg-white border border-gray-300 rounded-sm shadow-sm mb-8">
            {/* En-tête d'article */}
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h1 className="text-2xl font-serif text-black font-normal">
                Politique de confidentialité
              </h1>
              <div className="text-sm text-gray-600 mt-1">
                Protection des données • WikiRace
              </div>
            </div>

            {/* Contenu de l'article */}
            <div className="p-6">
              {/* Introduction */}
              <div className="mb-6">
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  <strong>WikiRace</strong> respecte votre vie privée et
                  s'engage à protéger vos données personnelles. Cette politique
                  explique quelles informations nous collectons, comment nous
                  les utilisons et quels sont vos droits.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-sm p-4">
                  <div className="text-sm text-blue-800">
                    <strong>Dernière mise à jour :</strong>{" "}
                    {new Date().toLocaleDateString("fr-FR")}
                  </div>
                </div>
              </div>

              {/* Données collectées */}
              <div className="mb-6">
                <h2 className="text-lg font-serif text-black mb-3 font-normal">
                  Données collectées
                </h2>
                <div className="space-y-4">
                  <div className="bg-green-50 border-l-4 border-green-400 p-4">
                    <div className="text-sm text-green-800">
                      <strong>Données de jeu</strong>
                      <ul className="mt-2 space-y-1 ml-4">
                        <li>• Pseudo choisi pour la partie</li>
                        <li>• Scores et statistiques de jeu</li>
                        <li>• Historique des parcours Wikipedia</li>
                        <li>• Temps de connexion aux parties</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <div className="text-sm text-yellow-800">
                      <strong>Données techniques</strong>
                      <ul className="mt-2 space-y-1 ml-4">
                        <li>• Adresse IP (anonymisée après 24h)</li>
                        <li>• Type de navigateur et appareil</li>
                        <li>• Pages visitées sur WikiRace</li>
                        <li>• Données de connexion aux serveurs</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Utilisation des données */}
              <div className="mb-6">
                <h2 className="text-lg font-serif text-black mb-3 font-normal">
                  Utilisation des données
                </h2>
                <div className="bg-purple-50 border border-purple-200 rounded-sm p-4">
                  <div className="text-sm text-purple-800">
                    <strong>Nous utilisons vos données pour :</strong>
                    <ul className="mt-2 space-y-1 ml-4">
                      <li>
                        • Permettre le fonctionnement des parties multijoueur
                      </li>
                      <li>• Calculer et afficher les scores en temps réel</li>
                      <li>
                        • Améliorer l'expérience de jeu et corriger les bugs
                      </li>
                      <li>• Générer des statistiques anonymisées d'usage</li>
                      <li>• Assurer la sécurité et prévenir les abus</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Stockage et conservation */}
              <div className="mb-6">
                <h2 className="text-lg font-serif text-black mb-3 font-normal">
                  Stockage et conservation
                </h2>
                <div className="space-y-3 text-sm text-gray-700">
                  <div>
                    <strong>Stockage local :</strong> Certaines données (pseudo,
                    derniers scores) sont stockées localement dans votre
                    navigateur pour améliorer votre expérience.
                  </div>
                  <div>
                    <strong>Serveurs :</strong> Les données de partie sont
                    stockées temporairement sur nos serveurs sécurisés pendant
                    la durée de la session.
                  </div>
                  <div>
                    <strong>Conservation :</strong> Les données de jeu sont
                    automatiquement supprimées après 30 jours d'inactivité.
                  </div>
                </div>
              </div>

              {/* Partage des données */}
              <div className="mb-6">
                <h2 className="text-lg font-serif text-black mb-3 font-normal">
                  Partage des données
                </h2>
                <div className="bg-red-50 border border-red-200 rounded-sm p-4">
                  <div className="text-sm text-red-800">
                    <strong>
                      Nous ne vendons jamais vos données personnelles.
                    </strong>
                    <br />
                    <br />
                    Partage limité uniquement dans ces cas :
                    <ul className="mt-2 space-y-1 ml-4">
                      <li>
                        • Autres joueurs de votre partie (pseudo et scores
                        uniquement)
                      </li>
                      <li>
                        • Fournisseurs techniques nécessaires au fonctionnement
                      </li>
                      <li>• Autorités légales si requis par la loi</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Vos droits */}
              <div className="mb-6">
                <h2 className="text-lg font-serif text-black mb-3 font-normal">
                  Vos droits
                </h2>
                <div className="bg-gray-50 border border-gray-200 rounded-sm p-4">
                  <div className="text-sm text-gray-700">
                    <strong>Vous avez le droit de :</strong>
                    <ul className="mt-2 space-y-1 ml-4">
                      <li>• Accéder à vos données personnelles</li>
                      <li>• Corriger des informations inexactes</li>
                      <li>• Demander la suppression de vos données</li>
                      <li>• Vous opposer au traitement de vos données</li>
                      <li>• Recevoir vos données dans un format portable</li>
                    </ul>
                    <div className="mt-3 p-3 bg-white rounded border border-gray-200">
                      <strong>Contact :</strong> Pour exercer vos droits,
                      contactez-nous à contact@taylora.fr
                    </div>
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

          {/* Cookies et trackers */}
          <div className="bg-gray-50 border border-gray-200 rounded-sm p-4 mb-6">
            <h3 className="text-base font-serif text-black mb-3 font-normal">
              Cookies et trackers
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div>
                <strong>Cookies essentiels :</strong> Nécessaires au
                fonctionnement du jeu (session, préférences).
              </div>
              <div>
                <strong>Pas de tracking :</strong> Nous n'utilisons aucun
                tracker publicitaire ou de réseaux sociaux.
              </div>
              <div>
                <strong>Analytics :</strong> Statistiques anonymisées d'usage
                pour améliorer le service.
              </div>
            </div>
          </div>

          <WikiNavigation
            links={[
              { text: "À propos de WikiRace", href: "/about" },
              { text: "Avertissements", href: "/disclaimer" },
              { text: "Conditions d'utilisation", href: "/privacy" },
            ]}
          />

          <WikiFooter />
        </div>
      </div>
    </div>
  );
}
