import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExchangeRates } from '../redux/thunks';
import AmountInput from './AmountInput';
import CurrencyDropdown from './CurrencyDropdown';
import './CurrencySelector.css';

const CurrencySelector = ({ defaultCurrency = 'HKD', onCurrencyChange, onAmountChange, onBlur }) => {
    const dispatch = useDispatch();
    const { exchangeRates = [] } = useSelector((state) => state);

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

    const handleFocus = (e) => {
        const rawAmount = e.target.value.replace(/[^0-9.-]+/g, '');
        setAmount(rawAmount);
    };

    const handleBlur = (e) => {
        const rawAmount = e.target.value.replace(/[^0-9.-]+/g, '');
        if (rawAmount && !isNaN(rawAmount)) {
            const formattedAmount = formatCurrency(rawAmount, selectedCurrency, exchangeRates);
            setAmount(formattedAmount);
        } else {
            setAmount('');
        }
        if (onBlur) {
            onBlur(e);
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

    const formatCurrency = (amount, currencyCode, ratesArray) => {
        const currency = ratesArray.find((rate) => rate.code === currencyCode);
        const symbol = currency ? currency.symbol : '';
        const formattedAmount = Number(amount).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        return `${symbol} ${formattedAmount}`;
    };

    return (
        <div className="currency-selector-container">
            <AmountInput
                amount={amount}
                onAmountChange={handleAmountChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                selectedCurrency={selectedCurrency}
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