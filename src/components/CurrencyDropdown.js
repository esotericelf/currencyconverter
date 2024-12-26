import React from 'react';
import Flag from 'react-world-flags';

const CurrencyDropdown = ({ exchangeRates, selectedCurrency, onCurrencySelect, isDropdownOpen, toggleDropdown }) => {
    const selectedCountryCode = exchangeRates.find((rate) => rate.code === selectedCurrency)?.countryCode || 'HK';

    return (
        <div className="currency-display-container">
            <div onClick={toggleDropdown} className="currency-display">
                <Flag code={selectedCountryCode} className="flag" />
                {selectedCurrency}
            </div>
            {isDropdownOpen && (
                <div className="dropdown">
                    <ul>
                        {exchangeRates.map(({ code, countryCode }) => (
                            <li
                                key={code}
                                onClick={() => onCurrencySelect(code)}
                                className={selectedCurrency === code ? 'selected' : ''}
                            >
                                <Flag code={countryCode} className="flag" />
                                {code}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CurrencyDropdown;