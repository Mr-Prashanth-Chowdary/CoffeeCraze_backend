const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    // Store keywords as an array of strings
    keywords: {
      type: [String],
      required: true,
    },
    // Store available sizes as an array of strings
    sizes: {
      type: [String],
      required: true,
    },
    story: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    // Assuming you will store the image file paths or URLs
    image1: {
      type: String,
      required: true,
    },
    image2: {
      type: String,
      required: true,
    },
    image3: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Product', productSchema);
