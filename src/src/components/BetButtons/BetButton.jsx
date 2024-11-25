import React, { Component } from 'react';

const betTitles = {
    straightnup: 'Straight \'n\' Up',
    twopair: 'Two Pair',
    threeofak: 'Three of a Kind',
    pair: 'Pair',
    nohand: 'No Hand'
}
export default class BetButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
        this.toggleActive = this.toggleActive.bind(this);
    }

    toggleActive() {
        this.setState(prevState => ({
            active: !prevState.active
        }));
    }

    render() {
        const buttonClass = this.state.active
            ? 'btn btn-outline-light active'
            : 'btn btn-outline-light';

        return (
                <button
                    type="button"
                    className={buttonClass}
                    id={this.props.bet}
                    onClick={this.toggleActive}
                >
                    <img src={`assets/images/hands/${this.props.bet}.webp`} width="100" alt="Straight" />
                    <h3>{betTitles[this.props.bet]}</h3>
                </button>
        );
    }
}
