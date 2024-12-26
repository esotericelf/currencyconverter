import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CurrencySelector from './components/CurrencySelector';
import ExchangeRates from './components/ExchangeRates';
import CurrencyConverter from './components/CurrencyConverter';
import { setSellCurrency, setBuyCurrency, setSellAmount, setBuyAmount, setIsEditingSell, setIsEditingBuy } from './redux/actions';
import './App.css';
import headerImage from './img/currency_converters.svg';

// Main application component
function App() {
  // Hook to dispatch actions to the Redux store
  const dispatch = useDispatch();

  // Hook to select state from the Redux store
  const { sellCurrency, buyCurrency, exchangeRates, sellAmount, buyAmount, isEditingSell, isEditingBuy } = useSelector((state) => state);

  // Handler for changing the amount
  const handleAmountChange = (amount, type) => {
    if (type === 'sell') {
      dispatch(setSellAmount(amount));
      dispatch(setIsEditingSell(true));
    } else {
      dispatch(setBuyAmount(amount));
      dispatch(setIsEditingBuy(true));
    }
  };

  // Handler for when input loses focus
  const handleFocus = (event) => {
    const strippedAmount = stripFormatting(event.target.value);
    event.target.value = strippedAmount;
  };

  // Handler for when input loses focus
  const handleBlur = (event, type) => {
    const formattedAmount = formatAmount(event.target.value);
    event.target.value = formattedAmount;
    if (type === 'sell') {
      dispatch(setIsEditingSell(false));
    } else {
      dispatch(setIsEditingBuy(false));
    }
  };

  // Helper function to strip formatting from input
  const stripFormatting = (amount) => {
    return amount.replace(/[^0-9.]/g, '');
  };

  // Helper function to format input
  const formatAmount = (amount) => {
    if (!amount) return '';
    return parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="App">
      <div className="header-image-container">
        <img src={headerImage} alt="Currency Converters" className="header-image" />
      </div>
      <div className="currency-selectors">
        <div className="currency-section">
          <h2>Sell</h2>
          <CurrencySelector
            defaultCurrency={sellCurrency}
            onCurrencyChange={(currency) => dispatch(setSellCurrency(currency))}
            onAmountChange={(amount) => handleAmountChange(amount, 'sell')}
            onFocus={handleFocus}
            onBlur={(e) => handleBlur(e, 'sell')}
          />
          {isEditingSell ? (
            <div className="flashing-dots">...</div>
          ) : (
            sellAmount && (
              <CurrencyConverter
                amount={sellAmount}
                type="sell"
                fromCurrency={sellCurrency}
                toCurrency={buyCurrency}
              />
            )
          )}
        </div>

        <div className="currency-section">
          <h2>Buy</h2>
          <CurrencySelector
            defaultCurrency={buyCurrency}
            onCurrencyChange={(currency) => dispatch(setBuyCurrency(currency))}
            onAmountChange={(amount) => handleAmountChange(amount, 'buy')}
            onFocus={handleFocus}
            onBlur={(e) => handleBlur(e, 'buy')}
          />
          {isEditingBuy ? (
            <div className="flashing-dots">...</div>
          ) : (
            buyAmount && (
              <CurrencyConverter
                amount={buyAmount}
                type="buy"
                fromCurrency={buyCurrency}
                toCurrency={sellCurrency}
              />
            )
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