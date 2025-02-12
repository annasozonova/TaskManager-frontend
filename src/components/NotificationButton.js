import React, { useEffect, useState } from 'react';
import { Badge, Button, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import '../styles/notificationsStyles.css';
import { getAllNotifications, getUnreadNotifications } from "../services/apiService";
import {useLocation, useNavigate} from 'react-router-dom';

const NotificationButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [unreadNotifications, setUnreadNotifications] = useState([]);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

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

        fetchNotifications().then(() => {
            console.log("Данные загружены");
        });
        const interval = setInterval(fetchNotifications, 60000);
        return () => clearInterval(interval);
    }, [location.pathname]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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

        handleClose();
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
                        maxWidth: '400px', // Ограничим, чтобы не раздувалось на больших экранах
                        borderRadius: '10px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)', // Мягкая тень
                        backgroundColor: 'white',
                    }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }} // Ориентируем на кнопку
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} // Привязываем к кнопке
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
                        handleClose();
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