// Array of possible values for the cards
const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace']

// Array of possible suits for the cards
const SUITS = ['hearts', 'diamonds', 'clubs', 'spades']

// Map of different bets with their corresponding properties
const BETS = new Map([
  ['straightnup', {
    bet: false, // boolean indicating if the bet is placed
    payout: [601, 501, 401, 301, 151, 101, 51, 26] // array of payout values
  }],
  ['twopair', {
    bet: false,
    payout: 14
  }],
  ['3ofak', {
    bet: false,
    payout: 30
  }],
  ['pair', {
    bet: false,
    payout: 2
  }],
  ['nohand', {
    bet: false,
    payout: 2
  }],
  ['hearts', {
    bet: false,
    payout: 2
  }],
  ['spades', {
    bet: false,
    payout: 2
  }],
  ['clubs', {
    bet: false,
    payout: 2
  }],
  ['diamonds', {
    bet: false,
    payout: 2
  }]
])

// Initialize variables
const message = '' // empty string for messages
let deck // variable to hold the deck of cards
let canBet = true // boolean indicating if betting is allowed
let drawnSuits = [] // array to store the suits of drawn cards
let drawnValues = [] // array to store the values of drawn cards
let totalBetAmount = 0

/**
 * Function to initialize the game.
 * It builds the deck of cards, shuffles the deck, and starts the game.
 */
window.onload = function () {
  buildDeck()

  startGame()
}

/**
 * Retrieves the player's money from the cookies,
 * or initializes it to 50 if not present.
 * @returns {number} The player's money.
 */
function getPlayerMoney () {
  const cookieObj = Object.fromEntries(
    document.cookie.split('; ').map(cookie => cookie.split('='))
  )
  if (!('playerMoney' in cookieObj)) {
    document.cookie = 'playerMoney=50'
    return 50
  }
  return parseInt(cookieObj.playerMoney)
}

let playerMoney = getPlayerMoney()
console.log(`Player money: ${playerMoney}`)

/**
 * Initialize a test deck with five cards, all of the same type.
 */
function testDeck () {
  deck = ['ace_of_hearts', 'ace_of_hearts', 'ace_of_hearts', 'ace_of_hearts', 'ace_of_hearts']
}
/**
 * Builds a deck of cards
 */
function buildDeck () {
  // Initialize an empty deck
  deck = []

  // Loop through the number of decks
  for (let d = 0; d < 6; d++) {
    // Loop through the suits
    for (const suit of SUITS) {
      // Loop through the values
      for (const value of VALUES) {
        // Add the card to the deck
        deck.push(`${value}_of_${suit}`)
      }
    }
  }

  shuffleDeck()
}
function shuffleDeck () {
  for (let i = 0; i < deck.length; i++) {
    const j = Math.floor(Math.random() * deck.length)
    const temp = deck[i]
    deck[i] = deck[j]
    deck[j] = temp
  }
}

/**
 * Start the game by setting up event listeners and initial player money display.
 */
function startGame () {
  // Set up event listeners for each bet element
  BETS.forEach(function (value, key) {
    document.getElementById(key).addEventListener('click', function () { bet(key) })
  })

  // Set up event listener for place bets button
  document.getElementById('place-bets').addEventListener('click', placeBets)
  // Set up event listener for redraw cards button
  document.getElementById('redraw').addEventListener('click', redrawCards)
  // Set up event listener for reset money button
  document.getElementById('reset-money').addEventListener('click', resetMoney)

  // Display initial player money
  document.getElementById('player-money').textContent = `$${playerMoney}`
}

/**
 * Reset the player's money to 50 and update the displayed player money.
 */
function resetMoney () {
  playerMoney = 50
  document.cookie = 'playerMoney=50'
  document.getElementById('player-money').textContent = `$${playerMoney}`
}
/**
 * Extracts the value from a card string and updates the drawn suits and values.
 * @param {string} card - The card string in the format "value_of_suit".
 * @returns {number} - The numeric value extracted from the card.
 */
function getValue (card) {
  // Extract the value and suit from the card string
  const [value, suit] = card.split('_of_')

  // Update the drawn suits and values
  drawnSuits.push(suit)
  drawnValues.push(value)

  // Return the numeric value
  return parseInt(value)
}

/**
 * Redraws the cards, resets bets, and prepares for the next round.
 */
function redrawCards () {
  // Rebuild the deck
  buildDeck()
  // Shuffle the deck
  shuffleDeck()
  // Iterate through each bet
  BETS.forEach(function (value, key) {
    // Reset the button appearance
    const element = document.getElementById(key)
    element.classList.remove('active', 'btn-success', 'disabled')
    element.classList.add('btn-primary')
    // Reset the bet status
    const entry = BETS.get(key)
    entry.bet = false
    BETS.set(key, entry)
  })
  // Clear the dealer's cards
  document.getElementById('dealer-cards').innerHTML = ''
  // Reset the arrays for drawn suits and values
  drawnSuits = []
  drawnValues = []
  // Reset the bets paid indicator
  document.getElementById('betsPaid').textContent = 'None'
  // Allow betting to start again
  canBet = true
  totalBetAmount = 0
}

