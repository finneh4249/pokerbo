// src/components/StyledButton.tsx
import React, { ReactNode } from 'react';

interface StyledButtonProps {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
    size?: 'sm' | 'md' | 'lg';
    className?: string; // Allow additional Tailwind classes
    onClick?: () => void;
}

const StyledButton: React.FC<StyledButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    onClick,
}) => {
    const baseClasses = 'btn';
    const variantClasses = `btn-${variant}`; // e.g., btn-primary, btn-secondary
    const sizeClasses = `btn-${size}`;       // e.g., btn-sm, btn-lg

    const combinedClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`;

    return (
        <button className={combinedClasses} onClick={onClick}>
            {children}
        </button>
    );
};

export default StyledButton;
