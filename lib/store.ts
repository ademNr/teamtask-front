import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/authSlice';
import taskReducer from '@/features/tasks/taskSlice';
import usersReducer from '@/features/users/usersSlice';
//import { authMiddleware } from '@/middleware/authMiddleware'; // Make sure this exists

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authReducer,
            tasks: taskReducer,
            users: usersReducer,
        },
        // middleware: (getDefaultMiddleware) =>
        //     getDefaultMiddleware().concat(authMiddleware)
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];