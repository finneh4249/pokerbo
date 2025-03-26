// src/components/GameInfoModals.tsx
import React from 'react';
import StyledButton from './StyledButton';

interface GameInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

// Modal component used for both game rules and payout tables
const GameInfoModal: React.FC<GameInfoModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Modal backdrop with blur effect */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      {/* Modal content */}
      <div className="bg-white rounded-lg shadow-2xl z-10 w-full max-w-3xl overflow-hidden relative border border-base-300">
        <div className="p-6">
          {/* Header with colored accent strip */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-primary">
            <h2 className="text-2xl font-bold text-primary">{title}</h2>
            <button 
              onClick={onClose}
              className="btn btn-sm btn-circle bg-base-200 hover:bg-base-300 border-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="overflow-y-auto max-h-[calc(90vh-120px)] pr-2 custom-scrollbar">
            {children}
          </div>
          
          <div className="mt-6 flex justify-end pt-4 border-t border-base-200">
            <StyledButton 
              variant="primary" 
              onClick={onClose}
              className="px-6 min-w-24"
            >
              Close
            </StyledButton>
          </div>
        </div>
      </div>
    </div>
  );
};

// Game Rules content component
export const GameRulesModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <GameInfoModal isOpen={isOpen} onClose={onClose} title="PokerBo Game Rules">
      <div className="prose max-w-none">
        <h3 className="text-xl font-bold text-primary">How to Play PokerBo</h3>
        <p>
          PokerBo is a unique and exciting casino game that blends elements of poker and sic bo.
          The objective is to predict what poker hand will be dealt and place your bets accordingly.
        </p>
        
        <div className="bg-base-100 p-4 rounded-lg my-4 border-l-4 border-primary">
          <h4 className="text-lg font-semibold mb-2">Game Flow</h4>
          <ol className="list-decimal pl-5 space-y-1">
            <li><strong>Place Your Bets:</strong> Select a chip value and place bets on the poker hand(s) you think will be dealt.</li>
            <li><strong>Deal Cards:</strong> After placing bets, five cards are dealt to determine the outcome.</li>
            <li><strong>Evaluate Hand:</strong> The final hand is evaluated, and winners are paid according to the payout table.</li>
            <li><strong>New Round:</strong> After payouts, a new betting round begins.</li>
          </ol>
        </div>

        <h4 className="text-lg font-semibold">Betting Options</h4>
        <p>You can place multiple bets on the following outcomes:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Straight 'n' Up:</strong> Premium hands including Straight, Flush, Full House, Four of a Kind, etc.</li>
          <li><strong>Three of a Kind:</strong> Three cards of the same value.</li>
          <li><strong>Two Pair:</strong> Two different pairs in the hand.</li>
          <li><strong>Pair:</strong> A single pair in the hand.</li>
          <li><strong>No Hand:</strong> High card only (no other poker hand).</li>
          <li><strong>Suit Bets:</strong> Bet on specific suits (hearts, diamonds, clubs, or spades).</li>
        </ul>

        <div className="bg-base-100 p-4 rounded-lg my-4 border-l-4 border-accent">
          <h4 className="text-lg font-semibold text-accent">Special Features</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Multiple Decks:</strong> The game uses six standard decks of cards shuffled together.
              This allows for unique combinations like five of a kind.
            </li>
            <li>
              <strong>Independent Bets:</strong> Each bet is evaluated independently, so you can win 
              multiple bets on the same hand. For example, if you bet on both "Three of a Kind" and 
              "Hearts" and get three hearts in your hand, both bets win!
            </li>
            <li>
              <strong>High Payouts:</strong> With payouts up to 600:1, there's potential for exciting wins.
            </li>
          </ul>
        </div>
      </div>
    </GameInfoModal>
  );
};

