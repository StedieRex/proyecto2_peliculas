// SearchResult.jsx
import React from "react";

export default function SearchResult({ result }) {
  if (!result) return null; // No mostrar nada si no hay búsqueda

  return (
    <div className="mt-4 text-sm">
      Has buscado: <strong>{result}</strong>
    </div>
  );
}
