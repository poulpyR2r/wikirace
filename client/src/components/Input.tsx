import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  fullWidth?: boolean;
}

export default function Input({
  label,
  fullWidth = false,
  className = "",
  ...props
}: InputProps) {
  const baseStyles =
    "rounded border border-wiki-gray-300 bg-white px-3 py-2 text-base text-wiki-text outline-none transition-all";
  const widthStyles = fullWidth ? "w-full" : "w-auto";
  const focusStyles = "focus:border-wiki-blue focus:shadow";
  const placeholderStyles = "placeholder:text-wiki-gray-500";

  const combinedClassName = `${baseStyles} ${widthStyles} ${focusStyles} ${placeholderStyles} ${className}`;

  return (
    <div className={fullWidth ? "w-full" : "w-auto"}>
      {label && (
        <label className="block text-base font-medium text-wiki-text mb-2">
          {label}
        </label>
      )}
      <input className={combinedClassName} {...props} />
    </div>
  );
}
