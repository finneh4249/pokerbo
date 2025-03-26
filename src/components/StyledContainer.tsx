// src/components/StyledContainer.tsx
import React, { ReactNode } from 'react';

interface StyledContainerProps {
    children: ReactNode;
    className?: string; // Allow additional Tailwind classes for container customization
}

const StyledContainer: React.FC<StyledContainerProps> = ({ children, className = '' }) => {
    const baseClasses = 'container mx-auto'; // Basic container with horizontal centering
    const combinedClasses = `${baseClasses} ${className}`;

    return (
        <div className={combinedClasses}>
            {children}
        </div>
    );
};

export default StyledContainer;
