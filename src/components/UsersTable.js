import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button
} from "@mui/material";
import "../styles/tasksTableStyles.css"; // Импорт стилей

const UsersTable = ({
                        users,
                        onEdit,
                        onDelete,
                        onOpenModal,
                    }) => {
    const [sortedUsers, setSortedUsers] = useState(users); // Локальное состояние для сортированных пользователей
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

    useEffect(() => {
        // Устанавливаем пользователей в sortedUsers сразу при загрузке
        setSortedUsers(users);
    }, [users.length]);

    const sortUsers = (key) => {
        const newDirection =
            sortConfig.key === key && sortConfig.direction === "asc"
                ? "desc"
                : "asc";

        const sorted = [...sortedUsers].sort((a, b) => {
            let aValue = a[key];
            let bValue = b[key];

            if (key === "department.name") {
                aValue = a.department?.name || "";
                bValue = b.department?.name || "";
            } else if (key === "qualification.qualification") {
                aValue = a.qualification?.qualification || "";
                bValue = b.qualification?.qualification || "";
            } else if (key === "qualification.experienceYears") {
                aValue = a.qualification?.experienceYears || 0;
                bValue = b.qualification?.experienceYears || 0;
            } else if (key === "qualification.technologies") {
                aValue = a.qualification?.technologies || "";
                bValue = b.qualification?.technologies || "";
            }

            if (aValue < bValue) return newDirection === "asc" ? -1 : 1;
            if (aValue > bValue) return newDirection === "asc" ? 1 : -1;
            return 0;
        });

        setSortedUsers(sorted);
        setSortConfig({ key, direction: newDirection });
    };

    const getSortIndicator = (key) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === "asc" ? "▲" : "▼";
    };

    return (
        <TableContainer component={Paper} elevation={3} className="table-container">
            <div className="table-header">
                <Typography variant="h6" className="table-title" gutterBottom>
                    Users List
                </Typography>
                <button className="create-task-btn" onClick={onOpenModal}>
                    Create User
                </button>
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell onClick={() => sortUsers("username")}>
                            Username {getSortIndicator("username")}
                        </TableCell>
                        <TableCell onClick={() => sortUsers("email")}>
                            Email {getSortIndicator("email")}
                        </TableCell>
                        <TableCell onClick={() => sortUsers("firstName")}>
                            First Name {getSortIndicator("firstName")}
                        </TableCell>
                        <TableCell onClick={() => sortUsers("lastName")}>
                            Last Name {getSortIndicator("lastName")}
                        </TableCell>
                        <TableCell onClick={() => sortUsers("role")}>
                            Role {getSortIndicator("role")}
                        </TableCell>
                        <TableCell onClick={() => sortUsers("department.name")}>
                            Department {getSortIndicator("department.name")}
                        </TableCell>
                        <TableCell onClick={() => sortUsers("qualification.qualification")}>
                            Qualification Level {getSortIndicator("qualification.qualification")}
                        </TableCell>
                        <TableCell onClick={() => sortUsers("qualification.experienceYears")}>
                            Experience (Years) {getSortIndicator("qualification.experienceYears")}
                        </TableCell>
                        <TableCell onClick={() => sortUsers("qualification.technologies")}>
                            Technologies {getSortIndicator("qualification.technologies")}
                        </TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedUsers.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.firstName || "N/A"}</TableCell>
                            <TableCell>{user.lastName || "N/A"}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>{user.department?.name || "N/A"}</TableCell>
                            <TableCell>
                                {user.qualification?.qualification || "N/A"}
                            </TableCell>
                            <TableCell>
                                {user.qualification?.experienceYears || "N/A"}
                            </TableCell>
                            <TableCell>
                                {user.qualification?.technologies || "N/A"}
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => onDelete(user.id)}
                                >
                                    Delete
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => onEdit(user)}
                                >
                                    Edit
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UsersTable;