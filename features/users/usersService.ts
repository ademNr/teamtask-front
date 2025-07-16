import axios from '@/lib/axios';

export const usersService = {
    getUsers: async (token: string) => {
        const response = await axios.get('https://teamtask-backend.vercel.app/api/users', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    },
};