import React from 'react';

const ProfitStatement = ({ upperBoundary, lowerBoundary, counterCurrency, amount }) => {
    const profit = (upperBoundary - lowerBoundary) * amount;

    return (
        <div className="profit-statement">
            <p>
                Profit: {counterCurrency} {amount} x ({upperBoundary.toFixed(4)} - {lowerBoundary.toFixed(4)}) = {counterCurrency} {profit.toFixed(2)}
            </p>
        </div>
    );
};

export default ProfitStatement;