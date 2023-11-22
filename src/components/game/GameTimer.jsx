import React from 'react'

const p = ( number, maxLength = 2, padString = '0' ) => {
    return number.toString().padStart(maxLength,padString);
};
const buttonClasses = 'text-2xl inline-block border border-light py-2 bg-gray-300 rounded-lg basis-1/3 text-center';

export const GameTimer = ({ timeLeft }) => {
    const renderTime = () => {
        const t = new Date(timeLeft);
        return <span className='font-mono'>{p(t.getMinutes())}:{p(t.getSeconds())}</span>;
    };
    return (
        <div className={buttonClasses}>
            <span>Time: {renderTime()}</span>
        </div>
    );
};