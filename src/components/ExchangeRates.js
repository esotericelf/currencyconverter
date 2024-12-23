import React, { useEffect, useState } from 'react';
import Flag from 'react-world-flags';
import './ExchangeRates.css';

const ExchangeRates = ({ sellCurrency, buyCurrency, exchangeRates }) => {
    const [finalRate, setFinalRate] = useState(null);
    const [flash, setFlash] = useState(false);

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

        // Trigger flash animation
        setFlash(true);
        const timer = setTimeout(() => setFlash(false), 1000); // Reset flash after 1 second

        return () => clearTimeout(timer);
    }, [sellCurrency, buyCurrency, exchangeRates]);

    const sellRate = exchangeRates.find(rate => rate.code === sellCurrency);
    const buyRate = exchangeRates.find(rate => rate.code === buyCurrency);

    if (!sellRate || !buyRate) {
        return <p>Exchange rate not available</p>;
    }

    const sellFlag = sellRate.countryCode || 'HK';
    const buyFlag = buyRate.countryCode || 'US';

    return (
        <div className={`exchange-rates ${flash ? 'flash' : ''}`}>
            <h4>Exchange Rate</h4>
            {finalRate !== null ? (
                <p>
                    <Flag code={sellFlag} className="flag" /> 1 {sellCurrency} = {finalRate.toFixed(4)} {buyCurrency} <Flag code={buyFlag} className="flag" />
                </p>
            ) : (
                <p>Exchange rate not available</p>
            )}
        </div>
    );
};

export default ExchangeRates;