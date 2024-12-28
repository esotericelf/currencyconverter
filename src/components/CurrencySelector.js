import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExchangeRates } from '../redux/thunks';
import AmountInput from './AmountInput';
import CurrencyDropdown from './CurrencyDropdown';
import './CurrencySelector.css';

const CurrencySelector = ({ defaultCurrency = 'HKD', onCurrencyChange, onAmountChange, onBlur }) => {
    const dispatch = useDispatch();
    const { exchangeRates = [] } = useSelector((state) => state);

    const [selectedCurrency, setSelectedCurrency] = useState(defaultCurrency);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchExchangeRates());
    }, [dispatch]);

    useEffect(() => {
        setSelectedCurrency(defaultCurrency);
    }, [defaultCurrency]);

    const handleCurrencySelect = (code) => {
        setSelectedCurrency(code);
        setIsDropdownOpen(false);
        if (onCurrencyChange) {
            onCurrencyChange(code);
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    return (
        <div className="currency-selector-container">
            <AmountInput
                selectedCurrency={selectedCurrency}
                onAmountChange={onAmountChange}
                onBlur={onBlur}
            />
            <CurrencyDropdown
                exchangeRates={exchangeRates}
                selectedCurrency={selectedCurrency}
                onCurrencySelect={handleCurrencySelect}
                isDropdownOpen={isDropdownOpen}
                toggleDropdown={toggleDropdown}
            />
        </div>
    );
};

export default CurrencySelector;