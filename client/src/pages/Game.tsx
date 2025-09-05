import React, { useEffect, useRef, useState } from "react";
import type { PublicRoomState } from "../types";
import { socket } from "../socket";
import WikiView from "../components/WikiView";
import Countdown from "../components/Countdown";
import Card from "../components/Card";
import Button from "../components/Button";

export default function Game({
  me,
  room,
}: {
  me: { id: string; name: string };
  room: PublicRoomState;
}) {
  // Remove auto-ready; we'll rely on host "next" or lobby auto-start.
  const autoReadyTimeoutRef = useRef<number | null>(null);
  const autoNextTimeoutRef = useRef<number | null>(null);
  const [target, setTarget] = useState<string | null>(room.targetTitle || null);
  const [startTitle, setStartTitle] = useState<string | null>(
    room.startTitle || null
  );
  const [locked, setLocked] = useState(false);
  const [winnerText, setWinnerText] = useState("");
  const [showCountdown, setShowCountdown] = useState(false);
  const [winnerPath, setWinnerPath] = useState<string[]>([]);
  const [scores, setScores] = useState<
    Array<{ id: string; name: string; score: number }>
  >([]);
  // Enforce a minimum visibility duration for the end-of-round overlay
  const overlayMinUntilRef = useRef<number>(0);
  const overlayClearTimeoutRef = useRef<number | null>(null);
  const [debug, setDebug] = useState<string>("");

  useEffect(() => {
    const onSetup = ({ targetTitle }: { targetTitle: string }) => {
      console.log("round:setup", targetTitle);
      setTarget(targetTitle);
      // Keep the overlay visible for a minimum time if needed
      const now = Date.now();
      const delay = Math.max(0, overlayMinUntilRef.current - now);
      if (overlayClearTimeoutRef.current) {
        clearTimeout(overlayClearTimeoutRef.current);
        overlayClearTimeoutRef.current = null;
      }
      if (delay > 0) {
        overlayClearTimeoutRef.current = window.setTimeout(() => {
          setWinnerText("");
        }, delay);
      } else {
        setWinnerText("");
      }
      setLocked(true);
      setShowCountdown(true);
    };
    const onStart = ({ startTitle }: { startTitle: string }) => {
      console.log("round:start", startTitle);
      setStartTitle(startTitle);
      setLocked(false);
      setShowCountdown(false);
      setWinnerPath([]);
    };
    const onOver = ({
      winnerName,
      targetTitle,
      winnerPath,
      updatedScores,
    }: {
      winnerName: string;
      targetTitle: string;
      winnerPath: string[];
      updatedScores: Array<{ id: string; name: string; score: number }>;
    }) => {
      console.log("round:over", { winnerName, targetTitle });
      setLocked(true);
      setWinnerText(
        `${winnerName} a trouvé ${decodeURIComponent(
          targetTitle.replace(/_/g, " ")
        )} !`
      );
      // Pin overlay visibility for at least 4s
      overlayMinUntilRef.current = Date.now() + 4000;
      setWinnerPath(winnerPath);
      setScores(updatedScores);
      try {
        const payload = { code: room.code, scores: updatedScores };
        localStorage.setItem("wikirace:lastScores", JSON.stringify(payload));
      } catch {}

      // Auto-advance to next round after 1.5 seconds (only for host to avoid duplicate calls)
      if (me.id === room.hostId) {
        if (autoNextTimeoutRef.current) {
          clearTimeout(autoNextTimeoutRef.current);
        }
        autoNextTimeoutRef.current = window.setTimeout(() => {
          socket.emit("room:next-auto");
        }, 1500);
      }
    };
    socket.on("round:setup", onSetup);
    socket.on("round:start", onStart);
    socket.on("round:over", onOver);
    return () => {
      socket.off("round:setup", onSetup);
      socket.off("round:start", onStart);
      socket.off("round:over", onOver);
    };
  }, []);

  // Fallback to show countdown based on room status in case events were missed
  useEffect(() => {
    // Clear any pending auto-ready and auto-next if status changed
    if (autoReadyTimeoutRef.current) {
      clearTimeout(autoReadyTimeoutRef.current);
      autoReadyTimeoutRef.current = null;
    }
    if (autoNextTimeoutRef.current) {
      clearTimeout(autoNextTimeoutRef.current);
      autoNextTimeoutRef.current = null;
    }
    console.log("room.status", room.status);
    if (room.status === "countdown") {
      setLocked(true);
      setShowCountdown(true);
      if (room.targetTitle) setTarget(room.targetTitle);
      if (room.startTitle) setStartTitle(room.startTitle);
    }
    if (room.status === "playing") {
      setLocked(false);
      setShowCountdown(false);
    }
    // If server only updates room.status without emitting 'round:over', handle here
    if (room.status === "round_over") {
      // Derive overlay data from room state
      setLocked(true);
      setShowCountdown(false);
      if (room.targetTitle) setTarget(room.targetTitle);
      const winner = room.players.find((p) => p.id === room.winnerId);
      if (winner && room.targetTitle) {
        setWinnerText(
          `${winner.name} a trouvé ${decodeURIComponent(
            room.targetTitle.replace(/_/g, " ")
          )} !`
        );
      } else if (!winnerText) {
        setWinnerText("Manche terminée");
      }
      // Pin overlay visibility for at least 4s
      overlayMinUntilRef.current = Date.now() + 4000;
      setScores(
        room.players.map((p) => ({ id: p.id, name: p.name, score: p.score }))
      );
      setWinnerPath([]);

      // Auto-advance to next round after 1.5 seconds (fallback if round:over event wasn't received)
      if (me.id === room.hostId && !autoNextTimeoutRef.current) {
        autoNextTimeoutRef.current = window.setTimeout(() => {
          socket.emit("room:next-auto");
        }, 1500);
      }
    }
    // Game finished → show final scoreboard overlay
    if (room.status === "finished") {
      setLocked(true);
      setShowCountdown(false);
      setWinnerText("Fin du jeu");
      setScores(
        room.players.map((p) => ({ id: p.id, name: p.name, score: p.score }))
      );
      setWinnerPath([]);
    }
  }, [room.status]);

  const showOverlay =
    winnerText || room.status === "round_over" || room.status === "finished";
  return (
    <div>
      {!showCountdown && (
        <>
          <Card className="mb-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-wiki-gray-500 mb-1">
                  Vous devez trouver
                </div>
                <div className="text-2xl font-medium text-wiki-text">
                  {target ? decodeURIComponent(target.replace(/_/g, " ")) : "…"}
                </div>
              </div>
              <div className="inline-flex items-center rounded bg-wiki-gray-50 border border-wiki-gray-300 px-3 py-1.5 text-base text-wiki-text">
                Partie {room.code}
              </div>
            </div>
          </Card>
        </>
      )}
      {startTitle && !showCountdown && (
        <WikiView startTitle={startTitle} locked={locked} />
      )}
      {showCountdown && (
        <Countdown
          secs={3}
          onEnd={() => {
            // Host triggers the start to avoid serverless timer drift
            if (me.id === room.hostId) {
              try {
                socket.emit("room:start");
              } catch {}
            }
          }}
        />
      )}
      {/* {showOverlay && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-surface-900/40 backdrop-blur-sm p-4">
          <Card className="w-full max-w-lg !p-6">
            <div className="text-2xl font-medium text-wiki-text mb-6">
              {winnerText ||
                (room.status === "finished" ? "Fin du jeu" : "Manche terminée")}
            </div>

            {scores.length > 0 && (
              <div className="mb-6">
                <div className="text-lg font-medium text-wiki-text mb-4">
                  {room.status === "finished"
                    ? "Classement final"
                    : "Scoreboard"}
                </div>
                <div className="space-y-2">
                  {scores
                    .slice()
                    .sort((a, b) => b.score - a.score)
                    .map((s) => (
                      <Card
                        key={s.id}
                        className="flex items-center justify-between"
                      >
                        <div className="text-base text-wiki-text">{s.name}</div>
                        <div className="inline-flex items-center rounded bg-wiki-gray-50 border border-wiki-gray-300 px-3 py-1.5 text-base text-wiki-text">
                          {s.score} pts
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
            )}

            {winnerPath.length > 0 && (
              <div className="mb-6">
                <div className="text-lg font-medium text-wiki-text mb-2">
                  Parcours du gagnant
                </div>
                <Card>
                  <div className="text-base text-wiki-text">
                    {winnerPath.map((t, i) => (
                      <span key={i}>
                        {i > 0 && (
                          <span className="text-wiki-gray-500 mx-2">→</span>
                        )}
                        {decodeURIComponent(t.replace(/_/g, " "))}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            <div className="space-y-3">
              {room.status !== "finished" && (
                <>
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => socket.emit("room:next")}
                  >
                    Prochaine manche (host)
                  </Button>
                  <Button
                    variant="secondary"
                    fullWidth
                    onClick={() => socket.emit("room:ready")}
                  >
                    Prêt pour la suite
                  </Button>
                </>
              )}
              <Button
                variant="outline"
                fullWidth
                onClick={() => {
                  try {
                    const payload = {
                      code: room.code,
                      scores: room.players.map((p) => ({
                        id: p.id,
                        name: p.name,
                        score: p.score,
                      })),
                    };
                    localStorage.setItem(
                      "wikirace:lastScores",
                      JSON.stringify(payload)
                    );
                  } catch {}
                }}
              >
                Sauver les stats (local)
              </Button>
            </div>
          </Card>
        </div>
      )} */}
    </div>
  );
}
