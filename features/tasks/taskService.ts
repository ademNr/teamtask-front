import apiClient from '@/lib/axios';
import { Task } from '@/types';

export const taskService = {
    getTasks: async () => {
        const response = await apiClient.get('/tasks');
        return response.data;
    },

    createTask: async ({ taskData, token }: { taskData: { title: string; description: string; assignedTo: string }; token: string }) => {
        const response = await apiClient.post('/tasks', taskData);
        return response.data;
    },

    updateTask: async (
        id: string,
        taskData: { title: string; description: string; assignedTo: string },
        token: string
    ) => {
        const response = await apiClient.put(`/tasks/${id}`, taskData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    },


    deleteTask: async (id: string) => {
        await apiClient.delete(`/tasks/${id}`);
        return id;
    }
};