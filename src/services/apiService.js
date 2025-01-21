import axios from 'axios';

// Адрес бэкенда
const API_URL = 'http://localhost:8080/api';

// Получение списка пользователей с бэкенда
export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`); // Эндпоинт для получения списка пользователей
        return response.data;  // Возвращаем данные из ответа
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

//Получение списка задач с бэкенда
export const getTasks = async () => {
    try {
        const response = await axios.get(`${API_URL}/tasks`);
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};