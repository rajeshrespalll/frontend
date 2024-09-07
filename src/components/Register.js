// src/components/Register.js
import React, { useState } from 'react';
import { register } from '../helpers/auth';
import { useNavigate } from 'react-router-dom';
import Nav from '../Nav';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Call the register helper function
            await register(name, email, password, () => {
                // On successful registration, redirect to the homepage
                navigate('/login');
            });
        } catch (err) {
            // Handle registration errors
            setError(err.msg || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="container p-5">
        <Nav title="Register Page" name="124" />
            <h1>Register new user</h1>
            <br />
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Register</button>
        </form>
        </div>
    );
};

export default Register;
