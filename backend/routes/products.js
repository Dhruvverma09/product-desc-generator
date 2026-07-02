const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// HimShakti real product catalog
const HIMSHAKTI_PRODUCTS = [
    {
        name: "Barnyard Millet Namkeen",
        category: "Millet Snacks",
        weight: "200g",
        ingredients: "Barnyard millet, mustard oil, rock salt, cumin, dried chilli",
        features: "Gluten-free, high fibre, no maida, traditional Pahadi recipe, FSSAI certified",
        tone: "Health-Focused",
    },
    {
        name: "Finger Millet (Mandua) Cookies",
        category: "Millet Snacks",
        weight: "150g",
        ingredients: "Finger millet flour, jaggery, ghee, cardamom",
        features: "No refined sugar, no preservatives, made with local jaggery, rich in calcium and iron",
        tone: "Health-Focused",
    },
    {
        name: "Himalayan Kafal (Bay Berry) Pickle",
        category: "Fruit Pickles",
        weight: "250g",
        ingredients: "Wild kafal berries, mustard oil, himalayan rock salt, local spices",
        features: "Wild-harvested, no artificial preservatives, traditional slow-fermented, unique to Uttarakhand",
        tone: "Traditional",
    },
    {
        name: "Raw Apricot & Ginger Pickle",
        category: "Fruit Pickles",
        weight: "300g",
        ingredients: "Fresh apricots, ginger, mustard seeds, turmeric, himalayan salt",
        features: "Sun-ripened fruit, no vinegar, no artificial colour, grandma recipe, 6-month shelf life",
        tone: "Traditional",
    },
    {
        name: "Buransh (Rhododendron) Juice",
        category: "Juices",
        weight: "500ml",
        ingredients: "Wild Rhododendron arboreum flowers, water, natural sugar",
        features: "Handpicked at 2000m altitude, antioxidant rich, no artificial colour, seasonal limited batch",
        tone: "Premium",
    },
    {
        name: "Himalayan Wildflower Honey",
        category: "Honey",
        weight: "500g",
        ingredients: "100% raw wildflower honey from Uttarakhand forests",
        features: "Unfiltered, cold-extracted, no preservatives, lab tested, FSSAI certified, hand-harvested",
        tone: "Premium",
    },
];

// GET /api/products — list all
router.get("/", async (req, res, next) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: products.length, data: products });
    } catch (err) { next(err); }
});

// GET /api/products/seed — insert HimShakti demo products
router.get("/seed", async (req, res, next) => {
    try {
        await Product.deleteMany({});
        const inserted = await Product.insertMany(HIMSHAKTI_PRODUCTS);
        res.status(201).json({ success: true, message: `Seeded ${inserted.length} HimShakti products`, data: inserted });
    } catch (err) { next(err); }
});

// GET /api/products/search?q=
router.get("/search", async (req, res, next) => {
    try {
        const q = req.query.q || "";
        const products = await Product.find({
            $or: [
                { name: { $regex: q, $options: "i" } },
                { category: { $regex: q, $options: "i" } },
            ],
        });
        res.status(200).json({ success: true, count: products.length, data: products });
    } catch (err) { next(err); }
});

// GET /api/products/:id — single
router.get("/:id", async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });
        res.status(200).json({ success: true, data: product });
    } catch (err) { next(err); }
});

// POST /api/products — create
router.post("/", async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({ success: true, data: product });
    } catch (err) {
        if (err.name === "ValidationError") {
            return res.status(400).json({ success: false, message: err.message });
        }
        next(err);
    }
});

// PUT /api/products/:id — update
router.put("/:id", async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });
        res.status(200).json({ success: true, data: product });
    } catch (err) { next(err); }
});

// DELETE /api/products/:id
router.delete("/:id", async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });
        res.status(204).send();
    } catch (err) { next(err); }
});

module.exports = router;


// GET /api/products/search?q=
router.get("/search", async (req, res, next) => {
    try {
        const q = req.query.q || "";
        const products = await Product.find({
            $or: [
                { name: { $regex: q, $options: "i" } },
                { category: { $regex: q, $options: "i" } },
            ],
        });
        res.status(200).json({ success: true, count: products.length, data: products });
    } catch (err) { next(err); }
});

// GET /api/products/:id — single
router.get("/:id", async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });
        res.status(200).json({ success: true, data: product });
    } catch (err) { next(err); }
});

// POST /api/products — create
router.post("/", async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({ success: true, data: product });
    } catch (err) {
        if (err.name === "ValidationError") {
            return res.status(400).json({ success: false, message: err.message });
        }
        next(err);
    }
});

// PUT /api/products/:id — update
router.put("/:id", async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });
        res.status(200).json({ success: true, data: product });
    } catch (err) { next(err); }
});

// DELETE /api/products/:id
router.delete("/:id", async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });
        res.status(204).send();
    } catch (err) { next(err); }
});

module.exports = router;