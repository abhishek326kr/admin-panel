const mongoose = require('mongoose');

const productDataSchema = new mongoose.Schema({
  productTitle: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productImage: {
    type: [String], // Updated to allow an array of strings
    required: true,
  },
  productDescription: {
    type: String, // Added productDescription field
    required: true,
  },
});

productDataSchema.statics.findProductData = async function () {
  try {
    const productData = await this.find();
    return productData;
  } catch (error) {
    throw new Error('Failed to retrieve product data');
  }
};

// Static method to delete product by ID
productDataSchema.statics.deleteProductById = async function (productId) {
  try {
    await this.findByIdAndDelete(productId);
  } catch (error) {
    throw new Error('Failed to delete product data');
  }
};

const ProductData = mongoose.model('ProductData', productDataSchema);

module.exports = ProductData;
