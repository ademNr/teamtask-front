import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '@/lib/axios';
import { User } from '@/types';
import { usersService } from './usersService';

interface UsersState {
    users: User[];
    isLoading: boolean;
    error: string | null;
}

const initialState: UsersState = {
    users: [],
    isLoading: false,
    error: null,
};

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (token: string, { rejectWithValue }) => {
        try {
            const response = await usersService.getUsers(token);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Erreur de chargement');
        }
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export default usersSlice.reducer;