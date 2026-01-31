
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const geminiService = {
  async getDailyMotivation(): Promise<string> {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Öğrenciler için Türkçe, kısa ve ilham verici bir motivasyon sözü üret. Sadece sözü döndür.",
        config: {
          temperature: 0.8,
          maxOutputTokens: 100,
        }
      });
      return response.text || "Başarı, hazırlık ve fırsatın buluştuğu noktadır.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Gelecek, bugün hazırlananlara aittir.";
    }
  },

  async polishAnnouncement(text: string): Promise<string> {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Aşağıdaki okul duyurusunu daha profesyonel ve kurumsal bir dille yeniden yaz (Türkçe): "${text}"`,
        config: {
          temperature: 0.7,
        }
      });
      return response.text || text;
    } catch (error) {
      return text;
    }
  }
};
