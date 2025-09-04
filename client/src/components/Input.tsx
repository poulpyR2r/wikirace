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
    "border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-gray-500";
  const widthStyles = fullWidth ? "w-full" : "w-auto";
  const combinedClassName = `${baseStyles} ${widthStyles} ${className}`;

  return (
    <div className={fullWidth ? "w-full" : "w-auto"}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input className={combinedClassName} {...props} />
    </div>
  );
}
