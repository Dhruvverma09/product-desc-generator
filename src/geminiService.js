const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const TONE_PROMPTS = {
  premium: "Use sophisticated, elevated language that emphasizes exclusivity, craftsmanship, and luxury positioning. Target urban premium buyers.",
  traditional: "Use warm, authentic, heritage-driven language. Emphasize roots, tradition, time-honored methods, and cultural authenticity.",
  health: "Use clean, informative, health-conscious language. Emphasize natural ingredients, nutritional benefits, and wellness outcomes.",
};

export async function generateDescription({ productName, ingredients, weight, features, tone }) {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    throw new Error("API_KEY_MISSING");
  }

  const toneInstruction = TONE_PROMPTS[tone] || TONE_PROMPTS.traditional;

  const systemPrompt = `You are an expert e-commerce copywriter specializing in Indian artisanal and natural food products. 
Your task is to write a compelling, SEO-optimized product description for platforms like Amazon India and Flipkart.

Tone instruction: ${toneInstruction}

Rules:
- Write exactly 3 paragraphs
- First paragraph: Hook + product identity (2-3 sentences)
- Second paragraph: Key features, ingredients, and benefits (3-4 sentences)  
- Third paragraph: Usage suggestion + call to action (2 sentences)
- Include relevant keywords naturally for SEO
- Do NOT use bullet points — write in flowing prose only
- Keep total length between 120-180 words
- Sound human and authentic, not robotic`;

  const userPrompt = `Generate a product description for:
Product Name: ${productName}
Key Ingredients: ${ingredients}
Weight/Size: ${weight}
Features/USPs: ${features}

Write the description now:`;

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: systemPrompt }]
      },
      contents: [
        { role: "user", parts: [{ text: userPrompt }] }
      ],
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 400,
      }
    })
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err?.error?.message || "Gemini API error");
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) throw new Error("Empty response from Gemini");
  return text.trim();
}
