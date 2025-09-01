import React from "react";
import type { PublicRoomState } from "../types";
import Card from "../components/Card";
import Button from "../components/Button";

export default function Summary({
  room,
  onBackHome,
}: {
  room: PublicRoomState;
  onBackHome: () => void;
}) {
  const ordered = room.players.slice().sort((a, b) => b.score - a.score);
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <Card className="!p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="text-2xl font-medium text-wiki-text">
              Fin du jeu
            </div>
            <div className="text-base text-wiki-gray-500">
              Partie {room.code}
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <div className="text-xl font-medium text-wiki-text">
              Classement final
            </div>
            {ordered.map((p, i) => (
              <Card key={p.id} className="!p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="text-xl font-medium text-wiki-gray-500">
                      #{i + 1}
                    </div>
                    <div className="text-lg text-wiki-text">{p.name}</div>
                  </div>
                  <div className="text-lg text-wiki-blue">{p.score} pts</div>
                </div>

                {/* Per-round paths */}
                {room.history && (
                  <div className="space-y-2">
                    {Object.keys(room.history)
                      .map((r) => parseInt(r, 10))
                      .sort((a, b) => a - b)
                      .map((round) => (
                        <div
                          key={round}
                          className="bg-wiki-gray-50 rounded p-3"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className="text-base text-wiki-gray-500">
                              Manche {round}
                            </div>
                          </div>
                          <div className="text-base text-wiki-text">
                            {(room.history![round]?.[p.id] || []).map(
                              (t, idx) => (
                                <span key={idx}>
                                  {idx > 0 && (
                                    <span className="text-wiki-gray-500 mx-2">
                                      →
                                    </span>
                                  )}
                                  {decodeURIComponent(t.replace(/_/g, " "))}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </Card>
            ))}
          </div>

          <Button variant="primary" fullWidth onClick={onBackHome}>
            Retour à l'accueil
          </Button>
        </Card>
      </div>
    </div>
  );
}
