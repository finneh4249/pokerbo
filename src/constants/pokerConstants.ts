// src/constants/pokerConstants.ts
// Card values and suits
export const CARD_VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
export const CARD_SUITS = ['hearts', 'diamonds', 'clubs', 'spades'];

// Value ordering for hand evaluation
export const VALUE_ORDER: Record<string, number> = {
  '2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
  '7': 7, '8': 8, '9': 9, '10': 10,
  'jack': 11, 'queen': 12, 'king': 13, 'ace': 14
};

// Bet types
export type BetType = 'straightnup' | 'twopair' | '3ofak' | 'pair' | 'nohand' | 'hearts' | 'spades' | 'clubs' | 'diamonds';

// Bet interface
export interface Bet {
  bet: boolean;
  payout: number | number[];
}

// Initial bets with payout values updated to match the correct values
export const INITIAL_BETS = new Map<BetType, Bet>([
  ['straightnup', { bet: false, payout: [600, 500, 400, 300, 150, 100, 50, 25] }],
  ['twopair', { bet: false, payout: 13 }],
  ['3ofak', { bet: false, payout: 29 }],
  ['pair', { bet: false, payout: 1 }],
  ['nohand', { bet: false, payout: 1 }],
  ['hearts', { bet: false, payout: 2 }],
  ['spades', { bet: false, payout: 2 }],
  ['clubs', { bet: false, payout: 2 }],
  ['diamonds', { bet: false, payout: 2 }]
]);