import { Config } from '../types';
import { DECORS, PLUS_VALUES, ACCESSORIES } from '../data/doorData';

const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.warn('API_KEY environment variable not set. Gemini Assistant will not work.');
}

const model = 'gemini-2.5-flash';

const buildSystemPrompt = () => {
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
1. If a user says "une porte normale", set \`porteType: 'battante'\` and \`variant: 'standard'\`.
2. Extract numbers for \`vantailWidth\` and \`wallDepth\`. If a user mentions "mur de 10cm", set \`wallDepth: 100\`.
3. If a user mentions "look noir" or "moderne noir", prefer \`decor: 'unicolorNoir'\`.
4. Direction defaults to 'droit' if not specified.
5. CPL PLUS (\`cpl_plus\`) is for "Aspect Bois / CPL Noir anti-trace". Others are CPL (\`cpl\`).
6. Output strictly a raw JSON object.
`;
};

const extractTextFromGeminiResponse = (payload: any): string | null => {
  const parts = payload?.candidates?.[0]?.content?.parts;
  if (!Array.isArray(parts)) return null;
  const text = parts.map((p: any) => p?.text).filter(Boolean).join('\n').trim();
  return text || null;
};

export const getAIConfig = async (userInput: string): Promise<Partial<Config> | null> => {
  if (!apiKey) {
    throw new Error('Gemini API key is not configured.');
  }

  const systemPrompt = buildSystemPrompt();

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: 'user', parts: [{ text: userInput }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.2,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API request failed with status ${response.status}`);
    }

    const payload = await response.json();
    const jsonText = extractTextFromGeminiResponse(payload);
    if (!jsonText) {
      throw new Error('Gemini returned an empty response.');
    }

    let jsonStr = jsonText.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match?.[2]) {
      jsonStr = match[2].trim();
    }

    const parsedConfig = JSON.parse(jsonStr);
    if (typeof parsedConfig === 'object' && parsedConfig !== null && 'porteType' in parsedConfig) {
      return parsedConfig as Partial<Config>;
    }

    throw new Error('Parsed data is not a valid configuration object.');
  } catch (error) {
    console.error('Error fetching or parsing AI configuration:', error);
    if (error instanceof SyntaxError) {
      throw new Error("L'assistant a retourné une réponse malformée. Veuillez réessayer.");
    }
    throw new Error("Une erreur est survenue avec l'assistant IA. Veuillez réessayer plus tard.");
  }
};
