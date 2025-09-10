import React, { useState } from 'react';
import SearchResult from './mostraPeliculas';
import SearchBar from './barraBusqueda';


export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const contenedorEstilos = {
    width: "70%",
    height: "40px"
  }
  return (
    <div className="p-6" style={contenedorEstilos}>
      <SearchBar onSearch={setSearchQuery} />
      <SearchResult result={searchQuery} />
    </div>
  );
}
