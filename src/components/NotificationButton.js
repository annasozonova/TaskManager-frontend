import React, { useEffect, useState } from 'react';
import { Badge, Button, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import '../styles/notificationsStyles.css';
import { getAllNotifications, getUnreadNotifications, markNotificationAsRead } from "../services/apiService";
import { useNavigate } from 'react-router-dom';

const NotificationButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [unreadNotifications, setUnreadNotifications] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const token = localStorage.getItem('token');
                const allNotificationsData = await getAllNotifications(token);
                const unreadNotificationsData = await getUnreadNotifications(token);
                setNotifications(allNotificationsData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
                setUnreadNotifications(unreadNotificationsData);
            } catch (err) {
                setError('Error fetching notifications: ' + err.message);
            }
        };

        fetchNotifications();
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMarkAsRead = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await markNotificationAsRead(id, token);
            setNotifications(notifications.map(notification =>
                notification.id === id ? { ...notification, read: true } : notification
            ));
            setUnreadNotifications(unreadNotifications.filter(notification => notification.id !== id));
        } catch (error) {
            console.error('Failed to mark notification as read:', error);
        }
    };

    const handleRedirect = (notification) => {
        if (notification.type === 'TASK') {
            navigate(`/tasks?highlightedTaskId=${notification.referenceId}`);
        } else if (notification.type === 'COMMENT') {
            navigate(`/tasks?highlightedTaskId=${notification.referenceId}&view=comments`);
        } else if (notification.type === 'USER') {
            navigate(`/users?highlightedUserId=${notification.referenceId}`);
        }
    };

    return (
        <div className="notification-button">
            <IconButton color="inherit" onClick={handleClick}>
                <Badge badgeContent={unreadNotifications.length} color="secondary">
                    <NotificationsIcon style={{ fontSize: 32 }} />
                </Badge>
            </IconButton>
            <Menu
                id="notification-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className='notification-menu'
            >
                {notifications.slice(0, 5).map((notification) => (
                    <MenuItem
                        key={notification.id}
                        onClick={() => {
                            if (!notification.read) {
                                handleMarkAsRead(notification.id);
                            }
                            handleRedirect(notification);
                        }}
                        className={`notification-menu-item ${notification.read ? 'read-notification' : 'unread-notification'}`}
                    >
                        <Typography className="notification-text">
                            {notification.message}
                        </Typography>
                    </MenuItem>
                ))}
                <MenuItem>
                    <Button fullWidth onClick={() => navigate('/notifications')}>
                        Show all notifications
                    </Button>
                </MenuItem>
                {error && <MenuItem>{error}</MenuItem>}
            </Menu>
        </div>
    );
};

export default NotificationButton;