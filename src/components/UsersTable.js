import React, {useEffect, useRef, useState} from "react";
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
import "../styles/tasksTableStyles.css";
import EditIcon from "../assets/edit-button-2.png";
import DeleteIcon from "../assets/delete-button-3.png"; // Импорт стилей

const UsersTable = ({
                        users,
                        onEdit,
                        onDelete,
                        onOpenModal,
                        highlightedUserId }) => {
    const [sortedUsers, setSortedUsers] = useState(users); // Локальное состояние для сортированных пользователей
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [localHighlightedUserId, setLocalHighlightedUserId] = useState(null);

    const highlightTimeoutRef = useRef(null);

    useEffect(() => {
        // Устанавливаем пользователей в sortedUsers сразу при загрузке
        setSortedUsers(users);
    }, [users, users.length]);

    useEffect(() => {
        setLocalHighlightedUserId(highlightedUserId);

        if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current);


        highlightTimeoutRef.current = setTimeout(() => {
            setLocalHighlightedUserId(null);
        }, 5000)

        return () => {
            if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current);
        }
    }, [highlightedUserId]);

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
        <div className="table-container-wrapper">
            <TableContainer component={Paper} elevation={3} className="table-container">
                <div className="table-header">
                    <Typography variant="h6" className="table-title" gutterBottom>
                        Users List
                    </Typography>
                    <Button variant="contained" onClick={onOpenModal} className="create-task-btn">
                        Create User
                    </Button>
                </div>
                <Table className="styled-table">
                    <TableHead className="sticky-table-head">
                        <TableRow>
                            <TableCell className="styled-table-head-cell" onClick={() => sortUsers("username")}>
                                Username {getSortIndicator("username")}
                            </TableCell>
                            <TableCell className="styled-table-head-cell" onClick={() => sortUsers("email")}>
                                Email {getSortIndicator("email")}
                            </TableCell>
                            <TableCell className="styled-table-head-cell" onClick={() => sortUsers("firstName")}>
                                First Name {getSortIndicator("firstName")}
                            </TableCell>
                            <TableCell className="styled-table-head-cell" onClick={() => sortUsers("lastName")}>
                                Last Name {getSortIndicator("lastName")}
                            </TableCell>
                            <TableCell className="styled-table-head-cell" onClick={() => sortUsers("role")}>
                                Role {getSortIndicator("role")}
                            </TableCell>
                            <TableCell className="styled-table-head-cell" onClick={() => sortUsers("department.name")}>
                                Department {getSortIndicator("department.name")}
                            </TableCell>
                            <TableCell className="styled-table-head-cell"
                                       onClick={() => sortUsers("qualification.qualification")}>
                                Qualification Level {getSortIndicator("qualification.qualification")}
                            </TableCell>
                            <TableCell className="styled-table-head-cell"
                                       onClick={() => sortUsers("qualification.experienceYears")}>
                                Experience (Years) {getSortIndicator("qualification.experienceYears")}
                            </TableCell>
                            <TableCell className="styled-table-head-cell"
                                       onClick={() => sortUsers("qualification.technologies")}>
                                Technologies {getSortIndicator("qualification.technologies")}
                            </TableCell>
                            <TableCell className="styled-table-head-cell action">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedUsers.map((user) => (
                            <TableRow
                                key={user.id}
                                className={`styled-table-row ${String(user.id) === String(localHighlightedUserId) ? "highlighted-row" : ""}`}
                                onMouseEnter={() => {
                                    if (String(user.id) === String(localHighlightedUserId)) {
                                        setLocalHighlightedUserId(null);
                                        if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current);
                                    }
                                }}
                            >
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.firstName || "N/A"}</TableCell>
                                <TableCell>{user.lastName || "N/A"}</TableCell>
                                <TableCell>
                                    {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase() : "N/A"}
                                </TableCell>
                                <TableCell>{user.department?.name || "N/A"}</TableCell>
                                <TableCell>
                                    {user.qualification?.qualification
                                        ? user.qualification.qualification.charAt(0).toUpperCase() + user.qualification.qualification.slice(1).toLowerCase()
                                        : "N/A"}
                                </TableCell>
                                <TableCell>
                                    {user.qualification?.experienceYears || "N/A"}
                                </TableCell>
                                <TableCell>
                                    {user.qualification?.technologies || "N/A"}
                                </TableCell>
                                <TableCell className="action-column">
                                    <Button onClick={() => onEdit(user)} className="icon-button" aria-label="Edit user">
                                        <img src={EditIcon} alt="Edit" className="icon"/>
                                    </Button>
                                    <Button onClick={() => onDelete(user.id)} className="icon-button"
                                            aria-label="Delete user">
                                        <img src={DeleteIcon} alt="Delete" className="icon"/>
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
export default UsersTable;