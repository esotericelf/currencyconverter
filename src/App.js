import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CurrencySelector from './components/CurrencySelector';
import ExchangeRates from './components/ExchangeRates';
import CurrencyConverter from './components/CurrencyConverter';
import { setSellCurrency, setBuyCurrency } from './redux/actions';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { sellCurrency, buyCurrency, exchangeRates } = useSelector((state) => state);

  const [sellAmount, setSellAmount] = useState('');
  const [buyAmount, setBuyAmount] = useState('');
  const [isEditingSell, setIsEditingSell] = useState(false);
  const [isEditingBuy, setIsEditingBuy] = useState(false);

  console.log('sellCurrency:', sellCurrency);
  console.log('buyCurrency:', buyCurrency);
  console.log('exchangeRates:', exchangeRates);
  console.log('sellAmount:', sellAmount);
  console.log('buyAmount:', buyAmount);

  const handleSellAmountChange = (amount) => {
    setSellAmount(amount);
    setIsEditingSell(true);
  };

  const handleBuyAmountChange = (amount) => {
    setBuyAmount(amount);
    setIsEditingBuy(true);
  };

  const handleSellBlur = () => {
    setIsEditingSell(false);
  };

  const handleBuyBlur = () => {
    setIsEditingBuy(false);
  };

  return (
    <div className="App">
      <h1>Currency Exchange</h1>
      <div className="currency-selectors">
        <div className="currency-section">
          <h2>Sell Currency</h2>
          <CurrencySelector
            defaultCurrency={sellCurrency}
            onCurrencyChange={(currency) => dispatch(setSellCurrency(currency))}
            onAmountChange={handleSellAmountChange}
            onBlur={handleSellBlur}
          />
          {!isEditingSell && sellAmount && (
            <CurrencyConverter
              amount={sellAmount}
              type="sell"
              fromCurrency={sellCurrency}
              toCurrency={buyCurrency}
            />
          )}
        </div>

        <div className="currency-section">
          <h2>Buy Currency</h2>
          <CurrencySelector
            defaultCurrency={buyCurrency}
            onCurrencyChange={(currency) => dispatch(setBuyCurrency(currency))}
            onAmountChange={handleBuyAmountChange}
            onBlur={handleBuyBlur}
          />
          {!isEditingBuy && buyAmount && (
            <CurrencyConverter
              amount={buyAmount}
              type="buy"
              fromCurrency={buyCurrency}
              toCurrency={sellCurrency}
            />
          )}
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