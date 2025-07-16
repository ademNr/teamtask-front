import apiClient from '@/lib/axios';
import { User } from '@/types';

export const authService = {
    login: async (credentials: { email: string; password: string }) => {
        const response = await apiClient.post('https://teamtask-backend.vercel.app/api/auth/login', credentials);
        return response.data;
    },
    register: async (userData: { name: string; email: string; password: string; role: string }) => {
        const response = await apiClient.post('https://teamtask-backend.vercel.app/api/auth/register', userData);
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
    getCurrentUser: async () => {
        const response = await apiClient.get('/auth/me');
        return response.data;
    }
};