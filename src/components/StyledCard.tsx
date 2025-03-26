// src/components/StyledCard.tsx
import React, { ReactNode } from 'react';

interface StyledCardProps {
    children: ReactNode;
    className?: string; // Allow additional Tailwind classes for card customization
    bodyClassName?: string; // ClassNames for the card body
}

const StyledCard: React.FC<StyledCardProps> = ({ children, className = '', bodyClassName = '' }) => {
    const baseClasses = 'card rounded-box shadow-md'; // Basic card styling
    const combinedClasses = `${baseClasses} ${className}`;
    const bodyClasses = `card-body ${bodyClassName}`; // Classes for the card body

    return (
        <div className={combinedClasses}>
            <div className={bodyClasses}>
                {children}
            </div>
        </div>
    );
};

export default StyledCard;
