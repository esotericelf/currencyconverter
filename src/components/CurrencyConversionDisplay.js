import React from 'react';
import { useSelector } from 'react-redux';
import Flag from 'react-world-flags';
import './CurrencyConversionDisplay.css';

// Utility function to map currency code to country code
const currencyToCountryCode = (currencyCode, exchangeRates) => {
    const rate = exchangeRates.find((rate) => rate.code === currencyCode);
    return rate ? rate.countryCode : 'US'; // Default to 'US' if not found
};

const CurrencyConversionDisplay = () => {
    // Select only the necessary state properties
    const sellCurrency = useSelector((state) => state.sellCurrency);
    const buyCurrency = useSelector((state) => state.buyCurrency);
    const exchangeRates = useSelector((state) => state.exchangeRates);

    const sellCountryCode = currencyToCountryCode(sellCurrency, exchangeRates);
    const buyCountryCode = currencyToCountryCode(buyCurrency, exchangeRates);

    return (
        <div className="currency-conversion-display">
            <Flag code={sellCountryCode} className="currency-flag" />
            <span className="conversion-symbol">⇄</span>
            <Flag code={buyCountryCode} className="currency-flag" />
        </div>
    );
};

export default CurrencyConversionDisplay;
