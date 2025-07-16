import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: 'default' | 'filled';
}

export const Input: React.FC<InputProps> = ({
    className = '',
    variant = 'default',
    ...props
}) => {
    const baseClasses = 'w-full rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1';

    const variantClasses = {
        default: 'border border-gray-300 bg-white text-gray-800 placeholder-gray-400',
        filled: 'border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-500'
    };

    return (
        <input
            className={`${baseClasses} ${variantClasses[variant]} px-4 py-3 text-gray-900 ${className}`}
            {...props}
        />
    );
};