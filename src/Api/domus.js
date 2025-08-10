// src/api/domus.js

// Función base MEJORADA para hablar con nuestro proxy
async function fetchFromProxy(endpoint, params = {}) {
  // Usamos el constructor de URL para crear la dirección de forma segura
  const url = new URL('/api/domusProxy', window.location.origin);
  url.searchParams.append('endpoint', endpoint);

  // Añadimos solo los filtros que tengan un valor
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.append(key, value);
    }
  });

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Error de API: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`No se pudo obtener datos desde ${endpoint}:`, error);
    throw error;
  }
}

// El resto de las funciones usan la nueva función base, por lo que no cambian
export async function fetchProperties(filters = {}) {
  const data = await fetchFromProxy('properties', filters);
  return data.data || [];
}

export async function fetchPropertyByCode(code) {
  // Ahora usamos el endpoint correcto para un solo inmueble
  const data = await fetchFromProxy(`properties/${code}`);
  return data.data ? data.data : null;
}

export async function fetchBizTypes() {
  const data = await fetchFromProxy('search/biz');
  return data.data || [];
}

export async function fetchPropertyTypes() {
  const data = await fetchFromProxy('search/types');
  return data.data || [];
}

export async function fetchZones() {
    const data = await fetchFromProxy('search/zones');
    return data.data || [];
}

export async function fetchNeighborhoods() {
    const data = await fetchFromProxy('search/neighborhoods');
    return data.data || [];
}