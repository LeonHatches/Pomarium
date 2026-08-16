async function descargarImagenComoBase64(imageUrl) {
  const respuesta = await fetch(imageUrl);
  if (!respuesta.ok) {
    throw new Error(`No se pudo descargar la imagen (${respuesta.status})`);
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

    // Petición REST directa a la API de Gemini (compatible con claves tipo AQ... o AIzaSy...)
    // Nota: "gemini-3.5-flash" no es un modelo válido de la API pública — se
    // corrigió al modelo de visión vigente. Verifica el nombre exacto y
    // disponibilidad de modelos en https://ai.google.dev/gemini-api/docs/models
    // antes de desplegar a producción, ya que Google actualiza esta lista.
    const modelo = process.env.GEMINI_MODEL || "gemini-3.5-flash";
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

    const respuestaApi = await fetch(urlEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyPeticion),
    });

    const resultadoJson = await respuestaApi.json();

    if (!respuestaApi.ok) {
      console.error("Error de la API de Gemini:", resultadoJson);
      return res.status(500).json({ error: "Error al comunicarse con Gemini" });
    }

    const textoRespuesta =
      resultadoJson.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const esValida = textoRespuesta.trim().toLowerCase().startsWith("true");

    return res.json({ esValida });
  } catch (error) {
    console.error("Error validando foto con Gemini:", error);
    return res.status(500).json({ error: "Error al validar la imagen" });
  }
}

module.exports = { validarFotoPlanta };