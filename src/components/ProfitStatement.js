import React from 'react';
import './ProfitStatement.css';


const ProfitStatement = ({ upperBoundary, lowerBoundary, counterCurrency, amount }) => {
    const profit = (upperBoundary - lowerBoundary) * amount;

    const formatCurrency = (value) => {
        return Number(value).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    return (
        <div className="profit-statement">
            <p>
                Profit: {counterCurrency} {formatCurrency(amount)} x ({upperBoundary.toFixed(4)} - {lowerBoundary.toFixed(4)}) = {counterCurrency} {formatCurrency(profit)}
            </p>
        </div>
    );
};

export default ProfitStatement;