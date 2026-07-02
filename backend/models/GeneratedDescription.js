const mongoose = require("mongoose");

const generatedDescSchema = new mongoose.Schema(
    {
        productName: { type: String, required: true, trim: true },
        tone: { type: String, required: true, enum: ["Premium", "Traditional", "Health-Focused"] },
        description: { type: String, required: true },
        category: { type: String },
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("GeneratedDescription", generatedDescSchema);