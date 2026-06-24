const express = require("express");
const router = express.Router();

// POST /api/generate — generate description
router.post("/", (req, res) => {
    const { name, category, weight, ingredients, features, tone } = req.body;

    if (!name || !tone) {
        return res.status(400).json({ success: false, message: "Product name and tone are required" });
    }

    // Mock AI response (Groq API Week 5 mein connect hoga)
    const toneMap = {
        Premium: `Experience the finest ${name} — crafted for those who demand excellence. ${features ? `Featuring ${features}.` : ""} Perfect for premium e-commerce listings.`,
        Traditional: `Discover the authentic taste of ${name}, made with time-honoured traditions. ${features ? `${features}.` : ""} A trusted choice for every household.`,
        "Health-Focused": `Nourish your body with ${name} — a natural, health-conscious choice. ${features ? `${features}.` : ""} Ideal for wellness-focused shoppers on Amazon & Flipkart.`,
    };

    const description = toneMap[tone] || `${name} — ${features || "A quality product from the Himalayas."}`;

    res.status(200).json({
        success: true,
        data: {
            productName: name,
            tone,
            description,
        },
    });
});

module.exports = router;