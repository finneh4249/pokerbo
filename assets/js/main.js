const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace']
const SUITS = ['hearts', 'diamonds', 'clubs', 'spades']
const straightnup = new Map([
  ['fiveofakindflush', 601],
  ['royalflush', 501],
  ['straightflush', 401],
  ['fiveofakind', 301],
  ['fourofakind', 151],
  ['fullhouse', 101],
  ['flush', 51],
  ['straight', 26]
])
const PAYOUTS = new Map([
  ['straightnup', straightnup],
  ['twopair', 14],
  ['3ofak', 30],
  ['pair', 2],
  ['nohand', 2],
  ['hearts', 2],
  ['spades', 2],
  ['clubs', 2],
  ['diamonds', 2]
])
let message = ''
let deck
let canBet = true
let drawnSuits = []
let drawnValues = []
const drawnHands = []
let playerMoney = 50
const playerBetValue = 0
const bets = new Map([
  ['straightnup', false],
  ['twopair', false],
  ['3ofak', false],
  ['pair', false],
  ['nohand', false],
  ['hearts', false],
  ['spades', false],
  ['clubs', false],
  ['diamonds', false]
])
window.onload = function () {
  buildDeck()
  shuffleDeck()
  startGame()
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
  const initialiseEvents = () => {

    bets.forEach(function (value, key) {
      document.getElementById(key).addEventListener('click', function () {bet(key)})
    })
    document.getElementById("place-bets").addEventListener("click", placeBets);
    document.getElementById('redraw').addEventListener('click', redrawCards)
    }


  
    initialiseEvents()
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
  bets.forEach(function (value, key) {
    const element = document.getElementById(key)
    element.classList.remove('active', 'btn-success', 'disabled')
    element.classList.add('btn-primary')
    bets.set(key, false)
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
  for (let i = 0; i < 5; i++) {
    const dealer = () => {
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
  if (!isValidInput(drawnValues, drawnSuits)) {
    message = 'Drawing Cards'
    document.getElementById('dealer-hand').innerHTML = message
    return 'Drawing Cards'
  }
     if (isFiveOfAKindFlush(drawnValues)) {
    message = 'Five of a Kind'
    document.getElementById('dealer-hand').innerHTML = message
    return 'straightnup'
  }
  if (isRoyalFlush(drawnValues, drawnSuits)) {
    message = 'Royal Flush'
    document.getElementById('dealer-hand').innerHTML = message
    return 'straightnup'
  }

  // Check for straight flush
  if (isStraightFlush(drawnValues, drawnSuits)) {
    message = 'Straight Flush'
    document.getElementById('dealer-hand').innerHTML = message
    return 'straightnup'
  }
   if (isFiveOfAKind(drawnValues)) {
    message = 'Five of a Kind'
    document.getElementById('dealer-hand').innerHTML = message
    return 'straightnup'
  }

  // Check for four of a kind
  if (isFourOfAKind(drawnValues)) {
    message = 'Four of a Kind'
    document.getElementById('dealer-hand').innerHTML = message
    return 'straightnup'
  }

  if (isFullHouse(drawnValues)) {
    message = 'Full House'
    document.getElementById('dealer-hand').innerHTML = message
    return 'straightnup'
  }

  if (isFlush(drawnSuits)) {
    message = 'Flush'
    document.getElementById('dealer-hand').innerHTML = message
    return 'straightnup'
  }

  if (isStraight(drawnValues)) {
    message = 'Straight'
    document.getElementById('dealer-hand').innerHTML = message
    return 'straightnup'
  }

  if (isThreeOfAKind(drawnValues)) {
    message = 'Three of a kind'
    document.getElementById('dealer-hand').innerHTML = message
    return '3ofak'
  }

  if (isTwoPair(drawnValues)) {
    message = 'Two Pair'
    document.getElementById('dealer-hand').innerHTML = message
    return 'twopair'
  }

  if (isOnePair(drawnValues)) {
    message = 'One Pair'
    document.getElementById('dealer-hand').innerHTML = message
    return 'pair'
  }
  message = `High Card: ${getHighCard(drawnValues)}`
  document.getElementById('dealer-hand').innerHTML = message
  return 'nohand'
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
  console.log(key)
  if (!canBet) return

      if (bets.get(key) === true) {
        console.log(`bet UNplaced ${key}`)
        bets.set(key, false)
      } else { 
        console.log(`bet placed ${key}`)
          return bets.set(key, true) }
}

function placeBets () {
  document.getElementById('dealer-hand').innerHTML = 'Drawing Cards'
    if (!canBet) return
  if (playerMoney === 0) {
    return alert('You have no money to bet!')
  }
  bets.forEach(function (value, key) {
    if (value === true) {
      playerMoney -= 1
    }
  })
  document.getElementById('player-money').textContent = `$${playerMoney}`
  console.log(bets)
  canBet = false
  setTimeout((function(){drawCards()}), 1000)
  setTimeout((function(){payBets();}), 3500)
  
  
}

function payBets () {
  if (canBet) return;
  const dealerHand = findPokerHand(drawnValues, drawnSuits)
  console.log(dealerHand)
  drawnHands.push(dealerHand)
  bets.forEach(function (value, key) {
    if (dealerHand === key) {
      if (dealerHand === 'straightnup') {
        if(value !== true) return;
        const straightUpCheck = () => {
          if (isFiveOfAKindFlush(drawnValues, drawnSuits) === true) {
            return 'fiveofakindflush'}
          if (isRoyalFlush(drawnValues, drawnSuits) === true) {
            return 'royalflush'}
          else if (isStraightFlush(drawnValues, drawnSuits) === true) {
            return'straightflush'}
          else if (isFiveOfAKind(drawnValues, drawnSuits) === true) {
            return 'fiveofakind'}
          else if (isFourOfAKind(drawnValues, drawnSuits) === true) {
            return 'fourofakind'}
          else if (isFullHouse(drawnValues, drawnSuits) === true) {
            return 'fullhouse'}
          else if (isFlush(drawnValues, drawnSuits) === true){
            return 'flush'}
          else if (isStraight(drawnValues, drawnSuits) === true){
            return 'straight'
            }
        }
        straightUpCheck(key)
        straightnup.forEach(function (svalue, skey) {
          console.log(skey, svalue)
          if (skey === straightUpCheck(key)){
            console.log(playerMoney)
            playerMoney += svalue
            document.getElementById('betsPaid').innerHTML = `<p>You won with ${message}!</p>`
            return console.log(`You won with ${skey}!`)

          } 
          
          })
        }
        else if (value === true) {
          document.getElementById('betsPaid').innerHTML = `<p>You won with ${message}!</p>`
          PAYOUTS.forEach(function (pvalue, pkey) {
            if (pkey === key) {
              playerMoney += pvalue
              document.getElementById(pkey).classList.add('btn-success')
              document.getElementById(pkey).classList.remove('btn-primary', 'active')
            }
            if (pkey != key) {
              document.getElementById(pkey).classList.add('disabled')
              document.getElementById(pkey).classList.remove('btn-primary', 'active')
            }
          })
          
          return console.log(`You won with ${key}!`)
          
        }
      }
      
    }
   
  ); document.getElementById('player-money').textContent = `$${playerMoney}`

  canBet = true
}
