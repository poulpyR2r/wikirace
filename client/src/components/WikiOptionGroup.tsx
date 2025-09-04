import React from "react";

interface WikiOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface WikiOptionGroupProps {
  options: WikiOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  label?: string;
  description?: string;
  direction?: "horizontal" | "vertical";
}

export default function WikiOptionGroup({
  options,
  value,
  onChange,
  label,
  description,
  direction = "horizontal",
}: WikiOptionGroupProps) {
  const containerClass =
    direction === "horizontal"
      ? "inline-flex border border-gray-300 bg-white"
      : "space-y-1";

  const buttonClass =
    direction === "horizontal"
      ? "px-3 py-2 text-sm font-medium border-r border-gray-300 last:border-r-0 transition-colors"
      : "block w-full px-3 py-2 text-sm font-medium border border-gray-300 transition-colors";

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div className={containerClass}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => !option.disabled && onChange(option.value)}
            disabled={option.disabled}
            className={`${buttonClass} ${
              value === option.value
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {description && (
        <div className="text-xs text-gray-500 mt-1">{description}</div>
      )}
    </div>
  );
}
