import { jsx as _jsx } from "react/jsx-runtime";
export default function Card({ className = "", children, ...props }) {
    const baseStyles = "rounded border border-wiki-gray-300 bg-white px-4 py-3 hover:border-wiki-blue/50 transition-all";
    const combinedClassName = `${baseStyles} ${className}`;
    return (_jsx("div", { className: combinedClassName, ...props, children: children }));
}
