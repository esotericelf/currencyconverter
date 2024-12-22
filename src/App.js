import React from 'react';
import CurrencySelector from './components/CurrencySelector';

function App() {
  return (
    <div className="App">
      <h1>Currency Exchange</h1>
      <div className="currency-section">
        <h2>Select Currency</h2>
        <CurrencySelector defaultCurrency="HKD" />
      </div>
    </div>
  );
}

export default App;