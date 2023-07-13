const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ProductData = require('../models/ProductData');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

// Create GridFS storage engine
const storage = new GridFsStorage({
  url: 'mongodb+srv://kanika:kanika123@cluster0.uljrlvt.mongodb.net/?retryWrites=true&w=majority', // Replace with your MongoDB Atlas connection URL
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: 'uploads', // Name of the collection in MongoDB to store the files
    };
  },
});

// Create the multer middleware using the GridFS storage engine
const upload = multer({ storage }).array('productImage', 5);

// Connect GridFS stream to the MongoDB database
const conn = mongoose.createConnection('mongodb+srv://kanika:kanika123@cluster0.uljrlvt.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads'); // Name of the collection in MongoDB to store the files
});

// Route for handling form submission
router.post('/', async (req, res) => {
  try {
    upload(req, res, async (error) => {
      if (error) {
        console.error('Error occurred during file upload:', error);
        return res.status(500).json({ message: 'Failed to upload images.' });
      }

      const { productTitle, productPrice, productDescription } = req.body;
      const filenames = req.files.map((file) => file.filename);

      const productData = new ProductData({
        productTitle,
        productPrice,
        productDescription,
        productImage: filenames,
      });

      await productData.save();

      res.status(201).json({ message: 'Form data saved successfully.' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Route for handling product data deletion
router.delete('/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    await ProductData.findByIdAndDelete(productId);
    res.status(200).json({ message: 'Product data deleted successfully.' });
  } catch (error) {
    console.error('Failed to delete product data:', error);
    res.status(500).json({ error: 'Failed to delete product data.' });
  }
});

module.exports = router;
