import React from "react";
import Button from "../components/Button";
import WikiFooter from "../components/WikiFooter";
import WikiNavigation from "../components/WikiNavigation";
import WikiHeader from "../components/WikiHeader";

export default function Disclaimer({ onBackHome }: { onBackHome: () => void }) {
  return (
    <div className="min-h-screen bg-white">
      <WikiHeader
        breadcrumbs={[
          { text: "WikiRace" },
          { text: "Accueil", href: "/", onClick: onBackHome },
          { text: "Avertissements" },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Article principal */}
          <div className="bg-white border border-gray-300 rounded-sm shadow-sm mb-8">
            {/* En-tête d'article */}
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h1 className="text-2xl font-serif text-black font-normal">
                Avertissements et clause de non-responsabilité
              </h1>
              <div className="text-sm text-gray-600 mt-1">
                Conditions d'utilisation • WikiRace
              </div>
            </div>

            {/* Contenu de l'article */}
            <div className="p-6">
              {/* Introduction */}
              <div className="mb-6">
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  L'utilisation de <strong>WikiRace</strong> est soumise aux
                  avertissements et conditions suivants. En utilisant notre
                  service, vous acceptez ces termes.
                </p>
                <div className="bg-red-50 border border-red-200 rounded-sm p-4">
                  <div className="text-sm text-red-800">
                    <strong>⚠️ Important :</strong> Veuillez lire attentivement
                    ces avertissements avant d'utiliser WikiRace.
                  </div>
                </div>
              </div>

              {/* Service fourni "en l'état" */}
              <div className="mb-6">
                <h2 className="text-lg font-serif text-black mb-3 font-normal">
                  Service fourni "en l'état"
                </h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-sm p-4">
                  <div className="text-sm text-yellow-800">
                    <strong>
                      WikiRace est fourni "tel quel" sans garantie.
                    </strong>
                    <br />
                    <br />
                    Nous nous efforçons de maintenir un service de qualité, mais
                    ne pouvons garantir :
                    <ul className="mt-2 space-y-1 ml-4">
                      <li>• La disponibilité continue du service (24/7)</li>
                      <li>• L'absence d'interruptions ou de bugs</li>
                      <li>• La préservation permanente de vos données</li>
                      <li>• La compatibilité avec tous les navigateurs</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Contenu Wikipedia */}
              <div className="mb-6">
                <h2 className="text-lg font-serif text-black mb-3 font-normal">
                  Contenu Wikipedia
                </h2>
                <div className="space-y-4">
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                    <div className="text-sm text-blue-800">
                      <strong>Responsabilité du contenu</strong>
                      <br />
                      WikiRace utilise l'API officielle de Wikipedia. Nous ne
                      sommes pas responsables du contenu des articles Wikipedia,
                      qui sont créés et maintenus par la communauté Wikipedia.
                    </div>
                  </div>

                  <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
                    <div className="text-sm text-orange-800">
                      <strong>Contenu potentiellement inapproprié</strong>
                      <br />
                      Wikipedia peut contenir des sujets sensibles, des images
                      ou du contenu pouvant heurter certaines sensibilités.
                      WikiRace ne filtre pas ce contenu et ne peut être tenu
                      responsable de son exposition.
                    </div>
                  </div>
                </div>
              </div>

              {/* Utilisation responsable */}
              <div className="mb-6">
                <h2 className="text-lg font-serif text-black mb-3 font-normal">
                  Utilisation responsable
                </h2>
                <div className="bg-purple-50 border border-purple-200 rounded-sm p-4">
                  <div className="text-sm text-purple-800">
                    <strong>Vous vous engagez à :</strong>
                    <ul className="mt-2 space-y-1 ml-4">
                      <li>
                        • Utiliser WikiRace de manière respectueuse et légale
                      </li>
                      <li>
                        • Ne pas tenter de compromettre la sécurité du service
                      </li>
                      <li>
                        • Respecter les autres joueurs dans vos interactions
                      </li>
                      <li>• Ne pas utiliser de bots ou scripts automatisés</li>
                      <li>• Signaler tout comportement abusif ou bug</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Limitation de responsabilité */}
              <div className="mb-6">
                <h2 className="text-lg font-serif text-black mb-3 font-normal">
                  Limitation de responsabilité
                </h2>
                <div className="bg-red-50 border border-red-200 rounded-sm p-4">
                  <div className="text-sm text-red-800">
                    <strong>
                      WikiRace et ses créateurs ne peuvent être tenus
                      responsables :
                    </strong>
                    <ul className="mt-2 space-y-1 ml-4">
                      <li>
                        • Des dommages directs ou indirects liés à l'utilisation
                      </li>
                      <li>• De la perte de données ou de progression de jeu</li>
                      <li>
                        • Des interruptions de service ou pannes techniques
                      </li>
                      <li>• Du contenu inapproprié présent sur Wikipedia</li>
                      <li>• Des conflits entre joueurs</li>
                      <li>• De l'usage excessif ou addictif du service</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Propriété intellectuelle */}
              <div className="mb-6">
                <h2 className="text-lg font-serif text-black mb-3 font-normal">
                  Propriété intellectuelle
                </h2>
                <div className="space-y-3 text-sm text-gray-700">
                  <div>
                    <strong>WikiRace :</strong> Le code et l'interface de
                    WikiRace sont protégés par des droits d'auteur.
                    L'utilisation est autorisée dans le cadre du jeu uniquement.
                  </div>
                  <div>
                    <strong>Wikipedia :</strong> Le contenu Wikipedia est soumis
                    aux licences Creative Commons. WikiRace respecte ces
                    licences dans son utilisation de l'API.
                  </div>
                  <div>
                    <strong>Marques :</strong> "Wikipedia" est une marque
                    déposée de la Wikimedia Foundation. WikiRace n'est pas
                    affilié à Wikipedia ou Wikimedia.
                  </div>
                </div>
              </div>

              {/* Modifications */}
              <div className="mb-6">
                <h2 className="text-lg font-serif text-black mb-3 font-normal">
                  Modifications des conditions
                </h2>
                <div className="bg-gray-50 border border-gray-200 rounded-sm p-4">
                  <div className="text-sm text-gray-700">
                    Nous nous réservons le droit de modifier ces avertissements
                    à tout moment. Les modifications importantes seront
                    communiquées aux utilisateurs. L'utilisation continue du
                    service après modification constitue votre acceptation des
                    nouveaux termes.
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="mb-6">
                <h2 className="text-lg font-serif text-black mb-3 font-normal">
                  Contact et signalements
                </h2>
                <div className="bg-green-50 border border-green-200 rounded-sm p-4">
                  <div className="text-sm text-green-800">
                    <strong>Pour toute question ou signalement :</strong>
                    <br />
                    <br />
                    • Email : legal@wikirace.example.com
                    <br />
                    • Bugs techniques : support@wikirace.example.com
                    <br />• Contenu inapproprié : report@wikirace.example.com
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

                <div className="text-center">
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    J'accepte et je veux jouer
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Âge et supervision */}
          <div className="bg-gray-50 border border-gray-200 rounded-sm p-4 mb-6">
            <h3 className="text-base font-serif text-black mb-3 font-normal">
              Recommandations d'âge
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div>
                <strong>Public recommandé :</strong> 13 ans et plus en raison du
                contenu encyclopédique parfois complexe.
              </div>
              <div>
                <strong>Supervision parentale :</strong> Recommandée pour les
                mineurs en raison de l'accès libre à tout Wikipedia.
              </div>
              <div>
                <strong>Contenu éducatif :</strong> WikiRace peut être un
                excellent outil pédagogique dans un contexte supervisé.
              </div>
            </div>
          </div>

          <WikiNavigation
            links={[
              { text: "Politique de confidentialité", href: "/privacy" },
              { text: "À propos de WikiRace", href: "/about" },
              { text: "Règles du jeu", href: "/rules" },
            ]}
          />

          <WikiFooter />
        </div>
      </div>
    </div>
  );
}
