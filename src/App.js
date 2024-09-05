import './App.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './Nav';
import { Link } from 'react-router-dom';

 const App = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = () => {
    axios
    .get(`${process.env.REACT_APP_API}/products`)
    .then(response => {
      console.log(response);
      setProducts(response.data);
    })
    .catch(error => alert('Error fetching products'));
  };
  useEffect(() => {
    fetchProducts();
  }, []); 

  return (
      <div className="container pb-5">
        <Nav title="E-commerce" name="Home" />
        <br />
        <h1 className="text-center">Products</h1>
        {(products.length > 0) ? products.map((product, i) =>  (
          <div className="row" key={product._id} style={{borderBottom: '1px solid silver'}}>
            <div className="col pt-3 pb-2">
              <Link to={`/product/${product.slug}`}>
              <h2>{product.name}</h2>
              </Link>
              <p className="lead">{product.description.substring(0, 100)}</p>
              <p>Price: ${product.price}</p>
            </div>
          </div>

          )) : <h1>No products</h1>}
        </div>
  );
}

export default App;