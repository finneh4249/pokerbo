// context/GameContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { evaluateHand } from '../utils/evaluateHand';

export const GameContext = createContext();

const CARD_VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
const CARD_SUITS = ['hearts', 'diamonds', 'clubs', 'spades'];

const initialBets = new Map([
  ['royal_flush', { bet: false, payout: 2500 }],
  ['straight_flush', { bet: false, payout: 500 }],
  ['four_of_a_kind', { bet: false, payout: 200 }],
  ['full_house', { bet: false, payout: 150 }],
  ['flush', { bet: false, payout: 100 }],
  ['straight', { bet: false, payout: 75 }],
  ['three_of_a_kind', { bet: false, payout: 50 }],
  ['two_pair', { bet: false, payout: 25 }],
  ['pair', { bet: false, payout: 10 }],
  ['no_hand', { bet: false, payout: 0 }]
]);

export const GameProvider = ({ children }) => {
    const [deck, setDeck] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [playerMoney, setPlayerMoney] = useState(50);
    const [bets, setBets] = useState(initialBets);
    const [handRanking, setHandRanking] = useState('');

    useEffect(() => {
        buildDeck();
    }, []);

    const buildDeck = () => {
        let newDeck = [];
        CARD_SUITS.forEach(suit => {
            CARD_VALUES.forEach(value => {
                newDeck.push(`${value}_of_${suit}`);
            });
        });
        shuffleDeck(newDeck);
    };

    const shuffleDeck = (deckToShuffle) => {
        for (let i = deckToShuffle.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deckToShuffle[i], deckToShuffle[j]] = [deckToShuffle[j], deckToShuffle[i]];
        }
        setDeck(deckToShuffle);
    };

    const drawCard = () => {
        if (deck.length === 0) return;
        const card = deck.pop();
        setDealerHand(prevHand => [...prevHand, card]);
        setDeck([...deck]);
        cardSound();
    };

    const dealCards = () => {
        setDealerHand([]);
        setHandRanking('');
        for (let i = 0; i < 5; i++) {
            setTimeout(drawCard, 500 * i);
        }
    };

    const evaluateCurrentHand = () => {
        const ranking = evaluateHand(dealerHand);
        setHandRanking(ranking);
        processPayout(ranking);
    };

    useEffect(() => {
        if (dealerHand.length === 5) {
            evaluateCurrentHand();
        }
    }, [dealerHand]);

    const processPayout = (ranking) => {
        const bet = bets.get(ranking);
        if (bet && bet.bet) {
            const payout = typeof bet.payout === 'number' 
                ? bet.payout 
                : bet.payout[Math.min(dealerHand.length - 1, bet.payout.length - 1)];
            setPlayerMoney(prev => prev + payout);
        }
    };

    const cardSound = () => {
        const audio = new Audio('./assets/cardDraw.ogg');
        audio.play();
    };

    const resetMoney = () => {
        setPlayerMoney(50);
    };

    return (
        <GameContext.Provider value={{
            deck,
            dealerHand,
            playerMoney,
            setPlayerMoney,
            bets,
            setBets,
            dealCards,
            resetMoney,
            handRanking
        }}>
            {children}
        </GameContext.Provider>
    );
};