import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UsersPage from './pages/UsersPage'; // Страница с пользователями
import TasksPage from './pages/TasksPage'; // Страница с задачами
import HomePage from './pages/HomePage'; // Главная страница
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/tasks" element={<TasksPage />} />
                    <Route path="*" element={<div>Page not found</div>} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
