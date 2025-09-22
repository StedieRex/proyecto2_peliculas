// SearchBar.jsx
import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);

  const handleSearch = () => {
    if (query.trim().length > 0) {
      if (onSearch) onSearch(query);
      setBusquedaRealizada(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setQuery("");
    setBusquedaRealizada(false);
    // Opcional: limpiar resultados de búsqueda si es necesario
    // if (onSearch) onSearch("");
  };

  // Estilos mejorados con fondo transparente
  const estilosPadre = {
    width: "100vw",
    height: "15vh", // Más altura para mejor espaciado
    display: "flex",
    alignItems: busquedaRealizada ? "flex-start" : "center",
    justifyContent: "center",
    background: "transparent", // Fondo transparente
    transition: "all 0.7s cubic-bezier(0.4,0,0.2,1)",
    paddingTop: busquedaRealizada ? "60px" : "0", // Más padding cuando hay búsqueda
    transform: busquedaRealizada && query.trim().length > 0 ? "translateY(2vh)" : "translateY(50vh)",
    marginBottom: "20px"
  };

  const contenedorBuscador = {
    width: "90%",
    maxWidth: "700px", // Un poco más ancho
    display: "flex",
    alignItems: "center",
    gap: "15px",
    position: "relative"
  };

  const estiloBuscador = {
    flex: 1,
    height: "55px", // Un poco más alto
    borderRadius: "30px",
    border: "2px solid #e0e0e0",
    outline: "none",
    padding: "0 25px", // Más padding interno
    fontSize: "16px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    boxShadow: "0 2px 15px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    paddingRight: "80px" // Espacio extra a la derecha para el botón de limpiar
  };

  const botonBusqueda = {
    height: "55px",
    padding: "0 30px",
    borderRadius: "30px",
    border: "none",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 3px 15px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
    minWidth: "120px"
  };

  const botonLimpiar = {
    position: "absolute",
    right: "169px", // Más espacio desde el botón de búsqueda
    background: "rgba(0, 0, 0, 0.1)",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    color: "#666",
    width: "35px", // Más grande
    height: "35px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    zIndex: 10 // Para asegurar que esté por encima
  };

  return (
    <div style={estilosPadre}>
      <div style={contenedorBuscador}>
        <input
          type="text"
          placeholder="Buscar..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          style={estiloBuscador}
          onFocus={(e) => {
            e.target.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
            e.target.style.borderColor = "#667eea";
            e.target.style.transform = "scale(1.02)";
            e.target.style.backgroundColor = "rgba(255, 255, 255, 1)";
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = "0 2px 15px rgba(0,0,0,0.1)";
            e.target.style.borderColor = "#e0e0e0";
            e.target.style.transform = "scale(1)";
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
          }}
        />

        {query && (
          <button
            aria-label="Limpiar búsqueda"
            onClick={handleClear}
            style={botonLimpiar}
            type="button"
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(0, 0, 0, 0.2)";
              e.target.style.color = "#333";
              e.target.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(0, 0, 0, 0.1)";
              e.target.style.color = "#666";
              e.target.style.transform = "scale(1)";
            }}
          >
            ✕
          </button>
        )}

        <button
          aria-label="Buscar"
          onClick={handleSearch}
          style={botonBusqueda}
          type="button"
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.boxShadow = "0 5px 20px rgba(0,0,0,0.3)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0 3px 15px rgba(0,0,0,0.2)";
          }}
        >
          🔍 Buscar
        </button>
      </div>
    </div>
  );
}