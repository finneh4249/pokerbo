// src/components/StyledBadge.tsx
import React, { ReactNode } from 'react';

interface StyledBadgeProps {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'accent' | 'warning' | 'error' | 'success'; // Add 'success' to variant options
    className?: string; // Allow additional Tailwind classes
}

const StyledBadge: React.FC<StyledBadgeProps> = ({
    children,
    variant = 'primary',
    className = '',
}) => {
    const baseClasses = 'badge';
    const variantClasses = `badge-${variant}`; // e.g., badge-primary, badge-secondary

    const combinedClasses = `${baseClasses} ${variantClasses} ${className}`;

    return (
        <span className={combinedClasses}>
            {children}
        </span>
    );
};

export default StyledBadge;
