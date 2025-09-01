import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function Input({ label, fullWidth = false, className = "", ...props }) {
    const baseStyles = "rounded border border-wiki-gray-300 bg-white px-3 py-2 text-base text-wiki-text outline-none transition-all";
    const widthStyles = fullWidth ? "w-full" : "w-auto";
    const focusStyles = "focus:border-wiki-blue focus:shadow";
    const placeholderStyles = "placeholder:text-wiki-gray-500";
    const combinedClassName = `${baseStyles} ${widthStyles} ${focusStyles} ${placeholderStyles} ${className}`;
    return (_jsxs("div", { className: fullWidth ? "w-full" : "w-auto", children: [label && (_jsx("label", { className: "block text-base font-medium text-wiki-text mb-2", children: label })), _jsx("input", { className: combinedClassName, ...props })] }));
}
