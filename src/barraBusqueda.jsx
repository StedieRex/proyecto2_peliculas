// SearchBar.jsx
import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) onSearch(query);
  };

  const estilosPadre ={
    width: "70%",
    height: "40px"
  }

  const contenedorBuscador ={
    width: "100%",
    height: "40px",
    borderRadius: "30px"
  }

  return (
    <div className="p-6" style={estilosPadre}>
      <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
        <input
          type="text"
          placeholder="Buscar..."
          className="flex-1 outline-none bg-transparent text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={contenedorBuscador}
        />

        {/* Clear button */}
        {query && (
          <button
            aria-label="Limpiar búsqueda"
            className="ml-2 text-sm opacity-70 hover:opacity-100"
            onClick={() => setQuery("")}
            type="button"
          >
            ✕
          </button>
        )}

        {/* Search confirm button */}
        <button
          aria-label="Buscar"
          className="ml-2 px-3 py-1 rounded-md text-sm hover:bg-gray-100"
          onClick={handleSearch}
          type="button"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
