// SearchBar.jsx
import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) onSearch(query);
  };


  // Estilos para centrar el contenido en la pantalla
  const estilosPadre = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#fff"
  };
  const contenedorBuscador ={
    width: "90%",
    height: "40px",
  }
  const estiloBuscador ={
    width: "90%",
    height: "40px",
    borderRadius: "30px"
  }

  return (
    <div style={estilosPadre}>
      <div className="hijo" style={contenedorBuscador}>
        <input
          type="text"
          placeholder="Buscar..."
          className="flex-1 outline-none bg-transparent text-lg px-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={estiloBuscador}
        />

        {/* Clear button */}
        {query && (
          <button
            aria-label="Limpiar búsqueda"
            className="ml-2"
            onClick={() => setQuery("")}
            type="button"
          >
            ✕
          </button>
        )}

        {/* Search confirm button */}
        <button
          aria-label="Buscar"
          className="ml-2 px-4 py-2 rounded-full bg-blue-500 text-white text-base font-medium hover:bg-blue-600 transition-colors"
          onClick={handleSearch}
          type="button"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
