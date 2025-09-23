// barraBusqueda.jsx
import React, { useState, useEffect } from "react";

export default function SearchBar({ onSearch, searchPerformed }) {
  const [query, setQuery] = useState("");
  const [localSearchPerformed, setLocalSearchPerformed] = useState(false);

  // Sincronizar con la prop searchPerformed del padre
  useEffect(() => {
    setLocalSearchPerformed(searchPerformed);
  }, [searchPerformed]);

  const handleSearch = () => {
    if (query.trim().length > 0) {
      if (onSearch) onSearch(query);
      setLocalSearchPerformed(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setQuery("");
    setLocalSearchPerformed(false);
    if (onSearch) onSearch(""); // Limpiar la búsqueda en el padre
  };

  // Estilos - La barra siempre en la parte superior cuando hay búsqueda
  const estilosPadre = {
    width: "100vw",
    height: "15vh",
    display: "flex",
    alignItems: localSearchPerformed ? "flex-start" : "center",
    justifyContent: "center",
    background: "transparent",
    transition: "all 0.5s ease-in-out",
    paddingTop: localSearchPerformed ? "40px" : "0",
    transform: localSearchPerformed ? "translateY(0)" : "translateY(50vh)",
    marginBottom: "20px",
    position: "relative",
    zIndex: 1001
  };

  const contenedorBuscador = {
    width: "90%",
    maxWidth: "700px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    position: "relative"
  };

  const estiloBuscador = {
    flex: 1,
    height: "55px",
    borderRadius: "30px",
    border: "2px solid #e0e0e0",
    outline: "none",
    padding: "0 25px",
    paddingRight: "80px",
    fontSize: "16px",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    boxShadow: "0 2px 15px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease"
  };

  const botonBusqueda = {
    height: "55px",
    padding: "0 30px",
    borderRadius: "30px",
    border: "none",
    background: "linear-gradient(135deg, #ea9b66ff 0%, #a24b57ff 100%)",
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
    right: "169px",
    background: "rgba(0, 0, 0, 0.1)",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    color: "#666",
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    zIndex: 10
  };

  return (
    <div style={estilosPadre}>
      <div style={contenedorBuscador}>
        <input
          type="text"
          placeholder="Buscar películas..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          style={estiloBuscador}
          onFocus={(e) => {
            e.target.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
            e.target.style.borderColor = "#667eea";
            e.target.style.transform = "scale(1.02)";
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = "0 2px 15px rgba(0,0,0,0.1)";
            e.target.style.borderColor = "#e0e0e0";
            e.target.style.transform = "scale(1)";
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