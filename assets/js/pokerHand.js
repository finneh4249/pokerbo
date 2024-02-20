import {VALUES, SUITS} from './main.js'
export let message = ''
export function findPokerHand (drawnValues, drawnSuits) {
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