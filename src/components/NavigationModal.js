import React from 'react';
import {Drawer, List, ListItem, ListItemText, IconButton, ListItemIcon} from '@mui/material';
import {Link} from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TaskIcon from '@mui/icons-material/Assignment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import '../styles/navigationModalStyles.css';
import {getUserRole} from "../services/authUtils";

const NavigationModal = ({open, onClose}) => {
    const userRole = getUserRole();

    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <div className="navigation-modal">
                <div className="navigation-modal-header">
                    <IconButton onClick={onClose} className="navigation-close-button">
                        <CloseIcon style={{fontSize: 32}}/>
                    </IconButton>
                    <span className="navigation-modal-title">Task Manager</span>
                </div>
                <List className="navigation-modal-list">
                    <ListItem component={Link} to="/tasks" onClick={onClose}>
                        <ListItemIcon className="navigation-list-icon">
                            <TaskIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Tasks" className="navigation-list-text"/>
                    </ListItem>
                    {userRole !== 'EMPLOYEE' && (
                        <ListItem component={Link} to="/users" onClick={onClose}>
                            <ListItemIcon className="navigation-list-icon">
                                <PeopleIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Users" className="navigation-list-text"/>
                        </ListItem>
                    )}
                    <ListItem component={Link} to="/dashboard" onClick={onClose}>
                        <ListItemIcon className="navigation-list-icon">
                            <DashboardIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" className="navigation-list-text"/>
                    </ListItem>
                    <ListItem component={Link} to="/notifications" onClick={onClose}>
                        <ListItemIcon className="navigation-list-icon">
                            <NotificationsIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Notifications" className="navigation-list-text"/>
                    </ListItem>
                </List>
            </div>
        </Drawer>
    );
};

export default NavigationModal;
