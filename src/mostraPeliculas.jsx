// mostraPeliculas.jsx
import React, { useEffect, useState } from "react";

export default function SearchResult({ result, searchPerformed }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!result || result.trim() === "") {
      // Si no hay resultado, ocultar después de un tiempo
      const timer = setTimeout(() => {
        setShowResults(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      // Si hay resultado, mostrar y buscar
      setShowResults(true);
      fetchMovies();
    }
  }, [result]);

  const fetchMovies = async () => {
    if (!result || result.trim() === "") return;
    
    setIsLoading(true);
    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        result
      )}&include_adult=false&language=es-MX&page=1`;

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWExNzdmNWFjM2E5YjIzZDEzYjgxYmMxZGFkYWZlMCIsIm5iZiI6MTc1Njc3NjY1MS4yOTksInN1YiI6IjY4YjY0OGNiZDY5YTQ4NzY3MjU0ZWFlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KbE0_LmMOd468bv0WXgOO3sMtU2WFHCixB8FtQ_7RIw",
        },
      };

      const response = await fetch(url, options);
      const json = await response.json();
      setMovies(json.results || []);
    } catch (err) {
      console.error(err);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Estilos del contenedor principal con transición de desvanecimiento
  const containerStyle = {
    width: "100%",
    minHeight: showResults ? "50vh" : "0",
    marginTop: "2vh",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "rgba(190, 39, 39, 0.95)",
    padding: showResults ? "2rem 0" : "0",
    gap: "1.5rem",
    transition: "all 0.4s ease-in-out",
    opacity: showResults ? 1 : 0,
    visibility: showResults ? "visible" : "hidden",
    borderRadius: "10px",
    boxShadow: showResults ? "0 8px 32px rgba(0,0,0,0.3)" : "none"
  };

  const cardStyle = {
    width: "200px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    padding: "1rem",
    textAlign: "center",
    boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
    transition: "all 0.3s ease",
    cursor: "pointer"
  };

  // No mostrar nada si nunca se ha realizado una búsqueda
  if (!searchPerformed) return null;

  return (
    <div style={containerStyle}>
      {isLoading ? (
        <div style={{ color: "white", fontSize: "18px", padding: "2rem" }}>
          🎬 Buscando películas...
        </div>
      ) : movies.length > 0 ? (
        movies.map((movie) => (
          <div 
            key={movie.id} 
            style={cardStyle}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-8px)";
              e.target.style.boxShadow = "0 12px 20px rgba(0,0,0,0.25)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 6px 12px rgba(0,0,0,0.15)";
            }}
          >
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  height: "300px",
                  objectFit: "cover"
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  backgroundColor: "#f0f0f0",
                  height: "300px",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#666",
                  fontSize: "14px"
                }}
              >
                🎞️ Imagen no disponible
              </div>
            )}
            <h3 style={{ margin: "15px 0 10px 0", fontSize: "16px", lineHeight: "1.3" }}>
              {movie.title}
            </h3>
            <p style={{ fontSize: "0.9rem", color: "#666", margin: "5px 0" }}>
              {movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"}
            </p>
            <p style={{ fontSize: "0.9rem", color: "#333", fontWeight: "bold" }}>
              ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
            </p>
          </div>
        ))
      ) : showResults ? (
        <div style={{ color: "white", textAlign: "center", padding: "2rem" }}>
          <h3>No se encontraron películas</h3>
          <p>Intenta con otros términos de búsqueda</p>
        </div>
      ) : null}
    </div>
  );
}