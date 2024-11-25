import React, {Component} from 'react';
import SomethingElse from './SomethingElse';
import PlaceBets from './BetButtons/PlaceBets';
import BetButtons from './BetButtons/BetButtons';

export default class BetTable extends Component {
    render() {
        return (
            <>
            <div class="container" id="table">
  
            <div class="d-grid mx-auto my-auto col-12">
              <img src="assets/images/pokerbo.webp" width="400" class="center" alt='logo' />
              <div id="dealer-cards" ></div>
            </div>
            <img src="assets/images/pokerbo.webp" width="400" class="center" alt='logo' />
            <hr />
                <BetButtons />
              <br />
              <PlaceBets />
            </div>
            <SomethingElse />
            </>    
        );
    }
}