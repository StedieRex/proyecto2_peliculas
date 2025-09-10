// SearchBar.jsx
import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);

  const handleSearch = () => {
    if (onSearch) onSearch(query);
    setBusquedaRealizada(true);
  };

  // Estilos para centrar el contenido en la pantalla o fijarlo arriba
  // Transición suave usando transform y transition
  const estilosPadre = {
    width: "100vw",
    height: "10vh",
    display: "flex",
    alignItems: busquedaRealizada ? "flex-start" : "center",
    justifyContent: "center",
    background: "#fff", // background para ver el espacio utilizado
    transition: "all 0.7s cubic-bezier(0.4,0,0.2,1)",
    paddingTop: busquedaRealizada ? "40px" : "0",
    // Usamos translateY para animar el movimiento vertical
    transform: busquedaRealizada ? "translateY(1vh)" : "translateY(50vh)"
  };

  const contenedorBuscador = {
    width: "90%",
    height: "40px",
  };
  const estiloBuscador = {
    width: "90%",
    height: "40px",
    borderRadius: "30px"
  };

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
