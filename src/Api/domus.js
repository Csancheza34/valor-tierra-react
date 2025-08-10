// src/api/domus.js

// Función base para hablar con nuestro proxy
async function fetchFromProxy(endpoint, params = {}) {
  const queryParams = new URLSearchParams(params).toString();
  // Apuntamos a nuestra propia función proxy
  const apiUrl = `/api/domusProxy?endpoint=${endpoint}&${queryParams}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error de API: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`No se pudo obtener datos desde ${endpoint}:`, error);
    throw error; // Lanzamos el error para que el componente lo maneje
  }
}


export async function fetchProperties(filters = {}) {
  const data = await fetchFromProxy('properties', filters);
  return data.data || [];
}

export async function fetchPropertyByCode(code) {
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