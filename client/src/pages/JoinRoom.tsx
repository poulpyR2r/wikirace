import React, { useState } from "react";
import { socket } from "../socket";

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
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="rounded-2xl bg-surface-50 px-8 py-10 shadow-medium">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-serif font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Rejoindre une room
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-base font-medium text-surface-800 mb-2">
                Ton pseudo
              </label>
              <input
                className="w-full rounded-xl border-2 border-surface-200 bg-white px-4 py-2.5 text-base outline-none transition-all placeholder:text-surface-400
                focus:border-primary-300 focus:ring-4 focus:ring-primary-100"
                placeholder="Choisis ton pseudo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-base font-medium text-surface-800 mb-2">
                Code de la room
              </label>
              <input
                className="w-full uppercase tracking-wider rounded-xl border-2 border-surface-200 bg-white px-4 py-2.5 text-base outline-none transition-all placeholder:text-surface-400
                focus:border-primary-300 focus:ring-4 focus:ring-primary-100"
                placeholder="Entre le code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            <button
              className="w-full inline-flex items-center justify-center rounded-xl bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 text-base font-semibold shadow-soft transition-all hover:shadow-medium"
              onClick={join}
            >
              Rejoindre la room
            </button>

            {err && (
              <div className="p-3 rounded-lg bg-red-50 border-2 border-red-100">
                <div className="text-sm font-medium text-red-800">{err}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
