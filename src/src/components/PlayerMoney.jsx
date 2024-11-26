// PlayerMoney.jsx
import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';

const PlayerMoney = () => {
    const { playerMoney, resetMoney } = useContext(GameContext);

    return (
        <div>
            <h2>Player Money: ${playerMoney}</h2>
            <button onClick={resetMoney}>Reset Money</button>
        </div>
    );
};

export default PlayerMoney;