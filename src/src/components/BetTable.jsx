import React, {Component} from 'react';
import SomethingElse from './SomethingElse';
import PlaceBets from './BetButtons/PlaceBets';
import BetButtons from './BetButtons/BetButtons';
import DealerCards from './DealerCards';

export default class BetTable extends Component {
    render() {
        return (
            <>
            <BetButtons />
            <br />
            <PlaceBets />
            <SomethingElse />
            </>    
        );
    }
}