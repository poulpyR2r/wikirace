import React from "react";

interface WikiSearchBoxProps {
  placeholder?: string;
  buttonText?: string;
  onSearch?: (query: string) => void;
  disabled?: boolean;
}

export default function WikiSearchBox({
  placeholder = "Rechercher sur WikiRace",
  buttonText = "Rechercher",
  onSearch,
  disabled = false,
}: WikiSearchBoxProps) {
  const [query, setQuery] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-stretch border border-gray-300 bg-white"
    >
      <div className="flex-1 relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full px-3 py-2 text-sm text-gray-900 bg-transparent border-none outline-none placeholder:text-gray-500 disabled:bg-gray-50 disabled:text-gray-500"
        />
        {/* Icône de recherche */}
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-400"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>
        <div className="pl-7">{/* Espace pour l'icône */}</div>
      </div>

      <button
        type="submit"
        disabled={disabled || !query.trim()}
        className="px-4 py-2 bg-gray-100 border-l border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {buttonText}
      </button>
    </form>
  );
}
