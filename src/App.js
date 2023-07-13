// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AddProductPage from './components/AddProductPage';
import ProductList from './components/ProductList';
import EnquiriesPage from './components/EnquiriesPage'


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/admin" element={<Home />} />
        <Route path="/admin/add-product" element={<AddProductPage />} />
        <Route path="/admin/product-list" element={<ProductList />} />
        <Route path="/admin/enquiries" element={<EnquiriesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
