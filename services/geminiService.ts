
import { GoogleGenAI } from "@google/genai";

export const generateVerseImage = async (verseText: string): Promise<string | null> => {
  // Acceso seguro a la API_KEY
  const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : undefined;
  
  if (!apiKey) {
    console.warn("API_KEY no configurada. Las imágenes de IA no se generarán.");
    return null;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Create a beautiful, inspirational, and professional aesthetic background image suitable for social media, themed around this Bible verse text: "${verseText}". Do not include the text itself in the image, just a symbolic background representing the mood (peace, nature, light, divinity).`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};
