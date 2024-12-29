import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExchangeRates } from '../redux/thunks';
import CurrencyDropdown from '../components/CurrencyDropdown';
import ExchangeRates from '../components/ExchangeRates';
import headerImage from '../img/Profits_Calculator.svg';
import '../App.css';
import { setSellCurrency, setBuyCurrency } from '../redux/actions';
import RateSlider from '../components/RateSlider';
import useExchangeRate from '../hooks/useExchangeRate';
import AmountInput from '../components/AmountInput';
import ProfitStatement from '../components/ProfitStatement';

function ProfitsCalculator() {
    const dispatch = useDispatch();
    const { exchangeRates, loading, error, sellCurrency, buyCurrency } = useSelector((state) => state);

    // Local state for managing dropdown open/close
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isCounterDropdownOpen, setIsCounterDropdownOpen] = useState(false);
    const [amount, setAmount] = useState(''); // State for amount
    const [lowerBoundary, setLowerBoundary] = useState(0);
    const [upperBoundary, setUpperBoundary] = useState(0);

    useEffect(() => {
        dispatch(fetchExchangeRates());
    }, [dispatch]);

    const handleCurrencySelect = (currency, type) => {
        if (type === 'sell') {
            dispatch(setSellCurrency(currency));
            setIsDropdownOpen(false);
        } else {
            dispatch(setBuyCurrency(currency));
            setIsCounterDropdownOpen(false);
        }
        console.log(`Selected ${type} currency: ${currency}`); // Debugging log
    };

    const handleAmountChange = (newAmount) => {
        setAmount(newAmount);
    };

    const handleAmountBlur = (e) => {
        // Handle any additional logic needed on blur
    };

    const rate = useExchangeRate(exchangeRates, sellCurrency, buyCurrency);

    return (
        <div>
            <div className="header-image-container">
                <img src={headerImage} alt="Currency Converters" className="header-image" />
            </div>
            <br />

            {loading && <p>Loading exchange rates...</p>}
            {error && <p>Error loading exchange rates: {error.message}</p>}

            <div className="currency-selectors">
                <div className="currency-section">
                    <h3>Base Currency: {sellCurrency}</h3>
                    <CurrencyDropdown
                        exchangeRates={exchangeRates}
                        selectedCurrency={sellCurrency}
                        onCurrencySelect={(currency) => handleCurrencySelect(currency, 'sell')}
                        isDropdownOpen={isDropdownOpen}
                        toggleDropdown={() => setIsDropdownOpen(!isDropdownOpen)}
                    />
                </div>

                <div className="currency-section">
                    <h3>Counter Currency: {buyCurrency}</h3>
                    <CurrencyDropdown
                        exchangeRates={exchangeRates}
                        selectedCurrency={buyCurrency}
                        onCurrencySelect={(currency) => handleCurrencySelect(currency, 'buy')}
                        isDropdownOpen={isCounterDropdownOpen}
                        toggleDropdown={() => setIsCounterDropdownOpen(!isCounterDropdownOpen)}
                    />
                </div>
            </div>

            <RateSlider
                rate={rate}
                buyCurrency={buyCurrency}
                sellCurrency={sellCurrency}
                onLowerBoundaryChange={setLowerBoundary}
                onUpperBoundaryChange={setUpperBoundary}
            />
            <br />

            <div className="amount-and-rates-container">
                <AmountInput
                    selectedCurrency={buyCurrency}
                    onAmountChange={handleAmountChange}
                    onBlur={handleAmountBlur}
                />
                <ExchangeRates
                    sellCurrency={sellCurrency}
                    buyCurrency={buyCurrency}
                    exchangeRates={exchangeRates}
                />
            </div>
            <br />
            <ProfitStatement
                upperBoundary={upperBoundary}
                lowerBoundary={lowerBoundary}
                counterCurrency={buyCurrency}
                amount={amount}
            />
        </div>
    );
}

export default ProfitsCalculator;
