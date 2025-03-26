// src/components/HandRanking.tsx
import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';

const handInfo = {
    straightnup: {
        title: 'Premium Hand',
        description: 'Straight or better',
        color: 'text-accent',
        emoji: '🏆'
    },
    '3ofak': {
        title: 'Three of a Kind',
        description: 'Three cards of the same rank',
        color: 'text-info',
        emoji: '🎲'
    },
    twopair: {
        title: 'Two Pair',
        description: 'Two different pairs',
        color: 'text-info',
        emoji: '🎭'
    },
    pair: {
        title: 'Pair',
        description: 'Two cards of the same rank',
        color: 'text-secondary',
        emoji: '👥'
    },
    nohand: {
        title: 'No Hand',
        description: 'High card only',
        color: 'text-secondary',
        emoji: '🃏'
    },
    hearts: {
        title: 'Hearts Bet',
        description: '3+ hearts in the hand',
        color: 'text-error',
        emoji: '♥️'
    },
    diamonds: {
        title: 'Diamonds Bet',
        description: '3+ diamonds in the hand',
        color: 'text-error',
        emoji: '♦️'
    },
    clubs: {
        title: 'Clubs Bet',
        description: '3+ clubs in the hand',
        color: 'text-neutral-900',
        emoji: '♣️'
    },
    spades: {
        title: 'Spades Bet',
        description: '3+ spades in the hand',
        color: 'text-neutral-900',
        emoji: '♠️'
    }
};

const HandRanking: React.FC = () => {
    const { handRanking, message, activeBets, winnings } = useContext(GameContext) || { 
        handRanking: '', 
        message: '',
        activeBets: [],
        winnings: 0
    };
    
    if (!handRanking) return null;
    
    // Get the appropriate info based on the hand type
    const info = handInfo[handRanking] || handInfo.nohand;

    // Get information about the specific message (e.g., "Four of a Kind", "Flush")
    const specificHandTitle = message || info.title;

    // Find winning bets (bets that the player placed that match the current hand)
    const winningBets = activeBets?.filter(bet => 
        bet === handRanking || 
        // For suit bets, check if the message contains the suit name
        (bet.includes('hearts') && message?.toLowerCase().includes('hearts')) ||
        (bet.includes('diamonds') && message?.toLowerCase().includes('diamonds')) ||
        (bet.includes('clubs') && message?.toLowerCase().includes('clubs')) ||
        (bet.includes('spades') && message?.toLowerCase().includes('spades'))
    );

    return (
        <div className="flex flex-col items-center justify-center py-4">
            <div className={`text-center ${info.color} rounded-lg p-4 bg-base-100 shadow-md w-full max-w-md mx-auto border border-base-300`}>
                <div className="flex items-center justify-center gap-2">
                    <span className="text-xl">{info.emoji}</span>
                    <h3 className="text-xl font-bold">{specificHandTitle}</h3>
                    <span className="text-xl">{info.emoji}</span>
                </div>
                <p className="text-neutral-600 text-sm mt-1">{info.description}</p>
                
                {winningBets && winningBets.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-base-200">
                        <p className="text-success text-sm font-medium">
                            You won with: {winningBets.map(bet => handInfo[bet]?.title).join(', ')}
                        </p>
                        
                        {winnings > 0 && (
                            <div className="mt-2 flex justify-center">
                                <div className="badge badge-lg badge-success gap-2 animate-pulse">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                    </svg>
                                    <span className="font-mono">+${winnings}</span>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HandRanking;
