import React from "react";
import type { PublicRoomState } from "../types";
import Button from "../components/Button";
import WikiFooter from "../components/WikiFooter";
import WikiNavigation from "../components/WikiNavigation";
import WikiHeader from "../components/WikiHeader";

export default function Summary({
  room,
  onBackHome,
}: {
  room: PublicRoomState;
  onBackHome: () => void;
}) {
  const ordered = room.players.slice().sort((a, b) => b.score - a.score);
  const winner = ordered[0];

  return (
    <div className="min-h-screen bg-white">
      <WikiHeader
        breadcrumbs={[
          { text: "WikiRace" },
          { text: "Accueil", href: "/" },
          { text: `Résultats de la partie ${room.code}` },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Article principal */}
          <div className="bg-white border border-gray-300 rounded-sm shadow-sm mb-8">
            {/* En-tête d'article */}
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h1 className="text-2xl font-serif text-black font-normal">
                Résultats finaux - Partie {room.code}
              </h1>
              <div className="text-sm text-gray-600 mt-1">
                {room.rounds} manches terminées • WikiRace
              </div>
            </div>

            {/* Contenu de l'article */}
            <div className="p-6">
              {/* Introduction */}
              <div className="mb-6">
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  Cette partie de <strong>WikiRace</strong> s'est terminée après{" "}
                  {room.rounds} manche{room.rounds > 1 ? "s" : ""}.
                  Félicitations à <strong>{winner?.name}</strong> pour sa
                  victoire !
                </p>
              </div>

              {/* Podium du gagnant */}
              {winner && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-sm p-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1">
                      <div className="text-lg font-medium text-yellow-900 mb-1">
                        Vainqueur : {winner.name}
                      </div>
                      <div className="text-sm text-yellow-800">
                        Score final : <strong>{winner.score} points</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Classement détaillé */}
              <div className="bg-blue-50 border border-blue-200 rounded-sm p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">#</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-blue-900 mb-3">
                      Classement final
                    </div>

                    <div className="space-y-3">
                      {ordered.map((p, i) => (
                        <div
                          key={p.id}
                          className="bg-white border border-blue-200 rounded p-4"
                        >
                          {/* Position et score */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                  i === 0
                                    ? "bg-yellow-500 text-white"
                                    : i === 1
                                    ? "bg-gray-400 text-white"
                                    : i === 2
                                    ? "bg-orange-400 text-white"
                                    : "bg-gray-200 text-gray-700"
                                }`}
                              >
                                {i + 1}
                              </div>
                              <div className="text-base font-medium text-gray-900">
                                {p.name}
                              </div>
                            </div>
                            <div className="text-lg font-mono font-bold text-blue-600">
                              {p.score} pts
                            </div>
                          </div>

                          {/* Historique des manches */}
                          {room.history && (
                            <div className="space-y-2">
                              <div className="text-xs font-medium text-gray-600 mb-2">
                                Parcours détaillé :
                              </div>
                              {Object.keys(room.history)
                                .map((r) => parseInt(r, 10))
                                .sort((a, b) => a - b)
                                .map((round) => {
                                  const path =
                                    room.history![round]?.[p.id] || [];
                                  return (
                                    <div
                                      key={round}
                                      className="bg-gray-50 rounded p-2"
                                    >
                                      <div className="text-xs font-medium text-gray-600 mb-1">
                                        Manche {round} ({path.length} étapes)
                                      </div>
                                      <div className="text-xs text-gray-700 break-words">
                                        {path.length > 0 ? (
                                          path.map((t, idx) => (
                                            <span key={idx}>
                                              {idx > 0 && (
                                                <span className="text-gray-400 mx-1">
                                                  →
                                                </span>
                                              )}
                                              {decodeURIComponent(
                                                t.replace(/_/g, " ")
                                              )}
                                            </span>
                                          ))
                                        ) : (
                                          <span className="text-gray-400 italic">
                                            Aucun mouvement enregistré
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
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
                    Créer une nouvelle partie
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Statistiques additionnelles */}
          <div className="bg-gray-50 border border-gray-200 rounded-sm p-4 mb-6">
            <h3 className="text-base font-serif text-black mb-3 font-normal">
              Statistiques de la partie
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700">
              <div>
                <div className="font-medium">Joueurs</div>
                <div>{room.players.length}</div>
              </div>
              <div>
                <div className="font-medium">Manches</div>
                <div>{room.rounds}</div>
              </div>
              <div>
                <div className="font-medium">Score max</div>
                <div>{Math.max(...room.players.map((p) => p.score))} pts</div>
              </div>
              <div>
                <div className="font-medium">Score total</div>
                <div>
                  {room.players.reduce((sum, p) => sum + p.score, 0)} pts
                </div>
              </div>
            </div>
          </div>

          <WikiNavigation
            links={[
              { text: "Rejouer une partie", href: "/create" },
              { text: "Règles et stratégies", href: "/how-to-play" },
            ]}
          />

          <WikiFooter />
        </div>
      </div>
    </div>
  );
}
