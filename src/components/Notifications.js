import React, { useEffect, useState } from 'react';
import { getEmployeeNotifications } from '../services/apiService';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const token = localStorage.getItem('token');
                const notificationsData = await getEmployeeNotifications(token);
                setNotifications(notificationsData);
            } catch (err) {
                setError('Error fetching notifications: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notification) => (
                    <li key={notification.id}>{notification.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
