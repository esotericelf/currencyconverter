import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Flag from 'react-world-flags';
import { fetchExchangeRates } from '../redux/thunks';
import './CurrencySelector.css';

// CurrencySelector component for selecting currency and entering amount
const CurrencySelector = ({ defaultCurrency = 'HKD', onCurrencyChange, onAmountChange, onBlur }) => {
    const dispatch = useDispatch();
    // Get exchange rates, loading, and error state from Redux store
    const { exchangeRates = [], loading, error } = useSelector((state) => state);

    // Local state for amount, selected currency, and dropdown visibility
    const [amount, setAmount] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState(defaultCurrency);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Fetch exchange rates when the component mounts
    useEffect(() => {
        dispatch(fetchExchangeRates());
    }, [dispatch]);

    // Update selected currency when defaultCurrency prop changes
    useEffect(() => {
        setSelectedCurrency(defaultCurrency);
    }, [defaultCurrency]);

    // Handle changes to the amount input field
    const handleAmountChange = (e) => {
        const newAmount = e.target.value;
        setAmount(newAmount);
        if (onAmountChange) {
            onAmountChange(newAmount); // Call onAmountChange callback if provided
        }
    };

    // Handle focus event on input field to strip formatting
    const handleFocus = (e) => {
        const rawAmount = e.target.value.replace(/[^0-9.-]+/g, ''); // Strip formatting
        setAmount(rawAmount);
    };

    // Handle blur event on input field to reapply formatting
    const handleBlur = (e) => {
        const rawAmount = e.target.value.replace(/[^0-9.-]+/g, '');
        if (rawAmount && !isNaN(rawAmount)) {
            const formattedAmount = formatCurrency(rawAmount, selectedCurrency, exchangeRates);
            setAmount(formattedAmount);
        } else {
            setAmount('');
        }
        if (onBlur) {
            onBlur(e); // Pass event to onBlur callback if provided
        }
    };

    // Handle currency selection from the dropdown
    const handleCurrencySelect = (code) => {
        setSelectedCurrency(code);
        setIsDropdownOpen(false);
        if (amount) {
            setAmount(formatCurrency(amount.replace(/[^0-9.-]+/g, ''), code, exchangeRates));
        }
        if (onCurrencyChange) {
            onCurrencyChange(code); // Call onCurrencyChange callback if provided
        }
    };

    // Toggle the visibility of the currency dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    // Format the amount with currency symbol and commas
    const formatCurrency = (amount, currencyCode, ratesArray) => {
        const currency = ratesArray.find((rate) => rate.code === currencyCode);
        const symbol = currency ? currency.symbol : '';
        const formattedAmount = Number(amount).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        return `${symbol} ${formattedAmount}`;
    };

    // Get the country code for the selected currency
    const selectedCountryCode = exchangeRates.find((rate) => rate.code === selectedCurrency)?.countryCode || 'HK';

    return (
        <div className="currency-selector-container">
            <input
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={handleAmountChange}
                onFocus={handleFocus} // Strip formatting on focus
                onBlur={handleBlur} // Reapply formatting on blur
                placeholder={`Amount in ${selectedCurrency}`}
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