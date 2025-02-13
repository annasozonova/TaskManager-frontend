import React, { useState } from 'react';
import '../styles/login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLoginSuccess }) => {
    // State hooks to manage form fields and error message
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Send login request to API
            const response = await axios.post('http://localhost:8080/api/login', {
                username,
                password
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // Store the received token in local storage
            const token = response.data.token;
            localStorage.setItem('token', token);
            onLoginSuccess(); // Notify parent component about successful login
            navigate('/profile'); // Navigate to profile page
        } catch (err) {
            // Set error message if login fails
            setError('Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <h2 className="h2">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-group label" htmlFor="username">Username:</label>
                    <input
                        className="form-group input"
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-group label" htmlFor="password">Password:</label>
                    <input
                        className="form-group input"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>} {/* Display error message */}
                <button className="button-login" type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
