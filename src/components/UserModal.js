import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../styles/modalStyles.css";

Modal.setAppElement("#root");

const UserModal = ({ currentUser, isOpen, onClose, userToEdit, onSave, departments }) => {
    // State hooks to manage form fields and error state
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [role, setRole] = useState("EMPLOYEE");
    const [department, setDepartment] = useState("");
    const [qualificationLevel, setQualificationLevel] = useState("JUNIOR");
    const [experienceYears, setExperienceYears] = useState("");
    const [technologies, setTechnologies] = useState("");
    const [error, setError] = useState(false);
    const [isDepartmentHead, setIsDepartmentHead] = useState(currentUser && currentUser.role === 'DEPARTMENT_HEAD');

    useEffect(() => {
        if (userToEdit) {
            // Load user data into form fields if editing
            setUsername(userToEdit.username || "");
            setEmail(userToEdit.email || "");
            setPassword(userToEdit.password || "");
            setFirstName(userToEdit.firstName || "");
            setLastName(userToEdit.lastName || "");
            setRole(userToEdit.role || "EMPLOYEE");
            setDepartment(userToEdit.department?.id || "");
            setQualificationLevel(userToEdit.qualification?.qualification || "JUNIOR");
            setExperienceYears(userToEdit.qualification?.experienceYears || "");
            setTechnologies(userToEdit.qualification?.technologies || "");
        } else {
            resetForm(); // Reset form if no user to edit
        }
    }, [userToEdit]);

    const resetForm = () => {
        setUsername("");
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setRole("EMPLOYEE");
        setDepartment("");
        setQualificationLevel("JUNIOR");
        setExperienceYears("");
        setTechnologies("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate required fields
        if (!username || !email || !password || !role || (!department && !isDepartmentHead) || !qualificationLevel) {
            setError("Please fill all required fields.");
            return;
        }

        const userData = {
            username,
            email,
            password,
            firstName,
            lastName,
            role,
            department: { id: isDepartmentHead ? currentUser.department.id : parseInt(department) },
            qualification: {
                qualification: qualificationLevel,
                experienceYears: parseInt(experienceYears) || 0,
                technologies: technologies || ""
            }
        };

        onSave(userData); // Call onSave callback with user data
        onClose(); // Close modal
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Create User" className="modal" overlayClassName="overlay">
            <div className="modal-header">
                <h2>{userToEdit ? "Edit User" : "Create User"}</h2>
                <button className="close-btn" onClick={onClose}>
                    X
                </button>
            </div>
            <form onSubmit={handleSubmit} className="form">
                {error && <p className="error">{error}</p>}
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Role</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="EMPLOYEE">Employee</option>
                        <option value="DEPARTMENT_HEAD">Department Head</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>
                {!isDepartmentHead && (
                    <div className="form-group">
                        <label>Department</label>
                        <select value={department} onChange={(e) => setDepartment(e.target.value)} required>
                            <option value="" disabled>
                                Select a department
                            </option>
                            {departments.map((dept) => (
                                <option key={dept.id} value={dept.id}>
                                    {dept.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <div className="form-group">
                    <label>Qualification Level</label>
                    <select value={qualificationLevel} onChange={(e) => setQualificationLevel(e.target.value)} required>
                        <option value="JUNIOR">Junior</option>
                        <option value="MID_LEVEL">Mid-Level</option>
                        <option value="SENIOR">Senior</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Experience Years</label>
                    <input type="number" value={experienceYears} onChange={(e) => setExperienceYears(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Technologies</label>
                    <input type="text" value={technologies} onChange={(e) => setTechnologies(e.target.value)} />
                </div>
                <div className="form-actions">
                    <button type="submit" className="submit-btn">
                        {userToEdit ? "Save Changes" : "Create User"}
                    </button>
                    <button type="button" className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default UserModal;
