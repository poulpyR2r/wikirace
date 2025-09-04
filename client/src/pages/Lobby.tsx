import React from "react";
import type { PublicRoomState } from "../types";
import { socket } from "../socket";
import Button from "../components/Button";
import WikiFooter from "../components/WikiFooter";
import WikiNavigation from "../components/WikiNavigation";
import WikiHeader from "../components/WikiHeader";

export default function Lobby({
  me,
  room,
}: {
  me: { id: string; name: string };
  room: PublicRoomState;
}) {
  const readyLabel = room.players.find((p) => p.id === me.id)?.ready
    ? "Prêt !"
    : "Se déclarer prêt";

  return (
    <div className="min-h-screen bg-white">
      <WikiHeader
        breadcrumbs={[
          { text: "WikiRace" },
          { text: "Accueil", href: "/" },
          { text: `Partie ${room.code}` },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Article principal */}
          <div className="bg-white border border-gray-300 rounded-sm shadow-sm mb-8">
            {/* En-tête d'article */}
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h1 className="text-2xl font-serif text-black font-normal">
                Salle d'attente - Partie {room.code}
              </h1>
              <div className="text-sm text-gray-600 mt-1">
                Manche {room.currentRound} sur {room.rounds} • WikiRace
              </div>
            </div>

            {/* Contenu de l'article */}
            <div className="p-6">
              {/* Introduction */}
              <div className="mb-6">
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  Bienvenue dans la salle d'attente de cette partie de{" "}
                  <strong>WikiRace</strong>. Attendez que tous les joueurs
                  soient prêts pour commencer la{" "}
                  {room.currentRound === 0 ? "première" : "prochaine"} manche.
                </p>
              </div>

              {/* Liste des joueurs */}
              <div className="bg-blue-50 border border-blue-200 rounded-sm p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-blue-900 mb-3">
                      Joueurs connectés ({room.players.length})
                    </div>

                    <div className="space-y-2">
                      {room.players.map((p) => (
                        <div
                          key={p.id}
                          className="bg-white rounded border border-blue-200 p-3 flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="text-sm font-medium text-gray-900">
                              {p.name}
                              {p.id === me.id && (
                                <span className="text-blue-600 ml-1">
                                  (vous)
                                </span>
                              )}
                            </div>
                            <div className="text-xs">
                              {p.ready ? (
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                                  ✓ Prêt
                                </span>
                              ) : (
                                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                  ⏳ En attente
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-sm text-gray-600 font-mono">
                            {p.score} pts
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions selon le statut */}
              {room.status === "lobby" && (
                <div className="space-y-4">
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => socket.emit("room:ready")}
                    className="bg-green-600 hover:bg-green-700 text-white border-green-600"
                  >
                    {readyLabel}
                  </Button>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <div className="text-sm text-yellow-800">
                      <strong>Information :</strong> La partie commencera
                      automatiquement dès que tous les joueurs seront prêts.
                    </div>
                  </div>
                </div>
              )}

              {room.status === "round_over" && (
                <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
                  <div className="text-sm text-orange-800">
                    <strong>Manche terminée :</strong> Préparation de la
                    prochaine manche en cours...
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section d'aide */}
          <div className="bg-gray-50 border border-gray-200 rounded-sm p-4 mb-6">
            <h3 className="text-base font-serif text-black mb-3 font-normal">
              Pendant que vous attendez
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div>
                <strong>Préparez-vous :</strong> Réfléchissez aux stratégies de
                navigation Wikipedia.
              </div>
              <div>
                <strong>Conseil :</strong> Les articles généraux ont souvent
                plus de liens sortants.
              </div>
              <div>
                <strong>Astuce :</strong> Utilisez la barre de recherche pour
                trouver des raccourcis.
              </div>
            </div>
          </div>

          <WikiNavigation
            links={[
              { text: "Règles du jeu", href: "/rules" },
              { text: "Stratégies de navigation", href: "/how-to-play" },
              { text: "Créer une nouvelle partie", href: "/create" },
            ]}
          />

          <WikiFooter />
        </div>
      </div>
    </div>
  );
}
