// src/components/PropertyList.jsx

import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import { fetchProperties } from '../Api/domus.js'; // <-- CORRECCIÓN: Añadimos 'Api/' a la ruta

// 1. El componente ahora recibe 'filters'
const PropertyList = ({ filters }) => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null);

  // useEffect es un "hook" de React que se ejecuta cuando el componente se carga por primera vez
  useEffect(() => {
    console.log('Paso 4: PropertyList detectó un cambio en los filtros y va a buscar de nuevo.'); // <-- AÑADE ESTO

  const loadProperties = async () => {
    setIsLoading(true);
      try {
        const dataFromApi = await fetchProperties(filters);
      setProperties(dataFromApi);
      setIsLoading(false);
      } catch (err) {
        setError(err.message); // Guardamos el mensaje de error si algo falla
      } finally {
        setIsLoading(false); // Dejamos de cargar, ya sea con éxito o con error
      }
    };

    loadProperties(); // Ejecutamos la función
  }, [filters]); // El array vacío [] asegura que esto se ejecute solo una vez

  // Mostramos un mensaje mientras los datos cargan
  if (isLoading) {
    return <div className="loading-message">Cargando inmuebles desde Domus...</div>;
  }

  // Mostramos un mensaje si hubo un error
  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }
// src/components/PropertyList.jsx

// ... (código anterior: useEffect, isLoading, etc.)

// Mostramos un mensaje si hubo un error
if (error) {
  return <div className="error-message">Error: {error}</div>;
}

// AÑADE ESTA LÍNEA PARA DEPURAR
console.log("Inmuebles recibidos de la API:", properties);

// Si todo salió bien, mostramos la lista de propiedades
  
  return (
    <div className="property-list">
      {properties.length > 0 ? (
        properties.map(property => (
          <PropertyCard key={property.idpro} property={property} />
        ))
      ) : (
        <p>No se encontraron inmuebles disponibles.</p>
      )}
    </div>
  );
};

export default PropertyList;