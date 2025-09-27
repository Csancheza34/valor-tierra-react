// src/pages/PropertyDetail.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { fetchPropertyByCode } from '../Api/domus.js';
import ContactForm from '../components/ContactForm'; // Importamos el formulario
import '../App.css';

// --- Componente para la Galería de Imágenes (ahora usa el array 'images') ---
// Dentro de src/pages/PropertyDetail.jsx

// Dentro de src/pages/PropertyDetail.jsx

const ImageGallery = ({ images = [] }) => {
  const [mainImage, setMainImage] = useState(images.length > 0 ? images[0].imageurl : '/placeholder.png');

  useEffect(() => {
    setMainImage(images.length > 0 ? images[0].imageurl : '/placeholder.png');
  }, [images]);

  if (images.length === 0) {
    return <img src="/placeholder.png" alt="Inmueble sin foto" className="main-image" />;
  }

  // Añadimos un borde rojo brillante para la prueba
  return (
    <div className="gallery-container" style={{ border: '5px solid red' }}>
      <div className="main-image-wrapper">
        <img src={mainImage} alt="Foto principal del inmueble" className="main-image" />
      </div>

      {images.length > 1 && (
        <div className="thumbnail-wrapper">
          {images.map((img, index) => (
            <img
              key={index}
              src={img.thumburl || img.imageurl}
              alt={`Foto ${index + 1}`}
              className={mainImage === img.imageurl ? 'thumbnail active' : 'thumbnail'}
              onClick={() => setMainImage(img.imageurl)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
// --- Componente para la Ficha del Asesor ---
const AgentCard = ({ agent }) => {
    if (!agent) return null;
    return (
        <div className="detail-section agent-box">
            <h3>Contacta a tu Asesor</h3>
            <div className="agent-info">
                <img src={agent.picture || '/placeholder.png'} alt={`Foto de ${agent.name}`} className="agent-photo" />
                <div className="agent-details">
                    <p className="agent-name">{agent.name} {agent.last_name}</p>
                    {agent.movil_phone && <p><strong>Celular:</strong> {agent.movil_phone}</p>}
                    {agent.email && <p><strong>Email:</strong> {agent.email}</p>}
                </div>
            </div>
        </div>
    )
}


// --- Componente Principal de la Página de Detalle ---
const PropertyDetail = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProperty = async () => {
      setIsLoading(true);
      const propertyData = await fetchPropertyByCode(propertyId);
      setProperty(propertyData);
      setIsLoading(false);
    };
    loadProperty();
  }, [propertyId]);

  const formatPrice = (price) => {
    const priceNum = Number(price);
    if (isNaN(priceNum) || priceNum === 0) { return null; }
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(priceNum);
  };

  if (isLoading) {
    return <div className="loading-message">Cargando detalles del inmueble...</div>;
  }
  if (!property) {
    return <div className="error-message">Inmueble no encontrado o no disponible.</div>;
  }

  const priceToDisplay = property.biz.toUpperCase() === 'ARRIENDO' ? property.rent : property.saleprice;
  const agent = property.broker && property.broker.length > 0 ? property.broker[0] : null;

  return (
    <div className="property-detail-container">
      <RouterLink to="/" className="back-link">← Volver al listado</RouterLink>
      <div className="detail-header">
        <h1>{property.type} en {property.neighborhood}, {property.city}</h1>
        {priceToDisplay && <span className="detail-price">{formatPrice(priceToDisplay)}</span>}
      </div>
      <div className="detail-layout">
        <div className="detail-main-content">
          <ImageGallery images={property.images} />
          <div className="detail-section">
            <h2>Descripción</h2>
            <p dangerouslySetInnerHTML={{ __html: property.description.replace(/\n/g, '<br />') }}></p>
          </div>
        </div>
        <aside className="detail-sidebar">
          <div className="detail-section specs-box">
            <h3>Características Principales</h3>
            <ul>
              <li><strong>Código:</strong> {property.codpro}</li>
              <li><strong>Gestión:</strong> {property.biz}</li>
              <li><strong>Área:</strong> {property.area_cons} m²</li>
              <li><strong>Habitaciones:</strong> {property.bedrooms}</li>
              <li><strong>Baños:</strong> {property.bathrooms}</li>
              <li><strong>Garajes:</strong> {property.parking}</li>
              {property.administration > 0 && <li><strong>Administración:</strong> {formatPrice(property.administration)}</li>}
            </ul>
          </div>
          <AgentCard agent={agent} />
          <div className="detail-section">
            <ContactForm propertyCode={property.codpro} />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PropertyDetail;