// src/hooks/useExchangeRate.js
import { useEffect, useState } from 'react';

const useExchangeRate = (exchangeRates, sellCurrency, buyCurrency) => {
    const [rate, setRate] = useState(1);

    useEffect(() => {
        if (exchangeRates && sellCurrency && buyCurrency) {
            const sellRate = exchangeRates.find(rate => rate.code === sellCurrency)?.rate;
            const buyRate = exchangeRates.find(rate => rate.code === buyCurrency)?.rate;

            if (sellRate && buyRate) {
                setRate(buyRate / sellRate);
            } else {
                setRate(1);
            }
        }
    }, [exchangeRates, sellCurrency, buyCurrency]);

    return rate;
};

export default useExchangeRate;