import React, { useState } from "react";
import { socket } from "../socket";
import Button from "../components/Button";
import Input from "../components/Input";

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
        // Navigue automatiquement si l'état est renvoyé
        if (res.state) {
          // L'écoute globale dans App.tsx réagira aussi via Pusher,
          // mais on force la navigation immédiate en émettant localement
          // l'événement déjà reçu si besoin.
          // @ts-ignore - le wrapper déclenche bien les callbacks inscrits
          import("../socket").then(({ socket }) => {
            // aucun-op: la navigation se fait grâce à room:state reçu via Pusher
          });
        }
      }
    );
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="rounded-2xl bg-surface-50 px-8 py-10 shadow-medium">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-serif font-bold text-black">
              Créer une partie
            </h2>
          </div>

          <div className="space-y-6">
            <Input
              label="Ton pseudo"
              placeholder="Choisis ton pseudo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />

            <div>
              <label className="block text-base font-medium text-black mb-2">
                Nombre de manches
              </label>
              <div className="grid grid-cols-9 gap-2">
                {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
                  <Button
                    key={num}
                    onClick={() => setRounds(num)}
                    variant={rounds === num ? "primary" : "secondary"}
                    className="h-12 w-12 !p-0"
                  >
                    {num}
                  </Button>
                ))}
              </div>
            </div>

            <Button variant="primary" fullWidth onClick={handleCreate}>
              Créer la partie
            </Button>

            {code && (
              <div className="mt-6 flex flex-col items-center bg-white rounded-xl p-4 border-2 border-surface-200">
                <div className="text-lg font-semibold text-black mb-1">
                  Code de la room
                </div>
                <div className="text-2xl font-mono font-bold text-primary-600 mb-2">
                  {code}
                </div>
                <span className="text-sm text-black">
                  Partage ce code aux autres joueurs
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
