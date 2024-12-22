import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CurrencySelector from './components/CurrencySelector';
import ExchangeRates from './components/ExchangeRates';
import { setSellCurrency, setBuyCurrency } from './redux/actions';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { sellCurrency, buyCurrency, exchangeRates } = useSelector((state) => state);

  return (
    <div className="App">
      <h1>Currency Exchange</h1>
      <div className="currency-selectors">
        <div className="currency-section">
          <h2>Sell Currency</h2>
          <CurrencySelector
            defaultCurrency={sellCurrency}
            onCurrencyChange={(currency) => dispatch(setSellCurrency(currency))}
          />
        </div>
        <div className="currency-section">
          <h2>Buy Currency</h2>
          <CurrencySelector
            defaultCurrency={buyCurrency}
            onCurrencyChange={(currency) => dispatch(setBuyCurrency(currency))}
          />
        </div>
      </div>
      <ExchangeRates
        sellCurrency={sellCurrency}
        buyCurrency={buyCurrency}
        exchangeRates={exchangeRates}
      />
    </div>
  );
}

export default App;