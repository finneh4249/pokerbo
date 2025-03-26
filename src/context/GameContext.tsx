// context/GameContext.tsx
import React, { createContext, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { 
  BetType, 
  Bet, 
  INITIAL_BETS, 
  CARD_VALUES, 
  CARD_SUITS 
} from '../constants/pokerConstants';
import { 
  evaluatePokerHand, 
  getHandValue 
} from '../utils/handEvaluation';

// GameContext type definition
interface GameContextType {
  deck: string[];
  dealerHand: string[];
  drawnSuits: string[];
  drawnValues: string[];
  playerMoney: number;
  setPlayerMoney: Dispatch<SetStateAction<number>>;
  bets: Map<BetType, Bet>;
  totalBetAmount: number;
  activeBets: BetType[];
  message: string;
  canBet: boolean;
  dealCards: () => void;
  placeBets: () => void;
  toggleBet: (betType: BetType) => void;
  resetMoney: () => void;
  handRanking: string;
  selectedChip: number;
  setSelectedChip: Dispatch<SetStateAction<number>>;
  winnings: number;
}

// Create the context with undefined as default
export const GameContext = createContext<GameContextType | undefined>(undefined);

// Number of decks to use (from main.js it was 6)
const NUM_DECKS = 6;

// GameProvider component
export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Game state
  const [deck, setDeck] = useState<string[]>([]);
  const [dealerHand, setDealerHand] = useState<string[]>([]);
  const [drawnSuits, setDrawnSuits] = useState<string[]>([]);
  const [drawnValues, setDrawnValues] = useState<string[]>([]);
  const [playerMoney, setPlayerMoney] = useState<number>(0);
  const [bets, setBets] = useState<Map<BetType, Bet>>(INITIAL_BETS);
  const [activeBets, setActiveBets] = useState<BetType[]>([]);
  const [totalBetAmount, setTotalBetAmount] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [canBet, setCanBet] = useState<boolean>(true);
  const [handRanking, setHandRanking] = useState<string>('');
  const [selectedChip, setSelectedChip] = useState<number>(5);
  const [winnings, setWinnings] = useState<number>(0);

  // Initialize the game on component mount
  useEffect(() => {
    buildDeck();
    setPlayerMoney(getPlayerMoney());
  }, []);

  // Cookie management functions
  const getPlayerMoney = (): number => {
    try {
      // Parse cookies
      const cookieObj = Object.fromEntries(
        document.cookie.split('; ').map(cookie => {
          const parts = cookie.split('=');
          return [parts[0], parts.length > 1 ? decodeURIComponent(parts[1]) : ''];
        })
      );
      
      // Check if playerMoney exists in cookies
      if ('playerMoney' in cookieObj) {
        const amount = parseInt(cookieObj.playerMoney);
        // Validate the amount to ensure it's a number
        if (!isNaN(amount)) {
          return amount;
        }
      }
    } catch (error) {
      console.error('Error reading cookie:', error);
    }
    
    // Default value if cookie is not found or invalid
    setPlayerMoneyCookie(50);
    return 50;
  };

  const setPlayerMoneyCookie = (amount: number): void => {
    try {
      // Set cookie with a 30-day expiration
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30);
      document.cookie = `playerMoney=${encodeURIComponent(amount)};expires=${expiryDate.toUTCString()};path=/`;
    } catch (error) {
      console.error('Error setting cookie:', error);
    }
  };

  // Deck management functions
  const buildDeck = (): void => {
    let newDeck: string[] = [];
    
    // Build a deck with the specified number of card sets
    for (let deck = 0; deck < NUM_DECKS; deck++) {
      for (const suit of CARD_SUITS) {
        for (const value of CARD_VALUES) {
          newDeck.push(`${value}_of_${suit}`);
        }
      }
    }
    
    shuffleDeck(newDeck);
  };

  const shuffleDeck = (deckToShuffle: string[]): void => {
    // Fisher-Yates shuffle algorithm
    for (let i = deckToShuffle.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deckToShuffle[i], deckToShuffle[j]] = [deckToShuffle[j], deckToShuffle[i]];
    }
    
    setDeck([...deckToShuffle]);
  };

  // Card drawing functions
  const drawCard = (): void => {
    if (deck.length === 0) {
      buildDeck();
      return;
    }

    // Get the card from the top of the deck
    const card = deck.pop()!;
    
    // Add the card to the dealer's hand
    setDealerHand(prevHand => [...prevHand, card]);
    
    // Update the deck state
    setDeck([...deck]);
    
    // Extract the value and suit
    const [value, suit] = card.split('_of_');
    
    // Update the drawn values and suits
    setDrawnValues(prev => [...prev, value]);
    setDrawnSuits(prev => [...prev, suit]);
    
    // Play sound effect
    playCardSound();
  };

  const dealCards = (): void => {
    if (!canBet) return;
    
    // Reset the game state for a new deal
    resetHandState();
    
    // Draw 5 cards with delay between each
    for (let i = 0; i < 5; i++) {
      setTimeout(drawCard, 500 * i);
    }
  };

  // Bet management functions
  const toggleBet = (betType: BetType): void => {
    if (!canBet) return;

    setBets(prevBets => {
      const newBets = new Map(prevBets);
      const bet = newBets.get(betType);
      
      if (bet) {
        // Toggle the bet status
        newBets.set(betType, { ...bet, bet: !bet.bet });
        
        // Update active bets list
        setActiveBets(prev => {
          if (!bet.bet) {
            // Adding a new bet
            return [...prev, betType];
          } else {
            // Removing an existing bet
            return prev.filter(b => b !== betType);
          }
        });
      }
      
      return newBets;
    });
  };

  const placeBets = (): void => {
    if (!canBet || playerMoney <= 0) {
      if (playerMoney <= 0) {
        alert('You have no money to bet!');
      }
      return;
    }

    // Calculate total bet amount
    const betAmount = activeBets.length * selectedChip;
    
    // Validate bet amount
    if (betAmount > playerMoney) {
      alert('Not enough money to place these bets!');
      return;
    }
    
    if (betAmount === 0) {
      alert('Please place at least one bet!');
      return;
    }

    // Deduct bet amount from player money
    setPlayerMoney(prev => {
      const newAmount = prev - betAmount;
      setPlayerMoneyCookie(newAmount);
      return newAmount;
    });
    
    // Save the bet amount
    setTotalBetAmount(betAmount);
    
    // Disable betting during play
    setCanBet(false);
    
    // Start the game after a short delay
    setTimeout(() => {
      resetHandState();
      
      // Draw 5 cards with delay
      for (let i = 0; i < 5; i++) {
        setTimeout(drawCard, 500 * i);
      }
    }, 1000);
  };

  // Game state management
  const resetHandState = (): void => {
    setDealerHand([]);
    setDrawnValues([]);
    setDrawnSuits([]);
    setMessage('');
    setHandRanking('');
    setWinnings(0);
  };

  const resetGameState = (): void => {
    buildDeck();
    setCanBet(true);
    setActiveBets([]);
    setTotalBetAmount(0);
    
    // Reset all bets
    setBets(prevBets => {
      const newBets = new Map(prevBets);
      for (const [key, value] of newBets.entries()) {
        newBets.set(key, { ...value, bet: false });
      }
      return newBets;
    });
  };

  const resetMoney = (): void => {
    const defaultMoney = 50;
    setPlayerMoney(defaultMoney);
    setPlayerMoneyCookie(defaultMoney);
  };

  // Sound effects
  const playCardSound = (): void => {
    try {
      const audio = new Audio('/assets/cardDraw.ogg');
      audio.volume = 0.5; // Lower volume a bit
      audio.play().catch(e => console.log('Error playing sound:', e));
    } catch (e) {
      console.log('Error with audio:', e);
    }
  };

  // Hand evaluation
  useEffect(() => {
    if (dealerHand.length === 5 && drawnValues.length === 5 && drawnSuits.length === 5) {
      // Evaluate the poker hand
      const { handType, message: handMessage } = evaluatePokerHand(drawnValues, drawnSuits);
      
      // Update the state
      setHandRanking(handType);
      setMessage(handMessage);
      
      // Process payouts after a short delay
      setTimeout(() => {
        calculatePayouts(handType);
      }, 1000);
    }
  }, [dealerHand, drawnValues, drawnSuits]);

  // Payout calculation
  const calculatePayouts = (handType: string): void => {
    let playerWon = false;
    let totalWinnings = 0;

    // Check for suit bets (hearts, spades, clubs, diamonds)
    const suitCounts = CARD_SUITS.reduce((acc, suit) => {
      acc[suit] = drawnSuits.filter(s => s === suit).length;
      return acc;
    }, {} as Record<string, number>);

    // Process each suit bet
    Object.entries(suitCounts).forEach(([suit, count]) => {
      const betType = suit as BetType;
      const betInfo = bets.get(betType);
      
      // Payout for having 3 or more cards of the same suit
      if (betInfo && betInfo.bet && count >= 3) {
        const winAmount = selectedChip * (betInfo.payout as number);
        totalWinnings += winAmount;
        playerWon = true;
      }
    });

    // Process poker hand bets (straightnup, twopair, etc.)
    if (activeBets.includes(handType as BetType)) {
      const betInfo = bets.get(handType as BetType);
      
      if (betInfo) {
        let winAmount = 0;
        
        if (handType === 'straightnup') {
          // Straightnup has different payouts based on the hand
          const handValue = getHandValue(drawnValues, drawnSuits);
          winAmount = selectedChip * ((betInfo.payout as number[])[handValue] || 0);
        } else {
          // Other bets have fixed payouts
          winAmount = selectedChip * (betInfo.payout as number);
        }
        
        totalWinnings += winAmount;
        playerWon = true;
      }
    }

    // Update player's money if they won
    if (playerWon) {
      setWinnings(totalWinnings);
      
      setPlayerMoney(prev => {
        const newAmount = prev + totalWinnings;
        setPlayerMoneyCookie(newAmount);
        return newAmount;
      });
    }

    // Reset the game state after a delay
    setTimeout(() => {
      resetGameState();
    }, 3000);
  };

  // Create the context value object
  const contextValue: GameContextType = {
    deck,
    dealerHand,
    drawnSuits,
    drawnValues,
    playerMoney,
    setPlayerMoney,
    bets,
    totalBetAmount,
    activeBets,
    message,
    canBet,
    dealCards,
    placeBets,
    toggleBet,
    resetMoney,
    handRanking,
    selectedChip,
    setSelectedChip,
    winnings
  };

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};
