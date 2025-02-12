import { jwtDecode } from 'jwt-decode';

export const getUserRole = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const decodedToken = jwtDecode(token);
        return decodedToken.role || null;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};
