const express = require('express');
const router = express.Router();
const Description = require('../models/Description');

// Tone prompts (moved from frontend to server — more secure)
const TONE_PROMPTS = {
  premium:
    'Use sophisticated, elevated language that emphasizes exclusivity, craftsmanship, and luxury positioning.',
  traditional:
    'Use warm, authentic, heritage-driven language. Emphasize roots, tradition, and cultural authenticity.',
  health:
    'Use clean, health-conscious language. Emphasize natural ingredients and wellness outcomes.',
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/descriptions/generate
// Calls Groq API, saves result to MongoDB, returns the description
// ─────────────────────────────────────────────────────────────────────────────
router.post('/generate', async (req, res) => {
  try {
    const { productName, ingredients, weight, features, tone } = req.body;

    // Validate required fields
    if (!productName || !ingredients || !weight || !features) {
      return res.status(400).json({ error: 'All product fields are required.' });
    }

    const toneInstruction = TONE_PROMPTS[tone] || TONE_PROMPTS.traditional;

    const prompt = `You are an expert e-commerce copywriter for Indian artisanal food products.

Tone: ${toneInstruction}

Write a product description for:
- Product: ${productName}
- Ingredients: ${ingredients}
- Weight: ${weight}
- Features: ${features}

Rules: 3 paragraphs, 120-180 words, no bullet points, SEO-optimized, flowing prose only.`;

    // Call Groq API (API key is safely on the server)
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 400,
        temperature: 0.8,
      }),
    });

    if (!groqResponse.ok) {
      const errData = await groqResponse.json();
      return res.status(502).json({ error: errData?.error?.message || 'Groq API error' });
    }

    const groqData = await groqResponse.json();
    const generatedDescription = groqData?.choices?.[0]?.message?.content?.trim();

    if (!generatedDescription) {
      return res.status(502).json({ error: 'Empty response from Groq API' });
    }

    // Save to MongoDB
    const newEntry = new Description({
      productName,
      ingredients,
      weight,
      features,
      tone: tone || 'traditional',
      generatedDescription,
      wordCount: generatedDescription.split(/\s+/).length,
    });

    await newEntry.save();
    console.log(`💾 Saved: "${productName}" (${newEntry.wordCount} words)`);

    res.status(201).json({
      _id: newEntry._id,
      generatedDescription: newEntry.generatedDescription,
      wordCount: newEntry.wordCount,
      createdAt: newEntry.createdAt,
    });
  } catch (err) {
    console.error('❌ Generate error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/descriptions/history
// Fetch the last 10 saved descriptions from MongoDB
// ─────────────────────────────────────────────────────────────────────────────
router.get('/history', async (req, res) => {
  try {
    const history = await Description.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('productName tone wordCount createdAt generatedDescription');

    res.json(history);
  } catch (err) {
    console.error('❌ History error:', err.message);
    res.status(500).json({ error: 'Could not fetch history' });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/descriptions/:id
// Delete a saved description by its MongoDB _id
// ─────────────────────────────────────────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Description.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Description not found' });
    }
    console.log(`🗑️  Deleted: ${req.params.id}`);
    res.json({ message: 'Deleted successfully', id: req.params.id });
  } catch (err) {
    console.error('❌ Delete error:', err.message);
    res.status(500).json({ error: 'Could not delete description' });
  }
});

module.exports = router;
