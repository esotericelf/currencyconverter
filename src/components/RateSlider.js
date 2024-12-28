import React, { useState, useRef, useEffect } from 'react';
import './RateSlider.css'; // Ensure this CSS file is in the same directory

const minDistance = 0.01; // Adjusted for smaller increments

const RateSlider = ({ rate, buyCurrency, sellCurrency }) => {
    const isJPYCounter = buyCurrency === 'JPY';
    const lowerBoundary = isJPYCounter ? rate - 3 : rate - 0.03;
    const upperBoundary = isJPYCounter ? rate + 3 : rate + 0.03;

    const [value, setValue] = useState([lowerBoundary, upperBoundary]);
    const [amount, setAmount] = useState(0); // State for the amount input
    const sliderRef = useRef(null);
    const handleWidth = 20; // Assuming the handle icon is 20px wide

    useEffect(() => {
        setValue([lowerBoundary, upperBoundary]);
    }, [rate, buyCurrency, sellCurrency, lowerBoundary, upperBoundary]);

    const handleMouseDown = (e, thumbIndex) => {
        e.preventDefault();
        const slider = sliderRef.current;
        const sliderWidth = slider.offsetWidth - 40; // Adjust for full handle width (20px on each side)
        const startX = e.clientX;
        const startValue = value[thumbIndex];

        const onMouseMove = (e) => {
            e.preventDefault();
            const dx = e.clientX - startX;
            const newPercent = (dx / sliderWidth) * (upperBoundary - lowerBoundary);
            const newValue = startValue + newPercent;

            setValue((prev) => {
                const newValues = [...prev];
                if (thumbIndex === 0) {
                    newValues[0] = Math.min(newValue, prev[1] - minDistance);
                    newValues[0] = Math.max(newValues[0], lowerBoundary);
                } else {
                    newValues[1] = Math.max(newValue, prev[0] + minDistance);
                    newValues[1] = Math.min(newValues[1], upperBoundary);
                }
                return newValues;
            });
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    return (
        <div className="rate-slider-wrapper">
            <div className="rate-slider-values">
                <span id="range1">{value[0]?.toFixed(4)}</span>
                <span> - </span>
                <span id="range2">{value[1]?.toFixed(4)}</span>
            </div>
            <div className="rate-slider-container" ref={sliderRef}>
                <div
                    className="rate-slider-track"
                    style={{
                        left: `${((value[0] - lowerBoundary) / (upperBoundary - lowerBoundary)) * 100}%`,
                        width: `${((value[1] - value[0]) / (upperBoundary - lowerBoundary)) * 100}%`,
                    }}
                ></div>
                <div
                    className="rate-slider-thumb"
                    style={{ left: `${((value[0] - lowerBoundary) / (upperBoundary - lowerBoundary)) * 100}%` }}
                    onMouseDown={(e) => handleMouseDown(e, 0)}
                ></div>
                <div
                    className="rate-slider-thumb"
                    style={{ left: `calc(${((value[1] - lowerBoundary) / (upperBoundary - lowerBoundary)) * 100}% - ${handleWidth}px)` }}
                    onMouseDown={(e) => handleMouseDown(e, 1)}
                ></div>
            </div>
            <AmountInput value={amount} onChange={handleAmountChange} />
        </div>
    );
};

export default RateSlider;