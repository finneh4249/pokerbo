import logo from './logo.svg';
import './App.css';
import BetTable from './components/BetTable';
import PlayerMoney from './components/PlayerMoney';

function App() {
  return (
    <div className="App">

    <div class="container mx-auto">
      <div class=" row">
        <div class="container" ><img src="assets/images/logo.webp" id="logo" width="5rem" class="center" /></div>
        
        
      </div>

      <audio id="cards-sound">
        <source src="./assets/cardDraw.ogg" type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>
      <audio id="cards-sound">
        <source src="./assets/cardDraw.ogg" type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>
      <div class="container">
        <div class="row align-items-center">
            <div class="d-grid col-6 mx-auto">
                <button class="btn btn-outline-secondary">
                    <h2 class="text-white">Dealer: <span id="dealer-hand" class="badge bg-primary"></span></h2>
                </button>
            </div>
            <div class="d-grid col-6 mx-auto">
               <PlayerMoney />
            </div>
        </div>
    </div>

    <BetTable />
      


      <div class="container-fluid">
        <h2>Payout Table</h2>
        <table class="table mb-0 table-dark text-center">
          <tr>
            <th colspan="2" scope="row" class="text-center">Straight 'n' Up</th>
          </tr>
          <tr>
            <td>Five of a Kind Flush</td>
            <td>600 to 1</td>
          </tr>
          <tr>
            <td>Royal Flush</td>
            <td>500 to 1</td>
          </tr>
          <tr>
            <td>Straight Flush</td>
            <td>400 to 1</td>
          </tr>
          <tr>
            <td>Five of a Kind</td>
            <td>300 to 1</td>
          </tr>
          <tr>
            <td>Four of a Kind</td>
            <td>150 to 1</td>
          </tr>
          <tr>
            <td>Full House</td>
            <td>100 to 1</td>
          </tr>
          <tr>
            <td>Flush</td>
            <td>50 to 1</td>
          </tr>
          <tr>
            <td>Straight</td>
            <td>25 to 1</td>
          </tr>
        </table>
        <br />
        <table class="table table-dark text-center">
          <tbody>
            <thead>
              <tr>
                <th scope="col">Hand</th>
                <th scope="col">Payout</th>
              </tr>
            </thead>
            <tr>
              <td>Three of a Kind</td>
              <td>29 to 1</td>
            </tr>
            <tr>
              <td>Two Pair</td>
              <td>13 to 1</td>
            </tr>
            <tr>
              <td>Pair</td>
              <td>1 to 1</td>
            </tr>
            <tr>
              <td>No Hand</td>
              <td>1 to 1</td>
            </tr>
          </tbody>
        </table>
        <br />
        <table class="table table-dark text-center">
          <tbody>
            <thead>
              <tr>
                <th colspan="2" class="text-center">Suits</th>
              </tr>
            </thead>
            <tr>
              <td>5 Suits</td>
              <td>50 to 1</td>
            </tr>
            <tr>
              <td>4 Suits</td>
              <td>5 to 1</td>
            </tr>
            <tr>
              <td>3 Suits</td>
              <td>2 to 1</td>
            </tr>
            <tr>
              <td>2 Suits</td>
              <td>1 to 1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

     

    <script src="./assets/js/main.js" type="module"></script>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"
      integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
      crossorigin="anonymous"
    ></script>

    </div>
  );
}

export default App;
