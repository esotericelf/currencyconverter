import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExchangeRates } from '../redux/thunks';
import CurrencyDropdown from '../components/CurrencyDropdown';
import ExchangeRates from '../components/ExchangeRates';
import headerImage from '../img/Profits_Calculator.svg';

function ProfitsCalculator() {
    const dispatch = useDispatch();
    const { exchangeRates = [], loading, error } = useSelector((state) => state);

    const [selectedCurrency, setSelectedCurrency] = useState('HKD');
    const [selectedCounterCurrency, setSelectedCounterCurrency] = useState('USD');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isCounterDropdownOpen, setIsCounterDropdownOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchExchangeRates());
    }, [dispatch]);

    const handleCurrencyChange = (currency) => {
        setSelectedCurrency(currency);
        setIsDropdownOpen(false);
    };

    const handleCounterCurrencyChange = (currency) => {
        setSelectedCounterCurrency(currency);
        setIsCounterDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    const toggleCounterDropdown = () => {
        setIsCounterDropdownOpen((prevState) => !prevState);
    };

    return (
        <div>
            <div className="header-image-container">
                <img src={headerImage} alt="Currency Converters" className="header-image" />
            </div>
            <br />
            <h1>To be launched soon</h1>

            {loading && <p>Loading exchange rates...</p>}
            {error && <p>Error loading exchange rates: {error.message}</p>}

            <h2>Base Currency: {selectedCurrency}</h2>
            <CurrencyDropdown
                exchangeRates={exchangeRates}
                selectedCurrency={selectedCurrency}
                onCurrencySelect={handleCurrencyChange}
                isDropdownOpen={isDropdownOpen}
                toggleDropdown={toggleDropdown}
            />

            <h2>Counter Currency: {selectedCounterCurrency}</h2>
            <CurrencyDropdown
                exchangeRates={exchangeRates}
                selectedCurrency={selectedCounterCurrency}
                onCurrencySelect={handleCounterCurrencyChange}
                isDropdownOpen={isCounterDropdownOpen}
                toggleDropdown={toggleCounterDropdown}
            />
            <br></br>
            <ExchangeRates
                buyCurrency={selectedCurrency}
                sellCurrency={selectedCounterCurrency}
                exchangeRates={exchangeRates}
            />
        </div>
    );
}

export default ProfitsCalculator;
