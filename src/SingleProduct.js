import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';

const SingleProduct = () => {

    const [product, setProduct] = useState('');
    let { slug } = useParams();
    console.log(slug);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/product/${slug}`)
            .then(response => setProduct(response.data))
            // .then(response => console.log(response))
            .catch(error => alert('Error loading single product'));
    }, [slug]);

    return (

        <div className="container pb-5">
            <Nav />
            <br />
            <h1>{product.name}</h1>
            <p classname="lead">{product.description.substring(0, 100)}</p>
            <p>Price: ${product.price}</p>
        </div>
    );
};

export default SingleProduct;