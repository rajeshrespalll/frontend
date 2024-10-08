// src/components/Login.js
import React, { useState } from 'react';
import Nav from '../Nav';
import axios from 'axios';
import { authenticate } from '../helpers/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/login`, { email, password });
            
            authenticate(response.data, () => {
                navigate('/'); // Redirect after successful login
            });
        } catch (error) {
            console.error('Login error:', error.response.data);
        }
    };

    return (
        <div className="container p-5">
        <Nav title="Login Page" name="124" />
            <h1>Login</h1>
            <br />
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Login</button>
        </form>
        </div>
    );
};

export default Login;
