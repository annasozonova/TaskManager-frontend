import React, { useEffect, useState } from 'react';
import { getAllNotifications, markNotificationAsRead } from '../services/apiService';
import '../styles/notificationsStyles.css';
import {useNavigate, useLocation} from "react-router-dom";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const token = localStorage.getItem('token');
                const notificationsData = await getAllNotifications(token);

                console.log("Fetched notifications:", notificationsData);

                notificationsData.forEach(n => {
                    if (!n.referenceId) {
                        console.warn("Notification without referenceId:", n);
                    }
                });

                setNotifications(notificationsData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
            } catch (err) {
                setError('Error fetching notifications: ' + err.message);
            } finally {
                setLoading(false);
            }
        };


        fetchNotifications();
        const interval = setInterval(fetchNotifications, 60000);
        return () => clearInterval(interval);
    }, []);

    const handleMarkAsRead = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await markNotificationAsRead(id, token);
            setNotifications(prevNotifications =>
                prevNotifications.map(n =>
                    n.id === id ? { ...n, read: true } : n
                )
            );
        } catch (error) {
            console.error('Failed to mark notification as read:', error);
        }
    };

    const handleRedirect = (notification) => {
        console.log("Handling notification click:", notification);

        if (!notification.referenceId) {
            console.error("No reference ID found in notification", notification);
            return;
        }

        console.log(`Navigating to: /tasks?highlightedTaskId=${notification.referenceId}`);

        if (notification.type === 'TASK') {
            navigate(`/tasks?highlightedTaskId=${notification.referenceId}`);
            console.log("Current location after navigation:", location.pathname);
        } else if (notification.type === 'USER') {
            navigate(`/users?highlightedUserId=${notification.referenceId}`);
            console.log("Current location after navigation:", location.pathname);
        }
    };



    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="notifications-page">
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notification) => (
                    console.log("Rendering notification:", notification),
                    <li
                        key={notification.id}
                        className={notification.read ? 'read-notification' : 'unread-notification'}
                        onClick={() => {
                            handleRedirect(notification);
                            if (!notification.read) {
                                handleMarkAsRead(notification.id);
                            }
                        }}
                        style={{ cursor: 'pointer' }}
                    >
                        <span className="notification-text">
                            {notification.message}
                        </span>
                        {!notification.read && (
                            <button className="mark-as-read-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleMarkAsRead(notification.id)
                                    }}>
                                Mark as read
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
