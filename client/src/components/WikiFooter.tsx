import React from "react";

export default function WikiFooter() {
  return (
    <div className="text-xs text-gray-500 text-center space-y-2 pt-6 border-t border-gray-200 mt-8">
      <p>
        Cette page a été modifiée pour la dernière fois le{" "}
        {new Date().toLocaleDateString("fr-FR")} à{" "}
        {new Date().toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        })}
        .
      </p>
      <div className="flex justify-center space-x-4">
        <a href="/privacy" className="hover:underline">
          Politique de confidentialité
        </a>
        <a href="/about" className="hover:underline">
          À propos de WikiRace
        </a>
      </div>
    </div>
  );
}
