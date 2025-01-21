import React, { useState, useEffect } from 'react';
import { getTasks } from '../services/apiService';
import axios from 'axios';
import TaskModal from '../components/TaskModal';
import TasksTable from '../components/TaskTable';

const TasksPage = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [departments, setDepartments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // Для отслеживания состояния модального окна

    // Функция для открытия модального окна
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Функция для закрытия модального окна
    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await getTasks();
                setTasks(data);
            } catch (err) {
                setError('Error fetching tasks: ', err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    // Загружаем департаменты только один раз
    useEffect(() => {
        axios.get('http://localhost:8080/api/departments')
            .then((response) => {
                setDepartments(response.data);
            })
            .catch((error) => {
                console.error('Failed to load departments:', error);
                setError('Failed to load departments');
            });
    }, []);  // Пустой массив зависимостей, чтобы загрузка происходила только один раз

    const handleCreateTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <button onClick={openModal}>Create Task</button>
            <TaskModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onTaskCreated={handleCreateTask}
                departments={departments}
            />
            <TasksTable tasks={tasks} />
        </div>
    );
};

export default TasksPage;
