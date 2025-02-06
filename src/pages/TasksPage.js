import React, { useState, useEffect } from 'react';
import { createTask, deleteTask, getTasks, updateTask } from '../services/apiService';
import axios from 'axios';
import TaskModal from '../components/TaskModal';
import TasksTable from '../components/TasksTable';
import { useLocation } from 'react-router-dom';

const TasksPage = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [departments, setDepartments] = useState([]);
    const [modalOpen, setModalOpen] = useState(false); // For modal window state
    const [editingTask, setEditingTask] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const highlightedTaskId = queryParams.get('highlightedTaskId');

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const [tasksData, departmentsData, currentUserData] = await Promise.all([
                    getTasks(token),
                    axios.get('http://localhost:8080/api/departments', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }).then((response) => response.data),
                    axios.get('http://localhost:8080/api/currentUser', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }).then((response) => response.data)
                ]);

                setTasks(tasksData);
                setDepartments(departmentsData);
                setCurrentUser(currentUserData);
            } catch (err) {
                setError('Error fetching data: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        console.log('Fetched tasks:', tasks);
    }, [tasks]);

    useEffect(() => {
        console.log('highlightedTaskId:', highlightedTaskId);
    }, [highlightedTaskId]);

    const handleCreateTask = () => {
        setEditingTask(null);
        openModal();
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        openModal();
    };

    const handleSaveTask = async (task) => {
        try {
            const token = localStorage.getItem('token');
            if (editingTask && editingTask.id) {
                const updatedTask = await updateTask(editingTask.id, task, token);
                setTasks((prevTasks) =>
                    prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
                );
            } else {
                const createdTask = await createTask(task, token);
                setTasks((prevTasks) => [...prevTasks, createdTask]);
            }
            closeModal();
            setEditingTask(null);
        } catch (err) {
            setError('Error saving task: ' + err.message);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await deleteTask(id, token);
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        } catch (err) {
            setError('Error deleting task: ' + err.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <TaskModal
                currentUser={currentUser}
                isOpen={modalOpen}
                onClose={closeModal}
                onTaskCreated={handleSaveTask}
                departments={departments}
                task={editingTask}
            />
            <TasksTable
                tasks={tasks}
                onOpenModal={handleCreateTask}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                highlightedTaskId={highlightedTaskId}
            />
        </div>
    );
};

export default TasksPage;
