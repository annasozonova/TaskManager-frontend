import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import UsersPage from './pages/UsersPage';
import TasksPage from './pages/TasksPage';
import HomePage from './pages/HomePage';
import LoginPage from "./pages/LoginPage";
import UserProfile from "./components/UserProfile";
import Notifications from "./components/Notifications";
import AccountSettings from "./components/AccountSettings";
import TopBar from "./components/TopBar";
import './styles/appStyles.css';

const App = () => {
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <Router>
            <div>
                {isAuthenticated && <TopBar />}
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/dashboard" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
                    <Route path="/users" element={isAuthenticated ? <UsersPage /> : <Navigate to="/login" />} />
                    <Route path="/tasks" element={isAuthenticated ? <TasksPage /> : <Navigate to="/login" />} />
                    <Route path="/profile" element={isAuthenticated ? <UserProfile /> : <Navigate to="/login" />} />
                    <Route path="/notifications" element={isAuthenticated ? <Notifications /> : <Navigate to="/login" />} />
                    <Route path="/settings" element={isAuthenticated ? <AccountSettings /> : <Navigate to="/login" />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
