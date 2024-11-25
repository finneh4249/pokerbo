import React, { Component } from "react";
export default class PlaceBets extends Component {
    render() {
        return (
            <div class="row">
                <button
                  type="button"
                  class="btn btn-info btn-lg"
                  id="place-bets"
                  onclick="this.classList.add('disabled'); document.getElementById('betsHeading').classList.remove('hidden');"
                >
                  Place Bets
                </button>
                </div>
        );
    }
}