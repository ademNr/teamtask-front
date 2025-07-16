import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authService } from './authService';
import { User } from '@/types';
import { useDispatch } from 'react-redux';

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    isInitialized: boolean; // Add this

}

const initialState: AuthState = {
    user: null,
    token: null,
    isLoading: false,
    error: null,
    isInitialized: false, // Initial state
};
export const initializeAuth = createAsyncThunk(
    'auth/initialize',
    async (_, { dispatch }) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            const userString = localStorage.getItem('user');

            if (token || userString) {
                dispatch(setUser({
                    user: userString ? JSON.parse(userString) : null,
                    token
                }));
            }
        }
    }
);
export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await authService.login(credentials);
            console.log('API RESPONSE:', response);

            // Persist token immediately
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));

            return response;
        } catch (error: any) {
            console.log('LOGIN ERROR:', error);
            if (error.response) {
                return rejectWithValue(error.response.data.message || 'Login failed');
            }
            return rejectWithValue('Network error occurred');
        }
    }
);


export const register = createAsyncThunk(
    'auth/register',
    async (userData: { name: string; email: string; password: string; role: string }, { rejectWithValue }) => {
        try {
            const response = await authService.register(userData);
            return response;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || 'Registration failed');
            }
            return rejectWithValue('Network error occurred');
        }
    }
);

export const logout = createAsyncThunk('auth/logout', async () => {
    authService.logout();
});

export const fetchCurrentUser = createAsyncThunk(
    'auth/fetchCurrentUser',
    async (_, { rejectWithValue }) => {
        try {
            const user = await authService.getCurrentUser();
            return user;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || 'Failed to fetch user');
            }
            return rejectWithValue('Network error occurred');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(initializeAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(initializeAuth.fulfilled, (state) => {
                state.isInitialized = true;
                state.isLoading = false;
            })
            .addCase(initializeAuth.rejected, (state) => {
                state.isInitialized = true;
                state.isLoading = false;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.token = null;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;