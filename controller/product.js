const express = require('express');
const productRoutere = express.Router();
const Product = require('../model/productModel');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Helper function: wraps cloudinary's upload_stream in a promise
const uploadToCloudinary = (buffer, folder = 'products') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    );
    stream.end(buffer);
  });
};

productRoutere.get('/', async (req, res) => {
    try {
      // Retrieve all products from the database
      const products = await Product.find({});
      // Send the products as JSON to the front end
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });

  productRoutere.get('/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

productRoutere.post('/upload', async (req, res) => {
  try {
    const {
      itemName,
      description,
      price,
      quantity,
      keywords,
      sizes,
      story,
      videoUrl
    } = req.body;
    
    // Convert comma-separated strings to arrays
    const keywordsArray = typeof keywords === 'string'
      ? keywords.split(',').map(k => k.trim())
      : [];
    const sizesArray = typeof sizes === 'string'
      ? sizes.split(',').map(s => s.trim())
      : [];

    // Ensure the images are present in req.files
    if (!req.files || !req.files.image1 || !req.files.image2 || !req.files.image3) {
      return res.status(400).json({ message: 'All three images are required.' });
    }

    // Upload each image using Cloudinary's upload_stream
    const [result1, result2, result3] = await Promise.all([
      uploadToCloudinary(req.files.image1.data, 'products'),
      uploadToCloudinary(req.files.image2.data, 'products'),
      uploadToCloudinary(req.files.image3.data, 'products'),
    ]);

    // Use the secure URLs returned from Cloudinary as image paths
    const image1 = result1.secure_url;
    const image2 = result2.secure_url;
    const image3 = result3.secure_url;

    // Create a new product document with all data and Cloudinary URLs
    const newProduct = new Product({
      itemName,
      description,
      price,
      quantity,
      keywords: keywordsArray,
      sizes: sizesArray,
      story,
      videoUrl,
      image1,
      image2,
      image3
    });

    // Save the product to MongoDB
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



module.exports = productRoutere;
