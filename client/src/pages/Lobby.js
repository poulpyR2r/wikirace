import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { socket } from "../socket";
import Button from "../components/Button";
import Card from "../components/Card";
export default function Lobby({ me, room, }) {
    const readyLabel = room.players.find((p) => p.id === me.id)?.ready
        ? "Prêt !"
        : "Se déclarer prêt";
    return (_jsx("div", { className: "min-h-[80vh] flex items-center justify-center px-4", children: _jsx("div", { className: "w-full max-w-lg", children: _jsxs(Card, { className: "!p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("div", { className: "flex items-center gap-3", children: _jsxs("div", { className: "text-2xl font-medium text-wiki-text", children: ["Partie ", room.code] }) }), _jsxs("div", { className: "inline-flex items-center rounded bg-wiki-gray-50 border border-wiki-gray-300 px-3 py-1.5 text-base text-wiki-text", children: ["Manche ", room.currentRound, "/", room.rounds] })] }), _jsx("div", { className: "space-y-2 mb-6", children: room.players.map((p) => (_jsxs(Card, { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "text-base text-wiki-text", children: p.name }), _jsx("div", { children: p.ready ? "✅" : "⌛" })] }), _jsxs("div", { className: "text-base text-wiki-gray-500", children: [p.score, " pts"] })] }, p.id))) }), room.status === "lobby" && (_jsxs("div", { className: "space-y-3", children: [_jsx(Button, { variant: "primary", fullWidth: true, onClick: () => socket.emit("room:ready"), children: readyLabel }), _jsx("div", { className: "text-center text-sm text-wiki-gray-500", children: "Le jeu commence quand tout le monde est pr\u00EAt" })] })), room.status === "round_over" && (_jsx("div", { className: "text-center text-base text-wiki-gray-500", children: "Prochaine manche\u2026" }))] }) }) }));
}
