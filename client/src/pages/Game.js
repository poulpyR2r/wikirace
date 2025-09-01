import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { socket } from "../socket";
import WikiView from "../components/WikiView";
import Countdown from "../components/Countdown";
import Card from "../components/Card";
import Button from "../components/Button";
export default function Game({ me, room, }) {
    // Remove auto-ready; we'll rely on host "next" or lobby auto-start.
    const autoReadyTimeoutRef = useRef(null);
    const [target, setTarget] = useState(room.targetTitle || null);
    const [startTitle, setStartTitle] = useState(room.startTitle || null);
    const [locked, setLocked] = useState(false);
    const [winnerText, setWinnerText] = useState("");
    const [showCountdown, setShowCountdown] = useState(false);
    const [winnerPath, setWinnerPath] = useState([]);
    const [scores, setScores] = useState([]);
    // Enforce a minimum visibility duration for the end-of-round overlay
    const overlayMinUntilRef = useRef(0);
    const overlayClearTimeoutRef = useRef(null);
    const [debug, setDebug] = useState("");
    useEffect(() => {
        const onSetup = ({ targetTitle }) => {
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
            }
            else {
                setWinnerText("");
            }
            setLocked(true);
            setShowCountdown(true);
        };
        const onStart = ({ startTitle }) => {
            console.log("round:start", startTitle);
            setStartTitle(startTitle);
            setLocked(false);
            setShowCountdown(false);
            setWinnerPath([]);
        };
        const onOver = ({ winnerName, targetTitle, winnerPath, updatedScores, }) => {
            console.log("round:over", { winnerName, targetTitle });
            setLocked(true);
            setWinnerText(`${winnerName} a trouvé ${decodeURIComponent(targetTitle.replace(/_/g, " "))} !`);
            // Pin overlay visibility for at least 4s
            overlayMinUntilRef.current = Date.now() + 4000;
            setWinnerPath(winnerPath);
            setScores(updatedScores);
            try {
                const payload = { code: room.code, scores: updatedScores };
                localStorage.setItem("wikirace:lastScores", JSON.stringify(payload));
            }
            catch { }
            // No auto-ready here; overlay remains until host advances or lobby flow resumes
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
        // Clear any pending auto-ready if status changed
        if (autoReadyTimeoutRef.current) {
            clearTimeout(autoReadyTimeoutRef.current);
            autoReadyTimeoutRef.current = null;
        }
        console.log("room.status", room.status);
        if (room.status === "countdown") {
            setLocked(true);
            setShowCountdown(true);
            if (room.targetTitle)
                setTarget(room.targetTitle);
            if (room.startTitle)
                setStartTitle(room.startTitle);
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
            if (room.targetTitle)
                setTarget(room.targetTitle);
            const winner = room.players.find((p) => p.id === room.winnerId);
            if (winner && room.targetTitle) {
                setWinnerText(`${winner.name} a trouvé ${decodeURIComponent(room.targetTitle.replace(/_/g, " "))} !`);
            }
            else if (!winnerText) {
                setWinnerText("Manche terminée");
            }
            // Pin overlay visibility for at least 4s
            overlayMinUntilRef.current = Date.now() + 4000;
            setScores(room.players.map((p) => ({ id: p.id, name: p.name, score: p.score })));
            setWinnerPath([]);
            // Do not auto-ready; wait for host or lobby flow
        }
        // Game finished → show final scoreboard overlay
        if (room.status === "finished") {
            setLocked(true);
            setShowCountdown(false);
            setWinnerText("Fin du jeu");
            setScores(room.players.map((p) => ({ id: p.id, name: p.name, score: p.score })));
            setWinnerPath([]);
        }
    }, [room.status]);
    const showOverlay = winnerText || room.status === "round_over" || room.status === "finished";
    return (_jsxs("div", { children: [!showCountdown && (_jsx(_Fragment, { children: _jsx(Card, { className: "mb-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "text-sm font-medium text-wiki-gray-500 mb-1", children: "Vous devez trouver" }), _jsx("div", { className: "text-2xl font-medium text-wiki-text", children: target ? decodeURIComponent(target.replace(/_/g, " ")) : "…" })] }), _jsxs("div", { className: "inline-flex items-center rounded bg-wiki-gray-50 border border-wiki-gray-300 px-3 py-1.5 text-base text-wiki-text", children: ["Partie ", room.code] })] }) }) })), startTitle && !showCountdown && (_jsx(WikiView, { startTitle: startTitle, locked: locked })), showCountdown && (_jsx(Countdown, { secs: 3, onEnd: () => {
                    /* purely visual; server drives actual start */
                } })), showOverlay && (_jsx("div", { className: "fixed inset-0 z-20 flex items-center justify-center bg-surface-900/40 backdrop-blur-sm p-4", children: _jsxs(Card, { className: "w-full max-w-lg !p-6", children: [_jsx("div", { className: "text-2xl font-medium text-wiki-text mb-6", children: winnerText ||
                                (room.status === "finished" ? "Fin du jeu" : "Manche terminée") }), scores.length > 0 && (_jsxs("div", { className: "mb-6", children: [_jsx("div", { className: "text-lg font-medium text-wiki-text mb-4", children: room.status === "finished"
                                        ? "Classement final"
                                        : "Scoreboard" }), _jsx("div", { className: "space-y-2", children: scores
                                        .slice()
                                        .sort((a, b) => b.score - a.score)
                                        .map((s) => (_jsxs(Card, { className: "flex items-center justify-between", children: [_jsx("div", { className: "text-base text-wiki-text", children: s.name }), _jsxs("div", { className: "inline-flex items-center rounded bg-wiki-gray-50 border border-wiki-gray-300 px-3 py-1.5 text-base text-wiki-text", children: [s.score, " pts"] })] }, s.id))) })] })), winnerPath.length > 0 && (_jsxs("div", { className: "mb-6", children: [_jsx("div", { className: "text-lg font-medium text-wiki-text mb-2", children: "Parcours du gagnant" }), _jsx(Card, { children: _jsx("div", { className: "text-base text-wiki-text", children: winnerPath.map((t, i) => (_jsxs("span", { children: [i > 0 && (_jsx("span", { className: "text-wiki-gray-500 mx-2", children: "\u2192" })), decodeURIComponent(t.replace(/_/g, " "))] }, i))) }) })] })), _jsxs("div", { className: "space-y-3", children: [room.status !== "finished" && (_jsxs(_Fragment, { children: [_jsx(Button, { variant: "primary", fullWidth: true, onClick: () => socket.emit("room:next"), children: "Prochaine manche (host)" }), _jsx(Button, { variant: "secondary", fullWidth: true, onClick: () => socket.emit("room:ready"), children: "Pr\u00EAt pour la suite" })] })), _jsx(Button, { variant: "outline", fullWidth: true, onClick: () => {
                                        try {
                                            const payload = {
                                                code: room.code,
                                                scores: room.players.map((p) => ({
                                                    id: p.id,
                                                    name: p.name,
                                                    score: p.score,
                                                })),
                                            };
                                            localStorage.setItem("wikirace:lastScores", JSON.stringify(payload));
                                        }
                                        catch { }
                                    }, children: "Sauver les stats (local)" })] })] }) }))] }));
}
