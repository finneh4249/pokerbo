import React, { useContext, useEffect, useState } from 'react';
import { GameContext } from '../context/GameContext';
import HandRanking from './HandRanking';
import StyledButton from './StyledButton';
import StyledBadge from './StyledBadge';

const DealerCards = () => {
    const { 
        dealerHand, 
        dealCards, 
        handRanking,
        canBet,
        message,
        placeBets,
        activeBets
    } = useContext(GameContext) || {};

    // Animation states
    const [tableReady, setTableReady] = useState(false);
    const [dealingAnimation, setDealingAnimation] = useState(false);

    // Show placeBets button only when bets are active and we can bet
    const showPlaceBetsButton = canBet && activeBets && activeBets.length > 0;

    // Table animation on component mount
    useEffect(() => {
        setTimeout(() => setTableReady(true), 300);
    }, []);

    // Animate when dealing cards
    const handleDealCards = () => {
        setDealingAnimation(true);
        setTimeout(() => {
            if (dealCards) dealCards();
            setTimeout(() => setDealingAnimation(false), 300);
        }, 500);
    };

    return (
        <div className="space-y-6">
            {/* Control buttons with improved look */}
            <div className="flex justify-center">
                {canBet && (
                    <div className="space-x-4">
                        <StyledButton 
                            onClick={handleDealCards} 
                            variant="primary" 
                            size="lg"
                            className={`px-8 font-semibold text-base transition-all flex items-center
                                ${dealingAnimation ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg hover:scale-105'}
                            `}
                            disabled={!canBet || dealingAnimation}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                            </svg>
                            Deal Cards
                        </StyledButton>
                        
                        {showPlaceBetsButton && (
                            <StyledButton 
                                onClick={placeBets} 
                                variant="success" 
                                size="lg"
                                className="px-8 font-semibold text-base hover:shadow-lg hover:scale-105 transition-all flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                Place Bets & Deal
                            </StyledButton>
                        )}
                    </div>
                )}
                {!canBet && (
                    <div className="animate-pulse">
                        <StyledBadge variant="accent" className="text-lg p-3 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Playing...
                        </StyledBadge>
                    </div>
                )}
            </div>
            
            {/* Poker table with improved visuals and animations */}
            <div 
                className={`relative min-h-[220px] rounded-xl p-6 flex justify-center items-center shadow-xl transition-all duration-500
                    ${tableReady ? 'bg-gradient-to-r from-green-800 to-green-700 shadow-inner scale-100' : 'bg-base-200 scale-95 opacity-90'}
                    ${dealingAnimation ? 'animate-pulse' : ''}
                `}
            >
                {/* Decorative elements */}
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                    <div className="absolute inset-4 border-4 border-dashed border-green-600 opacity-20 rounded-xl"></div>
                    {/* Corner decorations */}
                    <div className="absolute top-2 left-2 w-6 h-6 bg-white opacity-20 rounded-full"></div>
                    <div className="absolute top-2 right-2 w-6 h-6 bg-white opacity-20 rounded-full"></div>
                    <div className="absolute bottom-2 left-2 w-6 h-6 bg-white opacity-20 rounded-full"></div>
                    <div className="absolute bottom-2 right-2 w-6 h-6 bg-white opacity-20 rounded-full"></div>
                </div>

                {dealerHand && dealerHand.length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4 z-10">
                        {dealerHand.map((card, index) => (
                            <div 
                                key={index} 
                                className="transition-all duration-300 hover:translate-y-[-15px] animate-cardDeal"
                                style={{
                                    animationDelay: `${index * 0.1}s`,
                                    transform: `rotate(${(index - 2) * 2}deg)`,
                                }}
                            >
                                <img 
                                    src={`/assets/images/cards/${card}.png`} 
                                    alt={card}
                                    className="w-16 md:w-24 lg:w-32 h-auto rounded shadow-lg hover:shadow-xl card-shadow border-2 border-white"
                                />
                                {/* Card reflection effect */}
                                <div className="w-16 md:w-24 lg:w-32 h-4 bg-gradient-to-t from-white to-transparent opacity-20 mt-2 rounded-full transform scale-75 blur-sm"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-white z-10">
                        {dealingAnimation ? (
                            <div className="animate-ping">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-white opacity-70">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                                </svg>
                            </div>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mb-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.5 20.25h-9.75a1.5 1.5 0 01-1.5-1.5v-10.5a1.5 1.5 0 011.5-1.5h9.75a1.5 1.5 0 011.5 1.5v10.5a1.5 1.5 0 01-1.5 1.5z" />
                                </svg>
                                <span className="text-lg font-semibold">{canBet ? "Ready to deal" : "Dealing cards..."}</span>
                                <p className="text-sm opacity-80 mt-1 text-center">
                                    {canBet ? "Select your bets and click 'Place Bets & Deal'" : "Wait for the cards to be dealt..."}
                                </p>
                            </>
                        )}
                    </div>
                )}
            </div>
            
            {/* Display hand result message with improved visual appeal */}
            {message && dealerHand && dealerHand.length === 5 && (
                <div className="animate-fadeIn text-center">
                    <div className="bg-gradient-to-r from-primary to-accent text-white font-bold py-3 px-6 rounded-lg inline-block shadow-lg">
                        <span className="text-lg">{message}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DealerCards;
