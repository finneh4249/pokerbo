import React from 'react';
import StyledButton from '../StyledButton'; // Import StyledButton

const PlaceBets = () => {
    const handlePlaceBets = () => {
        const placeBetsButton = document.getElementById('place-bets');
        const betsHeading = document.getElementById('betsHeading');
        if (placeBetsButton && betsHeading) {
            placeBetsButton.classList.add('disabled');
            betsHeading.classList.remove('hidden');
        }
    };

    return (
        <div className="row"> {/* Tailwind row class */}
            <StyledButton 
                onClick={handlePlaceBets} 
                className="btn-info btn-lg" // Apply btn-info and btn-lg classes
            >
                Place Bets
            </StyledButton>
        </div>
    );
};

export default PlaceBets;
