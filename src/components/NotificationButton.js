import React, { useState } from 'react';
import { Badge, IconButton, Menu, MenuItem } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import '../styles/notificationButtonStyles.css';

const NotificationButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="notification-button">
            <IconButton color="inherit" onClick={handleClick}>
                <Badge badgeContent={4} color="secondary"> {/* Пример с числом уведомлений */}
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Menu
                id="notification-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Notification 1</MenuItem>
                <MenuItem onClick={handleClose}>Notification 2</MenuItem>
                <MenuItem onClick={handleClose}>Notification 3</MenuItem>
                <MenuItem onClick={handleClose}>Notification 4</MenuItem>
            </Menu>
        </div>
    );
};

export default NotificationButton;
