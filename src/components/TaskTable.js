import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from '@mui/material';
import '../styles/tasksTableStyles.css'; // импортируем файл с CSS стилями

const TasksTable = ({ tasks }) => {
    return (
        <TableContainer component={Paper} elevation={3} className="table-container">
            <Typography variant="h6" className="table-header" gutterBottom>
                Tasks List
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className="styled-table-cell">Title</TableCell>
                        <TableCell className="styled-table-cell">Status</TableCell>
                        <TableCell className="styled-table-cell">Priority</TableCell>
                        <TableCell className="styled-table-cell">Due Date</TableCell>
                        <TableCell className="styled-table-cell">Assigned To</TableCell>
                        <TableCell className="styled-table-cell">Department</TableCell>
                        <TableCell className="styled-table-cell">Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((task) => (
                        <TableRow key={task.id} className="styled-table-row">
                            <TableCell>{task.title}</TableCell>
                            <TableCell>{task.status}</TableCell>
                            <TableCell
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
