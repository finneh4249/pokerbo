import {bet, placeBets, BETS, playerMoney, canBetFalse, resetMoney} from "./betting.js"
import { message } from "./pokerHand.js"
export const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace']
export const SUITS = ['hearts', 'diamonds', 'clubs', 'spades']
export let drawnSuits = []
export let drawnValues = []

let deck

window.onload = function () {
  buildDeck()
  shuffleDeck()
  startGame()
}



function testDeck () {
  deck = ['ace_of_hearts', 'ace_of_hearts', 'ace_of_hearts', 'ace_of_hearts', 'ace_of_hearts']
}
function buildDeck () {
  deck = []
  for (let d = 0; d < 6; d++) {
    for (let i = 0; i < SUITS.length; i++) {
      for (let j = 0; j < VALUES.length; j++) {
        deck.push(VALUES[j] + '_of_' + SUITS[i])
      }
    }
  }
}
function shuffleDeck () {
  for (let i = 0; i < deck.length; i++) {
    const j = Math.floor(Math.random() * deck.length)
    const temp = deck[i]
    deck[i] = deck[j]
    deck[j] = temp
  }
}

function startGame () {
  BETS.forEach(function (value, key) {
    document.getElementById(key).addEventListener('click', function () { bet(key) })
  })

  document.getElementById('place-bets').addEventListener('click', placeBets)
  document.getElementById('redraw').addEventListener('click', redrawCards)
  document.getElementById('reset-money').addEventListener('click', resetMoney)

  document.getElementById('player-money').textContent = `$${playerMoney}`
}


function getValue (card) {
  const data = card.split('_of_')
  const value = data[0]
  const suit = data[1]

  const pushValue = (value, suit) => {
    drawnSuits.push(suit)
    drawnValues.push(value)
  }
  pushValue(value, suit)
  return parseInt(value)
}

function redrawCards () {
  buildDeck()
  shuffleDeck()
  BETS.forEach(function (value, key) {
    const element = document.getElementById(key)
    element.classList.remove('active', 'btn-success', 'disabled')
    element.classList.add('btn-primary')
    const entry = BETS.get(key)
    entry.bet = false
    BETS.set(key, entry)
  })
  for (let i = 0; i < 5; i++) {
    const cardImg = document.querySelector('img')
    document.getElementById('dealer-cards').removeChild(cardImg)
  }
  drawnSuits = []
  drawnValues = []
  document.getElementById('betsPaid').innerHTML = '<p>None</p>'
  canBetFalse()
}

export function drawCards () {
  function cardSound () {
    const sound = document.getElementById('cards-sound')
    sound.load()
    sound.play()
  }

  for (let i = 0; i < 5; i++) {
    const dealer = () => {
      cardSound()
      const cardImg = document.createElement('img')
      const card = deck.pop()
      cardImg.src = './assets/images/cards/' + card + '.png'
      getValue(card)
      document.getElementById('dealer-cards').append(cardImg)
      document.getElementById('dealer-hand').innerHTML = message
    }
    setTimeout(dealer, 500 * i)
  }
}




