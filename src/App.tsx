import React, { useState, useContext } from 'react';
import { GameProvider, GameContext } from './context/GameContext';
import BetTable from './components/BetTable';
import DealerCards from './components/DealerCards';
import PlayerMoney from './components/PlayerMoney';
import Header from './components/Header';
import StyledContainer from './components/StyledContainer';
import StyledCard from './components/StyledCard';
import StyledButton from './components/StyledButton';
import StyledBadge from './components/StyledBadge';
import { GameRulesModal, PayoutTableModal } from './components/GameInfoModals';
import HandRanking from './components/HandRanking';

// Game content wrapped in context consumer for access to game state
const GameContent = () => {
  // State to control modal visibility
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  
  const gameContext = useContext(GameContext);
  const { handRanking } = gameContext || {};

  return (
    <>
      <div className="App min-h-screen pb-8 bg-gradient-to-b from-base-100 to-base-200">
        <Header />
        
        <StyledContainer className="mt-6 px-4">
          {/* Game status indicator */}
          {gameContext && (
            <div className="mb-4 flex justify-center">
              <StyledBadge 
                variant={gameContext.canBet ? "primary" : "accent"} 
                className="text-md py-2 px-4 shadow-md animate-pulse"
              >
                {gameContext.canBet ? "Ready to Play" : "Game in Progress"}
              </StyledBadge>
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main game area */}
            <div className="lg:col-span-8">
              <StyledCard className="bg-white shadow-xl border-t-4 border-primary">
                <h2 className="text-xl font-bold text-primary mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                  Game Table
                </h2>
                <DealerCards />
              </StyledCard>
              
              {/* Bet area with improved styling */}
              <div className="mt-6">
                <StyledCard className="bg-white shadow-xl border-t-4 border-secondary">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-secondary flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                      Place Your Bets
                    </h2>
                    <div className="flex space-x-2">
                      <StyledButton 
                        variant="accent" 
                        size="sm"
                        onClick={() => setShowPayoutModal(true)}
                        className="text-white flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                        </svg>
                        Payout Tables
                      </StyledButton>
                    </div>
                  </div>
                  <BetTable />
                </StyledCard>
              </div>
            </div>
            
            {/* Sidebar with improved visual hierarchy */}
            <div className="lg:col-span-4 space-y-6">
              <StyledCard className="bg-white shadow-xl border-l-4 border-accent">
                <PlayerMoney />
              </StyledCard>
              
              {/* Hand ranking card, shown conditionally */}
              {handRanking && (
                <StyledCard className="bg-white shadow-xl border-l-4 border-success animate-fadeIn">
                  <h2 className="text-xl font-bold text-success mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                    </svg>
                    Current Hand
                  </h2>
                  <HandRanking />
                </StyledCard>
              )}
              
              <StyledCard className="bg-white shadow-xl border-l-4 border-info">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-info flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                    Game Rules
                  </h2>
                  <StyledButton 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowRulesModal(true)}
                    className="flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                    Full Rules
                  </StyledButton>
                </div>
                <div className="prose">
                  <div className="p-3 bg-base-100 rounded-lg border border-base-300 shadow-inner">
                    <p className="text-neutral-700 font-medium">
                      Place bets on different poker hand combinations and win up to 601:1 on your wager!
                    </p>
                    <ol className="text-sm text-neutral-600 mt-2 pl-4 space-y-1">
                      <li>Select a chip value and place bets</li>
                      <li>Click "Place Bets & Deal" to start</li>
                      <li>Win when the dealt hand matches your bet</li>
                    </ol>
                    <div className="text-sm text-neutral-600 mt-2 italic flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1 text-info">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                      </svg>
                      Six standard decks of cards are used.
                    </div>
                  </div>
                </div>
              </StyledCard>
            </div>
          </div>
        </StyledContainer>
      </div>

      {/* Game info modals */}
      <GameRulesModal isOpen={showRulesModal} onClose={() => setShowRulesModal(false)} />
      <PayoutTableModal isOpen={showPayoutModal} onClose={() => setShowPayoutModal(false)} />
    </>
  );
};

function App() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}

export default App;
