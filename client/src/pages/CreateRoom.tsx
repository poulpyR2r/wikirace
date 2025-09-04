import React, { useState } from "react";
import { socket } from "../socket";
import Button from "../components/Button";
import Input from "../components/Input";
import WikiFooter from "../components/WikiFooter";
import WikiNavigation from "../components/WikiNavigation";
import WikiHeader from "../components/WikiHeader";
import WikiNumberSelector from "../components/WikiNumberSelector";

type Props = {
  me: { id: string; name: string };
  onNamed: (name: string) => void;
};

export default function CreateRoom({ me, onNamed }: Props) {
  const [name, setName] = useState(me.name);
  const [rounds, setRounds] = useState(3);
  const [code, setCode] = useState("");

  const handleCreate = () => {
    const trimmed = name.trim();
    if (!trimmed) return;

    onNamed(trimmed);
    socket.emit(
      "room:create",
      { name: trimmed, rounds },
      (res: { code: string; state?: any }) => {
        setCode(res.code);
      }
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <WikiHeader
        breadcrumbs={[
          { text: "WikiRace" },
          { text: "Accueil", href: "/" },
          { text: "Créer une partie" },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Article principal */}
          <div className="bg-white border border-gray-300 rounded-sm shadow-sm mb-8">
            {/* En-tête d'article */}
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h1 className="text-2xl font-serif text-black font-normal">
                Créer une nouvelle partie
              </h1>
              <div className="text-sm text-gray-600 mt-1">
                Configuration • WikiRace
              </div>
            </div>

            {/* Contenu de l'article */}
            <div className="p-6">
              {/* Introduction */}
              <div className="mb-6">
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  Créez une nouvelle partie de <strong>WikiRace</strong> et
                  invitez vos amis à vous rejoindre. Configurez les paramètres
                  ci-dessous selon vos préférences.
                </p>
              </div>

              {/* Formulaire de configuration */}
              <div className="bg-green-50 border border-green-200 rounded-sm p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-green-900 mb-3">
                      Configuration de la partie
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Votre pseudo
                        </label>
                        <Input
                          placeholder="Entrez votre pseudo"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          fullWidth
                          className="bg-white border-gray-300 text-sm"
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          Vous serez l'hôte de cette partie
                        </div>
                      </div>

                      <WikiNumberSelector
                        value={rounds}
                        onChange={setRounds}
                        min={1}
                        max={9}
                        label="Nombre de manches"
                        description="Sélectionnez le nombre de manches à jouer"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Code généré */}
              {code && (
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-blue-400 text-sm font-bold">
                        🎮
                      </span>
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="text-sm font-medium text-blue-900 mb-2">
                        Partie créée avec succès !
                      </div>
                      <div className="text-center bg-white rounded p-3 border border-blue-200">
                        <div className="text-xs text-gray-600 mb-1">
                          Code de la partie
                        </div>
                        <div className="text-2xl font-mono font-bold text-blue-600 tracking-wider">
                          {code}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          Partagez ce code avec vos amis
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bouton d'action */}
              <div className="space-y-3">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={handleCreate}
                  disabled={!name.trim()}
                >
                  {code ? "Partie créée" : "Créer la partie"}
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
              Comment jouer
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div>
                <strong>Objectif :</strong> Naviguer de l'article de départ vers
                l'article cible en cliquant sur les liens.
              </div>
              <div>
                <strong>Règles :</strong> Seuls les liens internes de Wikipedia
                sont autorisés.
              </div>
              <div>
                <strong>Victoire :</strong> Le premier joueur à atteindre
                l'article cible remporte la manche.
              </div>
            </div>
          </div>

          <WikiNavigation
            links={[
              { text: "Rejoindre une partie", href: "/join" },
              { text: "Règles détaillées", href: "/rules" },
            ]}
          />

          <WikiFooter />
        </div>
      </div>
    </div>
  );
}
