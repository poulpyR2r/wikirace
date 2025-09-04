import React, { useEffect, useState } from "react";

export default function Countdown({
  secs = 3,
  onEnd,
}: {
  secs?: number;
  onEnd: () => void;
}) {
  const [n, setN] = useState(secs);
  useEffect(() => {
    const t = setInterval(() => {
      setN((x) => {
        if (x <= 1) {
          clearInterval(t);
          onEnd();
          return 0;
        }
        return x - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
      <div className="max-w-2xl mx-auto">
        {/* Modal style Wikipedia */}
        <div className="bg-white border border-gray-300 rounded-sm shadow-lg">
          {/* En-tête */}
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <h2 className="text-xl font-serif text-black font-normal">
              Démarrage de la manche
            </h2>
            <div className="text-sm text-gray-600 mt-1">
              Préparation • WikiRace
            </div>
          </div>

          {/* Contenu du countdown */}
          <div className="p-8 text-center">
            <div className="bg-blue-50 border border-blue-200 rounded-sm p-6 mb-6">
              <div className="flex items-center justify-center space-x-4">
                <div>
                  <div className="text-sm font-medium text-blue-900 mb-1">
                    La manche commence dans
                  </div>
                  <div className="text-6xl font-mono font-bold text-blue-600 leading-none">
                    {n}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm text-gray-700">
              <div>
                <strong>Préparez-vous :</strong> La page de départ va s'afficher
                dans quelques secondes.
              </div>
              <div>
                <strong>Objectif :</strong> Naviguer vers l'article cible en
                cliquant sur les liens Wikipedia.
              </div>
              <div>
                <strong>Astuce :</strong> Les articles généraux ont souvent plus
                de liens sortants.
              </div>
            </div>
          </div>

          {/* Footer informatif */}
          <div className="border-t border-gray-200 bg-gray-50 px-6 py-3">
            <div className="text-xs text-gray-600 text-center">
              Bonne chance ! Le chronomètre démarre dès l'affichage de la page.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
