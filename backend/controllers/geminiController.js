async function descargarImagenComoBase64(imageUrl) {
  let respuesta;
  try {
    respuesta = await fetch(imageUrl);
  } catch (error) {
    throw new Error(`Error de red al intentar acceder a la URL de la imagen: ${error.message}`);
  }

  if (!respuesta.ok) {
    throw new Error(`La URL de la imagen no es accesible (Código HTTP: ${respuesta.status})`);
  }

  const mimeType = respuesta.headers.get("content-type") || "image/jpeg";
  const arrayBuffer = await respuesta.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  return { base64, mimeType };
}

async function validarFotoPlanta(req, res) {
  const { imageUrl, nombrePlanta, etapaActual } = req.body;

  if (!imageUrl || !nombrePlanta || !etapaActual) {
    return res.status(400).json({
      error: "Faltan campos requeridos: imageUrl, nombrePlanta, etapaActual",
    });
  }

  try {
    const { base64, mimeType } = await descargarImagenComoBase64(imageUrl);
    const apiKey = process.env.GEMINI_API_KEY;

    const promptTexto = `Verifica si la imagen adjunta es la planta ${nombrePlanta} en la etapa de ${etapaActual}. Responde únicamente con 'true' si lo es, o 'false' si no lo es.`;

    // Petición REST directa a la API de Gemini
    // El modelo recomendado actual para tareas de visión es gemini-1.5-flash
    const modelo = process.env.GEMINI_MODEL || "gemini-1.5-flash";
    const urlEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent?key=${apiKey}`;
    const bodyPeticion = {
      contents: [
        {
          parts: [
            { text: promptTexto },
            {
              inlineData: {
                mimeType: mimeType,
                data: base64,
              },
            },
          ],
        },
      ],
    };

    let respuestaApi;
    try {
      respuestaApi = await fetch(urlEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyPeticion),
      });
    } catch (e) {
      console.error("Error de red llamando a Gemini:", e);
      return res.status(500).json({ error: "Error de red al intentar conectar con la API de Google Gemini." });
    }

    const resultadoJson = await respuestaApi.json();

    if (!respuestaApi.ok) {
      console.error(`Error de la API de Gemini (Status: ${respuestaApi.status}):`, resultadoJson);
      
      if (respuestaApi.status === 400) {
        return res.status(400).json({ error: "Petición inválida a Gemini. Verifica tu API Key o el formato de la imagen." });
      }
      if (respuestaApi.status === 503) {
        return res.status(503).json({ error: "El servicio de validación está saturado temporalmente por alta demanda. Por favor, intenta de nuevo en unos segundos." });
      }
      if (respuestaApi.status === 429) {
        return res.status(429).json({ error: "Has alcanzado el límite de peticiones de la API. Por favor, intenta de nuevo más tarde." });
      }

      const errorMessage = resultadoJson?.error?.message || "Error desconocido";
      return res.status(500).json({ error: `Error interno de Gemini: ${errorMessage}` });
    }

    const textoRespuesta =
      resultadoJson.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const esValida = textoRespuesta.trim().toLowerCase().startsWith("true");

    return res.json({ esValida });
  } catch (error) {
    console.error("Error validando foto:", error);
    // Propagamos el mensaje específico del error (ej: si falló la descarga de la imagen)
    return res.status(500).json({ error: error.message || "Error inesperado al validar la imagen" });
  }
}

module.exports = { validarFotoPlanta };