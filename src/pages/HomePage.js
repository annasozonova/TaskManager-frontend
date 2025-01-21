// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <ul>
                <li><Link to="/users">View Users</Link></li>
                <li><Link to="/tasks">View Tasks</Link></li>
            </ul>
        </div>
    );
};

export default HomePage;
