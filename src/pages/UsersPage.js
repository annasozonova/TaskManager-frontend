import React, { useState, useEffect } from 'react';
import { getUsers } from '../services/apiService'; // Импортируем сервис для получения данных

const UsersPage = () => {
    const [users, setUsers] = useState([]);  // Состояние для хранения списка пользователей
    const [loading, setLoading] = useState(true);  // Состояние для отслеживания загрузки
    const [error, setError] = useState(null);  // Состояние для отслеживания ошибок

    // Загружаем пользователей при монтировании компонента
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();  // Запрашиваем список пользователей
                setUsers(data);  // Сохраняем данные в состояние
            } catch (err) {
                setError('Error fetching users: ', err);  // Если ошибка, сохраняем сообщение об ошибке
            } finally {
                setLoading(false);  // Убираем индикатор загрузки
            }
        };

        fetchUsers();  // Вызов функции для загрузки пользователей
    }, []);  // Зависимость пустая, чтобы запрос выполнялся только один раз при монтировании

    if (loading) return <p>Loading...</p>;  // Если идет загрузка, показываем "Loading"
    if (error) return <p>{error}</p>;  // Если произошла ошибка, выводим сообщение об ошибке

    return (
        <div>
            <h1>Users</h1>
            <table>
                <thead>
                <tr>
                    <th>Username</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th>Qualification</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.username || 'Not provided'}</td>
                        <td>{user.firstName || 'Not provided'}</td>
                        <td>{user.lastName || 'Not provided'}</td>
                        <td>{user.email || 'Not provided'}</td>
                        <td>{user.role || 'Not provided'}</td>
                        <td>{user.departmentName || 'Not provided'}</td>
                        <td>{user.qualificationType || 'Not provided'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersPage;
