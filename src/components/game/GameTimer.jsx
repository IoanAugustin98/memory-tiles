import React from 'react'

const p = ( number, maxLength = 2, padString = '0' ) => {
    return number.toString().padStart(maxLength,padString);
};
const buttonClasses = 'text-2xl inline-flex border border-light px-16 py-2 bg-gray-300 rounded-lg';

export const GameTimer = ({ timeLeft }) => {
    const renderTime = () => {
        const t = new Date(timeLeft);
        return `${p(t.getMinutes())}:${p(t.getSeconds())}`;
    };
    return (
        <div className={buttonClasses}>
            <span>Time {renderTime()}</span>
        </div>
    );
};