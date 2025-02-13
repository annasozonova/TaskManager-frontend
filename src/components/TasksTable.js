import React, { useState, useMemo, useEffect, useRef } from 'react';
import { TableContainer, Paper, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../styles/tasksAndUsersTableStyles.css';

const TasksTable = ({ tasks, onOpenModal, onEdit, onDelete, highlightedTaskId }) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [localHighlightedTaskId, setLocalHighlightedTaskId] = useState(null);
    const highlightTimeoutRef = useRef(null);
    const rowRefs = useRef({});

    // Create references for task rows
    const getRowRef = (taskId) => {
        if (!rowRefs.current[taskId]) {
            rowRefs.current[taskId] = React.createRef();
        }
        return rowRefs.current[taskId];
    };

    // Memoized sorted tasks to optimize performance
    const sortedTasks = useMemo(() => {
        const priorityOrder = { HIGH: 1, MEDIUM: 2, LOW: 3 };
        return [...tasks].sort((a, b) => {
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];
            if (sortConfig.key === 'department') {
                aValue = a.department?.name || '';
                bValue = b.department?.name || '';
            } else if (sortConfig.key === 'assignedTo') {
                aValue = a.assignedTo?.username || '';
                bValue = b.assignedTo?.username || '';
            } else if (sortConfig.key === 'priority') {
                aValue = priorityOrder[a.priority] || Infinity;
                bValue = priorityOrder[b.priority] || Infinity;
            }
            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [tasks, sortConfig]);

    useEffect(() => {
        setLocalHighlightedTaskId(highlightedTaskId);
        if (highlightedTaskId) {
            if (highlightTimeoutRef.current) {
                clearTimeout(highlightTimeoutRef.current);
            }
            const scrollToHighlightedTask = () => {
                requestAnimationFrame(() => {
                    const row = rowRefs.current[highlightedTaskId]?.current;
                    if (row) {
                        row.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    } else {
                        const observer = new MutationObserver(() => {
                            const row = rowRefs.current[highlightedTaskId]?.current;
                            if (row) {
                                row.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                observer.disconnect();
                            }
                        });
                        observer.observe(document.querySelector('.table-container'), {
                            childList: true,
                            subtree: true,
                        });
                        setTimeout(() => observer.disconnect(), 2000);
                    }
                });
            };
            setTimeout(scrollToHighlightedTask, 300);
            highlightTimeoutRef.current = setTimeout(() => {
                setLocalHighlightedTaskId(null);
            }, 5000);
        }
        return () => {
            if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current);
        };
    }, [highlightedTaskId, sortedTasks]);

    const sortTasks = (key) => {
        const newDirection = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
        setSortConfig({ key, direction: newDirection });
    };

    const getSortIndicator = (key) => {
        if (sortConfig.key !== key) return null;
        return <span className="sort-indicator">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>;
    };

    const capitalizeStatus = (status) => {
        return status
            .replace('_', ' ')
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
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
                <span>{capitalizeStatus(status)}</span>
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
                <span>{priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase()}</span>
            </>
        );
    };

    return (
        <div className="table-container-wrapper">
            <TableContainer component={Paper} elevation={3} className="table-container">
                <div className="table-header">
                    <Typography variant="h6" className="table-title">
                        Tasks List
                    </Typography>
                    <Button variant="contained" onClick={onOpenModal} className="create-task-btn">
                        Create Task
                    </Button>
                </div>
                <Table className="styled-table">
                    <TableHead className="sticky-table-head">
                        <TableRow>
                            <TableCell className="styled-table-head-cell" onClick={() => sortTasks('title')} aria-label="Sort by title">
                                Title {getSortIndicator('title')}
                            </TableCell>
                            <TableCell className="styled-table-head-cell" onClick={() => sortTasks('status')} aria-label="Sort by status">
                                Status {getSortIndicator('status')}
                            </TableCell>
                            <TableCell className="styled-table-head-cell" onClick={() => sortTasks('priority')} aria-label="Sort by priority">
                                Priority {getSortIndicator('priority')}
                            </TableCell>
                            <TableCell className="styled-table-head-cell" onClick={() => sortTasks('dueDate')} aria-label="Sort by due date">
                                Due Date {getSortIndicator('dueDate')}
                            </TableCell>
                            <TableCell className="styled-table-head-cell" onClick={() => sortTasks('assignedTo')} aria-label="Sort by assigned to">
                                Assigned To {getSortIndicator('assignedTo')}
                            </TableCell>
                            <TableCell className="styled-table-head-cell" onClick={() => sortTasks('department')} aria-label="Sort by department">
                                Department {getSortIndicator('department')}
                            </TableCell>
                            <TableCell className="styled-table-head-cell description">Description</TableCell>
                            <TableCell className="styled-table-head-cell action">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedTasks.map((task) => (
                            <TableRow
                                key={task.id}
                                ref={getRowRef(task.id)}
                                className={`styled-table-row ${String(task.id) === String(localHighlightedTaskId) ? "highlighted-row" : ""}`}
                                onMouseEnter={() => {
                                    if (String(task.id) === String(localHighlightedTaskId)) {
                                        setLocalHighlightedTaskId(null);
                                        if (highlightTimeoutRef.current) {
                                            clearTimeout(highlightTimeoutRef.current);
                                        }}}}
                            >
                                <TableCell>{task.title}</TableCell>
                                <TableCell>{getStatusCircleWithText(task.status)}</TableCell>
                                <TableCell>{getPriorityCircleWithText(task.priority)}</TableCell>
                                <TableCell>{task.dueDate || 'N/A'}</TableCell>
                                <TableCell>{task.assignedTo?.username || 'N/A'}</TableCell>
                                <TableCell>{task.department?.name || 'N/A'}</TableCell>
                                <TableCell>
                                    <Tooltip title={task.description || 'No description available'}>
                                        <span>{task.description ? `${task.description.slice(0, 50)}...` : 'N/A'}</span>
                                    </Tooltip>
                                </TableCell>
                                <TableCell className="action-column">
                                    <Button onClick={() => onEdit(task)} className="icon-button" aria-label="Edit task">
                                        <EditIcon alt="Edit" className="icon" />
                                    </Button>
                                    <Button onClick={() => onDelete(task.id)} className="icon-button" aria-label="Delete task">
                                        <DeleteIcon alt="Delete" className="icon" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TasksTable;
