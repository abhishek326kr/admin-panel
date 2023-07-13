import React from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import './Home.css';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className="container">
      <div className="center">
        <h1>Add product</h1>
        <Link to="/admin/add-product">
          <Button variant="primary" size="lg">
            <FaPlus /> Add
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
