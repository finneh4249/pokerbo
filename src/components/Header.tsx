// src/components/Header.tsx
import React, { useContext, useState } from 'react';
import { GameContext } from '../context/GameContext';
import StyledContainer from './StyledContainer';
import StyledBadge from './StyledBadge';
import { GameRulesModal, PayoutTableModal, AboutModal } from './GameInfoModals';

const Header = () => {
  const { playerMoney } = useContext(GameContext) || { playerMoney: 0 };
  
  // State to control modal visibility
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

  return (
    <>
      <header className="bg-[#1a6f40] text-white shadow-lg">
        <StyledContainer className="px-4">
          <div className="py-4 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-3">
                {/* Card suit icons as logo */}
                <div className="flex">
                  <span className="text-[#dc2626] text-2xl">♥</span>
                  <span className="text-white text-2xl">♠</span>
                  <span className="text-[#dc2626] text-2xl">♦</span>
                  <span className="text-white text-2xl">♣</span>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">AceSpectra PokerBo</h1>
                <p className="text-white/70 text-sm">The exciting casino game of chance</p>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 flex space-x-4 items-center">
              <div className="flex items-center">
                <div className="mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#f59e0b]" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                </div>
                <StyledBadge variant="accent" className="text-white font-bold px-3 py-1">
                  ${playerMoney}
                </StyledBadge>
              </div>
              
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost text-white btn-circle avatar">
                  <div className="w-10 rounded-full bg-[#f59e0b] flex items-center justify-center">
                    <span className="text-lg font-bold text-white">?</span>
                  </div>
                </div>
                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 z-10">
                  <li><button onClick={() => setShowRulesModal(true)} className="text-neutral">Game Rules</button></li>
                  <li><button onClick={() => setShowPayoutModal(true)} className="text-neutral">Payout Tables</button></li>
                  <li><button onClick={() => setShowAboutModal(true)} className="text-neutral">About</button></li>
                </ul>
              </div>
            </div>
          </div>
        </StyledContainer>
      </header>
      
      {/* Game info modals */}
      <GameRulesModal isOpen={showRulesModal} onClose={() => setShowRulesModal(false)} />
      <PayoutTableModal isOpen={showPayoutModal} onClose={() => setShowPayoutModal(false)} />
      <AboutModal isOpen={showAboutModal} onClose={() => setShowAboutModal(false)} />
    </>
  );
};

export default Header;
