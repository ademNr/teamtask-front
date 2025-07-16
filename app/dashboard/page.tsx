// DashboardPage.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getTasks } from '@/features/tasks/taskSlice';
import { logout } from '@/features/auth/authSlice';
import TaskList from '@/components/TaskList';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { user } = useAppSelector((state) => state.auth);
    const { isLoading } = useAppSelector((state) => state.tasks);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        dispatch(getTasks());
    }, [dispatch]);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    const handleLogout = async () => {
        await dispatch(logout());
        router.push('/login');
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Mobile Header */}
            <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-900">TeamTask</h1>
                <button
                    onClick={toggleMobileMenu}
                    className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <svg
                        className="h-6 w-6 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={toggleMobileMenu}>
                    <div className="bg-white w-64 h-full shadow-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="p-6 border-b border-gray-200">
                            <h1 className="text-xl font-bold text-gray-900">TeamTask</h1>
                        </div>
                        <div className="p-6 flex flex-col h-full">
                            <div className="flex items-center mb-8">
                                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
                                    {user.name.charAt(0)}
                                </div>
                                <div className="ml-3">
                                    <p className="font-medium text-gray-900">{user.name}</p>
                                    <p className="text-sm text-gray-500 capitalize">{user.role}</p>
                                </div>
                            </div>
                            <div className="mt-auto pb-6">
                                <Button
                                    variant="outline"
                                    onClick={handleLogout}
                                    className="w-full py-2.5"
                                >
                                    Logout
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex">
                {/* Desktop Sidebar */}
                <div className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col min-h-screen">
                    <div className="p-6 border-b border-gray-200">
                        <h1 className="text-xl font-bold text-gray-900">TeamTask</h1>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center mb-8">
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
                                {user.name.charAt(0)}
                            </div>
                            <div className="ml-3">
                                <p className="font-medium text-gray-900">{user.name}</p>
                                <p className="text-sm text-gray-500 capitalize">{user.role}</p>
                            </div>
                        </div>

                        <div className="mt-auto">
                            <Button
                                variant="outline"
                                onClick={handleLogout}
                                className="w-full py-2.5"
                            >
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-auto">
                    <div className="p-4 sm:p-6">
                        <div className="max-w-6xl mx-auto">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                                    <p className="text-gray-600 mt-1">
                                        Manage your tasks and projects
                                    </p>
                                </div>
                                {user.role === 'manager' && (
                                    <Button
                                        onClick={() => router.push('/tasks/new')}
                                        className="flex items-center justify-center gap-2 py-2.5 w-full sm:w-auto"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Create Task
                                    </Button>
                                )}
                            </div>

                            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 sm:p-6">
                                {isLoading ? (
                                    <div className="flex justify-center py-10">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                    </div>
                                ) : (
                                    <TaskList userRole={user.role} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}