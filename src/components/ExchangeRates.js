import React, { useEffect, useState } from 'react';

const ExchangeRates = ({ sellCurrency, buyCurrency, exchangeRates }) => {
    const [finalRate, setFinalRate] = useState(null);

    useEffect(() => {
        if (exchangeRates && sellCurrency && buyCurrency) {
            const sellRate = exchangeRates.find(rate => rate.code === sellCurrency)?.rate;
            const buyRate = exchangeRates.find(rate => rate.code === buyCurrency)?.rate;

            if (sellRate && buyRate) {
                setFinalRate(buyRate / sellRate);
            } else {
                setFinalRate(null);
            }
        }
    }, [sellCurrency, buyCurrency, exchangeRates]);

    return (
        <div className="exchange-rate">
            <h2>Exchange Rate</h2>
            {finalRate !== null ? (
                <p>1 {sellCurrency} = {finalRate.toFixed(4)} {buyCurrency}</p>
            ) : (
                <p>Exchange rate not available</p>
            )}
        </div>
    );
};

export default ExchangeRates;