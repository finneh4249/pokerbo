// components/DealerCards.jsx
import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import HandRanking from './HandRanking';

const DealerCards = () => {
    const { dealerHand, dealCards } = useContext(GameContext);

    return (
        <div>
            <button onClick={dealCards}>Deal Cards</button>
            <div id="dealer-cards" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                {dealerHand.map((card, index) => (
                    <img key={index} src={`assets/images/cards/${card}.png`} width="100" alt={card} />
                ))}
            </div>
            <HandRanking />
        </div>
    );
};

export default DealerCards;