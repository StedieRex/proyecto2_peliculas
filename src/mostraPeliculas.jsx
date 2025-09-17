// SearchResult.jsx
import React, { useEffect, useState } from "react";

export default function SearchResult({ result }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!result) return; // Si no hay búsqueda, no hacemos nada

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

    // Limpiamos antes de la nueva búsqueda
    setMovies([]);

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        setMovies(json.results || []);
      })
      .catch((err) => console.error(err));
  }, [result]); // se ejecuta cuando "result" cambie

  // el estilo padre es importante porque le da el espacio a la barra de búsqueda
  // y a las cards de las películas
  const estiloPadre = {
    width: "100vw",
    minHeight: "20vh",
    marginTop: "4vh",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: "4px",
    backgroundColor: "#be2727ff",
    padding: "2rem 0",
    gap: "1rem",
  };

  const estiloCard = {
    width: "200px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    padding: "1rem",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  };

  const estiloImg = {
    width: "100%",
    borderRadius: "8px",
  };

  if (!result) return null; // No mostrar nada si no hay búsqueda

  return (
    <div style={estiloPadre}>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div key={movie.id} style={estiloCard}>
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                style={estiloImg}
              />
            ) : (
              <div
                style={{
                  ...estiloImg,
                  backgroundColor: "#ccc",
                  height: "300px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#333",
                }}
              >
                Sin imagen
              </div>
            )}
            <h3>{movie.title}</h3>
            <p style={{ fontSize: "0.9rem" }}>{movie.release_date}</p>
            <p style={{ fontSize: "0.8rem", color: "#555" }}>
              ⭐ {movie.vote_average}
            </p>
          </div>
        ))
      ) : (
        <p style={{ color: "white" }}>No hay resultados</p>
      )}
    </div>
  );
}
