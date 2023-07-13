import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/formdata');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/formdata/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Product deleted successfully.');
        fetchProducts();
      } else {
        console.error('Failed to delete product.');
      }
    } catch (error) {
      console.error('Error occurred during product deletion:', error);
    }
  };

  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    } else {
      return `${description.substr(0, maxLength)}...`;
    }
  };

  return (
    <div className="container1">
      <h1>Product List</h1>
      <div className="carddiv">
        {products.map((product) => (
          <div className="card" key={product._id}>
            <Card>
              <Card.Img variant="top" src={`http://localhost:5000/uploads/${product.productImage[0]}`} />

              <Card.Body>
                <Card.Title>{product.productTitle}</Card.Title>
                <Card.Text>Rs: {product.productPrice}</Card.Text>
                <Card.Text>Description: <p>{truncateDescription(product.productDescription, 50)}</p></Card.Text>
                <Button variant="danger" onClick={() => handleDelete(product._id)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
