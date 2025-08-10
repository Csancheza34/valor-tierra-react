// api/domusProxy.js

export default async function handler(request, response) {
  // Obtenemos la parte de la URL que queremos consultar en Domus (ej. 'properties' o 'properties/123')
  const endpoint = request.query.endpoint || 'properties';

  // Construimos la URL completa de la API de Domus
  // Pasamos cualquier otro parámetro de búsqueda que venga en la URL
  const searchParams = new URL(request.url, `http://${request.headers.host}`).search;
  const domusUrl = `https://api.domus.la/3.0/${endpoint}${searchParams}`;

  try {
    const apiResponse = await fetch(domusUrl, {
      method: 'GET',
      headers: {
        // Usamos el Token de forma segura desde las variables de entorno de Vercel
        'Authorization': process.env.DOMUS_API_TOKEN,
        'inmobiliaria': '1',
        'Ficha': '1'
      }
    });

    if (!apiResponse.ok) {
      // Si Domus da un error, se lo pasamos al frontend
      return response.status(apiResponse.status).json({ message: apiResponse.statusText });
    }

    const data = await apiResponse.json();
    // Respondemos con los datos de Domus
    return response.status(200).json(data);

  } catch (error) {
    return response.status(500).json({ message: 'Error en el proxy del servidor' });
  }
}