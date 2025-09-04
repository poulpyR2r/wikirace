import React, { useState } from "react";
import { socket } from "../socket";
import Button from "../components/Button";
import Input from "../components/Input";
import WikiFooter from "../components/WikiFooter";
import WikiNavigation from "../components/WikiNavigation";
import WikiHeader from "../components/WikiHeader";

export default function JoinRoom({
  me,
  onNamed,
}: {
  me: { id: string; name: string };
  onNamed: (n: string) => void;
}) {
  const [name, setName] = useState(me.name);
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");

  function join() {
    if (!name.trim() || !code.trim()) return;
    onNamed(name.trim());
    socket.emit(
      "room:join",
      { code: code.trim().toUpperCase(), name: name.trim() },
      (res: any) => {
        if (!res.ok) setErr(res.error || "Join failed");
      }
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <WikiHeader
        breadcrumbs={[
          { text: "WikiRace" },
          { text: "Accueil", href: "/" },
          { text: "Rejoindre une partie" },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Article principal */}
          <div className="bg-white border border-gray-300 rounded-sm shadow-sm mb-8">
            {/* En-tête d'article */}
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h1 className="text-2xl font-serif text-black font-normal">
                Rejoindre une partie
              </h1>
              <div className="text-sm text-gray-600 mt-1">
                Page de connexion • WikiRace
              </div>
            </div>

            {/* Contenu de l'article */}
            <div className="p-6">
              {/* Introduction */}
              <div className="mb-6">
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  Pour rejoindre une partie de <strong>WikiRace</strong>{" "}
                  existante, vous devez disposer d'un <em>code de partie</em>{" "}
                  fourni par l'organisateur. Entrez vos informations ci-dessous
                  pour vous connecter.
                </p>
              </div>

              {/* Formulaire dans une boîte d'information */}
              <div className="bg-blue-50 border border-blue-200 rounded-sm p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-blue-900 mb-3">
                      Informations requises
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom d'utilisateur
                        </label>
                        <Input
                          placeholder="Entrez votre pseudo"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          fullWidth
                          className="bg-white border-gray-300 text-sm"
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          Ce nom sera visible par les autres joueurs
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Code de la partie
                        </label>
                        <Input
                          placeholder="Entrez le code (ex: ABCD1234)"
                          value={code}
                          onChange={(e) =>
                            setCode(e.target.value.toUpperCase())
                          }
                          className="uppercase tracking-wider bg-white border-gray-300 text-sm font-mono"
                          fullWidth
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          Code fourni par l'organisateur de la partie
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages d'erreur */}
              {err && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <span className="text-red-400 text-sm font-bold">⚠</span>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm text-red-700">
                        <strong>Erreur :</strong> {err}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bouton d'action */}
              <div className="space-y-3">
                <Button variant="primary" fullWidth onClick={join}>
                  Rejoindre la partie
                </Button>

                <div className="text-center">
                  <a href="/" className="text-sm text-blue-600 hover:underline">
                    ← Retour à l'accueil
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Section d'aide */}
          <div className="bg-gray-50 border border-gray-200 rounded-sm p-4 mb-6">
            <h3 className="text-base font-serif text-black mb-3 font-normal">
              Aide et dépannage
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div>
                <strong>Code invalide ?</strong> Vérifiez que le code est
                correct et que la partie est toujours active.
              </div>
              <div>
                <strong>Partie pleine ?</strong> La partie a peut-être atteint
                le nombre maximum de joueurs.
              </div>
              <div>
                <strong>Problème de connexion ?</strong> Vérifiez votre
                connexion internet.
              </div>
            </div>
          </div>

          <WikiNavigation
            links={[
              { text: "Créer une partie", href: "/create" },
              { text: "Règles du jeu", href: "/rules" },
              { text: "Guide du débutant", href: "/how-to-play" },
            ]}
          />

          <WikiFooter />
        </div>
      </div>
    </div>
  );
}
