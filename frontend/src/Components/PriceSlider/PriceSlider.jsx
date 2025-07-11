import React, { useState, useEffect } from 'react';
import './price_slider.css';

export const PriceSlider = ({ min = 0, max = 5000, stMinValue=0, stMaxValue=1000, onChange }) => {
    const [minValue, setMinValue] = useState(stMinValue);
    const [maxValue, setMaxValue] = useState(stMaxValue);

    const handleMinChange = (e) => {
        const value = Math.min(Number(e.target.value), maxValue - 1);
        setMinValue(value);
    };

    const handleMaxChange = (e) => {
        const value = Math.max(Number(e.target.value), minValue + 1);
        setMaxValue(value);
    };

    useEffect(() => {
        if (mounted) {
            onChange(minValue, maxValue);
        }
    }, [minValue, maxValue]);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);


    return (
        <div className='slider'>
            <label>Min: ${minValue}</label>
            <input
                type="range"
                min={min}
                max={max}
                value={minValue}
                onChange={handleMinChange}
            />
            <label>Max: ${maxValue}</label>
            <input
                type="range"
                min={min}
                max={max}
                value={maxValue}
                onChange={handleMaxChange}
            />
        </div>
    );
};
