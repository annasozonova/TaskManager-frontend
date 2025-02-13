import { useEffect, useState } from "react";
import { getDashboard } from "../services/apiService";
import { Card, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Warning, AssignmentLate, PersonOff } from "@mui/icons-material";
import { BarChart } from "@mui/x-charts/BarChart";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/dashboardStyles.css";

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem("token");
                const data = await getDashboard(token);
                console.log("Received data:", data);
                if (!data) {
                    throw new Error("Received null or empty data from server");
                }
                setDashboardData(data);
            } catch (error) {
                setError("Error fetching dashboard data");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData().then(() => {
            console.log("Dashboard data loaded");
        });
    }, []); // Runs once on component mount

    /**
     * Handles task selection and navigates to the tasks page with the highlighted task.
     */
    const handleTaskClick = (task) => {
        console.log("Handling task click:", task);

        if (!task.id) {
            console.error("No ID found in task", task);
            return;
        }

        console.log(`Navigating to: /tasks?highlightedTaskId=${task.id}`);
        navigate(`/tasks?highlightedTaskId=${task.id}`);
        console.log("Current location after navigation:", location.pathname);
    };

    /**
     * Handles user selection and navigates to the users page with the highlighted user.
     */
    const handleUserClick = (user) => {
        console.log("Handling user click:", user);

        if (!user.id) {
            console.error("No ID found in user", user);
            return;
        }

        console.log(`Navigating to: /users?highlightedUserId=${user.id}`);
        navigate(`/users?highlightedUserId=${user.id}`);
        console.log("Current location after navigation:", location.pathname);
    };

    if (loading) {
        return <Typography variant="h6">Loading data...</Typography>;
    }

    if (error) {
        return <Typography variant="h6" color="error">{error}</Typography>;
    }

    if (!dashboardData) {
        return <Typography variant="h6">No data available</Typography>;
    }

    const { user, highPriorityTasks, overdueTasks } = dashboardData;
    const userRole = user.role;

    return (
        <div className="dashboard-container">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

                {/* Task statistics visible to employees */}
                {userRole === "EMPLOYEE" && (
                    <Card className="card-custom col-span-1">
                        <CardContent>
                            <Typography variant="h6" className="section-header">Your Tasks</Typography>
                            <Typography variant="body1" className="text-muted">Assigned: {dashboardData.taskCount}</Typography>
                            <Typography variant="body1" className="text-muted">In Progress: {dashboardData.inProgressCount}</Typography>
                            <Typography variant="body1" className="text-muted">Pending: {dashboardData.pendingCount}</Typography>
                            <Typography variant="body1" className="text-muted">Completed: {dashboardData.completedCount}</Typography>
                        </CardContent>
                    </Card>
                )}

                {/* General task overview for admins and department heads */}
                {(userRole === "ADMIN" || userRole === "DEPARTMENT_HEAD") && (
                    <Card className="card-custom col-span-1 md:col-span-2 lg:col-span-1">
                        <CardContent>
                            <Typography variant="h6" className="section-header">Task Overview</Typography>
                            <Typography variant="body1" className="text-muted">Total: {dashboardData.taskCount}</Typography>
                            <Typography variant="body1" className="text-muted">Pending: {dashboardData.pendingCount}</Typography>
                            <Typography variant="body1" className="text-muted">In Progress: {dashboardData.inProgressCount}</Typography>
                            <Typography variant="body1" className="text-muted">Completed: {dashboardData.completedCount}</Typography>
                        </CardContent>
                    </Card>
                )}

                {/* High priority tasks list */}
                <Card className="card-custom col-span-1">
                    <CardContent>
                        <Typography variant="h6" className="section-header">High Priority Tasks</Typography>
                        <List>
                            {highPriorityTasks?.length > 0 ? (
                                highPriorityTasks.map(task => (
                                    <ListItem key={task.id} onClick={() => handleTaskClick(task)} style={{ cursor: "pointer" }}>
                                        <ListItemIcon>
                                            <Warning className="icon-muted"/>
                                        </ListItemIcon>
                                        <ListItemText primary={task.title} secondary={`Due: ${task.dueDate}`} />
                                    </ListItem>
                                ))
                            ) : (
                                <Typography variant="body2" className="text-muted">No urgent tasks</Typography>
                            )}
                        </List>
                    </CardContent>
                </Card>

                {/* Overdue tasks list */}
                <Card className="card-custom col-span-1">
                    <CardContent>
                        <Typography variant="h6" className="section-header">Overdue Tasks</Typography>
                        <List>
                            {overdueTasks?.length > 0 ? (
                                overdueTasks.map(task => (
                                    <ListItem key={task.id} onClick={() => handleTaskClick(task)} style={{ cursor: "pointer" }}>
                                        <ListItemIcon>
                                            <AssignmentLate className="icon-muted"/>
                                        </ListItemIcon>
                                        <ListItemText primary={task.title} secondary={`Due: ${task.dueDate}`} />
                                    </ListItem>
                                ))
                            ) : (
                                <Typography variant="body2" className="text-muted">No overdue tasks</Typography>
                            )}
                        </List>
                    </CardContent>
                </Card>

                {/* Task distribution chart for department heads */}
                {userRole === "DEPARTMENT_HEAD" && dashboardData.userTaskLoads && (
                    <Card className="card-custom col-span-1 md:col-span-2">
                        <CardContent>
                            <Typography variant="h6" className="section-header">Workload Distribution</Typography>
                            <BarChart
                                xAxis={[{ scaleType: "band", data: dashboardData.userTaskLoads.map(e => e.username) }]}
                                series={[{ data: dashboardData.userTaskLoads.map(e => e.taskCount) }]}
                                height={300}
                            />
                        </CardContent>
                    </Card>
                )}

                {/* Department statistics for department heads */}
                {userRole === "DEPARTMENT_HEAD" && (
                    <Card className="card-custom col-span-1">
                        <CardContent>
                            <Typography variant="h6" className="section-header">Department Overview</Typography>
                            <Typography variant="body1" className="text-muted">Active Employees: {dashboardData.activeUserCount}</Typography>
                        </CardContent>
                    </Card>
                )}

                {/* Admin-specific overview */}
                {userRole === "ADMIN" && (
                    <>
                        <Card className="card-custom col-span-1">
                            <CardContent>
                                <Typography variant="h6" className="section-header">Users Overview</Typography>
                                <Typography variant="body1" className="text-muted">Total Users: {dashboardData.userCount}</Typography>
                            </CardContent>
                        </Card>

                        {/* Inactive users list */}
                        <Card className="card-custom col-span-1">
                            <CardContent>
                                <Typography variant="h6" className="section-header">Inactive Users</Typography>
                                <List>
                                    {dashboardData.inactiveUsers?.length > 0 ? (
                                        dashboardData.inactiveUsers.map(emp => (
                                            <ListItem key={emp.id} onClick={() => handleUserClick(emp)} style={{ cursor: "pointer" }}>
                                                <ListItemIcon>
                                                    <PersonOff className="icon-muted"/>
                                                </ListItemIcon>
                                                <ListItemText primary={emp.username} secondary={`Last login: ${emp.lastLogin} days ago`} />
                                            </ListItem>
                                        ))
                                    ) : (
                                        <Typography variant="body2" className="text-muted">No inactive users</Typography>
                                    )}
                                </List>
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
