// src/components/Header.jsx
import React, { useState } from 'react'; // Importamos useState
import './Header.css';

const Header = () => {
  // Estado para controlar si el menú móvil está abierto
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-content">
        <div className="logo">
          <a href="/">
            <img src="/logo-valortierra.svg" alt="Logo ValorTierra" />
          </a>
        </div>

        {/* Botón de Hamburguesa (solo visible en móvil) */}
        <button 
          className="mobile-nav-toggle" 
          aria-controls="primary-navigation" 
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="sr-only">Menú</span>
        </button>

        {/* Navegación Principal */}
        <nav className="main-nav" data-visible={isMenuOpen}>
          <ul>
            <li><a href="https://simidocs.siminmobiliarias.com/base/simired/simidocsapi1.0/index.php?inmo=469&tipo=2" target="_blank" rel="noopener noreferrer">Arrendatarios</a></li>
            <li><a href="https://simidocs.siminmobiliarias.com/base/simired/simidocsapi1.0/index.php?inmo=469&tipo=1" target="_blank" rel="noopener noreferrer">Propietarios</a></li>
            <li><a href="https://www.e-collect.com/customers/PAGOSVALORTIERRA.HTM" target="_blank" rel="noopener noreferrer">Pagos en Línea</a></li>
            <li><a href="https://wa.me/573204192835?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios%20en%20ValorTierra.com" target="_blank" rel="noopener noreferrer">Contacto</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;