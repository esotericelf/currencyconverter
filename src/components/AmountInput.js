import React, { useState } from 'react';

const AmountInput = ({ selectedCurrency, onAmountChange, onBlur }) => {
    const [amount, setAmount] = useState('');

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
            const formattedAmount = formatCurrency(rawAmount, selectedCurrency);
            setAmount(formattedAmount);
        } else {
            setAmount('');
        }
        if (onBlur) {
            onBlur(e);
        }
    };

    const formatCurrency = (amount, currencyCode) => {
        const formattedAmount = Number(amount).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        return `${currencyCode} ${formattedAmount}`;
    };

    return (
        <input
            type="TEL"
            value={amount}
            onChange={handleAmountChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={`Amount in ${selectedCurrency}`}
            className="currency-input"
        />
    );
};

export default AmountInput;