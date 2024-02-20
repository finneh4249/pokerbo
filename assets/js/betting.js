import { drawnSuits,drawnValues, drawCards } from "./main.js"
import { findPokerHand } from "./pokerHand.js"
export let canBet = true
export const BETS = new Map([
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
  
  export let playerMoney = getPlayerMoney()
  console.log(`Player money: ${playerMoney}`)

  export function resetMoney () {
    playerMoney = 50
    document.cookie = 'playerMoney=50'
    document.getElementById('player-money').textContent = `$${playerMoney}`
  }
export function bet (key) {
    if (!canBet) return
  
    const entry = BETS.get(key)
    if (entry) {
      entry.bet = !entry.bet
      BETS.set(key, entry)
    }
  }
  
  export function placeBets () {
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
  
  export function payBets () {
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

  export function canBetFalse() {
canBet = false
  }