/**
 * Draws 5 cards for the dealer and displays them one by one with a delay of 500ms between each card.
 */
function drawCards () {
  /**
   * Plays a sound when a card is drawn.
   */
  function cardSound () {
    const sound = document.getElementById('cards-sound')
    sound.load()
    sound.play()
  }

  for (let i = 0; i < 5; i++) {
    const dealer = () => {
      const card = deck.pop()
      const cardImg = document.createElement('img')
      cardImg.src = `./assets/images/cards/${card}.png`
      getValue(card)
      document.getElementById('dealer-cards').appendChild(cardImg)
      document.getElementById('dealer-hand').innerHTML = message
      cardSound()
    }
    setTimeout(dealer, 500 * i)
  }
}

/**
 * Determines the poker hand based on the drawn values and suits.
 * @param {array} drawnValues - The values of the drawn cards.
 * @param {array} drawnSuits - The suits of the drawn cards.
 * @returns {string} - The type of poker hand.
 */
function findPokerHand (drawnValues, drawnSuits) {
  // Get the element with the id 'dealer-hand'
  const element = document.getElementById('dealer-hand')

  // Check if the input is valid
  if (!isValidInput(drawnValues, drawnSuits)) {
    return
  }

  // Display 'Drawing Cards' message
  let message = 'Drawing Cards'
  element.innerHTML = message

  // Determine the type of poker hand and display the message
  switch (true) {
    case isFiveOfAKindFlush(drawnValues, drawnSuits):
      message = 'Five of a Kind Flush'
      element.innerHTML = message
      return 'straightnup'
    case isRoyalFlush(drawnValues, drawnSuits):
      message = 'Royal Flush'
      element.innerHTML = message
      return 'straightnup'
    case isStraightFlush(drawnValues, drawnSuits):
      message = 'Straight Flush'
      element.innerHTML = message
      return 'straightnup'
    case isFiveOfAKind(drawnValues):
      message = 'Five of a Kind'
      element.innerHTML = message
      return 'straightnup'
    case isFourOfAKind(drawnValues):
      message = 'Four of a Kind'
      element.innerHTML = message
      return 'straightnup'
    case isFullHouse(drawnValues):
      message = 'Full House'
      element.innerHTML = message
      return 'straightnup'
    case isFlush(drawnSuits):
      message = 'Flush'
      element.innerHTML = message
      return 'straightnup'
    case isStraight(drawnValues):
      message = 'Straight'
      element.innerHTML = message
      return 'straightnup'
    case isThreeOfAKind(drawnValues):
      message = 'Three of a kind'
      element.innerHTML = message
      return '3ofak'
    case isTwoPair(drawnValues):
      message = 'Two Pair'
      element.innerHTML = message
      return 'twopair'
    case isOnePair(drawnValues):
      message = 'One Pair'
      element.innerHTML = message
      return 'pair'
    default:
      message = `High Card: ${getHighCard(drawnValues)}`
      element.innerHTML = message
      return 'nohand'
  }
}

function isValidInput (drawnValues, drawnSuits) {
  if (drawnValues.length !== 5 || drawnSuits.length !== 5) {
    return false
  }

  const validValues = drawnValues.every(value => VALUES.includes(value))
  const validSuits = drawnSuits.every(suit => SUITS.includes(suit))

  if (!validValues || !validSuits) {
    return false
  }

  const seen = new Set(drawnValues.map((value, index) => value + drawnSuits[index]))

  return true
}

function isFiveOfAKindFlush (drawnValues, drawnSuits) {
  return isFiveOfAKind(drawnValues) && isFlush(drawnSuits)
}

function isRoyalFlush (drawnValues, drawnSuits) {
  const royalValues = new Set(['ace', 'king', 'queen', 'jack', '10'])
  for (const value of drawnValues) {
    if (!royalValues.has(value)) {
      return false
    }
  }
  return isFlush(drawnSuits)
}

function isStraightFlush (drawnValues, drawnSuits) {
  return isStraight(drawnValues) && isFlush(drawnSuits)
}

function isFiveOfAKind (drawnValues) {
  const counts = new Map()
  for (const value of drawnValues) {
    counts.set(value, (counts.get(value) || 0) + 1)
  }

  for (const [value, count] of counts) {
    if (count === 5) {
      return true
    }
  }

  return false
}
function isFourOfAKind (drawnValues) {
  const counts = new Map()
  for (const value of drawnValues) {
    counts.set(value, (counts.get(value) || 0) + 1)
  }

  for (const [value, count] of counts) {
    if (count === 4) {
      return true
    }
  }

  return false
}

function isFullHouse (drawnValues) {
  const counts = drawnValues.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1
    return acc
  }, {})

  return Object.values(counts).includes(3) && Object.values(counts).includes(2)
}

function isFlush (drawnSuits) {
  const suit = drawnSuits[0]
  for (let i = 1; i < 5; i++) {
    if (drawnSuits[i] !== suit) {
      return false
    }
  }

  return true
}

