



// TaskItem.tsx
'use client';

import { useAppDispatch } from '@/lib/hooks';
import { deleteTask, getTasks, updateTask } from '@/features/tasks/taskSlice';
import { Task } from '@/types';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface TaskItemProps {
    task: Task;
    isManager: boolean;
}

// Function to generate consistent color from name
const getColorFromName = (name: string) => {
    const colors = [
        'bg-blue-500', 'bg-indigo-500', 'bg-purple-500',
        'bg-pink-500', 'bg-red-500', 'bg-orange-500',
        'bg-yellow-500', 'bg-green-500', 'bg-teal-500', 'bg-cyan-500'
    ];

    // Simple hash to get consistent color for a name
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
};

export default function TaskItem({ task, isManager }: TaskItemProps) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [bgColor, setBgColor] = useState('bg-gray-300');

    useEffect(() => {
        if (task.assignedTo?.name) {
            setBgColor(getColorFromName(task.assignedTo.name));
        }
    }, [task.assignedTo]);

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value as Task['status'];

        dispatch(updateTask({
            id: task._id,
            taskData: {
                title: task.title,
                description: task.description || '',
                assignedTo: task.assignedTo._id,
                status: newStatus,
            },
            token: localStorage.getItem('token') || '',
        }));
    };

    const handleDelete = async () => {
        await dispatch(deleteTask(task._id));
        await dispatch(getTasks());
    };

    const handleEdit = () => {
        router.push(`/tasks/${task._id}/edit`);
    };

    const statusColors = {
        'à faire': 'bg-yellow-100 text-yellow-800 border-yellow-200',
        'en cours': 'bg-blue-100 text-blue-800 border-blue-200',
        'terminée': 'bg-green-100 text-green-800 border-green-200'
    };

    return (
        <div className={`border ${statusColors[task.status]} rounded-xl p-4 bg-white shadow-sm hover:shadow transition-all`}>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-semibold text-gray-900">{task.title}</h3>
                    <p className="text-gray-600 mt-2 text-sm">{task.description}</p>
                </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center">
                    {task.assignedTo?.name ? (
                        <div className={`${bgColor} w-8 h-8 rounded-full flex items-center justify-center text-white font-bold`}>
                            {task.assignedTo.name.charAt(0).toUpperCase()}
                        </div>
                    ) : (
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                    )}
                    <span className="ml-2 text-sm font-medium text-gray-700">
                        {task.assignedTo?.name || 'Unassigned'}
                    </span>
                </div>

                {isManager && (
                    <select
                        className="border border-gray-200 bg-gray-50 text-gray-900 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                        value={task.status}
                        onChange={handleStatusChange}
                    >
                        <option value="à faire">To Do</option>
                        <option value="en cours">In Progress</option>
                        <option value="terminée">Completed</option>
                    </select>
                )}
            </div>

            {isManager && (
                <div className="mt-4 flex gap-2 border-t border-gray-100 pt-3">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleEdit}
                        className="flex-1 text-xs py-1"
                    >
                        Edit
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleDelete}
                        className="flex-1 text-xs py-1"
                    >
                        Delete
                    </Button>
                </div>
            )}
        </div>
    );
}