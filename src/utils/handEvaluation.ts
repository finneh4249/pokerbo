// src/utils/handEvaluation.ts
import { VALUE_ORDER } from '../constants/pokerConstants';

/**
 * Get the counts of each card value in a hand
 */
export const getValueCounts = (drawnValues: string[]): Record<string, number> => {
  return drawnValues.reduce((counts, value) => {
    counts[value] = (counts[value] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);
};

/**
 * Check if the hand is a five of a kind flush
 */
export const isFiveOfAKindFlush = (drawnValues: string[], drawnSuits: string[]): boolean => {
  return isFiveOfAKind(drawnValues) && isFlush(drawnSuits);
};

/**
 * Check if the hand is a royal flush
 */
export const isRoyalFlush = (drawnValues: string[], drawnSuits: string[]): boolean => {
  const royalValues = new Set(['ace', 'king', 'queen', 'jack', '10']);
  // Check if all values are royal values
  const hasAllRoyalValues = drawnValues.every(value => royalValues.has(value));
  // Check if it's a flush
  return hasAllRoyalValues && isFlush(drawnSuits);
};

/**
 * Check if the hand is a straight flush
 */
export const isStraightFlush = (drawnValues: string[], drawnSuits: string[]): boolean => {
  return isStraight(drawnValues) && isFlush(drawnSuits);
};

/**
 * Check if the hand is a five of a kind
 */
export const isFiveOfAKind = (drawnValues: string[]): boolean => {
  const valueCounts = getValueCounts(drawnValues);
  return Object.values(valueCounts).some(count => count === 5);
};

/**
 * Check if the hand is a four of a kind
 */
export const isFourOfAKind = (drawnValues: string[]): boolean => {
  const valueCounts = getValueCounts(drawnValues);
  return Object.values(valueCounts).some(count => count === 4);
};

/**
 * Check if the hand is a full house
 */
export const isFullHouse = (drawnValues: string[]): boolean => {
  const valueCounts = getValueCounts(drawnValues);
  const counts = Object.values(valueCounts);
  return counts.includes(3) && counts.includes(2);
};

/**
 * Check if the hand is a flush
 */
export const isFlush = (drawnSuits: string[]): boolean => {
  // All suits must be the same
  return new Set(drawnSuits).size === 1;
};

/**
 * Check if the hand is a straight
 */
export const isStraight = (drawnValues: string[]): boolean => {
  // Convert to numeric values and sort
  const numericValues = drawnValues.map(val => VALUE_ORDER[val]).sort((a, b) => a - b);
  
  // Special case: Ace can be low (A-2-3-4-5)
  if (numericValues.join(',') === '2,3,4,5,14') {
    return true;
  }
  
  // Check if values form a sequence
  for (let i = 1; i < numericValues.length; i++) {
    if (numericValues[i] !== numericValues[i-1] + 1) {
      return false;
    }
  }
  
  return true;
};

/**
 * Check if the hand is a three of a kind
 */
export const isThreeOfAKind = (drawnValues: string[]): boolean => {
  const valueCounts = getValueCounts(drawnValues);
  return Object.values(valueCounts).some(count => count === 3);
};

/**
 * Check if the hand is a two pair
 */
export const isTwoPair = (drawnValues: string[]): boolean => {
  const valueCounts = getValueCounts(drawnValues);
  const pairs = Object.values(valueCounts).filter(count => count === 2);
  return pairs.length === 2;
};

/**
 * Check if the hand is a pair
 */
export const isOnePair = (drawnValues: string[]): boolean => {
  const valueCounts = getValueCounts(drawnValues);
  return Object.values(valueCounts).some(count => count === 2);
};

/**
 * Get the highest card in the hand
 */
export const getHighCard = (drawnValues: string[]): string => {
  let highestValue = 0;
  let highestCard = '';
  
  drawnValues.forEach(value => {
    if (VALUE_ORDER[value] > highestValue) {
      highestValue = VALUE_ORDER[value];
      highestCard = value;
    }
  });
  
  return highestCard.charAt(0).toUpperCase() + highestCard.slice(1);
};

/**
 * Evaluate the hand and return a numeric value for payout calculations
 */
export const getHandValue = (drawnValues: string[], drawnSuits: string[]): number => {
  if (isFiveOfAKindFlush(drawnValues, drawnSuits)) return 0;
  if (isRoyalFlush(drawnValues, drawnSuits)) return 1;
  if (isFiveOfAKind(drawnValues)) return 2;
  if (isFourOfAKind(drawnValues)) return 3;
  if (isFullHouse(drawnValues)) return 4;
  if (isFlush(drawnSuits)) return 5;
  if (isStraight(drawnValues)) return 6;
  return 7; // default
};

/**
 * Determine the poker hand type based on the drawn cards
 */
export const evaluatePokerHand = (
  drawnValues: string[], 
  drawnSuits: string[]
): { handType: string; message: string } => {
  // Check for different hand types in descending order of value
  if (isFiveOfAKindFlush(drawnValues, drawnSuits)) {
    return { handType: 'straightnup', message: 'Five of a Kind Flush' };
  }
  if (isRoyalFlush(drawnValues, drawnSuits)) {
    return { handType: 'straightnup', message: 'Royal Flush' };
  }
  if (isStraightFlush(drawnValues, drawnSuits)) {
    return { handType: 'straightnup', message: 'Straight Flush' };
  }
  if (isFiveOfAKind(drawnValues)) {
    return { handType: 'straightnup', message: 'Five of a Kind' };
  }
  if (isFourOfAKind(drawnValues)) {
    return { handType: 'straightnup', message: 'Four of a Kind' };
  }
  if (isFullHouse(drawnValues)) {
    return { handType: 'straightnup', message: 'Full House' };
  }
  if (isFlush(drawnSuits)) {
    return { handType: 'straightnup', message: 'Flush' };
  }
  if (isStraight(drawnValues)) {
    return { handType: 'straightnup', message: 'Straight' };
  }
  if (isThreeOfAKind(drawnValues)) {
    return { handType: '3ofak', message: 'Three of a Kind' };
  }
  if (isTwoPair(drawnValues)) {
    return { handType: 'twopair', message: 'Two Pair' };
  }
  if (isOnePair(drawnValues)) {
    return { handType: 'pair', message: 'One Pair' };
  }
  
  // Default case: no hand (high card)
  return { handType: 'nohand', message: `High Card: ${getHighCard(drawnValues)}` };
};