const mongoose = require('mongoose');

const descriptionSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    ingredients: {
      type: String,
      required: [true, 'Ingredients are required'],
      trim: true,
    },
    weight: {
      type: String,
      required: [true, 'Weight/size is required'],
      trim: true,
    },
    features: {
      type: String,
      required: [true, 'Features are required'],
      trim: true,
    },
    tone: {
      type: String,
      required: true,
      enum: ['premium', 'traditional', 'health'],
      default: 'traditional',
    },
    generatedDescription: {
      type: String,
      required: true,
    },
    wordCount: {
      type: Number,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model('Description', descriptionSchema);
