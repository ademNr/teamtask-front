// TaskForm.tsx
import { useState } from 'react';
import { User } from '@/types';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface TaskFormProps {
    users: User[];
    onSubmit: (taskData: { title: string; description: string; assignedTo: string, status: string }) => void;
    initialData?: { title: string; description: string; assignedTo: string, status: string };
    isLoading?: boolean;

}

export default function TaskForm({ users, onSubmit, initialData, isLoading }: TaskFormProps) {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [assignedTo, setAssignedTo] = useState(initialData?.assignedTo || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ title, description, assignedTo,  });
    };

    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
                {initialData ? 'Edit Task' : 'Create New Task'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Title
                    </label>
                    <Input
                        id="title"
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        variant="filled"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Description
                    </label>
                    <textarea
                        id="description"
                        rows={4}
                        className="w-full border border-gray-200 bg-gray-50 text-gray-900 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Assign To
                    </label>
                    <select
                        id="assignedTo"
                        required
                        className="w-full border border-gray-200 bg-gray-50 text-gray-900 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={assignedTo}
                        onChange={(e) => setAssignedTo(e.target.value)}
                    >
                        <option value="">Select a user</option>
                        {users.map((user) => (
                            <option key={user._id} value={user._id} className="text-gray-900">
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3"
                    isLoading={isLoading}
                >
                    {initialData ? 'Update Task' : 'Create Task'}
                </Button>
            </form>
        </div>
    );
}