import React, { useState } from 'react';
import '../styles/login.css'
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/login', {
                username,
                password
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const token = response.data.token;
            localStorage.setItem('token', token);
            setMessage('Login successful!');
            navigate('/profile');
        } catch (err) {
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
                {error && <p className="error">{error}</p>}
                <button className="button-login" type="submit">Login</button>
            </form>
            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default LoginPage;