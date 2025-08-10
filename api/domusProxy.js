// api/domusProxy.js

export default async function handler(request, response) {
  const incomingUrl = new URL(request.url, `http://${request.headers.host}`);
  const endpoint = incomingUrl.searchParams.get('endpoint') || 'properties';

  const domusUrl = new URL(`https://api.domus.la/3.0/${endpoint}`);

  incomingUrl.searchParams.forEach((value, key) => {
    if (key !== 'endpoint') {
      domusUrl.searchParams.append(key, value);
    }
  });

  try {
    // 1. Empezamos con las cabeceras base
    const headers = {
      'Authorization': process.env.DOMUS_API_TOKEN,
      'inmobiliaria': '1',
    };

    // 2. Añadimos cabeceras específicas según lo que se pida
    if (endpoint === 'properties') {
      // Si es la lista principal, pedimos 20 inmuebles
      headers['Perpage'] = '20';
    } else if (endpoint.startsWith('properties/')) {
      // Si es un solo inmueble, pedimos la Ficha completa
      headers['Ficha'] = '1';
    }

    const apiResponse = await fetch(domusUrl.toString(), {
      method: 'GET',
      headers: headers // 3. Usamos nuestras cabeceras dinámicas
    });

    if (!apiResponse.ok) {
      const errorBody = await apiResponse.text();
      console.error("Error from Domus API:", errorBody);
      return response.status(apiResponse.status).json({ message: `Error from Domus: ${apiResponse.statusText}` });
    }

    const data = await apiResponse.json();
    return response.status(200).json(data);

  } catch (error) {
    console.error("Proxy Error:", error);
    return response.status(500).json({ message: 'Error en el servidor proxy' });
  }
}