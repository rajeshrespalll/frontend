import React, { useState } from 'react'
import Nav from './Nav';
import axios from 'axios'

const Create = () => {
    const [state, setState] = useState({
        name: '',
        description: '',
        price: ''
    });
    const { name, description, price } = state
    // console.log(title,content,user)

    // function handleChange(name) {

    //     return function (event) {
    //         setState({ ...state, [name]: event.target.value });
    //     };
    // }

    const handleChange = name => event => {
        // console.log('name', name, 'event', event.target.value);
        setState({ ...state, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        // console.table({ title, content, user });
        axios
            .post(`${process.env.REACT_APP_API}/product`, { name, description, price })
            .then(response => {
                console.log(response);
                // empty state
                setState({ ...state, name: '', description: '', price: '' });
                // show sucess alert
                alert(`Product titled ${response.data.title} is created`);
            })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.error);
            });
    };
    console.log(state)
    return (

        <div className="container p-5">
            <Nav title="Create Product" name="124" />
            <h1>CREATE PRODUCT</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">Product Name</label>
                    <input type="text" className="form-control" placeholder="name" required value={name} onChange={handleChange('name')} />
                </div>
                <div className="form-group">
                    <label className="text-muted">description</label>
                    <textarea type="text" className="form-control" placeholder="Write something.." required value={description} onChange={handleChange('description')} />
                </div>
                <div className="form-group">
                    <label className="text-muted">price</label>
                    <input type="text" className="form-control" placeholder="price" required value={price} onChange={handleChange('price')} />
                </div>
                <div>
                    <button className="btn btn-primary">Create</button>
                </div>
            </form>
        </div>
    )
}

export default Create