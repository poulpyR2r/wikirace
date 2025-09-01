import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
export default function Countdown({ secs = 3, onEnd, }) {
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
    return (_jsx("div", { className: "fixed inset-0 z-20 flex items-center justify-center bg-black/20 p-4", children: _jsxs("div", { className: "w-full max-w-sm rounded border border-neutral-300 bg-white px-6 py-6 text-center", children: [_jsx("div", { className: "text-5xl font-semibold text-neutral-900 leading-none", children: n }), _jsx("div", { className: "mt-2 text-xs text-neutral-700", children: "D\u00E9part dans" })] }) }));
}
