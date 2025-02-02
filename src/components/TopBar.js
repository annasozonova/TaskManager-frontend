import React from 'react';
import NavigationButton from './NavigationButton';
import UserProfileButton from './UserProfileButton';
import NotificationButton from './NotificationButton';
import '../styles/topBarStyles.css';

const TopBar = () => {
    return (
        <div className="top-bar">
            <div className="left-section">
                <NavigationButton />
                <span className="app-title">Task Manager</span>
            </div>
            <div className="right-section">
                <NotificationButton />
                <UserProfileButton />
            </div>
        </div>
    );
};

export default TopBar;
