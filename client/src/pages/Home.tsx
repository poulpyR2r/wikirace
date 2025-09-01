import React from "react";
import Button from "../components/Button";

export default function Home({
  onCreate,
  onJoin,
}: {
  onCreate: () => void;
  onJoin: () => void;
}) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="rounded-2xl bg-surface-50 px-8 py-10 shadow-medium">
          <div className="text-center">
            <h1 className="text-5xl font-serif font-bold text-black mb-4">
              WikiRace
            </h1>
            <p className="text-xl text-black mb-8">
              Crée une partie ou rejoins avec un code
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" fullWidth onClick={onCreate}>
              Créer une partie
            </Button>
            <Button variant="secondary" fullWidth onClick={onJoin}>
              Rejoindre
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
