// src/components/PlayerMoney.tsx
import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import StyledButton from './StyledButton';
import StyledCard from './StyledCard';

const PlayerMoney = () => {
    const { 
        playerMoney, 
        resetMoney, 
        totalBetAmount, 
        canBet,
        activeBets
    } = useContext(GameContext) || { 
        playerMoney: 0, 
        resetMoney: () => {},
        totalBetAmount: 0,
        canBet: true,
        activeBets: []
    };

    return (
        <StyledCard className="bg-white shadow-lg border border-base-200">
            <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-primary">Your Balance</h2>
                    <div className="badge badge-accent text-white">Player Funds</div>
                </div>
                
                <div className="bg-base-200 rounded-lg p-4 mb-4 text-center">
                    <div className="font-mono text-3xl font-bold text-accent relative">
                        ${playerMoney.toLocaleString()}
                        
                        {/* Show bet amount if there are active bets */}
                        {!canBet && totalBetAmount > 0 && (
                            <div className="absolute -right-2 -top-2">
                                <span className="badge badge-sm badge-error text-white animate-fadeIn">
                                    -${totalBetAmount}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="text-xs text-neutral-500 mt-1">
                        {canBet ? "Available for betting" : "Bets placed"}
                    </div>
                </div>
                
                {/* Current bets section */}
                {activeBets && activeBets.length > 0 && (
                    <div className="mb-4">
                        <h3 className="text-sm font-semibold text-neutral-700 mb-2">Current Bets</h3>
                        <div className="bg-base-100 rounded-md p-2 border border-base-300">
                            <div className="flex justify-between items-center">
                                <span className="text-xs">Active Bets:</span>
                                <span className="text-xs font-bold">{activeBets.length}</span>
                            </div>
                            {!canBet && (
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-xs">Total Bet:</span>
                                    <span className="text-xs font-bold text-error">${totalBetAmount}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                
                <StyledButton 
                    onClick={resetMoney} 
                    variant="secondary" 
                    className="w-full"
                    disabled={!canBet}
                >
                    Reset Balance
                </StyledButton>
            </div>
        </StyledCard>
    );
};

export default PlayerMoney;
