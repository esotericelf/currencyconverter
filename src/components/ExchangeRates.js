import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CurrencyConversionDisplay from './CurrencyConversionDisplay';
import { swapCurrencies } from '../redux/actions';
import './ExchangeRates.css';

const ExchangeRates = ({ sellCurrency, buyCurrency, exchangeRates }) => {
    const dispatch = useDispatch();
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

        setFlash(true);
        const timer = setTimeout(() => setFlash(false), 1000);

        return () => clearTimeout(timer);
    }, [sellCurrency, buyCurrency, exchangeRates]);

    const handleSwap = () => {
        dispatch(swapCurrencies());
    };

    return (
        <div className={`exchange-rates ${flash ? 'flash' : ''}`} onClick={handleSwap} style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <CurrencyConversionDisplay />
                {finalRate !== null ? (
                    <p style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
                        1 {sellCurrency} = {finalRate.toFixed(4)} {buyCurrency}
                    </p>
                ) : (
                    <p style={{ margin: 0 }}>Exchange rate not available</p>
                )}
            </div>
        </div>
    );
};

export default ExchangeRates;