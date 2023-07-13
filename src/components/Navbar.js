import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from './logo.jpeg';
import './Navbar.css';

const NavBar = () => {
  return (
    <Navbar bg="dark" expand="lg">
      <Navbar.Brand as={Link} to="/s">
        <img src={logo} alt="Logo" /> 
        <span>Admin Panel</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/admin/add-product">Add Products</Nav.Link>
          <Nav.Link as={Link} to="/admin/product-list">Products</Nav.Link>
          <Nav.Link as={Link} to="/admin/enquiries">Customer Enquiries</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
