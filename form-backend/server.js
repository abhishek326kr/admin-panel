const express = require('express');
const mongoose = require('mongoose');
const formDataRouter = require('./routes/formData');
const cors = require('cors');
const ProductData = require('./models/ProductData');
const path = require('path');

// Create Express app
const app = express();

// Enable CORS middleware
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://kanika:kanika123@cluster0.uljrlvt.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 30000, // Increase the timeout value (in milliseconds)
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Middleware for parsing JSON bodies
app.use(express.json());

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/formdata', formDataRouter);

// GET route handler to retrieve form data
app.get('/api/formdata', async (req, res) => {
  try {
    const formData = await ProductData.find();

    res.status(200).json(formData);
  } catch (error) {
    console.error('Failed to retrieve form data:', error);
    res.status(500).json({ error: 'Failed to retrieve form data.' });
  }
});

// DELETE route handler to delete product data
app.delete('/api/formdata/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    await ProductData.findByIdAndDelete(productId);
    res.status(200).json({ message: 'Product deleted successfully.' });
  } catch (error) {
    console.error('Failed to delete product:', error);
    res.status(500).json({ error: 'Failed to delete product.' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
