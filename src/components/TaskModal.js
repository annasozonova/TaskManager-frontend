import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import '../styles/modalStyles.css';

Modal.setAppElement('#root');

const TaskModal = ({currentUser, isOpen, onClose, onTaskCreated, departments, task}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('LOW');
    const [dueDate, setDueDate] = useState('');
    const [requiredQualification, setRequiredQualification] = useState('JUNIOR');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [status, setStatus] = useState('PENDING');
    const [assignedTo, setAssignedTo] = useState(null);
    const [comments, setComments] = useState('');
    const [existingComments, setExistingComments] = useState([]);

    useEffect(() => {
        if (task) {
            setTitle(task.title || '');
            setDescription(task.description || '');
            setPriority(task.priority || 'LOW');
            setDueDate(task.dueDate || '');
            setRequiredQualification(task.requiredQualification || 'JUNIOR');
            setSelectedDepartment(task.department?.id || '');
            setStatus(task.status || 'PENDING');
            setAssignedTo(task.assignedTo || null);
            setComments('');
            setExistingComments(task.comments || []);
        } else {
            resetForm();
        }
    }, [task]);

    useEffect(() => {
        if (currentUser.role === 'EMPLOYEE' && currentUser.qualification) {
            setRequiredQualification(currentUser.qualification.qualification);
        }
    }, [currentUser]);

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setPriority('LOW');
        setDueDate('');
        setRequiredQualification('JUNIOR');
        setSelectedDepartment('');
        setStatus('PENDING');
        setAssignedTo(null);
        setComments('');
        setExistingComments([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const taskData = {
            title,
            description,
            priority,
            dueDate,
            requiredQualification,
            status,
            assignedTo: {id: currentUser.role === 'EMPLOYEE' ? currentUser.id : assignedTo},
            department: {
                id: currentUser.role === 'ADMIN' ? selectedDepartment :
                    currentUser.role === 'DEPARTMENT_HEAD' || 'EMPLOYEE' ? currentUser.department.id : undefined
            },
            comments: currentUser.role === 'EMPLOYEE' ? comments : undefined
        };

        onTaskCreated(taskData);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Create Task" className="modal"
               overlayClassName="overlay">
            <div className="modal-header">
                <h2>{task ? 'Edit Task' : 'Create New Task'}</h2>
                <button className="close-btn" onClick={onClose}>X</button>
            </div>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        readOnly={task && currentUser.role === 'EMPLOYEE'}
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={description ? description.split('\n').length : 1} // Устанавливаем высоту поля в зависимости от наличия текста
                        style={{minHeight: '20px'}} // Минимальная высота поля
                        readOnly={task && currentUser.role === 'EMPLOYEE'}
                    />
                </div>
                {currentUser.role === 'EMPLOYEE' && (
                    <div className="form-group">
                        <label>Comments</label>
                        <textarea
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                        />
                    </div>
                )}
                {existingComments.length > 0 && (
                    <div className="form-group">
                        <label>Existing Comments</label>
                        <ul>
                            {existingComments.map((comment, index) => (
                                <li key={index}>{comment}</li>
                            ))}
                        </ul>
                    </div>
                )}
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
                        readOnly={task && currentUser.role === 'EMPLOYEE'}
                    />
                </div>
                {currentUser.role !== 'EMPLOYEE' && (
                    <div className="form-group">
                        <label>Required Qualification</label>
                        <select value={requiredQualification}
                                onChange={(e) => setRequiredQualification(e.target.value)}>
                            <option value="JUNIOR">Junior</option>
                            <option value="MID_LEVEL">Mid-Level</option>
                            <option value="SENIOR">Senior</option>
                        </select>
                    </div>
                )}
                {task && ( // Отображаем поле статуса только при редактировании задачи
                    <div className="form-group">
                        <label>Status</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                            <option value="PENDING">Pending</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="COMPLETED">Completed</option>
                            <option value="DELAYED">Delayed</option>
                        </select>
                    </div>
                )}
                {currentUser.role === 'ADMIN' && (
                    <div className="form-group">
                        <label>Department</label>
                        <select
                            value={selectedDepartment}
                            onChange={(e) => setSelectedDepartment(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select a department</option>
                            {departments.map(department => (
                                <option key={department.id} value={department.id}>
                                    {department.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                {currentUser.role !== 'ADMIN' && (
                    <input type="hidden" value={currentUser.department.id}/>
                )}
                <div className="form-actions">
                    <button type="submit" className="submit-btn">{task ? 'Save Changes' : 'Create Task'}</button>
                    <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </Modal>
    );
};

export default TaskModal;
