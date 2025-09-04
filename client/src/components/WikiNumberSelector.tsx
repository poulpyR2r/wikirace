import React from "react";

interface WikiNumberSelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
  description?: string;
}

export default function WikiNumberSelector({
  value,
  onChange,
  min = 1,
  max = 9,
  label,
  description,
}: WikiNumberSelectorProps) {
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => i + min);

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div className="inline-flex border border-gray-300 bg-white">
        {numbers.map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => onChange(num)}
            className={`px-3 py-2 text-sm font-medium border-r border-gray-300 last:border-r-0 transition-colors ${
              value === num
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      {description && (
        <div className="text-xs text-gray-500 mt-1">{description}</div>
      )}
    </div>
  );
}
