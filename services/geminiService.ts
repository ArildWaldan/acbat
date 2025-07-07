
import { GoogleGenAI } from "@google/genai";
import { Config } from '../types';
import { DECORS, CADRES, PLUS_VALUES, ACCESSORIES } from '../data/doorData';

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini Assistant will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const model = "gemini-2.5-flash-preview-04-17";

const buildSystemPrompt = () => {
    // A simplified representation of the data for the prompt
    const decorPromptData = Object.entries(DECORS).map(([id, data]) => `${id}: ${data.name} (Gamme: ${data.gamme})`).join('\n');
    const plusValuesPromptData = Object.entries(PLUS_VALUES).map(([id, data]) => `${id}: ${data.name}`).join('\n');
    const garnituresPromptData = Object.entries(ACCESSORIES.GARNITURES).map(([id, data]) => `${id}: ${data.name}`).join('\n');

    return `
You are an expert interior door configurator assistant. Your task is to analyze the user's request and translate it into a valid JSON configuration object.
The user will describe their needs in French. You MUST respond with ONLY a valid JSON object. Do not add any conversational text or markdown fences like \`\`\`json.

The JSON object must have a structure compatible with this TypeScript interface:
\`\`\`typescript
interface Config {
  porteType: 'battante' | 'coulissante' | 'baie_libre' | null;
  gamme: 'cpl' | 'cpl_plus' | null;
  decor: string | null; // e.g., "cheneOntario"
  variant: string | null; // 'standard', 'climat', 'coulissant'
  vantailWidth: number | null;
  wallDepth: number | null;
  direction: 'gauche' | 'droit';
  garniture: { id: string; selectedType: string; } | null;
  plusValues: { [key: string]: boolean };
  // etc.
}
\`\`\`

Here are the available options you can use to populate the JSON. Use the IDs (e.g., "cheneOntario"), not the full names.

**Available Decors (decor):**
${decorPromptData}

**Available PlusValues (plusValues):**
${plusValuesPromptData}

**Available Garnitures (garniture):**
${garnituresPromptData}

**Rules:**
1.  **Infer values:** If a user says "une porte normale", set \`porteType: 'battante'\` and \`variant: 'standard'\`.
2.  **Dimensions:** Extract numbers for \`vantailWidth\` and \`wallDepth\`. If a user mentions "mur de 10cm", set \`wallDepth: 100\`.
3.  **Color/Style:** If a user mentions "look noir" or "moderne noir", try to set \`decor: 'unicolorNoir'\` or add \`plusValues: { 'cadreNoirMat': true }\` or select a black handle like \`garniture: { id: 'toulon', selectedType: 'PZ' }\`.
4.  **Direction:** Default to 'droit' if not specified.
5.  **Gamme:** CPL PLUS (\`cpl_plus\`) is for the "Aspect Bois / CPL Noir anti-trace" decor. All others are CPL (\`cpl\`).
6.  **Response Format:** Your entire output must be a single, raw JSON object.

Example User Request: "Je veux une porte simple pour ma chambre, style chêne ontario, largeur 830mm. Le mur fait 100mm d'épaisseur."
Example JSON Response:
{
  "porteType": "battante",
  "gamme": "cpl",
  "decor": "cheneOntario",
  "variant": "standard",
  "vantailWidth": 830,
  "wallDepth": 100,
  "direction": "droit",
  "plusValues": {},
  "garniture": null
}
`;
};


export const getAIConfig = async (userInput: string): Promise<Partial<Config> | null> => {
  if (!process.env.API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }
  
  const systemPrompt = buildSystemPrompt();
  
  try {
    const response = await ai.models.generateContent({
        model,
        contents: userInput,
        config: {
            systemInstruction: systemPrompt,
            responseMimeType: "application/json",
            temperature: 0.2,
        }
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("Gemini returned an empty response.");
    }
    
    let jsonStr = jsonText.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
        jsonStr = match[2].trim();
    }

    const parsedConfig = JSON.parse(jsonStr);
    
    // Basic validation to ensure we have a somewhat valid object
    if (typeof parsedConfig === 'object' && parsedConfig !== null && 'porteType' in parsedConfig) {
      return parsedConfig as Partial<Config>;
    }

    throw new Error("Parsed data is not a valid configuration object.");

  } catch (error) {
    console.error("Error fetching or parsing AI configuration:", error);
    if (error instanceof SyntaxError) {
      throw new Error("L'assistant a retourné une réponse malformée. Veuillez réessayer.");
    }
    throw new Error("Une erreur est survenue avec l'assistant IA. Veuillez réessayer plus tard.");
  }
};
