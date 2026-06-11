const TONE_PROMPTS = {
  premium: "Use sophisticated, elevated language that emphasizes exclusivity, craftsmanship, and luxury positioning.",
  traditional: "Use warm, authentic, heritage-driven language. Emphasize roots, tradition, and cultural authenticity.",
  health: "Use clean, health-conscious language. Emphasize natural ingredients and wellness outcomes.",
};

export async function generateDescription({ productName, ingredients, weight, features, tone }) {
  const toneInstruction = TONE_PROMPTS[tone] || TONE_PROMPTS.traditional;

  const prompt = `You are an expert e-commerce copywriter for Indian artisanal food products.

Tone: ${toneInstruction}

Write a product description for:
- Product: ${productName}
- Ingredients: ${ingredients}
- Weight: ${weight}
- Features: ${features}

Rules: 3 paragraphs, 120-180 words, no bullet points, SEO-optimized, flowing prose only.`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 400,
      temperature: 0.8
    })
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err?.error?.message || "Groq API error");
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error("Empty response");
  return text.trim();
}