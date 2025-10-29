
import { GoogleGenAI, Type } from "@google/genai";
import type { WordMeaning, Summaries } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const model = "gemini-2.5-flash";

export async function getWordMeaning(word: string): Promise<WordMeaning> {
  try {
    const response = await ai.models.generateContent({
      model,
      contents: `You are an expert lexicographer. Provide a concise definition and an example sentence for the word: "${word}".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            definition: {
              type: Type.STRING,
              description: "The definition of the word."
            },
            example: {
              type: Type.STRING,
              description: "An example sentence using the word."
            }
          },
          required: ["definition", "example"]
        },
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as WordMeaning;
  } catch (error) {
    console.error("Error fetching word meaning:", error);
    throw new Error("Failed to get word meaning from Gemini API.");
  }
}

export async function getSummaries(paragraph: string): Promise<Summaries> {
  try {
    const response = await ai.models.generateContent({
      model,
      contents: `You are an expert educator. Summarize the following text for three different age groups: a 10-year-old (child), a 16-year-old (teen), and a 25-year-old (adult). Keep the summaries clear and tailored to the respective audience's comprehension level. Text: "${paragraph}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            child: {
              type: Type.STRING,
              description: "Summary for a 10-year-old child."
            },
            teen: {
              type: Type.STRING,
              description: "Summary for a 16-year-old teenager."
            },
            adult: {
              type: Type.STRING,
              description: "Summary for a 25-year-old adult."
            }
          },
          required: ["child", "teen", "adult"]
        },
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as Summaries;
  } catch (error) {
    console.error("Error fetching summaries:", error);
    throw new Error("Failed to get summaries from Gemini API.");
  }
}
