import React, { useState, useEffect } from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';

const Update = () => {
    const [state, setState] = useState({
        name: '',
        description: '',
        slug: '',
        price: ''
    });
 
   
    let { slug }  = useParams()
    let navigate = useNavigate()
    const { name, description, price } = state;
    
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/product/${slug}`)
            .then(response => {
                const { name, description, slug, price } = response.data;
                setState({ ...state, name, description, slug, price });
            })
            .catch(error => alert('Error loading single product'));
    }, []);

    const handleChange = name => event => {
        // console.log('name', name, 'event', event.target.value);
        setState({ ...state, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        // console.table({ title, content, user });
        axios
            .put(`${process.env.REACT_APP_API}/product/${slug}`, { name, description, price })
            .then(response => {
                console.log(response);
                const { name, description, slug, price } = response.data;
               
                setState({ ...state, name, description, slug, price });
                navigate('/')
                
                // show sucess alert
                // alert(`Post titled ${title} is updated`);
            })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.error);
            });
    };

    const showUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    onChange={handleChange('name')}
                    value={name}
                    type="text"
                    className="form-control"
                    placeholder="Product name"
                    required
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea
                    onChange={handleChange('description')}
                    value={description}
                    type="text"
                    className="form-control"
                    placeholder="Write something.."
                    required
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Price</label>
                <input
                    onChange={handleChange('price')}
                    value={price}
                    type="text"
                    className="form-control"
                    placeholder="product price"
                    required
                />
            </div>
            <div>
                <button className="btn btn-primary">Update</button>
            </div>
        </form>
    );
  return (
    <div className="container pb-5">
            <Nav />
            <br />
            <h1>UPDATE Product</h1>
            {showUpdateForm()}
        </div>
    
  )
}

export default Update