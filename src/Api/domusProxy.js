// api/domusProxy.js

export default async function handler(request, response) {
  // 1. Clonamos los parámetros de la URL que nos llegan
  const queryParams = new URL(request.url, `http://${request.headers.host}`).searchParams;

  // 2. Obtenemos nuestro parámetro 'endpoint' y lo borramos de la lista
  const endpoint = queryParams.get('endpoint') || 'properties';
  queryParams.delete('endpoint');

  // 3. Construimos la URL final de Domus solo con los parámetros restantes
  const domusUrl = `https://api.domus.la/3.0/${endpoint}?${queryParams.toString()}`;

  try {
    const apiResponse = await fetch(domusUrl, {
      method: 'GET',
      headers: {
        'Authorization': process.env.DOMUS_API_TOKEN, // Usando la variable de entorno
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