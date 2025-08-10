// src/App.jsx
import React, { useState } from 'react';
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import './components/Header.css'
import WhatsAppButton from './components/WhatsAppButton'; // <-- 1. Importa el botón
import './components/WhatsAppButton.css';
import PropertyList from './components/PropertyList'
import PropertyDetail from './pages/PropertyDetail'
import SearchFilters from './components/SearchFilters';

// Creamos un pequeño componente aquí mismo para la página de inicio
const HomePage = () => {
  const [filters, setFilters] = useState({});

  const handleSearch = (searchFilters) => {
    setFilters(searchFilters);
  };

  return (
    <>
      {/* 1. Creamos la nueva sección HERO */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Encuentra tu Lugar Ideal</h1>
          <SearchFilters onSearch={handleSearch} />
        </div>
      </div>

      {/* 2. El listado de propiedades ahora va en una sección principal separada */}
      <main className="main-content">
        <PropertyList filters={filters} />
      </main>
    </>
  );
}

function App() {
  return (
    <> 
      <Header />
      {/* Este div ahora envuelve TODAS las páginas, dando un estilo consistente */}
      <div className="App"> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/inmueble/:propertyId" element={<PropertyDetail />} />
        </Routes>
      </div>
      <WhatsAppButton /> {/* <-- 3. Añade el botón flotante aquí */}
    </>
  )
}

export default App