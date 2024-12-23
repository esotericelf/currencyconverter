import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Flag from 'react-world-flags';
import { fetchExchangeRates } from '../redux/thunks';
import './CurrencySelector.css';

const CurrencySelector = ({ defaultCurrency = 'HKD', onCurrencyChange, onAmountChange, onBlur }) => {
    const dispatch = useDispatch();
    const { exchangeRates = [], loading, error } = useSelector((state) => state);

    const [amount, setAmount] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState(defaultCurrency);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchExchangeRates());
    }, [dispatch]);

    useEffect(() => {
        setSelectedCurrency(defaultCurrency);
    }, [defaultCurrency]);

    const handleAmountChange = (e) => {
        const newAmount = e.target.value;
        setAmount(newAmount);
        if (onAmountChange) {
            onAmountChange(newAmount);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleBlur(); // Trigger blur logic on Enter key press
        }
    };

    const handleCurrencySelect = (code) => {
        setSelectedCurrency(code);
        setIsDropdownOpen(false);
        if (amount) {
            setAmount(formatCurrency(amount.replace(/[^0-9.-]+/g, ''), code, exchangeRates));
        }
        if (onCurrencyChange) {
            onCurrencyChange(code);
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    const handleBlur = () => {
        if (amount) {
            setAmount(formatCurrency(amount.replace(/[^0-9.-]+/g, ''), selectedCurrency, exchangeRates));
        }
        if (onBlur) {
            onBlur();
        }
    };

    const formatCurrency = (amount, currencyCode, ratesArray) => {
        const currency = ratesArray.find((rate) => rate.code === currencyCode);
        const symbol = currency ? currency.symbol : '';
        const formattedAmount = Number(amount).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        return `${symbol} ${formattedAmount}`;
    };

    const selectedCountryCode = exchangeRates.find((rate) => rate.code === selectedCurrency)?.countryCode || 'HK';

    return (
        <div className="currency-selector-container">
            {loading && <p className="loading-message">Loading exchange rates...</p>}
            {error && <p className="error-message">Error: {error}</p>}
            <input
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={handleAmountChange}
                onKeyPress={handleKeyPress} // Add key press handler
                onBlur={handleBlur}
                placeholder={`Enter amount in ${selectedCurrency}`}
                className="currency-input"
            />
            <div className="currency-display-container" style={{ position: 'relative' }}>
                <div onClick={toggleDropdown} className="currency-display">
                    <Flag code={selectedCountryCode} className="flag" />
                    {selectedCurrency}
                </div>
                {isDropdownOpen && (
                    <div className="dropdown">
                        <ul>
                            {exchangeRates.map(({ code, countryCode }) => (
                                <li
                                    key={code}
                                    onClick={() => handleCurrencySelect(code)}
                                    className={selectedCurrency === code ? 'selected' : ''}
                                >
                                    <Flag code={countryCode} className="flag" />
                                    {code}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CurrencySelector;