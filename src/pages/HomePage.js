import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/products`);
            console.log(response);
            setProducts(response.data);
        } catch (error) {
            alert('Error fetching products');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <div className="product-container">
                {products.map(product => (
                    <div key={product.id}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;