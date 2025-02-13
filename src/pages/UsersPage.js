import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UsersTable from '../components/UsersTable';
import UserModal from '../components/UserModal';
import { getUsers, createUser, updateUser, deleteUser } from '../services/apiService';
import { useLocation } from "react-router-dom";

const UsersPage = () => {
    // State hooks to manage users, qualifications, loading state, error, departments, modal state, editing user, and current user
    const [users, setUsers] = useState([]);
    const [qualifications, setQualifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [departments, setDepartments] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const highlightedUserId = queryParams.get('highlightedUserId');

    const openModal = () => setModalOpen(true);
    const closeModal = () => {
        setModalOpen(false);
        setEditingUser(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data for users, departments, qualifications, and current user in parallel
                const token = localStorage.getItem('token');
                const [usersData, departmentsData, qualificationsData, currentUserData] = await Promise.all([
                    getUsers(token),
                    axios.get('http://localhost:8080/api/departments', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }).then(response => response.data),
                    axios.get('http://localhost:8080/api/qualifications', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }).then(response => response.data),
                    axios.get('http://localhost:8080/api/currentUser', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }).then(response => response.data),
                ]);

                setUsers(Array.isArray(usersData) ? usersData : []);
                setDepartments(Array.isArray(departmentsData) ? departmentsData : []);
                setQualifications(Array.isArray(qualificationsData) ? qualificationsData : []);
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
        console.log('highlightedUserId:', highlightedUserId);
    }, [highlightedUserId]);

    const handleCreateUser = () => {
        setEditingUser(null);
        openModal();
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        openModal();
    };

    const handleSaveUser = async (user) => {
        try {
            const token = localStorage.getItem('token');
            // Update existing user or create a new one based on whether editingUser has an id
            if (editingUser && editingUser.id) {
                const updatedUser = await updateUser(editingUser.id, user, token);
                setUsers((prevUsers) =>
                    prevUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u))
                );
            } else {
                const createdUser = await createUser(user, token);
                setUsers((prevUsers) => [...prevUsers, createdUser]);
            }
            closeModal();
        } catch (err) {
            setError('Error saving user: ' + err.message);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await deleteUser(id, token);
            // Remove deleted user from the users state
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        } catch (err) {
            setError('Error deleting user: ' + err.message);
        }
    };

    if (loading) return <p>Loading...</p>; // Show loading message
    if (error) return <p>{error}</p>; // Show error message

    return (
        <div>
            <UserModal
                currentUser={currentUser}
                isOpen={modalOpen}
                onClose={closeModal}
                userToEdit={editingUser}
                onSave={handleSaveUser}
                departments={departments}
                qualifications={qualifications}
            />
            <UsersTable
                users={users}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
                onOpenModal={handleCreateUser}
                highlightedUserId={highlightedUserId}
            />
        </div>
    );
};

export default UsersPage;
