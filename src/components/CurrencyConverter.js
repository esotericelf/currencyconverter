import React from 'react';
import { useSelector } from 'react-redux';
import Flag from 'react-world-flags';
import './CurrencyConverter.css';

// CurrencyConverter component to convert and display currency amounts
const CurrencyConverter = React.memo(({ amount, type, fromCurrency, toCurrency }) => {
    // Get exchange rates from Redux store
    const { exchangeRates = [] } = useSelector((state) => state);

    // Find exchange rates for the specified currencies
    const fromRate = exchangeRates.find((rate) => rate.code === fromCurrency);
    const toRate = exchangeRates.find((rate) => rate.code === toCurrency);

    // Return a message if currency selection is invalid
    if (!fromRate || !toRate) {
        return <p>Invalid currency selection</p>;
    }

    // Return a message if no amount is entered
    if (amount.trim() === '') {
        return <p>Please enter an amount</p>;
    }

    // Parse the amount to a float for conversion
    let convertedAmount = parseFloat(amount);

    // Return a message if the amount is invalid
    if (isNaN(convertedAmount)) {
        console.error('Invalid amount:', amount);
        return <p>Invalid amount</p>;
    }

    // Return a message if the exchange rates are invalid
    if (isNaN(fromRate.rate) || isNaN(toRate.rate)) {
        console.error('Invalid rate:', fromRate.rate, toRate.rate);
        return <p>Invalid rate</p>;
    }

    // Perform currency conversion based on the type (sell or buy)
    if (type === 'sell') {
        convertedAmount *= (toRate.rate / fromRate.rate);
    } else if (type === 'buy') {
        convertedAmount /= (fromRate.rate / toRate.rate);
    }

    // Get currency symbols and country flags
    const fromSymbol = fromRate.symbol || '';
    const toSymbol = toRate.symbol || '';
    const fromFlag = fromRate.countryCode || 'HK';
    const toFlag = toRate.countryCode || 'US';

    // Render the converted amount with symbols and flags
    return (
        <div className="currency-converter">
            <p>
                {fromSymbol} {parseFloat(amount).toLocaleString()} <Flag code={fromFlag} className="flag" /> = {toSymbol} {Number(convertedAmount.toFixed(2)).toLocaleString()} <Flag code={toFlag} className="flag" />
            </p>
        </div>
    );
});

export default CurrencyConverter;
