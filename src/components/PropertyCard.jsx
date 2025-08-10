// src/components/PropertyCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';

// Función de formato de precio MEJORADA (la misma que en la página de detalle)
const formatPrice = (price) => {
  const priceNum = Number(price);
  // Si el precio es 0, nulo o inválido, mostramos "$ 0" en la tarjeta principal
  if (isNaN(priceNum) || priceNum === 0) { 
    return '$ 0'; 
  }
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(priceNum);
};

const PropertyCard = ({ property }) => {
  // Validación para evitar errores con inmuebles sin datos
  if (!property || !property.codpro) {
    return null;
  }

  // Lógica de precio MEJORADA
  const priceToDisplay = property.biz.toUpperCase() === 'ARRIENDO' ? property.rent : property.saleprice;

  return (
    <Link to={`/inmueble/${property.codpro}`} className="property-card-link">
      <div className="property-card">
        <div className="property-image-container">
          <img 
            src={property.image1 || '/placeholder.png'} 
            alt={`Foto de ${property.type}`} 
            className="property-image" 
          />
          <span className="property-biz-type">{property.biz}</span>
        </div>
        <div className="property-info">
          <p className="property-location">{property.neighborhood}, {property.city}</p>
          <h3 className="property-title">{property.type}</h3>
          <p className="property-price">{formatPrice(priceToDisplay)}</p>
          <div className="property-specs">
            <span>🛏️ {property.bedrooms || 0} hab.</span>
            <span>🛁 {property.bathrooms || 0} baños</span>
            <span>↔️ {property.area_cons || 0} m²</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;