const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, "Product name is required"], trim: true },
        category: {
            type: String,
            required: [true, "Category is required"],
            enum: ["Millet Snacks", "Fruit Pickles", "Juices", "Honey", "Spices", "Preserves", "Other"]
        },
        weight: { type: String, trim: true },
        ingredients: { type: String, trim: true },
        features: { type: String, trim: true },
        tone: { type: String, enum: ["Premium", "Traditional", "Health-Focused"], default: "Traditional" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);