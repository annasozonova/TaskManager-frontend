import axios from 'axios';

// Backend URL
const API_URL = 'http://localhost:8080/api';

// Fetch the list of users from the backend
export const getUsers = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/users`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

// Create a new user
export const createUser = async (user, token) => {
    try {
        const response = await axios.post(`${API_URL}/users`, user, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

// Update an existing user
export const updateUser = async (id, updatedUser, token) => {
    try {
        const response = await axios.put(`${API_URL}/users/${id}`, updatedUser, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

// Delete a user
export const deleteUser = async (id, token) => {
    try {
        await axios.delete(`${API_URL}/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

// Fetch the list of tasks from the backend
export const getTasks = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/tasks`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

// Create a new task
export const createTask = async (task, token) => {
    try {
        const response = await axios.post(`${API_URL}/tasks`, task, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
};

// Update an existing task
export const updateTask = async (id, updatedTask, token) => {
    try {
        const response = await axios.put(`${API_URL}/tasks/${id}`, updatedTask, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};

// Delete a task
export const deleteTask = async (id, token) => {
    try {
        await axios.delete(`${API_URL}/tasks/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};

// Fetch unread notifications for the employee
export const getUnreadNotifications = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/notifications/unread`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching unread notifications:', error);
        throw error;
    }
};

// Fetch all notifications for the employee
export const getAllNotifications = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/notifications`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
    }
};

// Mark a notification as read
export const markNotificationAsRead = async (id, token) => {
    try {
        await axios.put(`${API_URL}/notifications/mark-as-read/${id}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error('Error marking notification as read:', error);
        throw error;
    }
};

// Fetch dashboard data
export const getDashboard = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/user/dashboard`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting dashboard:', error);
        throw error;
    }
};
