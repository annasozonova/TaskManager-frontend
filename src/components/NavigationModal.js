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
                <List>
                    <ListItem button component={Link} to="/dashboard" onClick={onClose}>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem button component={Link} to="/tasks" onClick={onClose}>
                        <ListItemIcon>
                            <TaskIcon />
                        </ListItemIcon>
                        <ListItemText primary="Tasks" />
                    </ListItem>
                    <ListItem button component={Link} to="/profile" onClick={onClose}>
                        <ListItemIcon>
                            <ProfileIcon />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItem>
                    <ListItem button component={Link} to="/notifications" onClick={onClose}>
                        <ListItemIcon>
                            <NotificationsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Notifications" />
                    </ListItem>
                </List>
            </div>
        </Drawer>
    );
};

export default NavigationModal;
