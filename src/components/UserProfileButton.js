import React, { useState } from 'react';
import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/userProfileButtonStyles.css';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const UserProfileButton = ({ onLogout }) => {
    // State hook to manage the anchor element for the menu
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget); // Open menu
    };

    const handleClose = () => {
        setAnchorEl(null); // Close menu
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from local storage
        onLogout();
        navigate('/login'); // Navigate to login page
    };

    return (
        <div className="user-profile-button">
            <IconButton color="inherit" onClick={handleClick}>
                <AccountBoxIcon style={{ fontSize: 32 }} />
            </IconButton>
            <Menu
                id="user-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                style={{ marginTop: '10px' }}
                classes={{ paper: 'user-profile-menu' }}
            >
                <MenuItem onClick={handleClose} component={Link} to="/profile">
                    <ListItemIcon>
                        <AccountBoxIcon style={{ marginRight: 8 }} />
                    </ListItemIcon>
                    View Profile
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/settings">
                    <ListItemIcon>
                        <SettingsIcon style={{ marginRight: 8 }} />
                    </ListItemIcon>
                    Account Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <ExitToAppIcon style={{ marginRight: 8 }} />
                    </ListItemIcon>
                    Log Out
                </MenuItem>
            </Menu>
        </div>
    );
};

export default UserProfileButton;
