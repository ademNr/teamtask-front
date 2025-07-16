export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'manager';
}

export interface Task {
    _id: string;
    title: string;
    description?: string;
    status: 'à faire' | 'en cours' | 'terminée';
    assignedTo: User;
    createdBy: User;
    createdAt: string;
    updatedAt: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

export interface TaskState {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
}