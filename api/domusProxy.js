// api/domusProxy.js

export default async function handler(request, response) {
  // 1. Creamos un objeto URL para manejar los parámetros fácilmente
  const incomingUrl = new URL(request.url, `http://${request.headers.host}`);
  const endpoint = incomingUrl.searchParams.get('endpoint') || 'properties';

  // 2. Creamos la URL base de Domus
  const domusUrl = new URL(`https://api.domus.la/3.0/${endpoint}`);

  // 3. Copiamos todos los parámetros de búsqueda, excepto el nuestro ('endpoint')
  incomingUrl.searchParams.forEach((value, key) => {
    if (key !== 'endpoint') {
      domusUrl.searchParams.append(key, value);
    }
  });

  try {
    const apiResponse = await fetch(domusUrl.toString(), {
      method: 'GET',
      headers: {
        'Authorization': process.env.DOMUS_API_TOKEN,
        'inmobiliaria': '1',
        'Ficha': '1'
      }
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