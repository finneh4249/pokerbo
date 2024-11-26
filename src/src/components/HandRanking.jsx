// components/HandRanking.jsx
import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';

const handTitles = {
    royal_flush: 'Royal Flush',
    straight_flush: 'Straight Flush',
    four_of_a_kind: 'Four of a Kind',
    full_house: 'Full House',
    flush: 'Flush',
    straight: 'Straight',
    three_of_a_kind: 'Three of a Kind',
    two_pair: 'Two Pair',
    pair: 'Pair',
    no_hand: 'No Hand'
};

const HandRanking = () => {
    const { handRanking } = useContext(GameContext);

    console.log('Hand Ranking:', handRanking);

    return (
        <div style={{ marginTop: '20px' }}>
            {handRanking && (
                <h3>Hand Ranking: {handTitles[handRanking]}</h3>
            )}
        </div>
    );
};

export default HandRanking;