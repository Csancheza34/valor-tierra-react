// src/components/Header.jsx
import React from 'react';
import './Header.css'; // Crearemos este archivo para los estilos

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-content">
        <div className="logo">
  <a href="/">
    <img src="/logo-valortierra.png" alt="Logo ValorTierra" />
  </a>
</div>

<nav className="main-nav">
  <ul>
    {/* Enlace para Arrendatarios */}
    <li><a href="https://simidocs.siminmobiliarias.com/base/simired/simidocsapi1.0/index.php?inmo=469&tipo=2" target="_blank" rel="noopener noreferrer">Arrendatarios</a></li>

    {/* Enlace para Propietarios */}
    <li><a href="https://simidocs.siminmobiliarias.com/base/simired/simidocsapi1.0/index.php?inmo=469&tipo=1" target="_blank" rel="noopener noreferrer">Propietarios</a></li>

    {/* Enlace para Pagos */}
    <li><a href="https://www.e-collect.com/customers/PAGOSVALORTIERRA.HTM" target="_blank" rel="noopener noreferrer">Pagos en Línea</a></li>

    {/* Enlace a WhatsApp */}
    <li><a href="https://wa.me/573204192835?text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios%20en%20ValorTierra.com" target="_blank" rel="noopener noreferrer">Contacto</a></li>
  </ul>
</nav>
      </div>
    </header>
  );
};

export default Header;