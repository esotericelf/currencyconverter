import React from 'react';

const AmountInput = ({ amount, onAmountChange, onFocus, onBlur, selectedCurrency }) => (
    <input
        type="text"
        inputMode="decimal"
        value={amount}
        onChange={onAmountChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={`Amount in ${selectedCurrency}`}
        className="currency-input"
    />
);

export default AmountInput;