function isStraight (drawnValues) {
  const valuesSet = new Set(drawnValues)
  if (valuesSet.size !== 5) {
    return false
  }
  const max = Math.max(...valuesSet)
  const min = Math.min(...valuesSet)
  return max - min === 4
}

function isThreeOfAKind (drawnValues) {
  const counts = new Map()
  for (const value of drawnValues) {
    counts.set(value, (counts.get(value) || 0) + 1)
  }

  for (const [value, count] of counts) {
    if (count === 3) {
      return true
    }
  }

  return false
}

function isTwoPair (drawnValues) {
  const counts = {}
  for (const value of drawnValues) {
    counts[value] = (counts[value] || 0) + 1
  }

  let pairs = 0
  for (const value in counts) {
    if (counts[value] === 2) {
      pairs++
    }
  }
  return pairs === 2
}

function isOnePair (drawnValues) {
  const counts = {}
  for (const value of drawnValues) {
    counts[value] = (counts[value] || 0) + 1
  }

  for (const value in counts) {
    if (counts[value] === 2) {
      return true
    }
  }
  return false
}

function getHighCard (drawnValues) {
  return drawnValues.reduce((maxValue, value) => value > maxValue ? value : maxValue, drawnValues[0])
}

function cardsOfSameSuit(drawnSuits) {
  const counts = new Map();
  for (const suit of drawnSuits) {
    counts.set(suit, (counts.get(suit) || 0) + 1);
  }

  console.log('Counts:', counts);

  const payouts = {};
  for (const [suit, count] of counts) {
    switch (count) {
      case 3:
        payouts[suit] = 2;
        break;
      case 2:
        payouts[suit] = 1;
        break;
      default:
        payouts[suit] = 0;
    }
  }
  console.log('Payouts:', payouts);
  return payouts;
}


function bet (key) {
  if (canBet) {
    const entry = BETS.get(key)
    if (entry) {
      entry.bet = !entry.bet
      BETS.set(key, entry)
    }
  }
}

function placeBets () {
  if (!canBet || playerMoney <= 0) {
    if (playerMoney <= 0) {
      alert('You have no money to bet!')
    }
    return
  }
  
  try {
    BETS.forEach((entry, key) => {
      if (entry && entry.bet) {
        // TODO: Implement different sized bets utilising the chip buttons
        totalBetAmount++
      }
    });
    playerMoney -= totalBetAmount;
  } catch (error) {
    console.log(error)
  }
  document.getElementById('player-money').textContent = `$${playerMoney}`
  document.cookie = `playerMoney=${encodeURIComponent(playerMoney)}`
  const badge = document.createElement('span')
  badge.textContent = `-${totalBetAmount}`
  badge.classList.add('badge', 'bg-danger')
  document.getElementById('player-money').appendChild(badge)
  setTimeout(() => badge.remove(), 1000)
  canBet = false
  setTimeout(drawCards, 1000)
  setTimeout(payBets, 3500)
}

function payBets () {
  if (canBet) return
  console.log(cardsOfSameSuit(drawnSuits))
  const dealerHand = findPokerHand(drawnValues, drawnSuits)
  BETS.forEach(function (value, key) {
    const betPlaced = BETS.get(key).bet
    const payout = BETS.get(key).payout

    if (dealerHand === key.toString() && betPlaced) {
      if (betPlaced) {
        if (key.toString() === 'straightnup') {
          let straightupHandValue = ''
          switch (true) {
            case isFiveOfAKindFlush(drawnValues, drawnSuits):
              straightupHandValue = 0
              break
            case isRoyalFlush(drawnValues, drawnSuits):
              straightupHandValue = 1
              break
            case isFiveOfAKind(drawnValues):
              straightupHandValue = 2
              break
            case isFourOfAKind(drawnValues):
              straightupHandValue = 3
              break
            case isFullHouse(drawnValues, drawnSuits):
              straightupHandValue = 4
              break
            case isFlush(drawnValues, drawnSuits):
              straightupHandValue = 5
              break
            case isStraight(drawnValues, drawnSuits):
              straightupHandValue = 6
              break
          }

          console.log(payout[straightupHandValue])
          document.getElementById('player-money').textContent = `$${playerMoney}`
          playerMoney += payout[straightupHandValue]
          document.cookie = `playerMoney=${encodeURIComponent(playerMoney)}`
        } else { playerMoney += payout }
        document.getElementById('player-money').textContent = `$${playerMoney}`
        document.cookie = `playerMoney=${encodeURIComponent(playerMoney)}`
      }
      const badge = document.createElement('span')
badge.textContent = `+${payout}`
badge.classList.add('badge', 'bg-success')
document.getElementById('player-money').appendChild(badge)
setTimeout(() => badge.remove(), 3000) 
    }
BETS.forEach(function (value, key) {
  if (!value.bet || dealerHand !== key.toString()) {
    document.getElementById(key).classList.add('disabled');
  } else {
    document.getElementById(key).classList.add('btn-success');
    document.getElementById(key).classList.remove('btn-primary');
  }
});
  })
}
