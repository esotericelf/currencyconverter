import React from 'react';
import { useSelector } from 'react-redux';
import Flag from 'react-world-flags';
import './CurrencyConverter.css';

const CurrencyConverter = ({ amount, type, fromCurrency, toCurrency }) => {
    const { exchangeRates = [] } = useSelector((state) => state);

    const fromRate = exchangeRates.find((rate) => rate.code === fromCurrency);
    const toRate = exchangeRates.find((rate) => rate.code === toCurrency);

    if (!fromRate || !toRate) {
        return <p>Invalid currency selection</p>;
    }

    let convertedAmount = parseFloat(amount);

    if (isNaN(convertedAmount)) {
        console.error('Invalid amount:', amount);
        return <p>Invalid amount</p>;
    }

    if (isNaN(fromRate.rate) || isNaN(toRate.rate)) {
        console.error('Invalid rate:', fromRate.rate, toRate.rate);
        return <p>Invalid rate</p>;
    }

    if (type === 'sell') {
        convertedAmount *= (toRate.rate / fromRate.rate);
    } else if (type === 'buy') {
        convertedAmount /= (fromRate.rate / toRate.rate);
    }

    const fromSymbol = fromRate.symbol || '';
    const toSymbol = toRate.symbol || '';
    const fromFlag = fromRate.countryCode || 'HK';
    const toFlag = toRate.countryCode || 'US';

    return (
        <div className="currency-converter">
            <p>
                {fromSymbol} {parseFloat(amount).toLocaleString()} <Flag code={fromFlag} className="flag" /> = {toSymbol} {Number(convertedAmount.toFixed(2)).toLocaleString()} <Flag code={toFlag} className="flag" />
            </p>
        </div>
    );
};

export default CurrencyConverter;
