'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { createTask } from '@/features/tasks/taskSlice';
import { fetchUsers } from '@/features/users/usersSlice';
import TaskForm from '@/components/TaskForm';
import { Button } from '@/components/ui/button';

export default function NewTaskPage() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { user, token } = useAppSelector((state) => state.auth);
    const { users } = useAppSelector((state) => state.users);
    const { isLoading } = useAppSelector((state) => state.tasks);

    useEffect(() => {
        if (token) {
            dispatch(fetchUsers(token));
        }
    }, [token, dispatch]);

    const handleSubmit = async (taskData: { title: string; description: string; assignedTo: string }) => {
        if (!token) return;

        const result = await dispatch(createTask({
            taskData,
            token
        }));

        if (result.meta.requestStatus === 'fulfilled') {
            router.push('/dashboard');
        }
    };

    if (!user || user.role !== 'manager') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 max-w-md text-center">
                    <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Unauthorized Access</h2>
                    <p className="mt-2 text-gray-600">Only managers can create tasks</p>
                    <Button
                        className="mt-6 w-full"
                        onClick={() => router.push('/dashboard')}
                    >
                        Return to Dashboard
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Create New Task</h1>
                            <p className="text-gray-600 mt-1">Fill out the form to create a new task</p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => router.back()}
                            className="flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back
                        </Button>
                    </div>

                    <TaskForm
                        users={users}
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
    );
}