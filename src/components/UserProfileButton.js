import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import '../styles/userProfileButtonStyles.css';

const UserProfileButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="user-profile-button">
            <Button variant="contained" color="secondary" onClick={handleClick}>
                User
            </Button>
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
                    View Profile
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/settings">
                    Account Settings
                </MenuItem>
            </Menu>
        </div>
    );
};

export default UserProfileButton;
