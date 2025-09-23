// App.js
import React, { useState } from 'react';
import SearchResult from './mostraPeliculas';
import SearchBar from './barraBusqueda';

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSearchPerformed(true);
  };

  const appContainerStyles = {
    minHeight: '100vh',
    width: '100vw',
    background: 'linear-gradient(135deg, #8B0000 0%, #B22222 50%, #8B0000 100%)',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const contentContainerStyles = {
    width: '100%',
    maxWidth: '1200px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  return (
    <div style={appContainerStyles}>
      <div style={contentContainerStyles}>
        <SearchBar 
          onSearch={handleSearch} 
          searchPerformed={searchPerformed}
        />
        <SearchResult 
          result={searchQuery} 
          searchPerformed={searchPerformed}
        />
      </div>
    </div>
  );
}