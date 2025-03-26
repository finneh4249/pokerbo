import React, { useState } from 'react';
import StyledButton from '../StyledButton'; // Import StyledButton

interface BetButtonProps {
    bet: string;
}

const betTitles = {
    straightnup: 'Straight \'n\' Up',
    twopair: 'Two Pair',
    threeofak: 'Three of a Kind',
    pair: 'Pair',
    nohand: 'No Hand'
};

const BetButton: React.FC<BetButtonProps> = ({ bet }) => { // Define BetButtonProps
    const [active, setActive] = useState(false);

    const toggleActive = () => {
        setActive(!active);
    };

    const buttonClasses = active
        ? 'btn-outline-light active' // Tailwind classes for active state
        : 'btn-outline-light';      // Tailwind classes for inactive state

    return (
        <StyledButton 
            onClick={toggleActive} 
            className={buttonClasses} // Apply dynamic classes
        >
            <img src={`assets/images/hands/${bet}.webp`} width="100" alt="Straight" />
            <h3>{betTitles[bet]}</h3>
        </StyledButton>
    );
};

export default BetButton;
