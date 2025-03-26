import React, { useContext, useState } from 'react';
import { GameContext, BetType } from '../context/GameContext';
import StyledContainer from './StyledContainer';
import StyledButton from './StyledButton'; 
import StyledCard from './StyledCard';
import StyledBadge from './StyledBadge';

const BetTable = () => {
    const { 
        bets, 
        toggleBet, 
        placeBets, 
        canBet, 
        selectedChip, 
        setSelectedChip,
        activeBets,
        message
    } = useContext(GameContext) || {};

    // Local state for chip animation
    const [animatingChip, setAnimatingChip] = useState<number | null>(null);

    if (!bets || !toggleBet || !placeBets || !setSelectedChip) {
        return (
            <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                <span className="ml-2 text-neutral-700">Loading game...</span>
            </div>
        );
    }
    
    const chips = [
        { value: 1, color: 'bg-white border border-gray-300', textColor: 'text-neutral-800' },
        { value: 5, color: 'bg-red-600', textColor: 'text-white' },
        { value: 25, color: 'bg-green-600', textColor: 'text-white' },
        { value: 100, color: 'bg-blue-600', textColor: 'text-white' },
        { value: 500, color: 'bg-purple-800', textColor: 'text-white' },
    ];

    const betOptions = [
        { id: 'straightnup', name: 'Straight \'n\' Up', description: 'High hands (Straight or better)', payout: 'Up to 601:1', category: 'premium', icon: '🎯' },
        { id: '3ofak', name: 'Three of a Kind', description: 'Three cards of same value', payout: '30:1', category: 'common', icon: '🔄' },
        { id: 'twopair', name: 'Two Pair', description: 'Two different pairs', payout: '14:1', category: 'common', icon: '👥' },
        { id: 'pair', name: 'Pair', description: 'One pair of same value', payout: '2:1', category: 'basic', icon: '🎭' },
        { id: 'nohand', name: 'No Hand', description: 'High card only', payout: '2:1', category: 'basic', icon: '🃏' },
    ];

    const suitBets = [
        { id: 'hearts', name: 'Hearts', icon: '♥', color: 'text-error', payout: '2:1 for 3+ hearts', bgColor: 'bg-red-100' },
        { id: 'spades', name: 'Spades', icon: '♠', color: 'text-neutral-900', payout: '2:1 for 3+ spades', bgColor: 'bg-neutral-100' },
        { id: 'diamonds', name: 'Diamonds', icon: '♦', color: 'text-error', payout: '2:1 for 3+ diamonds', bgColor: 'bg-red-100' },
        { id: 'clubs', name: 'Clubs', icon: '♣', color: 'text-neutral-900', payout: '2:1 for 3+ clubs', bgColor: 'bg-neutral-100' },
    ];

    const handleBetToggle = (betType: BetType) => {
        if (toggleBet && canBet) {
            // Set animating chip for visual feedback
            setAnimatingChip(selectedChip);
            setTimeout(() => setAnimatingChip(null), 300);
            toggleBet(betType);
        }
    };

    const handleClearBets = () => {
        // Reset active bets by toggling off each bet that is currently active
        if (toggleBet && activeBets) {
            activeBets.forEach(bet => toggleBet(bet));
        }
    };

    // Calculate total bet amount
    const totalBetAmount = activeBets ? activeBets.length * selectedChip : 0;

    return (
        <div className="space-y-6">
            {/* Chip selection with improved visuals */}
            <div className="flex flex-col items-center mb-4">
                <div className="text-neutral-600 mb-2 text-sm font-medium">Select Chip Value</div>
                <div className="bg-base-200 p-4 rounded-box inline-flex gap-3 shadow-inner">
                    {chips.map(chip => (
                        <button 
                            key={chip.value}
                            className={`w-14 h-14 rounded-full ${chip.color} ${chip.textColor} font-bold flex items-center justify-center shadow-md transition-all ${
                                selectedChip === chip.value ? 'ring-4 ring-accent transform scale-110 z-10' : 'hover:scale-105'
                            }`}
                            onClick={() => setSelectedChip(chip.value)}
                            disabled={!canBet}
                        >
                            <div className="relative">
                                <span className="text-lg">${chip.value}</span>
                                {selectedChip === chip.value && (
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
                {canBet && totalBetAmount > 0 && (
                    <div className="mt-3 text-center">
                        <StyledBadge variant="primary" className="font-semibold px-3 py-1">
                            Total Bet: ${totalBetAmount}
                        </StyledBadge>
                    </div>
                )}
            </div>

            {/* Message display when a hand is evaluated */}
            {message && (
                <div className="bg-accent text-white p-3 rounded-lg text-center font-bold animate-fadeIn mb-4 shadow-md">
                    {message}
                </div>
            )}

            {/* Bet options with category tabs */}
            <div className="bg-base-100 rounded-lg overflow-hidden shadow-md">
                <div className="bg-base-200 px-4 py-3 border-b border-base-300">
                    <h3 className="font-semibold text-neutral-800">Hand Bets</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3">
                    {betOptions.map(bet => {
                        const betInfo = bets.get(bet.id as BetType);
                        const isActive = betInfo?.bet;
                        
                        return (
                            <StyledCard 
                                key={bet.id}
                                className={`bg-white cursor-pointer hover:shadow-lg transition-all overflow-hidden ${
                                    bet.category === 'premium' ? 'border-accent' : 
                                    bet.category === 'common' ? 'border-info' : 'border-secondary'
                                } ${isActive ? 'ring-2 ring-accent' : ''}`}
                                bodyClassName="p-0" // Remove default padding
                            >
                                <div 
                                    className="p-3 h-full relative overflow-hidden"
                                    onClick={() => handleBetToggle(bet.id as BetType)}
                                >
                                    {/* Category indicator */}
                                    <div className={`absolute top-0 right-0 w-16 h-16 transform translate-x-8 -translate-y-8 rotate-45 ${
                                        bet.category === 'premium' ? 'bg-accent' : 
                                        bet.category === 'common' ? 'bg-info' : 'bg-secondary'
                                    }`}></div>
                                    
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-bold flex items-center">
                                            <span className="mr-1 text-lg">{bet.icon}</span>
                                            {bet.name}
                                        </h3>
                                        <span className={`badge ${
                                            bet.category === 'premium' ? 'badge-accent' : 
                                            bet.category === 'common' ? 'badge-info' : 'badge-secondary'
                                        } text-white font-semibold z-10`}>
                                            {bet.payout}
                                        </span>
                                    </div>
                                    
                                    <p className="text-sm text-neutral-600 mt-1">{bet.description}</p>
                                    
                                    <div className="mt-3 flex justify-between items-center">
                                        {isActive && (
                                            <div className="flex items-center">
                                                <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center animate-bounce">
                                                    <span className="text-white text-xs">✓</span>
                                                </div>
                                                <div className="text-sm font-medium ml-2 text-accent-focus">
                                                    Bet: ${selectedChip}
                                                </div>
                                            </div>
                                        )}
                                        {!isActive && (
                                            <div className="text-xs text-neutral-500 italic">
                                                Click to place bet
                                            </div>
                                        )}
                                        
                                        {/* Chip animation when placing bet */}
                                        {animatingChip && bet.id === activeBets[activeBets.length - 1] && (
                                            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                                                <div className="w-10 h-10 rounded-full bg-accent text-white font-bold flex items-center justify-center animate-ping opacity-75">
                                                    ${animatingChip}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </StyledCard>
                        );
                    })}
                </div>
            </div>

            {/* Suit bets with improved styling */}
            <div className="bg-base-100 rounded-lg overflow-hidden shadow-md">
                <div className="bg-base-200 px-4 py-3 border-b border-base-300">
                    <h3 className="font-semibold text-neutral-800">Suit Bets</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3">
                    {suitBets.map(suitBet => {
                        const betInfo = bets.get(suitBet.id as BetType);
                        const isActive = betInfo?.bet;
                        
                        return (
                            <StyledCard 
                                key={suitBet.id}
                                className={`cursor-pointer hover:shadow-lg transition-all ${suitBet.bgColor} ${isActive ? 'ring-2 ring-accent transform scale-105' : ''}`}
                                bodyClassName="p-0"
                            >
                                <div 
                                    className="p-3 flex flex-col items-center justify-center text-center"
                                    onClick={() => handleBetToggle(suitBet.id as BetType)}
                                >
                                    <div className={`text-4xl ${suitBet.color} mb-1 transition-transform ${isActive ? 'animate-pulse' : 'hover:scale-125'}`}>
                                        {suitBet.icon}
                                    </div>
                                    <h4 className="font-semibold">{suitBet.name}</h4>
                                    <p className="text-xs text-neutral-600 mt-1">{suitBet.payout}</p>
                                    {isActive && (
                                        <StyledBadge variant="accent" className="mt-2 animate-fadeIn">
                                            Bet: ${selectedChip}
                                        </StyledBadge>
                                    )}
                                </div>
                            </StyledCard>
                        );
                    })}
                </div>
            </div>

            {/* Action buttons with improved styling and layout */}
            <div className="flex justify-between items-center gap-4 mt-6 pt-4 border-t border-base-300">
                <div>
                    {activeBets && activeBets.length > 0 && (
                        <div className="text-sm text-neutral-600">
                            <span className="font-medium">{activeBets.length} active bet{activeBets.length !== 1 ? 's' : ''}</span>
                        </div>
                    )}
                </div>
                <div className="flex gap-3">
                    <StyledButton 
                        variant="error" 
                        size="md" 
                        className="px-6"
                        onClick={handleClearBets}
                        disabled={!canBet || !activeBets || activeBets.length === 0}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        Clear Bets
                    </StyledButton>
                    <StyledButton 
                        variant="success" 
                        size="md" 
                        className="px-8"
                        onClick={placeBets}
                        disabled={!canBet || !activeBets || activeBets.length === 0}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                        </svg>
                        Place Bets
                    </StyledButton>
                </div>
            </div>
        </div>
    );
};

export default BetTable;
