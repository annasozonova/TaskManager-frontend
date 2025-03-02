import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/accountSettingsStyles.css';

const AccountSettings = () => {
    // Initialize state hooks
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Get token from local storage and fetch profile data
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

        // Fetch user profile data when component mounts
        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "technologies") {
            // Update nested "technologies" field
            setProfile(prevProfile => ({
                ...prevProfile,
                qualification: {
                    ...prevProfile.qualification,
                    technologies: value
                }
            }));
        } else {
            setProfile({ ...profile, [name]: value });
        }
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords({ ...passwords, [name]: value });
    };

    const handleSaveProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            // Save updated profile data
            const response = await axios.put('http://localhost:8080/api/user/profile', {
                email: profile.email,
                qualification: {
                    ...profile.qualification,
                    technologies: profile.qualification.technologies
                }
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setProfile(response.data);
            alert('Profile updated successfully');
        } catch (err) {
            setError('Error saving profile: ' + err.message);
        }
    };

    const handleChangePassword = async () => {
        if (passwords.newPassword !== passwords.confirmPassword) {
            setError('New password and confirm password do not match');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            // Change password via API
            await axios.put('http://localhost:8080/api/users/change-password', {
                currentPassword: passwords.currentPassword,
                newPassword: passwords.newPassword
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setError(null);
            alert('Password changed successfully');
        } catch (err) {
            setError('Error changing password: ' + err.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="account-settings">
            <h2>Account Settings</h2>
            <div className="profile-settings">
                <h3>Profile</h3>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={profile.email} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Technologies:</label>
                    <input type="text" name="technologies" value={profile.qualification?.technologies || ''} onChange={handleInputChange} />
                </div>
                <button onClick={handleSaveProfile} className="save-btn">Save Profile</button>
            </div>

            <div className="password-settings">
                <h3>Change Password</h3>
                <div className="form-group">
                    <label>Current Password:</label>
                    <input type="password" name="currentPassword" value={passwords.currentPassword} onChange={handlePasswordChange} />
                </div>
                <div className="form-group">
                    <label>New Password:</label>
                    <input type="password" name="newPassword" value={passwords.newPassword} onChange={handlePasswordChange} />
                </div>
                <div className="form-group">
                    <label>Confirm New Password:</label>
                    <input type="password" name="confirmPassword" value={passwords.confirmPassword} onChange={handlePasswordChange} />
                </div>
                <button onClick={handleChangePassword} className="save-btn">Change Password</button>
            </div>
        </div>
    );
};

export default AccountSettings;
