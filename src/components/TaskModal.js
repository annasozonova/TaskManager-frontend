import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../styles/modalStyles.css';

Modal.setAppElement('#root');

const TaskModal = ({ isOpen, onClose, onTaskCreated, departments }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('LOW');
    const [dueDate, setDueDate] = useState('');
    const [requiredQualification, setRequiredQualification] = useState('JUNIOR');
    const [selectedDepartment, setSelectedDepartment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const taskData = {
            title,
            description,
            priority,
            dueDate,
            requiredQualification,
            department: { id: selectedDepartment },
        };

        try {
            const response = await axios.post('http://localhost:8080/api/tasks', taskData);
            onTaskCreated(response.data);
            onClose();
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Create Task" className="modal" overlayClassName="overlay">
            <div className="modal-header">
                <h2>Create New Task</h2>
                <button className="close-btn" onClick={onClose}>X</button>
            </div>
            <form onSubmit={handleSubmit} className="task-form">
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Priority</label>
                    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Due Date</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Required Qualification</label>
                    <select value={requiredQualification} onChange={(e) => setRequiredQualification(e.target.value)}>
                        <option value="JUNIOR">Junior</option>
                        <option value="MID_LEVEL">Mid-Level</option>
                        <option value="SENIOR">Senior</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Department</label>
                    <select
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select a department</option>
                        {departments && departments.length > 0 ? (
                            departments.map(department => (
                                <option key={department.id} value={department.id}>
                                    {department.name}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>No departments available</option>
                        )}
                    </select>
                </div>
                <div className="form-actions">
                    <button type="submit" className="submit-btn">Create Task</button>
                    <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </Modal>
    );
};

export default TaskModal;
