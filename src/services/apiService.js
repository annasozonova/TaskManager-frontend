import axios from 'axios';

// Адрес бэкенда
const API_URL = 'http://localhost:8080/api';

// Получение списка пользователей с бэкенда
export const getUsers = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/users`, {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        });
        return response.data;  // Возвращаем данные из ответа
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

// Создание пользователя
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

// Обновление пользователя
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

// Удаление пользователя
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

// Получение списка задач с бэкенда
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

// Создание задачи
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

// Обновление задачи
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

// Удаление задачи
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

//Авторизация
export const auth = async ({ username, password }) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password }, {
            withCredentials: true});
        return response.data;
    } catch (error) {
        console.error('Error authorizing:', error);
        throw error;
    }
};
