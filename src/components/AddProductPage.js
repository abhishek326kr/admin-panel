import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AddProductPage = () => {
  const [productImage, setProductImage] = useState(null);
  const [productTitle, setProductTitle] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [products, setProducts] = useState([]);

  // Update the endpoint URL with the correct backend API URL
  const API_URL = 'http://localhost:5000/api/formdata';
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      for (let i = 0; i < productImage.length; i++) {
        formData.append('productImage', productImage[i]);
      }
      formData.append('productTitle', productTitle);
      formData.append('productPrice', productPrice);
      formData.append('productDescription', productDescription); // Add productDescription to the form data

      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Form data saved successfully.');
        // Reset form fields if needed
        setProductImage(null);
        setProductTitle('');
        setProductPrice('');
        setProductDescription('');

        // Redirect to the Product List page
        navigate('/admin/product-list');
      } else {
        console.error('Failed to save form data.');
      }
    } catch (error) {
      console.error('Error occurred during form submission:', error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleImageChange = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);
    setProductImage(fileArray);
  };

  return (
    <div className="container">
      <div className="center">
        <h1>Add product</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="productImage">
            <Form.Label>Product Image (5 Images)</Form.Label>
            <Form.Control type="file" multiple onChange={handleImageChange} />
          </Form.Group>

          <Form.Group controlId="productTitle">
            <Form.Label>Product Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product title"
              value={productTitle}
              onChange={(event) => setProductTitle(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="productPrice">
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter product price"
              value={productPrice}
              onChange={(event) => setProductPrice(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="productDescription">
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter product description"
              value={productDescription}
              onChange={(event) => setProductDescription(event.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" size="lg">
            <FaPlus /> Add
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddProductPage;
