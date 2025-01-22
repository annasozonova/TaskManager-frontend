import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button,
} from '@mui/material';
import '../styles/tasksTableStyles.css'; // Импорт стилей

const TasksTable = ({ tasks, onOpenModal }) => {
    const [sortedTasks, setSortedTasks] = useState(tasks); // Локальное состояние для сортированных задач
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

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
                        </TableCell >
                        <TableCell className="styled-table-head-cell description">
                            Description
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedTasks.map((task) => (
                        <TableRow key={task.id} className="styled-table-row">
                            <TableCell>{task.title}</TableCell>
                            <TableCell
                                className={
                                    task.status === 'COMPLETED'
                                        ? 'completed-status'
                                        : task.status === 'IN_PROGRESS'
                                            ? 'in-progress-status'
                                            : task.status === 'DELAYED'
                                                ? 'delayed-status'
                                                : 'pending-status'
                                }
                            >
                                {task.status}
                            </TableCell>                            <TableCell
                                className={
                                    task.priority === 'HIGH'
                                        ? 'high-priority'
                                        : task.priority === 'MEDIUM'
                                            ? 'medium-priority'
                                            : 'low-priority'
                                }
                            >
                                {task.priority}
                            </TableCell>
                            <TableCell>{task.dueDate || 'N/A'}</TableCell>
                            <TableCell>{task.assignedTo?.username || 'N/A'}</TableCell>
                            <TableCell>{task.department?.name || 'N/A'}</TableCell>
                            <TableCell>{task.description || 'N/A'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TasksTable;
