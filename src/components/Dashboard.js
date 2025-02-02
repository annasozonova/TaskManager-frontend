import React, {useEffect} from 'react';
import { getTasks} from "../services/apiService";
import '../styles/dashboardStyles.css';

const Dashboard = () => {
    const [tasks, setTasks] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = localStorage.getItem('token');
                const tasksData = await getTasks(token);
                setTasks(tasksData);
            } catch (err) {
                setError('Error fetching tasks: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    if(loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <div className="dashboard">
            <h2>Welcome to your Dashboard</h2>
            <p>Overview of your tasks and progress:</p>
            <div className="tasks-overview">
                <h3>Your Tasks</h3>
                {tasks.length === 0 ? (
                    <p>No tasks assigned.</p>
                ) : (
                    <ul>
                        {tasks.map(task => (
                            <li key={task.id}>{task.title} - {task.status}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
