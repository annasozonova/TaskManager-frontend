import React, { useState} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import UsersPage from './pages/UsersPage';
import TasksPage from './pages/TasksPage';
import LoginPage from "./pages/LoginPage";
import UserProfile from "./components/UserProfile";
import Notifications from "./components/Notifications";
import AccountSettings from "./components/AccountSettings";
import TopBar from "./components/TopBar";
import './styles/appStyles.css';
import Dashboard from "./components/Dashboard";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (

        <Router>
            <div>
                {isAuthenticated && <TopBar onLogout={handleLogout}/>}
                <Routes>
                    <Route path="/login"
                           element={<LoginPage onLoginSuccess={handleLoginSuccess}/>}
                    />
                    <Route path="/dashboard" element={isAuthenticated ? <Dashboard/> : <Navigate to="/login"/>}/>
                    <Route path="/users" element={isAuthenticated ? <UsersPage/> : <Navigate to="/login"/>}/>
                    <Route path="/tasks" element={isAuthenticated ? <TasksPage/> : <Navigate to="/login"/>}/>
                    <Route path="/profile" element={isAuthenticated ? <UserProfile/> : <Navigate to="/login"/>}/>
                    <Route path="/notifications"
                           element={isAuthenticated ? <Notifications/> : <Navigate to="/login"/>}/>
                    <Route path="/settings" element={isAuthenticated ? <AccountSettings/> : <Navigate to="/login"/>}/>
                    <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"}/>}/>
                </Routes>
            </div>
        </Router>

    );
};

export default App;
