'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="text-center max-w-md">
                <h2 className="text-2xl font-bold mb-4">Une erreur s'est produite!</h2>
                <p className="text-red-500 mb-6">{error.message}</p>
                <Button
                    onClick={() => reset()}
                    className="mr-4"
                >
                    Réessayer
                </Button>
                <Button variant="secondary">
                    <a href="/dashboard">Retour au tableau de bord</a>
                </Button>
            </div>
        </div>
    );
}