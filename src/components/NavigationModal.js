import React from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TaskIcon from '@mui/icons-material/Assignment';
import ProfileIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import '../styles/navigationModalStyles.css';

const NavigationModal = ({ open, onClose }) => {
    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <div className="navigation-modal">
                <div className="modal-header">
                    <IconButton onClick={onClose} className="close-button">
                        <CloseIcon style={{ fontSize: 32 }} />
                    </IconButton>
                    <span className="modal-title">Task Manager</span>
                </div>
                <List className="modal-list">
                    <ListItem component={Link} to="/dashboard" onClick={onClose}>
                        <ListItemIcon className="list-icon">
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" className="list-text" />
                    </ListItem>
                    <ListItem component={Link} to="/tasks" onClick={onClose}>
                        <ListItemIcon className="list-icon">
                            <TaskIcon />
                        </ListItemIcon>
                        <ListItemText primary="Tasks" className="list-text" />
                    </ListItem>
                    <ListItem component={Link} to="/profile" onClick={onClose}>
                        <ListItemIcon className="list-icon">
                            <ProfileIcon />
                        </ListItemIcon>
                        <ListItemText primary="Profile" className="list-text" />
                    </ListItem>
                    <ListItem component={Link} to="/notifications" onClick={onClose}>
                        <ListItemIcon className="list-icon">
                            <NotificationsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Notifications" className="list-text" />
                    </ListItem>
                </List>
            </div>
        </Drawer>
    );
};

export default NavigationModal;
