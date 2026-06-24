const express = require("express");
const router = express.Router();

// In-memory data store
let products = [
    { id: 1, name: "Himalayan Honey 500g", category: "Honey", weight: "500g", ingredients: "Pure raw honey", features: "Rich in antioxidants, natural enzymes", tone: "Premium" },
    { id: 2, name: "Cold-Pressed Mustard Oil 1L", category: "Oils", weight: "1L", ingredients: "100% mustard seeds", features: "No preservatives, cold-pressed", tone: "Traditional" },
    { id: 3, name: "Organic Turmeric Powder 200g", category: "Spices", weight: "200g", ingredients: "Organic turmeric", features: "High curcumin content, no additives", tone: "Health-Focused" },
    { id: 4, name: "Mountain Berry Jam 300g", category: "Preserves", weight: "300g", ingredients: "Wild Himalayan berries, sugar", features: "No artificial flavors or colors", tone: "Premium" },
];

let nextId = 5;

// GET /api/products — list all
router.get("/", (req, res) => {
    res.status(200).json({ success: true, count: products.length, data: products });
});

// GET /api/products/search?q= — search
router.get("/search", (req, res) => {
    const q = req.query.q?.toLowerCase() || "";
    const results = products.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
    res.status(200).json({ success: true, count: results.length, data: results });
});

// GET /api/products/:id — single product
router.get("/:id", (req, res) => {
    const product = products.find((p) => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, data: product });
});

// POST /api/products — create
router.post("/", (req, res) => {
    const { name, category, weight, ingredients, features, tone } = req.body;
    if (!name || !category) {
        return res.status(400).json({ success: false, message: "Name and category are required" });
    }
    const newProduct = { id: nextId++, name, category, weight, ingredients, features, tone };
    products.push(newProduct);
    res.status(201).json({ success: true, data: newProduct });
});

// PUT /api/products/:id — update
router.put("/:id", (req, res) => {
    const index = products.findIndex((p) => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ success: false, message: "Product not found" });
    products[index] = { ...products[index], ...req.body };
    res.status(200).json({ success: true, data: products[index] });
});

// DELETE /api/products/:id — delete
router.delete("/:id", (req, res) => {
    const index = products.findIndex((p) => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ success: false, message: "Product not found" });
    products.splice(index, 1);
    res.status(204).send();
});

module.exports = router;