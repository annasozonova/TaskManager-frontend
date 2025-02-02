import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/userProfileStyles.css';

const UserProfile = () => {
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/api/employee/profile', {
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

        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put('http://localhost:8080/api/employee/profile', {
                username: profile.username,
                password: profile.password,
                email: profile.email,
                technologies: profile?.qualification.technologies
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setProfile(response.data);
            setEditMode(false);
        } catch (err) {
            setError('Error saving profile: ' + err.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="profile">
            <h2>User Profile</h2>
            {!editMode ? (
                <div>
                    <p><strong>Username:</strong> {profile.username}</p>
                    <p><strong>Password:</strong> ••••••••</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Technologies:</strong> {profile?.qualification.technologies}</p>
                    <p><strong>Full Name:</strong> {profile.firstName + ' ' + profile.lastName}</p>
                    <p><strong>Department:</strong> {profile.department?.name}</p>
                    <p><strong>Role:</strong> {profile.role}</p>
                    <button className="edit-btn" onClick={() => setEditMode(true)}>Edit</button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text" name="username" value={profile.username} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" name="password" value={profile.password || ''} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" name="email" value={profile.email} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label>Technologies:</label>
                        <input type="text" name="technologies" value={profile?.qualification.technologies} onChange={handleInputChange} />
                    </div>
                    <button className="save-btn" onClick={handleSave}>Save</button>
                    <button className="cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
