const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace']
const SUITS = ['hearts', 'diamonds', 'clubs', 'spades']
const BETS = new Map([
  ['straightnup', {
    bet: false,
    payout: [601,
      501,
      401,
      301,
      151,
      101,
      51,
      26]
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

let message = ''
let deck
let canBet = true
let drawnSuits = []
let drawnValues = []

window.onload = function () {
  buildDeck()
  shuffleDeck()
  startGame()
}

function getPlayerMoney () {
  if (!document.cookie) {
    document.cookie = 'playerMoney=50'
  }
  const cookies = document.cookie.split('; ')
  for (const cookie of cookies) {
    const [name, value] = cookie.split('=')
    if (name === 'playerMoney') {
      return parseInt(decodeURIComponent(value))
    }
  }
}

let playerMoney = getPlayerMoney()
console.log(`Player money: ${playerMoney}`)

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

function resetMoney () {
  playerMoney = 50
  document.cookie = 'playerMoney=50'
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
  canBet = true
}

function drawCards () {
  function cardSound () {
    const sound = document.getElementById('cards-sound')
    sound.load()
    sound.play()
  }

  for (let i = 0; i < 5; i++) {
    const dealer = () => {
      cardSound()
      const cardImg = document.createElement('img')
      cardImg.classList.add('text-center')
      const card = deck.pop()
      cardImg.src = './assets/images/cards/' + card + '.png'
      getValue(card)
      document.getElementById('dealer-cards').append(cardImg)
      document.getElementById('dealer-hand').innerHTML = message
    }
    setTimeout(dealer, 500 * i)
  }
}

function findPokerHand (drawnValues, drawnSuits) {
  const element = document.getElementById('dealer-hand')
  if (!isValidInput(drawnValues, drawnSuits)) { return }
  message = 'Drawing Cards'
  element.innerHTML = message

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
  for (const value of drawnValues) {
    if (!VALUES.includes(value)) {
      return false
    }
  }

  for (const suit of drawnSuits) {
    if (!SUITS.includes(suit)) {
      return false
    }
  }
  const seen = new Set()
  for (let i = 0; i < 5; i++) {
    const card = drawnValues[i] + drawnSuits[i]
    seen.add(card)
  }

  return true
}

function isFiveOfAKindFlush (drawnValues, drawnSuits) {
  return isFiveOfAKind(drawnValues) && isFlush(drawnSuits)
}

function isRoyalFlush (drawnValues, drawnSuits) {
  const royalValues = ['ace', 'king', 'queen', 'jack', '10']
  for (const value of drawnValues) {
    if (!royalValues.includes(value)) {
      return false
    }
  }
  return isFlush(drawnSuits)
}

function isStraightFlush (drawnValues, drawnSuits) {
  return isStraight(drawnValues) && isFlush(drawnSuits)
}

function isFiveOfAKind (drawnValues) {
  const counts = {}
  for (const value of drawnValues) {
    counts[value] = (counts[value] || 0) + 1
  }

  for (const value in counts) {
    if (counts[value] === 5) {
      return true
    }
  }

  return false
}
function isFourOfAKind (drawnValues) {
  const counts = {}
  for (const value of drawnValues) {
    counts[value] = (counts[value] || 0) + 1
  }

  for (const value in counts) {
    if (counts[value] === 4) {
      return true
    }
  }

  return false
}

function isFullHouse (drawnValues) {
  const counts = {}
  for (const value of drawnValues) {
    counts[value] = (counts[value] || 0) + 1
  }

  let three = false
  let two = false
  for (const value in counts) {
    if (counts[value] === 3) {
      three = true
    }
    if (counts[value] === 2) {
      two = true
    }
  }

  return three && two
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
  const indices = drawnValues.map(value => VALUES.indexOf(value))
  indices.sort((a, b) => a - b)

  if (indices[0] === 0 && indices[1] === 1 && indices[2] === 2 && indices[3] === 3 && indices[4] === 12) {
    return true
  }
  for (let i = 0; i < 4; i++) {
    if (indices[i] + 1 !== indices[i + 1]) {
      return false
    }
  }

  return true
}

function isThreeOfAKind (drawnValues) {
  const counts = {}
  for (const value of drawnValues) {
    counts[value] = (counts[value] || 0) + 1
  }

  for (const value in counts) {
    if (counts[value] === 3) {
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
  const indices = drawnValues.map(value => VALUES.indexOf(value))

  const maxIndex = Math.max(...indices)
  return VALUES[maxIndex]
}

function bet (key) {
  if (!canBet) return

  const entry = BETS.get(key)
  if (entry) {
    entry.bet = !entry.bet
    BETS.set(key, entry)
  }
}

function placeBets () {
  document.getElementById('dealer-hand').innerHTML = 'Drawing Cards'
  if (!canBet) return
  if (playerMoney === 0) {
    return alert('You have no money to bet!')
  }
  BETS.forEach(function (value, key) {
    const entry = BETS.get(key)
    if (entry) {
      if (entry.bet === true) {
        playerMoney -= 1
      }
    }
  })
  document.getElementById('player-money').textContent = `$${playerMoney}`
  document.cookie = `playerMoney=${encodeURIComponent(playerMoney)}`
  canBet = false
  setTimeout(function () { drawCards() }, 1000)
  setTimeout(function () { payBets() }, 3500)
}

function payBets () {
  if (canBet) return
  const dealerHand = findPokerHand(drawnValues, drawnSuits)
  BETS.forEach(function (value, key) {
    const betPlaced = BETS.get(key).bet
    const payout = BETS.get(key).payout

    if (dealerHand === key.toString()) {
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
    }
  })
}
