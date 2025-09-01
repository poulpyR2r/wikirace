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
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/20 p-4">
      <div className="w-full max-w-sm rounded border border-neutral-300 bg-white px-6 py-6 text-center">
        <div className="text-5xl font-semibold text-neutral-900 leading-none">
          {n}
        </div>
        <div className="mt-2 text-xs text-neutral-700">Départ dans</div>
      </div>
    </div>
  );
}
