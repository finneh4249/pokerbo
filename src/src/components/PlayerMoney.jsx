import React, { Component } from 'react';

export default class PlayerMoney extends Component {
    constructor(props) {
        super(props);
        this.state = {
            money: 50
        };
        this.resetMoney = this.resetMoney.bind(this);
    }
    resetMoney() {
        this.setState({
            money: 50
        });
    }
    render() {
        return (
            <button class="btn btn-outline-secondary">
            <h2 class="text-white"><span id="player-money" class="badge bg-warning">${this.state.money}</span> Player Money</h2>
        </button>
        )
    }
}