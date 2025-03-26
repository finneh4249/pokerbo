// utils/evaluateHand.js
export const evaluateHand = (hand) => {
    const values = hand.map(card => card.split('_of_')[0]);
    const suits = hand.map(card => card.split('_of_')[1]);

    console.log('Values:', values);
    console.log('Suits:', suits);

    const valueCounts = {};
    values.forEach(value => {
        valueCounts[value] = (valueCounts[value] || 0) + 1;
    });

    const counts = Object.values(valueCounts).sort((a, b) => b - a);
    console.log('Counts:', counts);

    const isFlush = new Set(suits).size === 1;
    console.log('Is Flush:', isFlush);

    const valueOrder = {
        '2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
        '7': 7, '8': 8, '9': 9, '10': 10,
        'jack': 11, 'queen': 12, 'king': 13, 'ace': 14
    };
    const sortedValues = values
        .map(value => valueOrder[value])
        .sort((a, b) => a - b);
    console.log('Sorted Values:', sortedValues);

    const isStraight = sortedValues.every((val, index) =>
        index === 0 || val === sortedValues[index - 1] + 1
    );
    console.log('Is Straight:', isStraight);

    if (isStraight && isFlush && sortedValues[0] === 10) {
        return 'royal_flush';
    }
    if (isStraight && isFlush) {
        return 'straight_flush';
    }
    if (counts[0] === 4) {
        return 'four_of_a_kind';
    }
    if (counts[0] === 3 && counts[1] === 2) {
        return 'full_house';
    }
    if (isFlush) {
        return 'flush';
    }
    if (isStraight) {
        return 'straight';
    }
    if (counts[0] === 3) {
        return 'three_of_a_kind';
    }
    if (counts[0] === 2 && counts[1] === 2) {
        return 'two_pair';
    }
    if (counts[0] === 2) {
        return 'pair';
    }
    return 'no_hand';
};