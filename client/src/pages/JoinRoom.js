import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { socket } from "../socket";
export default function JoinRoom({ me, onNamed, }) {
    const [name, setName] = useState(me.name);
    const [code, setCode] = useState("");
    const [err, setErr] = useState("");
    function join() {
        if (!name.trim() || !code.trim())
            return;
        onNamed(name.trim());
        socket.emit("room:join", { code: code.trim().toUpperCase(), name: name.trim() }, (res) => {
            if (!res.ok)
                setErr(res.error || "Join failed");
        });
    }
    return (_jsx("div", { className: "min-h-[80vh] flex items-center justify-center px-4", children: _jsx("div", { className: "w-full max-w-lg", children: _jsxs("div", { className: "rounded-2xl bg-surface-50 px-8 py-10 shadow-medium", children: [_jsx("div", { className: "text-center mb-8", children: _jsx("h2", { className: "text-4xl font-serif font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent", children: "Rejoindre une room" }) }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-base font-medium text-surface-800 mb-2", children: "Ton pseudo" }), _jsx("input", { className: "w-full rounded-xl border-2 border-surface-200 bg-white px-4 py-2.5 text-base outline-none transition-all placeholder:text-surface-400\n                focus:border-primary-300 focus:ring-4 focus:ring-primary-100", placeholder: "Choisis ton pseudo", value: name, onChange: (e) => setName(e.target.value) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-base font-medium text-surface-800 mb-2", children: "Code de la room" }), _jsx("input", { className: "w-full uppercase tracking-wider rounded-xl border-2 border-surface-200 bg-white px-4 py-2.5 text-base outline-none transition-all placeholder:text-surface-400\n                focus:border-primary-300 focus:ring-4 focus:ring-primary-100", placeholder: "Entre le code", value: code, onChange: (e) => setCode(e.target.value) })] }), _jsx("button", { className: "w-full inline-flex items-center justify-center rounded-xl bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 text-base font-semibold shadow-soft transition-all hover:shadow-medium", onClick: join, children: "Rejoindre la room" }), err && (_jsx("div", { className: "p-3 rounded-lg bg-red-50 border-2 border-red-100", children: _jsx("div", { className: "text-sm font-medium text-red-800", children: err }) }))] })] }) }) }));
}
