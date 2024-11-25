import React, {Component} from 'react';

export default class SomethingElse extends Component {
    render() {
        return (
            <>
                <div class="container">
                  <div class="d-grid gap-2 col-6 mx-auto">
                  
                  </div>
          
                  <h2 id="betsHeading" class="hidden">
                    Bets Paid: <br /><span id="betsPaid" class="badge bg-success"></span>
                  </h2>
                  <br />
                </div>
                <div class="d-grid gap-2 mx-auto">
                  <div class="row">
                    <div class="col-3">
                      <div class="chips">
                        <input type="image" src="assets/images/chips/chip1.png" id="1dollar"/>
                        <div class="centered"><h2>$1</h2></div>
                      </div>
                      
                    </div>
                    <div class="col-3">
                      <div class="chips">
                        <input type="image" src="assets/images/chips/chip5.png" id="5dollar"/>
                        <div class="centered"><h2>$5</h2></div>
                      </div>
                      
                    </div>
                    <div class="col-3">
                      <div class="chips">
                        <input type="image" src="assets/images/chips/chip25.png" id="25dollar"/>
                        <div class="centered"><h2>$25</h2></div>
                      </div>
                      
                    </div>
                    <div class="col-3">
                      <div class="chips">
                        <input type="image" src="assets/images/chips/chip50.png" id="50dollar"/>
                        <div class="centered"><h2>$50</h2></div>
                      </div>
                      
                    </div>
                    <div class="col-3">
                      <div class="chips">
                        <input type="image" src="assets/images/chips/chip100.png" id="100dollar"/>
                        <div class="centered hundred"><h5>$100</h5></div>
                      </div>
                     
                    </div>
                  </div>
                  <div class="row"><button
                    type="button"
                    class="btn btn-danger col-12 float-end"
                    id="reset-money"
                  >
                    Reset Money
                  </button></div>
                </div>
                <br />
                </>
        );
    }
}