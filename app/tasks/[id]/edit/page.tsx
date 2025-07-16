'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { updateTask } from '@/features/tasks/taskSlice';
import { fetchUsers } from '@/features/users/usersSlice';
import TaskForm from '@/components/TaskForm';
import { Button } from '@/components/ui/button';
import { Task } from '@/types';

export default function EditTaskPage() {
    const { id } = useParams();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { user, token } = useAppSelector((state) => state.auth);
    const { tasks, isLoading: isTaskLoading } = useAppSelector((state) => state.tasks);
    const { users, isLoading: isUsersLoading } = useAppSelector((state) => state.users);

    const [task, setTask] = useState<Task | null>(null);

    useEffect(() => {
        if (token) {
            dispatch(fetchUsers(token));
            const foundTask = tasks.find(t => t._id === id);
            if (foundTask) {
                setTask(foundTask);
            } else {
                router.push('/dashboard');
            }
        }
    }, [token, dispatch, id, tasks, router]);

    const handleSubmit = async (taskData: { title: string; description: string; assignedTo: string, status: string }) => {
        if (!token || !id) return;

        const result = await dispatch(updateTask({
            id: id as string,
            taskData,
            token
        }));

        if (result.meta.requestStatus === 'fulfilled') {
            router.push('/dashboard');
        }
    };

    if (!task || isUsersLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    if (user?.role !== 'manager') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 max-w-md text-center">
                    <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Unauthorized Access</h2>
                    <p className="mt-2 text-gray-600">Only managers can edit tasks</p>
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
                            <h1 className="text-2xl font-bold text-gray-900">Edit Task</h1>
                            <p className="text-gray-600 mt-1">Update task details below</p>
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
                        isLoading={isTaskLoading}
                        initialData={{
                            title: task.title,
                            description: task.description || '',
                            assignedTo: task.assignedTo._id,
                            status: task.status
                        }}
                    />
                </div>
            </div>
        </div>
    );
}