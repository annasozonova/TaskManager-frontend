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
import { styled } from '@mui/system';

// Стили для заголовков и строк таблицы
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
        backgroundColor: '#f5f5f5',
        cursor: 'pointer',
    },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.default,
}));

const TasksTable = ({ tasks }) => {
    return (
        <TableContainer
            component={Paper}
            elevation={3}
            style={{
                margin: '20px auto',
                maxWidth: '80%',
                padding: '15px',
            }}
        >
            <Typography
                variant="h6"
                align="center"
                gutterBottom
                style={{ fontWeight: 'bold', color: '#333' }}
            >
                Tasks List
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Title</StyledTableCell>
                        <StyledTableCell>Status</StyledTableCell>
                        <StyledTableCell>Priority</StyledTableCell>
                        <StyledTableCell>Due Date</StyledTableCell>
                        <StyledTableCell>Assigned To</StyledTableCell>
                        <StyledTableCell>Department</StyledTableCell>
                        <StyledTableCell>Description</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((task) => (
                        <StyledTableRow key={task.id}>
                            <TableCell>{task.title}</TableCell>
                            <TableCell>{task.status}</TableCell>
                            <TableCell
                                style={{
                                    color:
                                        task.priority === 'HIGH'
                                            ? '#d32f2f'
                                            : task.priority === 'MEDIUM'
                                                ? '#ffa726'
                                                : '#2e7d32',
                                    fontWeight: 'bold',
                                }}
                            >
                                {task.priority}
                            </TableCell>
                            <TableCell>{task.dueDate || 'N/A'}</TableCell>
                            <TableCell>{task.assignedTo?.username || 'N/A'}</TableCell>
                            <TableCell>{task.department?.name || 'N/A'}</TableCell>
                            <TableCell>{task.description || 'N/A'}</TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TasksTable;