// src/components/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-content">
        <div className="logo">
          <Link to="/">
            <img src="/logo-valortierra.png" alt="Logo ValorTierra" />
          </Link>
        </div>

        <button 
          className="mobile-nav-toggle" 
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="sr-only">Menú</span>
        </button>

        <nav className="main-nav" data-visible={isMenuOpen}>
          <ul>
            <li><a href="https://simidocs.siminmobiliarias.com/base/simired/simidocsapi1.0/index.php?inmo=469&tipo=2" target="_blank" rel="noopener noreferrer">Arrendatarios</a></li>
            <li><a href="https://simidocs.siminmobiliarias.com/base/simired/simidocsapi1.0/index.php?inmo=469&tipo=1" target="_blank" rel="noopener noreferrer">Propietarios</a></li>
            <li><a href=" https://pagos.palomma.com/corralmaldonado" target="_blank" rel="noopener noreferrer">Pagos en Línea</a></li>
            <li><a href="https://wa.me/573204192835?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios%20en%20ValorTierra.com" target="_blank" rel="noopener noreferrer">Contacto</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
