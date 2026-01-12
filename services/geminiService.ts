import { GoogleGenAI } from "@google/genai";

export const generateVerseImage = async (verseText: string): Promise<string | null> => {
  try {
    // Inicialización usando la variable de entorno configurada
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    
    // Utilizamos gemini-2.5-flash-image para la generación de imágenes según las directrices
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: `Crea una imagen de fondo hermosa, inspiradora y profesional para un versículo bíblico. El ambiente debe reflejar: "${verseText}". Estilo: Fotografía de alta calidad o arte digital artístico, iluminación cinematográfica, sin texto dentro de la imagen.` }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    // Buscamos la parte de imagen en la respuesta del modelo
    const candidate = response.candidates?.[0];
    if (candidate?.content?.parts) {
      for (const part of candidate.content.parts) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          return `data:image/png;base64,${base64EncodeString}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Error al generar imagen con Gemini:", error);
    return null;
  }
};