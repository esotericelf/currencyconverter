import React, { useState, useRef, useEffect } from 'react';
import './RateSlider.css'; // Ensure this CSS file is in the same directory

const minDistance = 0.001; // Adjusted for smaller increments

const RateSlider = ({ rate, buyCurrency, sellCurrency, onLowerBoundaryChange, onUpperBoundaryChange }) => {
    const isJPYCounter = buyCurrency === 'JPY';
    const lowerBoundary = Math.max(isJPYCounter ? rate - 3 : rate - 0.03, 0);
    const upperBoundary = isJPYCounter ? rate + 3 : rate + 0.03;

    const [value, setValue] = useState([lowerBoundary, upperBoundary]);
    const sliderRef = useRef(null);
    const handleWidth = 20; // Assuming the handle icon is 20px wide

    const [inputValues, setInputValues] = useState([lowerBoundary, upperBoundary]);

    useEffect(() => {
        setValue([lowerBoundary, upperBoundary]);
        setInputValues([lowerBoundary.toFixed(4), upperBoundary.toFixed(4)]);
    }, [rate, buyCurrency, sellCurrency, lowerBoundary, upperBoundary]);

    useEffect(() => {
        if (onLowerBoundaryChange) onLowerBoundaryChange(value[0]);
        if (onUpperBoundaryChange) onUpperBoundaryChange(value[1]);
    }, [value, onLowerBoundaryChange, onUpperBoundaryChange]);

    const handleStart = (e, thumbIndex) => {
        e.preventDefault();
        const slider = sliderRef.current;
        const sliderWidth = slider.offsetWidth - 40; // Adjust for full handle width (20px on each side)
        const startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        const startValue = value[thumbIndex];

        const onMove = (e) => {
            e.preventDefault();
            const currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
            const dx = currentX - startX;
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
                setInputValues(newValues.map(val => val.toFixed(4)));
                return newValues;
            });
        };

        const onEnd = () => {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onEnd);
            document.removeEventListener('touchmove', onMove);
            document.removeEventListener('touchend', onEnd);
        };

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onEnd);
        document.addEventListener('touchmove', onMove);
        document.addEventListener('touchend', onEnd);
    };

    const handleInputFocus = (e) => {
        e.target.value = ''; // Clear the input field on focus
    };

    const handleInputChange = (e, index) => {
        const newValue = e.target.value;
        setInputValues((prev) => {
            const newValues = [...prev];
            newValues[index] = newValue;
            return newValues;
        });
    };

    const handleInputBlur = (e, index) => {
        const newValue = parseFloat(e.target.value);
        if (isNaN(newValue) || (index === 0 && (newValue < lowerBoundary || newValue >= value[1] - minDistance)) || (index === 1 && (newValue > upperBoundary || newValue <= value[0] + minDistance))) {
            // Revert to previous value if input is invalid or out of bounds
            setInputValues((prev) => {
                const newValues = [...prev];
                newValues[index] = value[index]?.toFixed(4);
                return newValues;
            });
            return;
        }

        setValue((prev) => {
            const newValues = [...prev];
            if (index === 0) {
                newValues[0] = Math.min(newValue, prev[1] - minDistance);
                newValues[0] = Math.max(newValues[0], lowerBoundary);
            } else {
                newValues[1] = Math.max(newValue, prev[0] + minDistance);
                newValues[1] = Math.min(newValues[1], upperBoundary);
            }
            return newValues;
        });

        setInputValues((prev) => {
            const newValues = [...prev];
            newValues[index] = newValue.toFixed(4);
            return newValues;
        });
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Enter') {
            handleInputBlur(e, index);
        }
    };

    return (
        <div className="rate-slider-wrapper">
            <div className="rate-slider-values">
                <div className="rate-input">
                    <label htmlFor="range1">Sell Rate:</label>
                    <input
                        type="number"
                        id="range1"
                        value={inputValues[0]}
                        onFocus={handleInputFocus}
                        onBlur={(e) => handleInputBlur(e, 0)}
                        onChange={(e) => handleInputChange(e, 0)}
                        onKeyDown={(e) => handleKeyDown(e, 0)}
                        min={lowerBoundary}
                        max={value[1] - minDistance}
                        step={minDistance}
                    />
                </div>
                <span> - </span>
                <div className="rate-input">
                    <label htmlFor="range2">Buy Rate:</label>
                    <input
                        type="number"
                        id="range2"
                        value={inputValues[1]}
                        onFocus={handleInputFocus}
                        onBlur={(e) => handleInputBlur(e, 1)}
                        onChange={(e) => handleInputChange(e, 1)}
                        onKeyDown={(e) => handleKeyDown(e, 1)}
                        min={value[0] + minDistance}
                        max={upperBoundary}
                        step={minDistance}
                    />
                </div>
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
                    onMouseDown={(e) => handleStart(e, 0)}
                    onTouchStart={(e) => handleStart(e, 0)}
                ></div>
                <div
                    className="rate-slider-thumb"
                    style={{ left: `calc(${((value[1] - lowerBoundary) / (upperBoundary - lowerBoundary)) * 100}% - ${handleWidth}px)` }}
                    onMouseDown={(e) => handleStart(e, 1)}
                    onTouchStart={(e) => handleStart(e, 1)}
                ></div>
            </div>
        </div>
    );
};

export default RateSlider;