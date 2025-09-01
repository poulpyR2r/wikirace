import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Button from "../components/Button";
export default function Home({ onCreate, onJoin, }) {
    return (_jsx("div", { className: "min-h-[80vh] flex items-center justify-center px-4", children: _jsx("div", { className: "w-full max-w-lg", children: _jsxs("div", { className: "rounded-2xl bg-surface-50 px-8 py-10 shadow-medium", children: [_jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-5xl font-serif font-bold text-black mb-4", children: "WikiRace" }), _jsx("p", { className: "text-xl text-black mb-8", children: "Cr\u00E9e une partie ou rejoins avec un code" })] }), _jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [_jsx(Button, { variant: "primary", fullWidth: true, onClick: onCreate, children: "Cr\u00E9er une partie" }), _jsx(Button, { variant: "secondary", fullWidth: true, onClick: onJoin, children: "Rejoindre" })] })] }) }) }));
}
