import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Flag from 'react-world-flags';
import { fetchExchangeRates } from '../redux/thunks';
import './CurrencySelector.css';

const CurrencySelector = ({ defaultCurrency = 'HKD', onCurrencyChange }) => {
    const dispatch = useDispatch();
    const { exchangeRates, loading, error } = useSelector((state) => state);

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
        setAmount(e.target.value);
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
            {loading && <p>Loading exchange rates...</p>}
            {error && <p>Error: {error}</p>}
            <input
                type="text"
                value={amount}
                onChange={handleAmountChange}
                onBlur={handleBlur}
                placeholder={`Enter amount in ${selectedCurrency}`}
                className="currency-input"
            />
            <div className="currency-display-container" style={{ width: '25%', position: 'relative' }}>
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