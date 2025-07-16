'use client'; // Mark as Client Component

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeAuth } from '@/features/auth/authSlice';
import { AppDispatch } from '@/lib/store' // Import your AppDispatch type
export default function AuthInitializer() {
    const dispatch = useDispatch<AppDispatch>() // Add the type here

    useEffect(() => {
        dispatch(initializeAuth());
    }, [dispatch]);

    return null;
}