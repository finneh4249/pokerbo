// components/GameStatus.jsx
import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import HandRanking from './HandRanking';

const GameStatus = () => {
    const { playerMoney } = useContext(GameContext);

    return (
        <div>
            <HandRanking />
            <h2>Player Money: ${playerMoney}</h2>
        </div>
    );
};

export default GameStatus;