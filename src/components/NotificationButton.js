import React, { useEffect, useState } from 'react';
import { Badge, Button, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import '../styles/notificationsStyles.css';
import { getAllNotifications, getUnreadNotifications } from "../services/apiService";
import { useLocation, useNavigate } from 'react-router-dom';

const NotificationButton = () => {
    // State hooks to manage menu anchor element, notifications, unread notifications, and error state
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [unreadNotifications, setUnreadNotifications] = useState([]);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                // Fetch all notifications and unread notifications
                const token = localStorage.getItem('token');
                const allNotificationsData = await getAllNotifications(token);
                const unreadNotificationsData = await getUnreadNotifications(token);
                // Sort notifications by timestamp
                setNotifications(allNotificationsData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
                setUnreadNotifications(unreadNotificationsData);
            } catch (err) {
                setError('Error fetching notifications: ' + err.message); // Set error message if fetching fails
            }
        };

        fetchNotifications().then(() => {
            console.log("Data loaded");
        });
        // Refresh notifications every 60 seconds
        const interval = setInterval(fetchNotifications, 60000);
        return () => clearInterval(interval);
    }, [location.pathname]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget); // Open menu
    };

    const handleClose = () => {
        setAnchorEl(null); // Close menu
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

        handleClose(); // Close menu after redirect
    };

    return (
        <div className="notification-button">
            <IconButton color="inherit" onClick={handleClick}>
                <Badge badgeContent={unreadNotifications.length} color="secondary">
                    <NotificationsIcon style={{ fontSize: 32 }} />
                </Badge>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        width: '40%',
                        maxWidth: '400px', // Limit max width to prevent overexpansion on large screens
                        borderRadius: '10px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)', // Soft shadow
                        backgroundColor: 'white',
                    }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }} // Align menu to button
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} // Align menu to button
            >
                {notifications.slice(0, 5).map((notification) => (
                    <MenuItem
                        key={notification.id}
                        className={`notification-menu-item ${notification.read ? 'read-notification' : 'unread-notification'}`}
                        onClick={() => {
                            handleRedirect(notification);
                        }}
                        style={{ cursor: 'pointer' }}
                    >
                        <Typography className="notification-text">
                            {notification.message}
                        </Typography>
                    </MenuItem>
                ))}
                <MenuItem>
                    <Button fullWidth onClick={() => {
                        navigate('/notifications');
                        handleClose(); // Close menu after navigating to notifications
                    }}
                    >
                        Show all notifications
                    </Button>
                </MenuItem>
                {error && <MenuItem>{error}</MenuItem>}
            </Menu>
        </div>
    );
};

export default NotificationButton;
