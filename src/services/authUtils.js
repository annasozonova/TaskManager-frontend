import { jwtDecode } from 'jwt-decode';

// Function to get user role from the JWT token
export const getUserRole = () => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    if (!token) return null; // Return null if no token is found

    try {
        const decodedToken = jwtDecode(token); // Decode the token
        return decodedToken.role || null; // Return the user role or null if not found
    } catch (error) {
        console.error('Error decoding token:', error); // Log error if decoding fails
        return null; // Return null if an error occurs
    }
};