// Payout Table content component
export const PayoutTableModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <GameInfoModal isOpen={isOpen} onClose={onClose} title="PokerBo Payout Tables">
      <div className="overflow-x-auto">
        <h3 className="text-xl font-bold mb-4 text-primary">Straight 'n' Up Payouts</h3>
        <div className="overflow-hidden rounded-lg border border-base-300 mb-6">
          <table className="table table-zebra w-full">
            <thead className="bg-primary bg-opacity-10">
              <tr>
                <th className="text-primary">Hand Type</th>
                <th>Description</th>
                <th className="text-right">Payout</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-bold text-accent">Five of a Kind Flush</td>
                <td>Five cards of the same value and suit</td>
                <td className="text-right font-bold">600:1</td>
              </tr>
              <tr>
                <td className="font-bold text-accent">Royal Flush</td>
                <td>10, J, Q, K, A of the same suit</td>
                <td className="text-right font-bold">500:1</td>
              </tr>
              <tr>
                <td className="font-bold text-accent">Straight Flush</td>
                <td>Five cards in sequence of the same suit</td>
                <td className="text-right font-bold">400:1</td>
              </tr>
              <tr>
                <td className="font-bold text-accent">Five of a Kind</td>
                <td>Five cards of the same value</td>
                <td className="text-right font-bold">300:1</td>
              </tr>
              <tr>
                <td className="font-bold text-accent">Four of a Kind</td>
                <td>Four cards of the same value</td>
                <td className="text-right font-bold">150:1</td>
              </tr>
              <tr>
                <td className="font-bold text-accent">Full House</td>
                <td>Three of a kind and a pair</td>
                <td className="text-right font-bold">100:1</td>
              </tr>
              <tr>
                <td className="font-bold text-accent">Flush</td>
                <td>Five cards of the same suit</td>
                <td className="text-right font-bold">50:1</td>
              </tr>
              <tr>
                <td className="font-bold text-accent">Straight</td>
                <td>Five cards in sequence</td>
                <td className="text-right font-bold">25:1</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-bold my-4 text-primary">Hand Bets</h3>
        <div className="overflow-hidden rounded-lg border border-base-300 mb-6">
          <table className="table table-zebra w-full">
            <thead className="bg-info bg-opacity-10">
              <tr>
                <th className="text-info">Bet Type</th>
                <th>Description</th>
                <th className="text-right">Payout</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-bold text-info">Three of a Kind</td>
                <td>Three cards of the same value</td>
                <td className="text-right font-bold">29:1</td>
              </tr>
              <tr>
                <td className="font-bold text-info">Two Pair</td>
                <td>Two different pairs</td>
                <td className="text-right font-bold">13:1</td>
              </tr>
              <tr>
                <td className="font-bold text-info">Pair</td>
                <td>Two cards of the same value</td>
                <td className="text-right font-bold">1:1</td>
              </tr>
              <tr>
                <td className="font-bold text-info">No Hand</td>
                <td>High card only</td>
                <td className="text-right font-bold">1:1</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-bold my-4 text-primary">Suit Bets</h3>
        <div className="overflow-hidden rounded-lg border border-base-300 mb-6">
          <table className="table table-zebra w-full">
            <thead className="bg-secondary bg-opacity-10">
              <tr>
                <th className="text-secondary">Number of Cards</th>
                <th>Description</th>
                <th className="text-right">Payout</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-bold">5 Cards</td>
                <td>5 cards of the same suit (♥, ♦, ♣, or ♠)</td>
                <td className="text-right font-bold">50:1</td>
              </tr>
              <tr>
                <td className="font-bold">4 Cards</td>
                <td>4 cards of the same suit</td>
                <td className="text-right font-bold">5:1</td>
              </tr>
              <tr>
                <td className="font-bold">3 Cards</td>
                <td>3 cards of the same suit</td>
                <td className="text-right font-bold">2:1</td>
              </tr>
              <tr>
                <td className="font-bold">2 Cards</td>
                <td>2 cards of the same suit</td>
                <td className="text-right font-bold">1:1</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-base-200 p-4 rounded-lg mt-6 border border-base-300">
          <h3 className="text-lg font-bold mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 mr-2 text-primary">
              <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
            House Edge Information
          </h3>
          <p className="text-sm">
            PokerBo uses six standard decks of cards, which affects the probability of certain hands appearing.
            This gives the game its unique character and allows for exciting combinations like five of a kind that
            aren't possible in standard poker.
          </p>
        </div>
      </div>
    </GameInfoModal>
  );
};

export const AboutModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <GameInfoModal isOpen={isOpen} onClose={onClose} title="About PokerBo">
      <div className="prose max-w-none">
        <div className="flex items-center justify-center mb-6">
          <div className="flex space-x-1">
            <span className="text-error text-4xl">♥</span>
            <span className="text-neutral-900 text-4xl">♠</span>
            <span className="text-error text-4xl">♦</span>
            <span className="text-neutral-900 text-4xl">♣</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-primary">PokerBo: A Casino Poker Variant</h3>
        <p>
          PokerBo is a unique and exciting casino game that blends elements of poker and sic bo. 
          Originally created by Club Gaming Pty LTD (a subsidiary of Crown Casino), PokerBo was a 
          popular table game at Crown Casino in Melbourne, Australia. Although the physical table 
          was removed in 2021, this project brings the game back to life in a digital format.
        </p>
        
        <div className="bg-base-100 p-4 rounded-lg my-4 border-l-4 border-primary">
          <h4 className="text-lg font-semibold mb-2">Features</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Multiple betting options with various risk/reward ratios</li>
            <li>Fast-paced gameplay - each round takes under a minute</li>
            <li>Simple to understand but with strategic depth</li>
            <li>Exciting payouts of up to 600:1</li>
          </ul>
        </div>
        
        <h4 className="text-lg font-semibold">Game History</h4>
        <p>
          PokerBo offers a thrilling gaming experience with no competition between players.
          Instead, everyone focuses on the suspense of the draw, creating a sense of camaraderie
          as players anticipate the outcome of their wagers. With payouts ranging from 1:1 to 600:1,
          there's potential for big wins and exciting moments.
        </p>
        
        <h4 className="text-lg font-semibold mt-4">Technical Details</h4>
        <p>
          This implementation of PokerBo is built with React, TypeScript, and TailwindCSS.
          It features responsive design for optimal play on all devices.
        </p>
        
        <div className="mt-8 pt-4 border-t border-base-200">
          <p className="text-center text-sm text-neutral-500">
            &copy; 2025 AceSpectra PokerBo. All rights reserved.<br />
            Version 1.0.0
          </p>
        </div>
      </div>
    </GameInfoModal>
  );
};