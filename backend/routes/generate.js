const express = require("express");
const router = express.Router();
const GeneratedDescription = require("../models/GeneratedDescription");

router.post("/", async (req, res, next) => {
    try {
        const { name, category, weight, ingredients, features, tone } = req.body;

        if (!name || !tone) {
            return res.status(400).json({
                success: false,
                message: "Product name and tone are required"
            });
        }

        const prompt = `You are an expert e-commerce copywriter for Indian food products on Amazon and Flipkart.

Generate a compelling product description for:
- Product Name: ${name}
- Category: ${category || "Food"}
- Weight: ${weight || "Not specified"}
- Ingredients: ${ingredients || "Not specified"}
- Key Features: ${features || "Not specified"}
- Tone: ${tone}
  - Premium = luxury, high-end feel
  - Traditional = heritage, authentic Himalayan roots
  - Health-Focused = wellness, natural, organic feel

Write a 3-4 sentence product description. Be specific, persuasive, mention Amazon/Flipkart suitability. No bullet points, just paragraph.`;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                        maxOutputTokens: 1024,
                        temperature: 0.7,
                        thinkingConfig: { thinkingBudget: 0 }
                    }
                }),
            }
        );
        const geminiData = await response.json();

        if (!response.ok) {
            console.error("Gemini API Error:", geminiData);
            return res.status(500).json({
                success: false,
                message: geminiData.error?.message || "Gemini API failed"
            });
        }

        const description = geminiData.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

        if (!description) {
            return res.status(500).json({ success: false, message: "AI generation failed" });
        }

        const saved = await GeneratedDescription.create({
            productName: name, tone, description, category
        });

        res.status(200).json({
            success: true,
            data: { productName: name, tone, description, id: saved._id }
        });

    } catch (err) { next(err); }
});

// GET history
router.get("/history", async (req, res, next) => {
    try {
        const history = await GeneratedDescription.find()
            .sort({ createdAt: -1 })
            .limit(20);
        res.status(200).json({ success: true, count: history.length, data: history });
    } catch (err) { next(err); }
});

module.exports = router;