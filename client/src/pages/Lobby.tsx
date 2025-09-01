import React from "react";
import type { PublicRoomState } from "../types";
import { socket } from "../socket";
import Button from "../components/Button";
import Card from "../components/Card";

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
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <Card className="!p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="text-2xl font-medium text-wiki-text">
                Partie {room.code}
              </div>
            </div>
            <div className="inline-flex items-center rounded bg-wiki-gray-50 border border-wiki-gray-300 px-3 py-1.5 text-base text-wiki-text">
              Manche {room.currentRound}/{room.rounds}
            </div>
          </div>

          <div className="space-y-2 mb-6">
            {room.players.map((p) => (
              <Card key={p.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-base text-wiki-text">{p.name}</div>
                  <div>{p.ready ? "✅" : "⌛"}</div>
                </div>
                <div className="text-base text-wiki-gray-500">
                  {p.score} pts
                </div>
              </Card>
            ))}
          </div>

          {room.status === "lobby" && (
            <div className="space-y-3">
              <Button
                variant="primary"
                fullWidth
                onClick={() => socket.emit("room:ready")}
              >
                {readyLabel}
              </Button>
              <div className="text-center text-sm text-wiki-gray-500">
                Le jeu commence quand tout le monde est prêt
              </div>
            </div>
          )}

          {room.status === "round_over" && (
            <div className="text-center text-base text-wiki-gray-500">
              Prochaine manche…
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
