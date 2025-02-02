import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography
} from '@mui/material';

// Импорт стилей
import '../styles/tasksTableStyles.css';
import DeleteIcon from '../assets/delete-button-3.png';
import EditIcon from '../assets/edit-button-2.png';

const TasksTable = ({ tasks, onOpenModal, onEdit, onDelete }) => {
    const [sortedTasks, setSortedTasks] = useState(tasks); // Локальное состояние для сортированных задач
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    useEffect(() => {
        setSortedTasks(tasks); // Обновление отсортированных задач при изменении списка задач
    }, [tasks]);

    const sortTasks = (key) => {
        const newDirection = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';

        const priorityOrder = { HIGH: 1, MEDIUM: 2, LOW: 3 }; // Порядок сортировки приоритетов

        const sorted = [...tasks].sort((a, b) => {
            let aValue = a[key];
            let bValue = b[key];

            // Обработка вложенных объектов
            if (key === 'department') {
                aValue = a.department?.name || '';
                bValue = b.department?.name || '';
            } else if (key === 'assignedTo') {
                aValue = a.assignedTo?.username || '';
                bValue = b.assignedTo?.username || '';
            } else if (key === 'priority') {
                aValue = priorityOrder[a.priority] || Infinity;
                bValue = priorityOrder[b.priority] || Infinity;
            }

            // Сравнение значений
            if (aValue < bValue) return newDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return newDirection === 'asc' ? 1 : -1;
            return 0;
        });

        setSortedTasks(sorted);
        setSortConfig({ key, direction: newDirection });
    };

    const getSortIndicator = (key) => {
        if (sortConfig.key !== key) return null;
        return (
            <span className="sort-indicator">
                {sortConfig.direction === 'asc' ? '▲' : '▼'}
            </span>
        );
    };

    const capitalizeStatus = (status) => {
        return status
            .replace('_', ' ')
            .toLowerCase()
            .split(' ') // на случай нескольких слов
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // делаем первую букву каждого слова заглавной
            .join(' ');
    };

    const getStatusCircleWithText = (status) => {
        const statusColors = {
            COMPLETED: 'green',
            IN_PROGRESS: 'yellow',
            DELAYED: 'red',
            PENDING: 'gray',
        };
        const color = statusColors[status] || 'gray';
        return (
            <>
                <span className="status-circle" style={{ backgroundColor: color }} />
                <span>{capitalizeStatus(status)}</span> {/* Применение capitalizeStatus */}
            </>
        );
    };

    const getPriorityCircleWithText = (priority) => {
        const priorityColors = {
            HIGH: 'red',
            MEDIUM: 'orange',
            LOW: 'green',
        };
        const color = priorityColors[priority] || 'gray';
        return (
            <>
                <span className="priority-circle" style={{ backgroundColor: color }} />
                <span>{priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase()}</span> {/* Преобразуем приоритет */}
            </>
        );
    };

    return (
        <TableContainer component={Paper} elevation={3} className="table-container">
            <div className="table-header">
                <Typography variant="h6" className="table-title" gutterBottom>
                    Tasks List
                </Typography>
                <button className="create-task-btn" onClick={onOpenModal}>
                    Create Task
                </button>
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className="styled-table-head-cell" onClick={() => sortTasks('title')}>
                            Title {getSortIndicator('title')}
                        </TableCell>
                        <TableCell className="styled-table-head-cell" onClick={() => sortTasks('status')}>
                            Status {getSortIndicator('status')}
                        </TableCell>
                        <TableCell className="styled-table-head-cell" onClick={() => sortTasks('priority')}>
                            Priority {getSortIndicator('priority')}
                        </TableCell>
                        <TableCell className="styled-table-head-cell" onClick={() => sortTasks('dueDate')}>
                            Due Date {getSortIndicator('dueDate')}
                        </TableCell>
                        <TableCell className="styled-table-head-cell" onClick={() => sortTasks('assignedTo')}>
                            Assigned To {getSortIndicator('assignedTo')}
                        </TableCell>
                        <TableCell className="styled-table-head-cell" onClick={() => sortTasks('department')}>
                            Department {getSortIndicator('department')}
                        </TableCell>
                        <TableCell className="styled-table-head-cell description">
                            Description
                        </TableCell>
                        <TableCell className="styled-table-head-cell">
                            Actions
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedTasks.map((task) => (
                        <TableRow key={task.id} className="styled-table-row">
                            <TableCell>{task.title}</TableCell>
                            <TableCell>{getStatusCircleWithText(task.status)}</TableCell>
                            <TableCell>{getPriorityCircleWithText(task.priority)}</TableCell>
                            <TableCell>{task.dueDate || 'N/A'}</TableCell>
                            <TableCell>{task.assignedTo?.username || 'N/A'}</TableCell>
                            <TableCell>{task.department?.name || 'N/A'}</TableCell>
                            <TableCell>{task.description || 'N/A'}</TableCell>
                            <TableCell className="actions-cell">
                                <img src={EditIcon} alt="Edit" onClick={() => onEdit(task)} className="icon" />
                                <img src={DeleteIcon} alt="Delete" onClick={() => onDelete(task.id)} className="icon" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TasksTable;
