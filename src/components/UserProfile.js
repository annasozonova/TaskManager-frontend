import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../styles/userProfileStyles.css';

const UserProfile = () => {
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/api/user/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setProfile(response.data);
            } catch (err) {
                setError('Error fetching profile: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile().then(() => {
            console.log("Данные загружены");
        });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="profile">
            <h2>User Profile</h2>
                <div>
                    <p><strong>Username:</strong> {profile.username}</p>
                    <p><strong>Password:</strong> ••••••••</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Technologies:</strong> {profile?.qualification.technologies}</p>
                    <p><strong>Full Name:</strong> {profile.firstName + ' ' + profile.lastName}</p>
                    <p><strong>Department:</strong> {profile.department?.name}</p>
                    <p><strong>Role:</strong> {profile.role}</p>
                    <button className="edit-btn" onClick={() => navigate('/settings')}>Edit</button>
                </div>
        </div>
    );
};

export default UserProfile;
