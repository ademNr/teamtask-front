// TaskList.tsx
import { useState } from 'react';
import TaskItem from './TaskItem';
import { useAppSelector } from '@/lib/hooks';

interface TaskListProps {
    userRole: 'user' | 'manager';
}

export default function TaskList({ userRole }: TaskListProps) {
    const [filter, setFilter] = useState('all');
    const { tasks } = useAppSelector((state) => state.tasks);

    const filteredTasks = filter === 'all'
        ? tasks
        : tasks.filter(task => task.status === filter);

    // Group tasks by status for Kanban-like view
    const statusGroups = {
        'à faire': filteredTasks.filter(task => task.status === 'à faire'),
        'en cours': filteredTasks.filter(task => task.status === 'en cours'),
        'terminée': filteredTasks.filter(task => task.status === 'terminée')
    };

    return (
        <div>
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-xl font-bold text-gray-900">Task Board</h2>
                <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-gray-700">Filter:</label>
                    <select
                        className="border border-gray-200 bg-gray-50 text-gray-900 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">All Tasks</option>
                        <option value="à faire">To Do</option>
                        <option value="en cours">In Progress</option>
                        <option value="terminée">Completed</option>
                    </select>
                </div>
            </div>

            {filteredTasks.length === 0 ? (
                <div className="text-center py-10">
                    <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No tasks found</h3>
                    <p className="text-gray-500 mt-1">Create a new task or try a different filter</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {Object.entries(statusGroups).map(([status, tasks]) => (
                        <div key={status} className="bg-gray-50 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-gray-700 capitalize">
                                    {status} ({tasks.length})
                                </h3>
                            </div>
                            <div className="space-y-4">
                                {tasks.map(task => (
                                    <TaskItem
                                        key={task._id}
                                        task={task}
                                        isManager={userRole === 'manager'}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}