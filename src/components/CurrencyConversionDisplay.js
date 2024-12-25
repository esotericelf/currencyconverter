import React from 'react';
import Flag from 'react-world-flags';
import PropTypes from 'prop-types';
import './CurrencyConversionDisplay.css';

const CurrencyConversionDisplay = ({ buyCurrencyCode, sellCurrencyCode }) => {
    return (
        <div className="currency-conversion-display">
            <Flag code={buyCurrencyCode} className="currency-flag" />
            <span className="conversion-symbol">⇄</span>
            <Flag code={sellCurrencyCode} className="currency-flag" />
        </div>
    );
};

CurrencyConversionDisplay.propTypes = {
    buyCurrencyCode: PropTypes.string.isRequired,
    sellCurrencyCode: PropTypes.string.isRequired,
};

export default CurrencyConversionDisplay;
