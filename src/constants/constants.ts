export const CARD_VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
export const CARD_SUITS = ['hearts', 'diamonds', 'clubs', 'spades'];

// Define BETS structure - separating static info (payouts) from dynamic state (isPlaced)
export const BET_TYPES = {
  straightnup: { name: 'Straight Up / High Hands', payout: [601, 501, 401, 301, 151, 101, 51, 26] },
  twopair: { name: 'Two Pair', payout: 14 },
  '3ofak': { name: 'Three of a Kind', payout: 30 },
  pair: { name: 'One Pair', payout: 2 },
  nohand: { name: 'No Hand / High Card', payout: 2 },
  hearts: { name: 'Hearts', payout: 2 }, // Note: Original logic didn't seem to use suit bets, but keeping structure
  spades: { name: 'Spades', payout: 2 },
  clubs: { name: 'Clubs', payout: 2 },
  diamonds: { name: 'Diamonds', payout: 2 },
};

export const INITIAL_PLAYER_MONEY = 50;

export const GAME_PHASES = {
  BETTING: 'BETTING',
  DEALING: 'DEALING',
  EVALUATING: 'EVALUATING',
  PAYING: 'PAYING',
  RESULTS: 'RESULTS', // Showing results before next round
};

export const LOCAL_STORAGE_KEY = 'reactPokerPlayerMoney';