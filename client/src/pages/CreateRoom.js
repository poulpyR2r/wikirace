import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { socket } from "../socket";
import Button from "../components/Button";
import Input from "../components/Input";
export default function CreateRoom({ me, onNamed }) {
    const [name, setName] = useState(me.name);
    const [rounds, setRounds] = useState(3);
    const [code, setCode] = useState("");
    const handleCreate = () => {
        const trimmed = name.trim();
        if (!trimmed)
            return;
        onNamed(trimmed);
        socket.emit("room:create", { name: trimmed, rounds }, (res) => {
            setCode(res.code);
        });
    };
    return (_jsx("div", { className: "min-h-[80vh] flex items-center justify-center px-4", children: _jsx("div", { className: "w-full max-w-lg", children: _jsxs("div", { className: "rounded-2xl bg-surface-50 px-8 py-10 shadow-medium", children: [_jsx("div", { className: "text-center mb-8", children: _jsx("h2", { className: "text-4xl font-serif font-bold text-black", children: "Cr\u00E9er une partie" }) }), _jsxs("div", { className: "space-y-6", children: [_jsx(Input, { label: "Ton pseudo", placeholder: "Choisis ton pseudo", value: name, onChange: (e) => setName(e.target.value), fullWidth: true }), _jsxs("div", { children: [_jsx("label", { className: "block text-base font-medium text-black mb-2", children: "Nombre de manches" }), _jsx("div", { className: "grid grid-cols-9 gap-2", children: Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (_jsx(Button, { onClick: () => setRounds(num), variant: rounds === num ? "primary" : "secondary", className: "h-12 w-12 !p-0", children: num }, num))) })] }), _jsx(Button, { variant: "primary", fullWidth: true, onClick: handleCreate, children: "Cr\u00E9er la partie" }), code && (_jsxs("div", { className: "mt-6 flex flex-col items-center bg-white rounded-xl p-4 border-2 border-surface-200", children: [_jsx("div", { className: "text-lg font-semibold text-black mb-1", children: "Code de la room" }), _jsx("div", { className: "text-2xl font-mono font-bold text-primary-600 mb-2", children: code }), _jsx("span", { className: "text-sm text-black", children: "Partage ce code aux autres joueurs" })] }))] })] }) }) }));
}
