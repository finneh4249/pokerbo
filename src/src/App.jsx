// App.jsx
import React from 'react';
import './App.css';
import { GameProvider } from './context/GameContext';
import BetTable from './components/BetTable';
import DealerCards from './components/DealerCards';
import PlayerMoney from './components/PlayerMoney';

function App() {
  return (
    <GameProvider>
      <div className="App">
        <div className="container mx-auto">
          {/* Logo */}
          <div className="row">
            <div className="container">
              <img src="assets/images/logo.webp" id="logo" width="5rem" className="center" alt="Logo" />
            </div>
          </div>

          {/* Dealer and Player Info */}
          <div className="container">
            <div className="row align-items-center">
              <div className="d-grid col-6 mx-auto">
                <DealerCards />
              </div>
              <div className="d-grid col-6 mx-auto">
                <PlayerMoney />
              </div>
            </div>
          </div>

          {/* Bet Table */}
          <BetTable />

          {/* Payout Tables */}
          <div className="container-fluid">
            {/* Payout Tables Content */}
          </div>
        </div>
      </div>
    </GameProvider>
  );
}

export default App;