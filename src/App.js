import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CurrencySelector from './components/CurrencySelector';
import ExchangeRates from './components/ExchangeRates';
import CurrencyConverter from './components/CurrencyConverter';
import { setSellCurrency, setBuyCurrency, setSellAmount, setBuyAmount, setIsEditingSell, setIsEditingBuy } from './redux/actions';
import './App.css';
import headerImage from './img/currency_converters.svg';
import Menu from './components/Menu';
import ProfitsCalculator from './Pages/ProfitsCalculator';

// Main application component
function App() {
  const dispatch = useDispatch();

  // Select only the necessary state properties
  const sellCurrency = useSelector((state) => state.sellCurrency);
  const buyCurrency = useSelector((state) => state.buyCurrency);
  const exchangeRates = useSelector((state) => state.exchangeRates);
  const sellAmount = useSelector((state) => state.sellAmount);
  const buyAmount = useSelector((state) => state.buyAmount);
  const isEditingSell = useSelector((state) => state.isEditingSell);
  const isEditingBuy = useSelector((state) => state.isEditingBuy);

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
    <Router>
      <div className="App">
        <Menu />
        <Routes>
          <Route path="/" element={
            <>
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
            </>
          } />
          <Route path="/profits-calculator" element={<ProfitsCalculator />} />
        </Routes>
        <div className="sponsor-badge">
          <a href="https://www.digitalocean.com/?refcode=61d82ae7e59a&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge">
            <img src="https://web-platforms.sfo2.cdn.digitaloceanspaces.com/WWW/Badge%202.svg" alt="DigitalOcean Referral Badge" />
          </a>
        </div>
      </div>
    </Router>
  );
}

export default App;