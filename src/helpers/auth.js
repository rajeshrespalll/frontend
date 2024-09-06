// src/helpers/auth.js
import axios from 'axios';
// Save the token and user information in sessionStorage
export const authenticate = (response, next) => {
    if (typeof window !== 'undefined') {
        sessionStorage.setItem('token', JSON.stringify(response.token)); // Save the JWT token
        sessionStorage.setItem('user', JSON.stringify(response.user)); // Save the user information (e.g., name)
    }
    next();
};

// Get the token from sessionStorage
export const getToken = () => {
    if (typeof window !== 'undefined') {
        const token = sessionStorage.getItem('token');
        if (token) {
            return JSON.parse(token); // Return the parsed token
        } else {
            return false; // No token available
        }
    }
};

// Get the user information from sessionStorage
export const getUser = () => {
    if (typeof window !== 'undefined') {
        const user = sessionStorage.getItem('user');
        if (user) {
            return JSON.parse(user); // Return the parsed user data
        } else {
            return false; // No user available
        }
    }
};

// Clear the token and user information from sessionStorage on logout
export const logout = (next) => {
    if (typeof window !== 'undefined') {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
    }
    next();
};

// Register helper function
export const register = async (name, email, password, next) => {
    try {
        // Send a POST request to register the user
        const response = await axios.post(`${process.env.REACT_APP_API}/register`, {
            name,
            email,
            password
        });

        // Call authenticate to save the token and user data in sessionStorage
        authenticate(response.data, next);

        return response.data; // Return the response data
    } catch (error) {
        console.error('Registration error:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : error.message; // Throw the error to be handled in the component
    }
};