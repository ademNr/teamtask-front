'use client';

import { useParams, useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import { Button } from '@/components/ui/button';

export default function TaskDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { tasks } = useAppSelector((state) => state.tasks);
    const { user } = useAppSelector((state) => state.auth);

    const task = tasks.find(t => t._id === id);

    if (!task) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h2 className="text-xl font-semibold">Tâche non trouvée</h2>
                <Button
                    className="mt-4"
                    onClick={() => router.push('/dashboard')}
                >
                    Retour au tableau de bord
                </Button>
            </div>
        );
    }

    const canEdit = user?.role === 'manager' || user?._id === task.assignedTo._id;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">{task.title}</h1>
                        <div className="flex items-center mt-2 space-x-4">
                            <span className={`px-2 py-1 rounded text-xs ${task.status === 'à faire' ? 'bg-yellow-100 text-yellow-800' :
                                task.status === 'en cours' ? 'bg-blue-100 text-blue-800' :
                                    'bg-green-100 text-green-800'
                                }`}>
                                {task.status}
                            </span>
                            <span className="text-gray-600">
                                Assignée à: {task.assignedTo.name}
                            </span>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        {canEdit && (
                            <Button
                                variant="outline"
                                onClick={() => router.push(`/tasks/${task._id}/edit`)}
                            >
                                Modifier
                            </Button>
                        )}
                        <Button variant="secondary" onClick={() => router.back()}>
                            Retour
                        </Button>
                    </div>
                </div>

                <div className="prose max-w-none">
                    <h3>Description</h3>
                    <p className="text-gray-700">
                        {task.description || 'Aucune description fournie'}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <div>
                            <h4>Créée par</h4>
                            <p>{task.createdBy.name}</p>
                        </div>
                        <div>
                            <h4>Date de création</h4>
                            <p>{new Date(task.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <h4>Dernière mise à jour</h4>
                            <p>{new Date(task.updatedAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}